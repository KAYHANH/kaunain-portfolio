import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Terminal, 
  Code2, 
  Database, 
  Cpu, 
  LineChart, 
  Briefcase, 
  GraduationCap, 
  Bot,
  Phone,
  User
} from 'lucide-react';

// --- CUSTOM BRAND ICONS (Since Lucide removed them) ---
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

// --- COMPONENTS ---

const TypewriterTerminal = () => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineText, setCurrentLineText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);

  const lines = [
    { text: "system.initialize()", isCommand: true },
    { text: "✔ Loading Machine Learning modules...", isCommand: false, color: "text-slate-400" },
    { text: "✔ Configuring Data Science toolkits...", isCommand: false, color: "text-slate-400" },
    { text: "✔ Artificial Intelligence systems online.", isCommand: false, color: "text-emerald-400" },
    { text: "whoami", isCommand: true },
    { text: "Mohd Kaunain", isCommand: false, color: "text-cyan-400 font-bold text-xl mt-2" },
    { text: "Role: AI-Focused Data Science Student", isCommand: false, color: "text-slate-300" },
    { text: "Status: Ready to build scalable solutions.", isCommand: false, color: "text-emerald-400/80 italic mb-2" }
  ];

  useEffect(() => {
    if (lineIndex >= lines.length) return;

    const currentTargetLine = lines[lineIndex].text;
    const isCmd = lines[lineIndex].isCommand;
    let charIndex = 0;

    const speed = isCmd ? 50 : 15; 

    const typeInterval = setInterval(() => {
      if (charIndex <= currentTargetLine.length) {
        setCurrentLineText(currentTargetLine.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setDisplayedLines(prev => [...prev, lines[lineIndex]]);
        setCurrentLineText('');
        setTimeout(() => setLineIndex(prev => prev + 1), isCmd ? 400 : 150); 
      }
    }, speed);

    return () => clearInterval(typeInterval);
  }, [lineIndex]);

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)] bg-[#0A0A0B] border border-slate-800/80">
      <div className="flex items-center justify-between px-4 py-3 bg-[#121214] border-b border-slate-800/80">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-[#ff5f56] rounded-full border border-[#e0443e]"></div>
          <div className="w-3 h-3 bg-[#ffbd2e] rounded-full border border-[#dea123]"></div>
          <div className="w-3 h-3 bg-[#27c93f] rounded-full border border-[#1aab29]"></div>
        </div>
        <div className="text-slate-500 text-xs font-mono tracking-wider flex items-center gap-2">
          <Terminal size={12} className="text-slate-500" /> guest@kaunain-portfolio:~
        </div>
        <div className="w-12"></div>
      </div>

      <div className="p-6 h-72 sm:h-64 font-mono text-sm sm:text-base text-left overflow-y-auto leading-relaxed">
        {displayedLines.map((line, i) => (
          <div key={i} className={`mb-1 ${line.color || ''}`}>
            {line.isCommand ? (
              <span>
                <span className="text-emerald-500 font-bold">➜</span> <span className="text-cyan-500 font-bold">~</span> <span className="text-slate-200 ml-2">{line.text}</span>
              </span>
            ) : (
              <span>{line.text}</span>
            )}
          </div>
        ))}

        {lineIndex < lines.length && (
          <div className={`mb-1 ${lines[lineIndex].color || ''}`}>
            {lines[lineIndex].isCommand ? (
              <span>
                <span className="text-emerald-500 font-bold">➜</span> <span className="text-cyan-500 font-bold">~</span> <span className="text-slate-200 ml-2">{currentLineText}</span>
              </span>
            ) : (
              <span>{currentLineText}</span>
            )}
            <span className="inline-block w-2.5 h-5 bg-slate-400 ml-1 align-middle animate-pulse" />
          </div>
        )}

        {lineIndex >= lines.length && (
          <div className="mb-1 mt-2">
            <span className="text-emerald-500 font-bold">➜</span> <span className="text-cyan-500 font-bold">~</span>
            <span className="inline-block w-2.5 h-5 bg-slate-400 ml-2 align-middle animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};

const SectionHeading = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
    <div className="p-2 bg-emerald-500/10 rounded-lg">
      <Icon className="text-emerald-400" size={24} />
    </div>
    <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
  </div>
);

const SkillBadge = ({ children }) => (
  <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-full">
    {children}
  </span>
);

const ProjectCard = ({ title, description, tech, link, isLive }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col h-full hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1">
    <h3 className="text-xl font-semibold text-slate-100 mb-3 flex items-start justify-between">
      {title}
      {isLive && <span className="flex h-3 w-3 relative mt-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
      </span>}
    </h3>
    <p className="text-slate-400 text-sm mb-6 flex-grow">{description}</p>
    <div className="flex flex-wrap