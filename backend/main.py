import json
import os
import time
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from groq import Groq
from pydantic import BaseModel
from pypdf import PdfReader

load_dotenv()



_groq_key = os.environ.get("GROQ_API_KEY")
client = Groq(api_key=_groq_key) if _groq_key else None
model = "openai/gpt-oss-120b"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#parse resume
class Experience(BaseModel):
    company: str | None = None
    role: str | None = None
    duration: str | None = None
    description: str | None = None
    skills_used: list[str] = []

class Resume(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None

    total_experience_years: float | None = None

    skills: list[str] = []
    experiences: list[Experience] = []
    education: list[str] = []
    projects: list[str] = []
    certifications: list[str] = []
resume_schema = Resume.model_json_schema()

class ChatRequest(BaseModel):
    question: str
    stream: bool = True

def ask_candidate(question: str, resume: Resume, stream: bool = True):

    system_prompt = f"""
You are an AI assistant representing a job candidate.

Below is everything you know about the candidate.

{resume.model_dump_json(indent=2)}

Rules:

1. Answer only using this information.

2. Never hallucinate.

3. If information is unavailable,
say

"I don't have enough information to answer that."

4. Be professional.

5. Answer as if HR is interviewing this candidate.
"""

    # If the Groq client isn't configured, provide a local simulated response
    if client is None:
        summary = (
            f"I can't reach the external API here. Based on the resume: "
            f"Name: {resume.name or 'unknown'}. "
            f"Skills: {', '.join(resume.skills) if resume.skills else 'none'}. "
            f"Total experience: {resume.total_experience_years or 'unknown'}. "
            f"Question: {question}"
        )

        if stream:
            # yield in small chunks to simulate streaming
            for i in range(0, len(summary), 30):
                yield summary[i:i+30]
                time.sleep(0.02)
        else:
            return summary

    # Otherwise use the configured Groq client
    if stream:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role":"system",
                    "content":system_prompt
                },
                {
                    "role":"user",
                    "content":question
                }
            ],
            stream=True
        )

        for chunk in response:
            if chunk.choices[0].delta.content is not None:
                yield chunk.choices[0].delta.content
    else:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role":"system",
                    "content":system_prompt
                },
                {
                    "role":"user",
                    "content":question
                }
            ],
            stream=False
        )

        # return the full content as a single string
        full = response.choices[0].message.content
        return full
def parse_resume(resume_text):
    system_prompt = f"""
    You are an expert resume parser.

    Extract information from the resume based on its meaning,
    not only based on exact section headings.

    Different resumes may use different headings.

    For example:
    - Experience
    - Professional Experience
    - Work History
    - Employment
    - Internships

    These may all contain relevant experience.

    Skills may also appear in the skills section, work experience,
    internships or projects.

    Return ONLY valid JSON matching this schema:

    {resume_schema}

    Important rules:

    1. Do not invent information.
    2. If a value is not available, return null.
    3. If a list has no information, return an empty list.
    4. Include internships inside experiences.
    5. Extract skills mentioned across the entire resume.
    """
    user_prompt = f"""
    Parse the following resume:

    {resume_text}
    """
    # If no external API client is configured, return a minimal empty Resume
    if client is None:
        return Resume()

    message_system={
        "role" : "system",
        "content" : system_prompt
    }
    message_user={
        "role" : "user",
        "content" : user_prompt
    }
    messages=[message_system, message_user]
    response_format={
        "type": "json_object"
    }
    response=client.chat.completions.create(model=model, messages=messages, response_format=response_format)
    raw_output = response.choices[0].message.content
    data = json.loads(raw_output)
    resume = Resume(**data)
    return resume

#pdf extraction
def read_pdf(file_path: Path):

    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text

@app.get("/")
def home():
    # resume_text=read_pdf(Path("my_resume.pdf"))
    # resume=parse_resume(resume_text)
    return {
        "message" : "Ye home page hai"
    }
# chatgpt.cpom
#chatgot.com/aceeddferre5e


@app.post("/chat")
def chat(request: ChatRequest):
    resume_text=read_pdf(Path("Jayesh_Resume.pdf"))
    resume=parse_resume(resume_text)
    if request.stream:
        return StreamingResponse(ask_candidate(request.question, resume, stream=True), media_type="text/event-stream")
    else:
        # non-streaming: return JSON payload
        full = ask_candidate(request.question, resume, stream=False)
        return {"answer": full}