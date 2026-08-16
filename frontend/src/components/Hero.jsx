import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Code2,
  FolderKanban,
  Mail,
  MapPin,
  Sparkles,
  FileText,
  UserRound,
  Bot,
  User,
  RotateCcw,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import resumeData from '../data/resume.json';
import './Hero.css';

const buttonQuestions = {
  Me: 'Who are you? I want to know more about you.',
  Projects: 'What are your projects? What are you working on right now?',
  Skills: 'What are your technical skills? What technologies do you work with?',
  Contact: 'How can I contact you? What is your email and phone number?',
  Location: 'Where are you located? What is your current location?',
  Resume: 'Can you summarize your resume? What is your work experience?',
};

export const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const aiMessagesRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickButtons = [
    { label: 'Me', icon: UserRound },
    { label: 'Projects', icon: FolderKanban },
    { label: 'Skills', icon: Code2 },
    { label: 'Contact', icon: Mail },
    { label: 'Location', icon: MapPin },
    { label: 'Resume', icon: FileText },
  ];

  const scrollToMessages = () => {
    const container = aiMessagesRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
      return;
    }

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    scrollToMessages();
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isFullscreen) {
      document.body.classList.remove('ai-fullscreen-open');
      return;
    }

    document.body.classList.add('ai-fullscreen-open');
    return () => {
      document.body.classList.remove('ai-fullscreen-open');
    };
  }, [isFullscreen]);

  async function submitToAI(text) {
    if (!text.trim() || isTyping) return;

    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setSearchQuery('');
    setIsTyping(true);

    // Add placeholder AI message
    setMessages(prev => [...prev, { role: 'ai', content: '' }]);

    try {
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, stream: true }),
      });

      if (!response.body) throw new Error('No readable stream');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let fullContent = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value);
          fullContent += chunk;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { role: 'ai', content: fullContent };
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          role: 'ai',
          content: "Sorry, I couldn't connect to the server right now. Please make sure the backend is running.",
        };
        return newMessages;
      });
    } finally {
      setIsTyping(false);
    }
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    submitToAI(searchQuery);
  }

  function handleQuickButton(label) {
    const question = buttonQuestions[label];
    if (question) {
      setSearchQuery(question);
      // Small delay so the user sees the text appear in the input first
      setTimeout(() => {
        submitToAI(question);
      }, 150);
    }
  }

  function handleReset() {
    setMessages([]);
    setSearchQuery('');
    setIsFullscreen(false);
    inputRef.current?.focus();
  }

  return (
    <section id="home" className="hero-section container">
      <div className="hero-shell">
        <motion.div 
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="hero-copy"
        >

          <h1 className="hero-title">{resumeData.name}</h1>

          <div className="avatar-stage" aria-label="Cartoon avatar illustration">
            <div className="avatar-orbit orbit-pink" />
            <div className="avatar-orbit orbit-purple" />
            <div className="avatar-orbit orbit-orange" />
            <motion.div
              className="avatar-card"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg viewBox="0 0 320 320" className="avatar-svg" role="img" aria-hidden="true">
                <defs>
                  <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f8ef7" />
                    <stop offset="55%" stopColor="#b9a7ff" />
                    <stop offset="100%" stopColor="#f6a7c1" />
                  </linearGradient>
                  <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#312e81" />
                    <stop offset="100%" stopColor="#111827" />
                  </linearGradient>
                </defs>
                <rect x="44" y="42" width="232" height="236" rx="116" fill="rgba(255,255,255,0.92)" />
                <path d="M96 132c10-39 35-63 64-63s54 22 65 58c2 8-1 17-8 21l-10 6c-8 5-13 13-14 23l-2 19H108l-2-20c-1-10-6-18-14-22l-10-5c-7-4-10-13-6-21z" fill="url(#hairGradient)" />
                <circle cx="160" cy="158" r="56" fill="#f5d2bd" />
                <path d="M111 155c12-3 26-6 49-6s38 2 49 6c0 26-18 56-49 56s-49-30-49-56z" fill="#f6d4c0" opacity="0.6" />
                <circle cx="140" cy="158" r="5.5" fill="#0f172a" />
                <circle cx="180" cy="158" r="5.5" fill="#0f172a" />
                <path d="M150 174c4 5 16 5 20 0" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M102 231c11-30 36-46 58-46s46 16 58 46" fill="url(#shirtGradient)" />
                <path d="M124 200c11 11 28 17 36 17s25-6 36-17" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0.7" fill="none" />
                <path d="M128 112c14-14 39-22 69-18" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" opacity="0.18" fill="none" />
                <circle cx="117" cy="173" r="8" fill="#f7b37d" opacity="0.28" />
                <circle cx="203" cy="173" r="8" fill="#f7b37d" opacity="0.28" />
              </svg>
            </motion.div>
          </div>

          <form className="search-shell" onSubmit={handleSearchSubmit}>
            <div className="search-label">
              <Sparkles size={14} className="search-label-icon" />
              AI-Powered Portfolio
            </div>
            <div className="search-bar">
              <input
                ref={inputRef}
                className="search-input"
                type="text"
                placeholder="Ask me anything..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                aria-label="Ask me anything search"
                disabled={isTyping}
              />
              <button className="search-button" type="submit" aria-label="Ask AI" disabled={!searchQuery.trim() || isTyping}>
                <ArrowRight size={20} />
              </button>
            </div>
          </form>

          <div className="button-grid" aria-label="Portfolio navigation buttons">
            {quickButtons.map((button) => {
              const ButtonIcon = button.icon;

              return (
                <motion.button
                  key={button.label}
                  type="button"
                  className="nav-tile"
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickButton(button.label)}
                  disabled={isTyping}
                >
                  <span className="nav-tile-label">{button.label}</span>
                  <ButtonIcon size={18} className="nav-tile-icon" />
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* AI Response Area */}
        <AnimatePresence>
          {messages.length > 0 && (
            <motion.div
              className={`ai-response-area glass-card${isFullscreen ? ' fullscreen' : ''}`}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="ai-response-header">
                <div className="ai-response-title">
                  <Bot size={20} className="ai-icon" />
                  <span>AI Assistant</span>
                </div>
                <div className="ai-header-actions">
                  <button type="button" className="ai-action-btn" onClick={() => setIsFullscreen(f => !f)} aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
                    {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  </button>
                  <button type="button" className="ai-action-btn ai-reset-btn" onClick={handleReset} aria-label="Reset conversation" title="New conversation">
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>

              <div className="ai-messages" ref={aiMessagesRef} data-lenis-prevent>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`ai-msg-wrapper ${msg.role}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 }}
                  >
                    <div className={`ai-msg-avatar ${msg.role}`}>
                      {msg.role === 'ai' ? <Bot size={16} /> : <User size={16} />}
                    </div>
                    <div className={`ai-msg-bubble ${msg.role}`}>
                      {msg.content}
                      {msg.content === '' && isTyping && msg.role === 'ai' && (
                        <div className="ai-typing-indicator">
                          <span></span><span></span><span></span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
