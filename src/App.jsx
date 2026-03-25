import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Code2, 
  Database, 
  Cpu, 
  LineChart, 
  Briefcase, 
  GraduationCap, 
  ExternalLink,
  Bot,
  Phone,
  User
} from 'lucide-react';

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

    // Commands are typed slower to mimic a human, outputs are generated rapidly
    const speed = isCmd ? 50 : 15; 

    const typeInterval = setInterval(() => {
      if (charIndex <= currentTargetLine.length) {
        setCurrentLineText(currentTargetLine.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setDisplayedLines(prev => [...prev, lines[lineIndex]]);
        setCurrentLineText('');
        // Pause longer after a command to simulate "pressing enter" and processing
        setTimeout(() => setLineIndex(prev => prev + 1), isCmd ? 400 : 150); 
      }
    }, speed);

    return () => clearInterval(typeInterval);
  }, [lineIndex]);

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)] bg-[#0A0A0B] border border-slate-800/80">
      {/* Mac-style Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#121214] border-b border-slate-800/80">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-[#ff5f56] rounded-full border border-[#e0443e]"></div>
          <div className="w-3 h-3 bg-[#ffbd2e] rounded-full border border-[#dea123]"></div>
          <div className="w-3 h-3 bg-[#27c93f] rounded-full border border-[#1aab29]"></div>
        </div>
        <div className="text-slate-500 text-xs font-mono tracking-wider flex items-center gap-2">
          <Terminal size={12} className="text-slate-500" /> guest@kaunain-portfolio:~
        </div>
        <div className="w-12"></div> {/* Spacer to perfectly center the title */}
      </div>

      {/* Terminal Body */}
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

        {/* Current typing line */}
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

        {/* Final blinking cursor when done */}
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
    <div className="flex flex-wrap gap-2 mb-6">
      {tech.map((t, i) => (
        <span key={i} className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
          {t}
        </span>
      ))}
    </div>
    {link ? (
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700 font-medium"
      >
        <Github size={18} />
        View Repository
      </a>
    ) : (
      <div className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20 font-medium">
        <Bot size={18} />
        In Active Development
      </div>
    )}
  </div>
);

// --- MAIN APP ---

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Mohd Kaunain.
            </span>
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-400">
              <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
              <a href="#experience" className="hover:text-emerald-400 transition-colors">Experience</a>
              <a href="#projects" className="hover:text-emerald-400 transition-colors">Builds & Projects</a>
              <a href="#skills" className="hover:text-emerald-400 transition-colors">Skills</a>
              <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
            </div>
            <div className="flex space-x-4">
              <a href="https://github.com/KAYHANH" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/mohd-kaunain-51240b187" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:mdkaunain2957@gmail.com" className="text-slate-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-32">
        
        {/* HERO SECTION */}
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center">
          <TypewriterTerminal />
          <div className="mt-12 max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-100 tracking-tight">
              Hi, I'm <span className="text-emerald-400">Mohd Kaunain</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-300">
              Building Intelligent Systems
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              AI-Focused Data Science Student bridging the gap between raw data, machine learning models, and real-world automation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a href="#projects" className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-lg transition-colors flex items-center gap-2">
                <Code2 size={18} /> View My Work
              </a>
              <a href="#contact" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold rounded-lg transition-colors border border-slate-700 flex items-center gap-2">
                <Mail size={18} /> Contact Me
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="scroll-mt-24">
          <SectionHeading icon={User} title="About Me" />
          <div className="bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-2xl text-slate-300 leading-relaxed space-y-6 text-lg shadow-xl">
            <p>
              I am an AI-focused Computer Science (Data Science) student with hands-on experience in machine learning, data analytics, and real-world AI applications through multiple internships and independent product builds.
            </p>
            <p>
              Skilled in <strong className="text-emerald-400 font-medium">Python, SQL, predictive modeling, and data-driven problem solving</strong>, I have strong exposure to modern AI workflows and automation systems. I am passionate about building scalable technology solutions that solve practical business problems while continuously expanding my expertise in artificial intelligence and software development.
            </p>
          </div>
        </section>

        {/* CURRENT BUILDS SECTION */}
        <section id="builds" className="scroll-mt-24">
          <SectionHeading icon={Bot} title="Current Product Builds (In Progress)" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProjectCard 
              title="Shipping MeetBot"
              description="SaaS platform automating end-to-end meeting scheduling. Handles email invitations, Google Calendar event creation, Meet link generation, and optional voice-call reminders to reduce manual effort."
              tech={["Node.js", "API Integration", "Email Automation", "Cloud Services"]}
              isLive={true}
            />
            <ProjectCard 
              title="AI Business OS"
              description="Multi-Agent Strategy Dashboard. Coordinates autonomous agents to execute business workflows, providing strategy management, task automation, and intelligent operations insights."
              tech={["Node.js", "React", "Anthropic API", "WebSockets"]}
              isLive={true}
            />
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="scroll-mt-24">
          <SectionHeading icon={Briefcase} title="Experience" />
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
            
            {/* Experience 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 text-emerald-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                <Database size={18} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-lg text-slate-100">Data Science & Analytics Intern</h3>
                </div>
                <div className="text-emerald-400 text-sm mb-4 font-medium">SURE Trust (AICTE) • May 2025 - Oct 2025</div>
                <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside">
                  <li>Performed extensive data cleaning, preprocessing, and feature engineering.</li>
                  <li>Assisted in training and evaluating machine learning models.</li>
                  <li>Documented results and extracted actionable analytical insights.</li>
                </ul>
              </div>
            </div>

            {/* Experience 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 text-emerald-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                <LineChart size={18} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-lg text-slate-100">AI & Green Skills Intern</h3>
                </div>
                <div className="text-emerald-400 text-sm mb-4 font-medium">Shell | Edunet Skills4Future • Apr 2025 - May 2025</div>
                <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside">
                  <li>Designed AI-based sustainability solutions.</li>
                  <li>Applied predictive modeling techniques to environmental datasets.</li>
                  <li>Utilized Python and Power BI for deep-dive analysis.</li>
                </ul>
              </div>
            </div>

            {/* Experience 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 text-emerald-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                <LineChart size={18} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-lg text-slate-100">Data Analyst Intern</h3>
                </div>
                <div className="text-emerald-400 text-sm mb-4 font-medium">Elevate Labs • Mar 2025 - Apr 2025</div>
                <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside">
                  <li>Extracted and analyzed datasets using robust SQL queries and Python.</li>
                  <li>Automated repetitive data cleaning workflows to increase efficiency.</li>
                  <li>Built interactive dashboards for continuous KPI monitoring.</li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="scroll-mt-24">
          <SectionHeading icon={Code2} title="Selected Projects" />
          {/* Using CSS Grid prevents overlapping by strictly defining columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard 
              title="Student Performance Prediction"
              description="Developed multi-class machine learning models on large datasets to predict academic performance and identify behavioral patterns for early intervention."
              tech={["Python", "Machine Learning", "Data Analysis"]}
              link="https://github.com/KAYHANH/student-performance-prediction"
            />
             <ProjectCard 
              title="Face Recognition System"
              description="Built a real-time facial recognition system capable of identifying individuals with high accuracy and automatically logging attendance seamlessly."
              tech={["OpenCV", "Python", "Computer Vision"]}
              link="https://github.com/KAYHANH/FACE-RECOGNITION-SYSTE"
            />
             <ProjectCard 
              title="Plant Disease Detection"
              description="Designed a CNN-based deep learning model to accurately classify plant diseases from leaf images using image preprocessing and data augmentation."
              tech={["Deep Learning", "CNN", "Image Processing"]}
              link="https://github.com/KAYHANH/PLANT-DISEASE-FINAL-PROJECT"
            />
            <ProjectCard 
              title="Claims Prediction"
              description="Developed an ML model to predict high-risk workers' compensation claims, enabling proactive intervention strategies and data-driven support."
              tech={["Predictive Modeling", "Python", "Data Science"]}
              link="https://github.com/KAYHANH/Client-Compensation-Project"
            />
            <ProjectCard 
              title="Margo Dates Direct"
              description="Created a commercial business website for a wholesale and retail dates business featuring a dynamic product catalog and business-oriented interface."
              tech={["Web Development", "UI/UX", "Frontend"]}
              link="https://github.com/KAYHANH/margo-dates-direct-60"
            />
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="scroll-mt-24">
          <SectionHeading icon={Cpu} title="Core Technical Skills" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-900 border border-slate-800 p-8 rounded-2xl">
            <div>
              <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <Code2 size={18} /> Languages & Frameworks
              </h3>
              <div className="flex flex-wrap gap-3">
                <SkillBadge>Python</SkillBadge>
                <SkillBadge>SQL</SkillBadge>
                <SkillBadge>Node.js</SkillBadge>
                <SkillBadge>React</SkillBadge>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <Cpu size={18} /> Machine Learning
              </h3>
              <div className="flex flex-wrap gap-3">
                <SkillBadge>Logistic Regression</SkillBadge>
                <SkillBadge>Random Forest</SkillBadge>
                <SkillBadge>Gradient Boosting</SkillBadge>
                <SkillBadge>XGBoost</SkillBadge>
                <SkillBadge>CNN (Deep Learning)</SkillBadge>
                <SkillBadge>Computer Vision</SkillBadge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <Database size={18} /> Data Analysis
              </h3>
              <div className="flex flex-wrap gap-3">
                <SkillBadge>Pandas</SkillBadge>
                <SkillBadge>NumPy</SkillBadge>
                <SkillBadge>EDA</SkillBadge>
                <SkillBadge>Feature Engineering</SkillBadge>
                <SkillBadge>Predictive Analytics</SkillBadge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <Terminal size={18} /> Developer Tools
              </h3>
              <div className="flex flex-wrap gap-3">
                <SkillBadge>Power BI</SkillBadge>
                <SkillBadge>Excel</SkillBadge>
                <SkillBadge>Git</SkillBadge>
                <SkillBadge>VS Code</SkillBadge>
                <SkillBadge>Jupyter Notebook</SkillBadge>
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="scroll-mt-24">
          <SectionHeading icon={GraduationCap} title="Education" />
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-100">Bachelor of Technology</h3>
              <p className="text-slate-400 mt-1">Computer Science & Engineering (Data Science)</p>
              <p className="text-emerald-400 font-medium mt-2">Amity University, Noida</p>
            </div>
            <div className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 font-mono text-sm">
              2022 — 2026
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="scroll-mt-24">
          <SectionHeading icon={Mail} title="Get In Touch" />
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-center justify-center">
            <a 
              href="mailto:mdkaunain2957@gmail.com" 
              className="flex items-center gap-4 text-base md:text-lg text-slate-300 hover:text-emerald-400 transition-all hover:-translate-y-1 p-5 bg-slate-800/50 rounded-xl border border-slate-700 w-full md:w-auto justify-center shadow-lg"
            >
              <Mail size={24} className="text-emerald-400" />
              mdkaunain2957@gmail.com
            </a>
            <a 
              href="tel:+919717826965" 
              className="flex items-center gap-4 text-base md:text-lg text-slate-300 hover:text-emerald-400 transition-all hover:-translate-y-1 p-5 bg-slate-800/50 rounded-xl border border-slate-700 w-full md:w-auto justify-center shadow-lg"
            >
              <Phone size={24} className="text-emerald-400" />
              +91 9717826965
            </a>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950/50 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-slate-500 text-sm">
          <p className="mb-4 text-center max-w-md">
            Continuously expanding expertise in artificial intelligence and scalable software development.
          </p>
          <div className="flex space-x-6 mb-4">
            <a href="https://github.com/KAYHANH" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/mohd-kaunain-51240b187" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">LinkedIn</a>
            <a href="mailto:mdkaunain2957@gmail.com" className="hover:text-emerald-400 transition-colors">Email</a>
          </div>
          <p>© {new Date().getFullYear()} Mohd Kaunain. Built with React & Tailwind.</p>
        </div>
      </footer>
    </div>
  );
}