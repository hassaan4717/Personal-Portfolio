import { useEffect, useMemo, useState } from 'react';
import photoImg from '../images/Photo.png'; 
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BrainCircuit,
  Camera,
  ChevronRight,
  CircleDashed,
  ExternalLink,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Menu,
  Orbit,
  Sparkles,
  Star,
  X,
  Award,
  Briefcase,
  GanttChartSquare,
  Layers3,
  Rocket,
  Clock3,
  Microscope,
  Activity,
  Check,
  Link,
} from 'lucide-react';
import { projects, projectFilters } from './data/projects';
import { experience } from './data/experience';
import { achievements } from './data/achievements';
import { skillGroups, researchIdentity } from './data/skills';
import { researchCards, researchTrajectory } from './data/research';

const motionConfig = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const sections = [
  { id: 'about', label: 'About' },
  { id: 'research', label: 'Research' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => {
      const match = project.category === activeFilter || project.categories.includes(activeFilter);
      if (match) return true;
      if (activeFilter === 'Computer Vision') return project.categories.includes('Computer Vision');
      if (activeFilter === 'Video Understanding') return project.categories.includes('Video Understanding');
      if (activeFilter === 'Multimodal AI') return project.categories.includes('Multimodal AI');
      if (activeFilter === 'Representation Learning') return project.categories.includes('Representation Learning');
      if (activeFilter === 'Generative AI') return project.categories.includes('Generative AI');
      if (activeFilter === 'Scientific ML') return project.categories.includes('Scientific Machine Learning');
      if (activeFilter === 'Knowledge / RAG') return project.categories.some((tag) => tag.includes('RAG') || tag.includes('Knowledge'));
      if (activeFilter === 'AI Systems') return project.categories.some((tag) => tag.includes('LLM') || tag.includes('Agent') || tag.includes('AI'));
      if (activeFilter === 'Software Engineering') return project.category === 'Software Engineering' || project.categories.includes('Software Engineering');
      if (activeFilter === 'Compiler Construction') return project.categories.includes('Compiler Construction') || project.category === 'Compiler Construction';
      return false;
    });
  }, [activeFilter]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-bg text-slate-100 antialiased selection:bg-accent/30">
      <div className="pointer-events-none fixed inset-0 opacity-[0.16] bg-[radial-gradient(circle_at_top_left,_rgba(120,169,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(68,184,255,0.16),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 bg-grid bg-[size:54px_54px] opacity-[0.09]" />

      <header className={`sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl transition-all ${scrolled ? 'bg-slate-950/80' : 'bg-transparent'}`}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 text-left" aria-label="Go to top">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 font-mono text-sm font-semibold text-accent">HM</div>
            <div>
              <div className="text-sm font-medium tracking-[0.16em] text-slate-200 uppercase">Muhammad Hassaan</div>
              <div className="text-[10px] tracking-[0.28em] text-slate-400 uppercase">Masood</div>
            </div>
          </button>

          <div className="hidden items-center gap-7 lg:flex">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-sm text-slate-300 transition hover:text-white"
              >
                {section.label}
              </button>
            ))}
            <div className="flex items-center gap-3 pl-4 text-slate-300">
              <a href="https://github.com/hassaan4717" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-2 hover:border-accent/60 hover:text-white" aria-label="GitHub">
                <Github size={16} />
              </a>
              <a href="https://www.linkedin.com/in/muhammad-hassaan-masood-3b6004223/" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-2 hover:border-accent/60 hover:text-white" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="https://orcid.org/0009-0002-2887-1206" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-2 hover:border-accent/60 hover:text-white" aria-label="ORCID">
                <Orbit size={16} />
              </a>
            </div>
          </div>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 lg:hidden"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/10 bg-slate-950/95 lg:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-sm text-slate-200">
                {sections.map((section) => (
                  <button key={section.id} onClick={() => scrollToSection(section.id)} className="text-left hover:text-white">
                    {section.label}
                  </button>
                ))}
                <div className="mt-4 flex items-center gap-3">
                  <a href="https://github.com/hassaan4717" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">GitHub</a>
                  <a href="https://www.linkedin.com/in/muhammad-hassaan-masood-3b6004223/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">LinkedIn</a>
                  <a href="https://orcid.org/0009-0002-2887-1206" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">ORCID</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.7 }} className="relative z-10">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5 text-[10px] font-medium tracking-[0.24em] text-accent uppercase">
                <CircleDashed size={12} /> 01 / Research Identity
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-5xl lg:text-7xl">
                Muhammad Hassaan<br className="hidden sm:block" /> Masood
              </h1>

              <div className="mt-6 space-y-3 text-slate-300">
                <p className="text-lg font-medium tracking-[0.16em] text-slate-200 uppercase sm:text-xl">Computer Science Graduate</p>
                <p className="text-lg font-medium tracking-[0.14em] text-accent uppercase sm:text-xl">Machine Learning & Computer Vision</p>
                <p className="text-lg font-medium tracking-[0.12em] text-slate-300 uppercase sm:text-xl">Video Understanding & Multimodal AI</p>
              </div>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                I build and study intelligent systems that learn from visual, temporal, multimodal, scientific, and knowledge-rich data.
              </p>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
                My primary research interests lie in computer vision, video understanding, temporal modeling, multimodal learning, and visual representation learning. My work spans real-world video surveillance, multi-object tracking, person re-identification, vision-language models, self-supervised learning, generative vision, and scientific machine learning, with additional exploration of RAG, GraphRAG, and agentic AI systems.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button onClick={() => scrollToSection('research')} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200">
                  Explore My Research <ArrowRight size={16} />
                </button>
                <a href="https://github.com/hassaan4717" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-accent/60 hover:text-accent">
                  <Github size={16} /> View GitHub
                </a>
                <a href="https://www.linkedin.com/in/muhammad-hassaan-masood-3b6004223/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-accent/60 hover:text-accent">
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a href="https://orcid.org/0009-0002-2887-1206" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-accent/60 hover:text-accent">
                  <Orbit size={16} /> ORCID
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-4 shadow-soft backdrop-blur-sm sm:p-5">
                <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(120,169,255,0.2),_rgba(15,23,42,0.88)_46%,_rgba(2,6,20,1)_100%)] p-4">
                  <div className="mb-4 flex items-center justify-between text-[10px] tracking-[0.2em] text-slate-400 uppercase">
                    <span>Research Identity</span>
                    <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> Active</span>
                  </div>

                  <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-slate-950/40 p-4">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:28px_28px]" />
                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-2 shadow-soft">
                        <img
                          src={photoImg}
                          alt="Muhammad Hassaan Masood"
                          className="h-56 w-52 rounded-xl object-cover object-top sm:h-64 sm:w-56"
                        />
                      </div>

                      <div className="w-full rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-center">
                        <div className="text-[10px] tracking-[0.22em] text-slate-400 uppercase">Muhammad Hassaan Masood</div>
                        <div className="mt-2 text-lg font-semibold text-white">Computer Science Graduate</div>
                        <div className="mt-2 text-[11px] tracking-[0.16em] text-accent uppercase">ML • CV • Video Understanding</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              ['Computer Science', 'Air University'],
              ['Research Focus', 'Machine Learning & Computer Vision'],
              ['Core Domain', 'Video Understanding'],
              ['Research Mode', 'Research Assistant'],
              ['Projects', '9+'],
            ].map(([title, value]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-sm">
                <p className="text-[10px] tracking-[0.2em] text-slate-500 uppercase">{title}</p>
                <p className="mt-3 text-base font-medium text-slate-100">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...motionConfig} className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] tracking-[0.24em] text-slate-300 uppercase">
            <Star size={12} /> 02 / About
          </motion.div>
          <motion.div {...motionConfig} className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">About Me</h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-slate-300">
              <p>
                Muhammad Hassaan Masood is a Computer Science graduate from Air University, Islamabad, Pakistan. His work is centered around machine learning and computer vision, especially video understanding, temporal modeling, multimodal learning, object detection, multi-object tracking, and person re-identification.
              </p>
              <p>
                His broader interests include self-supervised learning, generative computer vision, scientific machine learning, astronomy and AI, knowledge graphs, RAG, GraphRAG, and agentic AI. These areas complement a core identity in visual intelligence and real-world machine learning systems.
              </p>
            </div>
          </motion.div>
        </section>

        <section id="research" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...motionConfig} className="mb-12">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] tracking-[0.24em] text-slate-300 uppercase">
              <BrainCircuit size={12} /> 03 / Research Focus
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">Research Focus</h2>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-3">
            {researchCards.map((group, index) => (
              <motion.div key={group.label} {...motionConfig} transition={{ delay: index * 0.08 }} className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
                <div className="mb-5 text-[10px] font-medium tracking-[0.24em] text-slate-400 uppercase">{group.label}</div>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-3 py-2.5 text-sm text-slate-200">
                      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...motionConfig} className="rounded-[32px] border border-white/10 bg-slate-900/60 p-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] tracking-[0.24em] text-slate-400 uppercase">Research Identity</div>
                <h3 className="mt-3 text-2xl font-semibold text-white">Research Trajectory</h3>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {researchTrajectory.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="rounded-full border border-accent/20 bg-accent/5 px-3 py-2 text-xs font-medium tracking-[0.12em] text-slate-200 uppercase">{step}</div>
                  {i < researchTrajectory.length - 1 && <ChevronRight className="text-slate-500" size={16} />}
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...motionConfig} className="mb-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] tracking-[0.24em] text-slate-300 uppercase">
              <Briefcase size={12} /> 04 / Research Experience
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">Research Experience</h2>
          </motion.div>

          <div className="space-y-8">
            {experience
              .filter((item) => item.role === 'Research Assistant')
              .map((item, index) => (
                <motion.div key={item.role} {...motionConfig} transition={{ delay: index * 0.08 }} className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 lg:p-8">
                  <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                    <div>
                      <div className="text-[10px] tracking-[0.2em] text-accent uppercase">{item.date}</div>
                      <h3 className="mt-3 text-2xl font-semibold text-white">{item.role}</h3>
                      <p className="mt-2 text-base text-slate-300">{item.company}</p>
                      <p className="mt-1 text-sm text-slate-400">{item.location}</p>
                    </div>
                    <div className="space-y-5 text-slate-300">
                      <p>{item.description}</p>
                      <div className="grid gap-3 text-sm text-slate-200 md:grid-cols-2">
                        {['video surveillance', 'multi-object detection', 'multi-object tracking', 'temporal action recognition', 'video representation learning', 'X3D', 'temporal clip buffering', 'multi-camera person re-identification', 'parameter-efficient adaptation', 'literature review', 'experimental evaluation'].map((topic) => (
                          <div key={topic} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-2">
                            <Check size={14} className="text-accent" />
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...motionConfig} className="mb-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] tracking-[0.24em] text-slate-300 uppercase">
              <Microscope size={12} /> 05 / Research Output
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">Research Output</h2>
          </motion.div>

          <motion.div {...motionConfig} className="rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,rgba(120,169,255,0.08),rgba(15,23,42,0.7))] p-6 lg:p-8">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-[10px] tracking-[0.22em] text-slate-300 uppercase">
              <span className="rounded-full border border-white/10 px-2.5 py-1">Video Understanding</span>
              <span className="rounded-full border border-white/10 px-2.5 py-1">X3D-S</span>
              <span className="rounded-full border border-white/10 px-2.5 py-1">Retail CCTV</span>
            </div>
            <h3 className="text-3xl font-semibold tracking-[-0.05em] text-white">Why Kinetics-Pretrained 3D CNNs Fail on Overhead CCTV Footage <span className="text-base font-medium tracking-[0.18em] text-slate-400 uppercase">(In Progress)</span></h3>
            <p className="mt-3 text-lg text-slate-300">An Empirical Study of Domain Gap, Data Constraints, and Input Preprocessing in Retail Theft Detection</p>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="space-y-5 text-slate-300">
                <p>
                  This research investigates transfer from conventional video datasets to real-world overhead CCTV footage, focusing on domain shift, temporal sampling, preprocessing, augmentation, person cropping, and fine-tuning depth under constrained retail data conditions.
                </p>
                <p>
                  The work emphasizes deployment-time consistency and how real-world video features differ from standard benchmark conditions, particularly under overhead viewpoints and limited labeled data settings.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                <div className="mb-4 text-[10px] tracking-[0.2em] text-slate-400 uppercase">Study Metadata</div>
                <div className="space-y-4 text-sm text-slate-200">
                  <div className="flex justify-between gap-4 border-b border-white/10 pb-2"><span>Research Area</span><span className="text-white">Video Understanding</span></div>
                  <div className="flex justify-between gap-4 border-b border-white/10 pb-2"><span>Model</span><span className="text-white">X3D-S</span></div>
                  <div className="flex justify-between gap-4 border-b border-white/10 pb-2"><span>Domain</span><span className="text-white">Retail CCTV</span></div>
                  <div className="flex justify-between gap-4"><span>Research Problem</span><span className="text-white">Domain Transfer</span></div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...motionConfig} className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] tracking-[0.24em] text-slate-300 uppercase">
                <GanttChartSquare size={12} /> 06 / Project Portfolio
              </div>
              <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">Featured Projects</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-3 py-2 text-xs font-medium tracking-[0.12em] uppercase transition ${
                    activeFilter === filter
                      ? 'border-accent/40 bg-accent/10 text-accent'
                      : 'border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-6 xl:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/70 p-5 shadow-soft transition ${project.featured ? 'xl:col-span-2' : ''}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-[10px] tracking-[0.2em] text-slate-400 uppercase">{project.number}</div>
                    <div className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] tracking-[0.18em] text-slate-300 uppercase">
                      {project.category}
                    </div>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.05em] text-white">{project.title}</h3>
                      <p className="mt-2 text-base text-slate-300">{project.subtitle}</p>

                      <p className="mt-4 text-sm leading-7 text-slate-400">{project.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <span key={tech} className="rounded-full border border-white/10 bg-slate-950/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-slate-300">{tech}</span>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <button onClick={() => setSelectedProject(project)} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-950 transition hover:bg-slate-200">
                          View Project <ArrowRight size={14} />
                        </button>
                        <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-slate-200 transition hover:border-accent/50 hover:text-white">
                          <Github size={14} /> GitHub
                        </a>
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(120,169,255,0.18),_rgba(15,23,42,0.8)_40%,_rgba(2,6,20,1)_100%)] p-4">
                      <div className="mb-3 text-[10px] tracking-[0.2em] text-slate-400 uppercase">Pipeline</div>
                      <div className="space-y-3">
                        {project.timeline.split('→').map((step) => (
                          <div key={step} className="rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-[10px] tracking-[0.14em] text-slate-200 uppercase">{step.trim()}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[28px] border border-white/10 bg-slate-950 p-6 shadow-soft"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] tracking-[0.22em] text-accent uppercase">{selectedProject.number}</div>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{selectedProject.title}</h3>
                    <p className="mt-2 text-slate-300">{selectedProject.subtitle}</p>
                  </div>
                  <button onClick={() => setSelectedProject(null)} className="rounded-full border border-white/10 p-2 text-slate-300 hover:text-white" aria-label="Close project details">
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(120,169,255,0.12),_rgba(15,23,42,0.9)_40%,_rgba(2,6,20,1)_100%)] p-4">
                    <div className="mb-3 text-[10px] tracking-[0.2em] text-slate-400 uppercase">{selectedProject.technicalQuestion ? 'Technical Question' : 'Research Question'}</div>
                    <p className="text-sm leading-7 text-slate-200">{selectedProject.technicalQuestion || selectedProject.researchQuestion}</p>
                    <div className="mt-6 space-y-3">
                      {(selectedProject.pipeline ? selectedProject.pipeline.split('→') : selectedProject.timeline.split('→')).map((line) => (
                        <div key={line} className="rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-slate-200">{line.trim()}</div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-5 text-sm leading-7 text-slate-300">
                    <div>
                      <div className="mb-2 text-[10px] tracking-[0.2em] text-slate-400 uppercase">Overview</div>
                      <p>{selectedProject.overview || selectedProject.description}</p>
                    </div>
                    {selectedProject.keyComponents && (
                      <div>
                        <div className="mb-2 text-[10px] tracking-[0.2em] text-slate-400 uppercase">Key Components</div>
                        <ul className="space-y-2">
                          {selectedProject.keyComponents.map((point) => (
                            <li key={point} className="flex items-start gap-2"><Check size={14} className="mt-1 text-accent" />{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {!selectedProject.keyComponents && (
                      <div>
                        <div className="mb-2 text-[10px] tracking-[0.2em] text-slate-400 uppercase">Methodology</div>
                        <ul className="space-y-2">
                          {selectedProject.highlights.map((point) => (
                            <li key={point} className="flex items-start gap-2"><Check size={14} className="mt-1 text-accent" />{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {selectedProject.supportedLanguageFeatures && (
                      <div>
                        <div className="mb-2 text-[10px] tracking-[0.2em] text-slate-400 uppercase">Supported Language Features</div>
                        <p>{selectedProject.supportedLanguageFeatures}</p>
                      </div>
                    )}
                    {selectedProject.optimization && (
                      <div>
                        <div className="mb-2 text-[10px] tracking-[0.2em] text-slate-400 uppercase">Optimization</div>
                        <p>{selectedProject.optimization.join(', ')}</p>
                      </div>
                    )}
                    {selectedProject.testing && (
                      <div>
                        <div className="mb-2 text-[10px] tracking-[0.2em] text-slate-400 uppercase">Testing</div>
                        <p>{selectedProject.testing}</p>
                      </div>
                    )}
                    <div>
                      <div className="mb-2 text-[10px] tracking-[0.2em] text-slate-400 uppercase">Technologies</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <span key={tech} className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-slate-200">{tech}</span>
                        ))}
                      </div>
                    </div>
                    {selectedProject.completion && (
                      <div>
                        <div className="mb-2 text-[10px] tracking-[0.2em] text-slate-400 uppercase">Completion</div>
                        <p>{selectedProject.completion}</p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-3">
                      <a href={selectedProject.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-950">GitHub <ExternalLink size={14} /></a>
                      <button onClick={() => setSelectedProject(null)} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-slate-200">Close</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <section id="achievements" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...motionConfig} className="mb-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] tracking-[0.24em] text-slate-300 uppercase">
              <Award size={12} /> 07 / Achievements
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">Achievements & Recognition</h2>
          </motion.div>

          <div className="grid gap-5 xl:grid-cols-2">
            {achievements.map((item, index) => (
              <motion.article key={item.title} {...motionConfig} transition={{ delay: index * 0.08 }} className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/60">
                <div className="border-b border-white/10 bg-slate-950/40 p-3">
                  <img src={item.image} alt={item.title} className="h-56 w-full rounded-2xl object-cover" />
                </div>
                <div className="p-6">
                  <div className="mb-3 text-[10px] tracking-[0.22em] text-accent uppercase">{item.meta}</div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-400">{item.detail}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a href={item.image} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-900">View certificate</a>
                    {item.pdf && (
                      <a href={item.pdf} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-slate-200">Download PDF</a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...motionConfig} className="mb-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] tracking-[0.24em] text-slate-300 uppercase">
              <Orbit size={12} /> 08 / Astronomy & Scientific ML
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">From Observing the Sky to Scientific Machine Learning</h2>
          </motion.div>

          <motion.div {...motionConfig} className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5 text-base leading-8 text-slate-300">
              <p>
                Between approximately April 2023 and mid-2024, I manually recorded a long-term observational dataset of Venus’s apparent position. The work involved roughly 18 months of observations, altitude measurements, angular and longitude observations, data organization, cleaning, handling missing and inconsistent readings, visualization, and the identification of apparent retrograde motion.
              </p>
              <p>
                The model was used to describe and analyze Venus’s apparent motion, including the July–September 2023 retrograde interval. This project sits at the intersection of astronomy, observation, data analysis, mathematical modeling, and scientific AI.
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-slate-900/60 p-6">
              <div className="mb-5 text-[10px] tracking-[0.22em] text-slate-400 uppercase">Model Equations</div>
              <div className="space-y-4 font-mono text-sm text-slate-100">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 leading-7">
                  <div>Longitude:</div>
                  <div>deg(t) = 197.4 − 65.5 cos[2π(t − 130) / 584]</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 leading-7">
                  <div>Altitude:</div>
                  <div>alt(t) = 15.0 + 10.0 sin[2π(t − 50) / 365]</div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="experience" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...motionConfig} className="mb-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] tracking-[0.24em] text-slate-300 uppercase">
              <Clock3 size={12} /> 09 / Experience Timeline
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">Experience</h2>
          </motion.div>

          <div className="space-y-8">
            {experience.map((item, index) => (
              <motion.div key={item.company + item.role} {...motionConfig} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-full before:w-px before:bg-white/10">
                <div className="absolute left-[-5px] top-1 h-3 w-3 rounded-full border border-accent/40 bg-accent/30" />
                <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
                  <p className="text-[10px] tracking-[0.2em] text-slate-400 uppercase">{item.date}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{item.role}</h3>
                  <p className="mt-1 text-base text-slate-300">{item.company}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </section>

        <section id="skills" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...motionConfig} className="mb-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] tracking-[0.24em] text-slate-300 uppercase">
              <Layers3 size={12} /> 10 / Skills
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">Skills</h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group, index) => (
              <motion.div key={group.title} {...motionConfig} transition={{ delay: index * 0.06 }} className="rounded-[28px] border border-white/10 bg-slate-900/60 p-6">
                <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-2 text-[11px] tracking-[0.1em] text-slate-200 uppercase">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...motionConfig} className="mb-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] tracking-[0.24em] text-slate-300 uppercase">
              <Activity size={12} /> 11 / How I Work
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">How I Work</h2>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-5">
            {[
              ['Start with the problem', 'Define the research question before selecting the architecture.'],
              ['Build reproducible experiments', 'Dataset preparation, preprocessing, configuration, and controlled evaluation matter.'],
              ['Analyze failure, not only accuracy', 'Domain shift, background bias, and deployment conditions can matter as much as metrics.'],
              ['Connect theory with systems', 'I am interested in models that work in real environments.'],
              ['Make research understandable', 'Clear documentation and transparent methodology are essential.'],
            ].map(([title, text], index) => (
              <motion.div key={title} {...motionConfig} transition={{ delay: index * 0.06 }} className="rounded-[26px] border border-white/10 bg-slate-900/60 p-5">
                <div className="text-[10px] tracking-[0.24em] text-accent uppercase">0{index + 1}</div>
                <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div {...motionConfig} className="rounded-[32px] border border-accent/20 bg-[radial-gradient(circle_at_top,_rgba(120,169,255,0.14),rgba(15,23,42,0.9)_48%,rgba(2,6,20,1)_100%)] p-8 text-center lg:p-12">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] tracking-[0.24em] text-slate-200 uppercase">
              <Rocket size={12} /> Contact
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">Let’s Build and Understand Intelligent Systems</h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-300">
              I am interested in research collaborations, graduate research opportunities, and technically meaningful work in machine learning, computer vision, video understanding, temporal modeling, and multimodal AI.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="https://github.com/hassaan4717" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-900">GitHub</a>
              <a href="https://www.linkedin.com/in/muhammad-hassaan-masood-3b6004223/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white">LinkedIn</a>
              <a href="https://orcid.org/0009-0002-2887-1206" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white">ORCID</a>
            </div>

            <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
              <a href="mailto:hassaan.masood047@gmail.com" className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 hover:border-accent/40">
                <div className="text-[10px] tracking-[0.2em] text-slate-400 uppercase">Email</div>
                <div className="mt-2 text-base text-white">hassaan.masood047@gmail.com</div>
              </a>
              <a href="tel:+923700727291" className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 hover:border-accent/40">
                <div className="text-[10px] tracking-[0.2em] text-slate-400 uppercase">Phone</div>
                <div className="mt-2 text-base text-white">+92 370 0727291</div>
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="text-lg font-medium text-white">Muhammad Hassaan Masood</div>
            <div className="mt-1 text-sm text-slate-400">Computer Science · Machine Learning · Computer Vision · Video Understanding</div>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <a href="https://github.com/hassaan4717" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/muhammad-hassaan-masood-3b6004223/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://orcid.org/0009-0002-2887-1206" target="_blank" rel="noreferrer">ORCID</a>
          </div>
          <div className="text-sm text-slate-500">© {new Date().getFullYear()} Muhammad Hassaan Masood</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
