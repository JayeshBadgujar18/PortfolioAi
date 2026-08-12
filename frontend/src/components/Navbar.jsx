import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import './Navbar.css';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
  ];

  const scrollTo = (id) => {
    setActive(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'glass-nav' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav-content container">
        <div className="logo text-gradient">JB.</div>
        
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <button 
                onClick={() => scrollTo(item.id)}
                className={`nav-btn ${active === item.id ? 'active' : ''}`}
              >
                {item.label}
                {active === item.id && (
                  <motion.div 
                    layoutId="nav-indicator" 
                    className="nav-indicator" 
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="social-links">
          <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://github.com/JayeshBadgujar18" className="social-btn">
            <GithubIcon size={20} />
          </motion.a>
          <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://www.linkedin.com/in/jayesh-badgujar-439911335/" className="social-btn">
            <LinkedinIcon size={20} />
          </motion.a>
          <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://s3.amazonaws.com/attachments.angel.co/14721069-d8ce766e6373372079dafbcb36427e77.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIATAVHNKYQVLHZVW7B%2F20260812%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260812T060227Z&X-Amz-Expires=2468&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFEu4fgmf3K0pAL1Ideo6%2FdNoVS4go%2FptLcOQUQQgceeAiEAgHc29ECw6Q3rrC5sUz6A5tf%2BUKkbNlEIVNgKGC4zjbsqlgUIx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwyMDc1ODMyNzA0MzMiDL6oo%2BdxDBMZHA0SQCrqBJI4lmZOuO23hVvuEk6feKzRIb%2BLVspY1x0FiNEhdlratoGbRk3p971QuJT4QV63tgWUqwBo6pFd%2F0h0l2cqZtrP4JnynsSe4S8RKduvuYvuMFvrjO04VhEg7xXOEIrI8ltPqlFCJgEE7CM0SO9RF2Xrla63ZZUnwSfWpuy0B1szyVBZxEfAvB5Y6c0taEwQG8qUpJKvngJKgEfsq8fBjFbwdBR9mGd67s9XpwCBoRYwqZxuFekIz55D8lKLbrYeFFTMH3mhYauj1YlAkaQSaL%2BeEPGdi%2B%2Fuid0qWQ5DI4raZM32OmcObw3%2BZPg5dIE5%2Fkq8MVj%2FPV6Pa%2Fo8wRA1w0zX9NWGKoUKrLvGiLdoM2dzKmpnwLMj79LVj1MNWH2DFcP1ESGnLhj3vagCLIYTPPCmO6sD4S%2FuvMUXU6wp4nhjhlwNULlE4lVcP8fJw32LPPudqWusodh5QWicNJ3Lc%2Bmex9rrMe60pZVgJTP0b5tjUkd1aGh6ng0z7c7Cu3%2BBlqK2G4YvMue9cKYrG9KnIqoPJnocYuC2ZM9viqvwnYZsgemCOaLebMDKGmqRtBaSMt%2Fm3leLOVL4fJRepLJeuPfPTUha6lKVPqmmsbJI5unEoVCBABeGozdpRwuwTbCbsJX3y89kSfmMhUmMgem5RsJpujft20ZJr7xLij1jUUx0xJ5rKeKwtkJY5C5txjnDK%2FqIPjdtweS6ydeAc9d3yC4tNj5dsUFktSwUBcZvo8V7ZlYpjevvUIIZILVJwZDSamoypJeS1Ry4kMoH5ugw%2FlmYdGlMJEbqV%2FeRDP91cc99BQfHPu8tlT7OkzCHkPDTBjqYAff%2BeVF%2BcZj9OS4QFX6Gu8790lp57y94wb98qk9zURKb9RPYidApPBE5UPdud9sbLP7bjmANlwmr5GCAsXe4iVtLYS8cJmkUxWSVPFdroHoLAfeWBN4m6lYFantN6Da6K7%2FF2NeqHtQ%2FkONTtYAAJLOef0%2FBrQreHwpRW3ZmvAkz%2F2rJlCGm7%2B66FMWUh7Wm8djA1udceigJ&X-Amz-SignedHeaders=host&X-Amz-Signature=882dda86f807391b50dc4e5da2c1ef3e4074f8938569b7cf62280923cad9c5a2" className="social-btn" download>
            <FileText size={20} />
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};
