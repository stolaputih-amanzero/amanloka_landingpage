import React, { useRef, useEffect, useState, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform, useInView, animate, AnimatePresence, useSpring } from 'motion/react';
import { X, Menu, Globe, Linkedin, Twitter, Github, ArrowUp, Download, FileText, Check } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import CustomCursor from './components/CustomCursor';
import EcosystemCard from './components/EcosystemCard';
import AnimatedSeparator from './components/AnimatedSeparator';
import { FAQSection } from './components/FAQSection';
import { Language, translations } from './i18n';
import amanLogo from './assets/aman_monogram.png';

const ImageGenerator = lazy(() => import('./components/ImageGenerator'));
const TestimonialsCarousel = lazy(() => import('./components/TestimonialsCarousel'));

const ComponentLoader = () => (
  <div className="w-full h-64 flex flex-col items-center justify-center gap-4">
    <div className="w-8 h-8 border-2 border-white/10 border-t-white/80 rounded-full animate-spin"></div>
    <span className="text-[10px] uppercase tracking-widest text-white/30 font-mono">Loading module</span>
  </div>
);

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerContainer = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={{
      visible: {
        transition: {
          delayChildren: delay,
          staggerChildren: 0.15,
        },
      },
      hidden: {},
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const AnimatedCounter = ({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (val) => {
          if (nodeRef.current) {
            nodeRef.current.textContent = prefix + Math.floor(val).toLocaleString() + suffix;
          }
        }
      });
      return controls.stop;
    }
  }, [value, isInView, prefix, suffix]);

  return <span ref={nodeRef} className="tabular-nums">{prefix}0{suffix}</span>;
};

const ecosystemProducts = [
  {
    title: "Governance OS",
    desc: "Digital operating system for organizational governance. Features vision-mission dashboards, role management, KPI monitoring, and SOP documentation.",
    specs: [
       { label: "Core Architecture", value: "Role-Based Access Control (RBAC) with hierarchical nodes." },
       { label: "KPI Tracking", value: "Real-time OKR and KPI visualization dashboards." },
       { label: "Documentation", value: "Version-controlled SOPs and policy management." },
       { label: "Integration", value: "RESTful API and Webhook support for external synchronization." }
    ]
  },
  {
    title: "Community Hub",
    desc: "Comprehensive platform for community collaboration. Includes robust forums, event management, crowdfunding capabilities, and knowledge bases.",
    specs: [
       { label: "Communication", value: "Threaded forums, direct messaging, and group broadcasts." },
       { label: "Events", value: "Ticketing, RSVP management, and virtual event links." },
       { label: "Funding", value: "Integrated payment gateways for transparent crowdfunding." },
       { label: "Knowledge", value: "Wiki-style documentation and resource sharing." }
    ]
  },
  {
    title: "Personal Productivity",
    desc: "Integrated task managers, habit trackers, and digital journaling. Seamlessly synchronizes with your calendar, email, and cloud storage.",
    specs: [
       { label: "Task Management", value: "Kanban boards, list views, and advanced filtering." },
       { label: "Habit Tracking", value: "Streak counters, visual heatmaps, and reminders." },
       { label: "Journaling", value: "Rich-text editor with mood tagging and media attachments." },
       { label: "Sync", value: "Bi-directional sync with Google Calendar, Outlook, and Apple Calendar." }
    ]
  },
  {
    title: "Data & Analytics Suite",
    desc: "Real-time data visualization providing AI-powered insights tailored for both large organizations and individual users.",
    specs: [
       { label: "Visualization", value: "Interactive charts, graphs, and geospatial mapping." },
       { label: "AI Insights", value: "Predictive analytics and automated trend detection." },
       { label: "Data Sources", value: "Connectors for SQL, NoSQL, APIs, and flat files." },
       { label: "Reporting", value: "Scheduled automated reports and exportable dashboards." }
    ]
  },
  {
    title: "Learning & Capacity",
    desc: "Advanced e-learning platform featuring training modules and verified digital certification for organization and community members.",
    specs: [
       { label: "Course Authoring", value: "Drag-and-drop course builder with multimedia support." },
       { label: "Assessments", value: "Quizzes, assignments, and peer-reviewed projects." },
       { label: "Certification", value: "Blockchain-verified digital certificates and badges." },
       { label: "Analytics", value: "Learner progress tracking and cohort performance metrics." }
    ]
  },
  {
    title: "Amanloka OS",
    desc: "A foundational operating system installable on any device. Provides a modular ecosystem of internal AMAN applications with a plug-in architecture.",
    specs: [
       { label: "Environment", value: "Cross-platform compatibility (Windows, macOS, Linux, Web)." },
       { label: "Modularity", value: "Plug-and-play architecture for seamless app extensions." },
       { label: "Security", value: "End-to-end encryption and zero-trust security model." },
       { label: "Offline Mode", value: "Robust local-first syncing for offline productivity." }
    ]
  }
];

export default function App() {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('amanloka_lang');
    return (saved === 'en' || saved === 'id') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('amanloka_lang', lang);
  }, [lang]);

  const t = translations[lang];
  const [selectedProduct, setSelectedProduct] = useState<typeof t.ecosystem.products[0] | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleDownloadReport = () => {
    setIsGeneratingReport(true);
    setTimeout(() => {
      setIsGeneratingReport(false);
      
      // Simulate PDF download
      const blob = new Blob(['Mock PDF Content - Amanloka Data & Analytics Suite'], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'amanloka_sample_report.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1500);
  };

  const [contactErrors, setContactErrors] = useState({ name: false, email: false, message: false });
  const [contactTouched, setContactTouched] = useState({ name: false, email: false, message: false });

  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  const validateContactField = (field: string, value: string) => {
    if (value.trim() === '') return true;
    if (field === 'email') {
      return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
    return false;
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
    if (contactTouched[name as keyof typeof contactTouched]) {
      setContactErrors(prev => ({ ...prev, [name]: validateContactField(name, value) }));
    }
  };

  const handleContactBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactTouched(prev => ({ ...prev, [name]: true }));
    setContactErrors(prev => ({ ...prev, [name]: validateContactField(name, value) }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = {
      name: validateContactField('name', contactForm.name),
      email: validateContactField('email', contactForm.email),
      message: validateContactField('message', contactForm.message)
    };
    
    setContactErrors(errors);
    setContactTouched({ name: true, email: true, message: true });

    if (Object.values(errors).some(error => error)) {
      return;
    }

    setIsContactSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsContactSubmitting(false);
      setIsContactSubmitted(true);
      
      // Auto close and reset after success
      setTimeout(() => {
        closeContactModal();
      }, 2000);
    }, 1500);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
    // Optional: reset form after animation
    setTimeout(() => {
      setContactForm({ name: '', email: '', message: '' });
      setContactErrors({ name: false, email: false, message: false });
      setContactTouched({ name: false, email: false, message: false });
      setIsContactSubmitted(false);
      setIsContactSubmitting(false);
    }, 500);
  };
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'id' : 'en';
    setLang(newLang);
    setToastMessage(newLang === 'en' ? 'Language set to English' : 'Bahasa diatur ke Indonesia');
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const [activeSection, setActiveSection] = useState('hero');
  const sectionsList = ['hero', 'vision', 'impact', 'ecosystem', 'intelligence', 'testimonials', 'faq', 'studio'];

  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [isDynamicContentLoading, setIsDynamicContentLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setShowScrollTop(latest > 500);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionsList.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsAppLoaded(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Simulate dynamic content loading (completes after initial app load)
    const timer = setTimeout(() => setIsDynamicContentLoading(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  const yBackground = useTransform(scrollY, [0, 1000], ["0%", "50%"]);
  const opacityBackground = useTransform(scrollY, [0, 800], [0.6, 0]);
  const yContent = useTransform(scrollY, [0, 800], ["0%", "30%"]);
  const yTitle = useTransform(scrollY, [0, 1000], ["0%", "-20%"]);
  
  const navBg = useTransform(scrollY, [0, 100], ["rgba(5, 5, 5, 0)", "rgba(5, 5, 5, 0.85)"]);
  const navBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(16px)"]);
  const navBorder = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.05)"]);

  return (
    <>
      <div className="noise-overlay pointer-events-none"></div>
      <AnimatePresence>
        {!isAppLoaded && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-brand-black flex items-center justify-center pointer-events-none"
          >
            <svg width="64" height="64" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
                d="M50 15 L20 85 M50 15 L80 85 M35 60 L65 60"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={isAppLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-white selection:text-black"
      >
      <CustomCursor />
      {/* Navigation */}
      <motion.nav 
        style={{
          backgroundColor: navBg,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
          borderColor: navBorder,
          borderBottomWidth: "1px"
        }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6 transition-all duration-300"
      >
        <div className="flex items-center gap-3">
           {/* Logo Monogram */}
           <div className="w-12 h-12 relative z-50">
             <img src={amanLogo} alt="AMAN Monogram" className="w-full h-full object-contain" />
           </div>
           <span className="font-heading font-bold tracking-widest text-lg text-white z-50">AMANLOKA</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-xs font-semibold tracking-widest uppercase text-brand-gray z-50">
          <a href="#vision" className="hover:text-brand-white transition-colors drop-shadow-md">{t.nav.vision}</a>
          <a href="#ecosystem" className="hover:text-brand-white transition-colors drop-shadow-md">{t.nav.ecosystem}</a>
          <a href="#intelligence" className="hover:text-brand-white transition-colors drop-shadow-md">{t.nav.intelligence}</a>
          <a href="#studio" className="hover:text-brand-white transition-colors drop-shadow-md">{t.nav.studio}</a>
          
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="hover:text-brand-white transition-colors drop-shadow-md focus:outline-none"
          >
            {t.nav.contact}
          </button>
          
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 hover:text-brand-white transition-colors ml-4 focus:outline-none"
          >
            <Globe className="w-4 h-4" />
            <span>{lang === 'en' ? 'ID' : 'EN'}</span>
          </button>
        </div>
        <div className="md:hidden flex items-center gap-4 z-50">
          <button 
            onClick={toggleLanguage}
            className="text-white focus:outline-none flex items-center gap-2 text-xs font-semibold tracking-widest uppercase"
          >
            <Globe className="w-4 h-4" />
            <span>{lang === 'en' ? 'ID' : 'EN'}</span>
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Scroll Progress Bar */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-white origin-left opacity-80"
          style={{ scaleX }}
        />
      </motion.nav>

      {/* Vertical Navigation Indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-5 hidden md:flex mix-blend-difference">
        {sectionsList.map((sectionId) => {
          const sectionNameMap: Record<string, string> = {
            hero: 'Home',
            vision: t.nav.vision,
            impact: 'Impact',
            ecosystem: t.nav.ecosystem,
            intelligence: t.nav.intelligence,
            testimonials: 'Testimonials',
            faq: 'FAQ',
            studio: t.nav.studio,
          };
          
          return (
            <button
              key={sectionId}
              onClick={() => {
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label={`Scroll to ${sectionId}`}
              className="group relative flex items-center justify-center p-2 focus:outline-none"
            >
              <span className="absolute right-full mr-4 px-2.5 py-1 bg-[#111] text-brand-white text-[10px] font-mono uppercase tracking-widest rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
                 {sectionNameMap[sectionId] || sectionId}
              </span>
              <div 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ease-out ${
                  activeSection === sectionId 
                    ? 'bg-brand-white scale-150 shadow-[0_0_10px_rgba(255,255,255,0.8)]' 
                    : 'bg-white/30 group-hover:bg-white/80 group-hover:scale-110'
                }`} 
              />
            </button>
          );
        })}
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { delay: 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-brand-black/95 backdrop-blur-2xl"
          >
            <div className="flex flex-col items-center w-full px-8 overflow-y-auto max-h-[80vh] py-8 scrollbar-hide">
              <div className="flex flex-col items-center gap-10 text-lg font-light tracking-widest uppercase text-brand-gray mb-12">
                <motion.a 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2, delay: 0.0 } }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  href="#vision" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-brand-white transition-colors"
                >
                  {t.nav.vision}
                </motion.a>
                <motion.a 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2, delay: 0.05 } }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  href="#ecosystem" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-brand-white transition-colors"
                >
                  {t.nav.ecosystem}
                </motion.a>
                <motion.a 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2, delay: 0.1 } }}
                  transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  href="#intelligence" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-brand-white transition-colors"
                >
                  {t.nav.intelligence}
                </motion.a>
                <motion.a 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2, delay: 0.15 } }}
                  transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  href="#studio" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-brand-white transition-colors"
                >
                  {t.nav.studio}
                </motion.a>
                <motion.button 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2, delay: 0.2 } }}
                  transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsContactModalOpen(true);
                  }}
                  className="hover:text-brand-white transition-colors focus:outline-none"
                >
                  {t.nav.contact}
                </motion.button>
              </div>

              {/* Quick Jump Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.2, delay: 0.25 } }}
                transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-xs pt-8 border-t border-white/10"
              >
                <p className="text-[10px] font-mono tracking-widest uppercase text-brand-gray/50 mb-6 text-center">Quick Jump</p>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-xs font-mono uppercase text-brand-gray/70">
                  <a href="#hero" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-white transition-colors text-right">{t.nav.hero}</a>
                  <a href="#impact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-white transition-colors text-left">{t.nav.impact}</a>
                  <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-white transition-colors text-right">{t.nav.testimonials}</a>
                  <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-white transition-colors text-left">{t.nav.faq}</a>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute bottom-12 opacity-50"
            >
              <img src={amanLogo} alt="AMAN Logo" className="w-20 h-20 mx-auto grayscale opacity-50" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start">
        {/* Parallax Video Background */}
        <motion.div 
          className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
          style={{ y: yBackground, opacity: opacityBackground }}
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-30 grayscale mix-blend-screen"
            poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
          >
            <source src="https://cdn.pixabay.com/video/2020/05/25/40140-424681313_large.mp4" type="video/mp4" />
          </video>
          {/* Subtle gradient overlay to blend video with background */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/50 to-brand-black" />
        </motion.div>
        
        <motion.div 
          className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center justify-center pt-20"
          style={{ y: yContent }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
             <img src={amanLogo} alt="AMAN Logo" className="w-48 md:w-64 mx-auto drop-shadow-2xl" />
          </motion.div>
          
          <motion.div style={{ y: yTitle }}>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-4xl md:text-6xl lg:text-[6rem] font-bold tracking-tighter leading-[1] mb-6 text-brand-white uppercase"
            >
              {t.hero.titleLine1}<br />
              <span className="text-brand-gray font-light">{t.hero.titleLine2}</span>
            </motion.h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="text-base md:text-lg text-brand-gray max-w-2xl mx-auto mb-14 font-light leading-relaxed tracking-wide"
          >
            {t.hero.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <a href="#vision" className="inline-block px-10 py-4 border border-brand-white/20 bg-transparent text-brand-white font-medium tracking-widest text-xs uppercase hover:bg-brand-white hover:text-black transition-all duration-500">
              {t.hero.cta}
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 hidden md:flex"
        >
          <div className="w-[24px] h-[40px] border border-white/20 rounded-full flex justify-center p-1.5">
            <motion.div 
              animate={{ 
                y: [0, 16, 0],
                opacity: [1, 0, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1 h-2 bg-white/60 rounded-full"
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono mix-blend-difference">
            {lang === 'en' ? 'Scroll' : 'Gulir'}
          </span>
        </motion.div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-32 relative bg-brand-black z-10 border-t border-white/5 snap-start">
        <AnimatedSeparator />
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="container mx-auto px-6 max-w-7xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <StaggerContainer>
              <StaggerItem>
                <h3 className="text-xs uppercase tracking-widest text-[#666] font-mono mb-6">{t.vision.subtitle}</h3>
              </StaggerItem>
              <StaggerItem>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-8 leading-tight">
                  {t.vision.titlePart1}<span className="font-bold text-white">{t.vision.titleHighlight}</span>{t.vision.titlePart2}
                </h2>
              </StaggerItem>
              
              <div className="space-y-6 mt-12 border-l border-white/10 pl-6">
                <StaggerItem>
                  <h3 className="text-xs uppercase tracking-widest text-[#666] font-mono mb-4">{t.vision.missionSubtitle}</h3>
                </StaggerItem>
                <ul className="space-y-4 text-brand-gray font-light text-sm md:text-base">
                  {t.vision.missions.map((mission, index) => (
                    <StaggerItem key={index}>
                      <li className="flex items-start gap-3">
                         <span className="w-1.5 h-1.5 rounded-full bg-brand-white mt-2 flex-shrink-0"></span>
                         <span>{mission}</span>
                      </li>
                    </StaggerItem>
                  ))}
                </ul>
              </div>
            </StaggerContainer>
            <motion.div 
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative h-full"
            >
              <div className="aspect-[3/4] lg:aspect-auto lg:h-full overflow-hidden relative border border-white/5">
                <div className="absolute inset-0 bg-brand-black/40 z-10 mix-blend-overlay"></div>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" 
                  alt="Amanloka Data Dashboard and Ecosystem" 
                  className="w-full h-full object-cover grayscale opacity-80 hover:scale-105 hover:grayscale-0 transition-all duration-[10s] ease-out"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-24 relative bg-[#050505] z-10 border-t border-white/5 snap-start">
        <AnimatedSeparator />
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="container mx-auto px-6 max-w-7xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <FadeIn delay={0.1} className="py-6 md:py-0">
              <div className="text-4xl md:text-5xl lg:text-6xl font-light font-heading text-brand-white mb-2">
                 <AnimatedCounter value={500} suffix="+" />
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-brand-gray mt-4">{t.impact.projects}</p>
            </FadeIn>
            
            <FadeIn delay={0.2} className="py-6 md:py-0">
              <div className="text-4xl md:text-5xl lg:text-6xl font-light font-heading text-brand-white mb-2">
                 <AnimatedCounter value={15000} suffix="+" />
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-brand-gray mt-4">{t.impact.community}</p>
            </FadeIn>
            
            <FadeIn delay={0.3} className="py-6 md:py-0">
              <div className="text-4xl md:text-5xl lg:text-6xl font-light font-heading text-brand-white mb-2">
                 <AnimatedCounter value={24} />
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-brand-gray mt-4">{t.impact.tools}</p>
            </FadeIn>
          </div>
        </motion.div>
      </section>

      {/* Ecosystem Products Section */}
      <section id="ecosystem" className="py-32 relative bg-brand-dark z-10 border-t border-white/5 snap-start">
         <AnimatedSeparator />
         <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="container mx-auto px-6 max-w-7xl"
         >
            <StaggerContainer className="text-center mb-20">
               <StaggerItem>
                 <h3 className="text-xs uppercase tracking-widest text-[#666] font-mono mb-4">{t.ecosystem.subtitle}</h3>
               </StaggerItem>
               <StaggerItem>
                 <h2 className="font-heading text-4xl md:text-5xl font-light tracking-tight mb-6">{t.ecosystem.titlePart1}<span className="font-bold">{t.ecosystem.titleHighlight}</span></h2>
               </StaggerItem>
               <StaggerItem>
                 <p className="text-brand-gray font-light max-w-2xl mx-auto">{t.ecosystem.description}</p>
               </StaggerItem>
            </StaggerContainer>

            <StaggerContainer delay={0.3} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {isDynamicContentLoading ? (
                 Array.from({ length: 6 }).map((_, idx) => (
                   <StaggerItem key={idx}>
                     <div className="bg-[#0a0a0a] border border-white/5 p-8 h-full min-h-[300px] flex flex-col justify-between relative overflow-hidden">
                       <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                       <div className="relative z-10">
                         <div className="w-10 h-10 bg-white/5 rounded mb-6"></div>
                         <div className="h-6 w-3/4 bg-white/10 rounded mb-4"></div>
                         <div className="h-4 w-full bg-white/5 rounded mb-2"></div>
                         <div className="h-4 w-5/6 bg-white/5 rounded mb-2"></div>
                         <div className="h-4 w-4/6 bg-white/5 rounded"></div>
                       </div>
                       <div className="mt-8 flex items-center justify-between relative z-10">
                         <div className="w-6 h-6 bg-white/5 rounded-full"></div>
                         <div className="w-24 h-4 bg-white/5 rounded"></div>
                       </div>
                     </div>
                   </StaggerItem>
                 ))
               ) : (
                 t.ecosystem.products.map((product, idx) => (
                   <StaggerItem key={idx}>
                     <EcosystemCard 
                       product={product} 
                       idx={idx} 
                       onClick={() => setSelectedProduct(product)} 
                       learnMoreText={t.ecosystem.learnMore} 
                     />
                   </StaggerItem>
                 ))
               )}
            </StaggerContainer>
         </motion.div>
      </section>

      {/* Intelligence Section (Chat) */}
      <section id="intelligence" className="py-32 relative bg-brand-black z-10 border-t border-white/5 snap-start">
        <AnimatedSeparator />
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="container mx-auto px-6 max-w-6xl"
        >
          <StaggerContainer className="text-center mb-24">
            <StaggerItem>
              <h3 className="text-xs uppercase tracking-widest text-[#666] font-mono mb-4">{t.intelligence.subtitle}</h3>
            </StaggerItem>
            <StaggerItem>
              <h2 className="font-heading text-4xl md:text-5xl font-light tracking-tight mb-6">{t.intelligence.titlePart1}<br/><span className="font-bold">{t.intelligence.titleHighlight}</span></h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-brand-gray text-base max-w-xl mx-auto font-light leading-relaxed">{t.intelligence.description}</p>
            </StaggerItem>
          </StaggerContainer>
          
          <FadeIn delay={0.4} className="max-w-4xl mx-auto">
             <ChatInterface />
          </FadeIn>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 relative bg-[#050505] z-10 border-t border-white/5 snap-start">
        <AnimatedSeparator />
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <StaggerContainer className="text-center mb-20 px-6">
            <StaggerItem>
              <h3 className="text-xs uppercase tracking-widest text-[#666] font-mono mb-4">{t.testimonials.subtitle}</h3>
            </StaggerItem>
            <StaggerItem>
              <h2 className="font-heading text-4xl md:text-5xl font-light tracking-tight mb-6">{t.testimonials.titlePart1}<span className="font-bold">{t.testimonials.titleHighlight}</span></h2>
            </StaggerItem>
          </StaggerContainer>
          
          <FadeIn delay={0.3} className="w-full">
             {isDynamicContentLoading ? (
               <div className="w-full max-w-4xl mx-auto px-4">
                 <div className="relative overflow-hidden border border-white/5 bg-[#0a0a0a] h-[450px] md:h-[350px] flex flex-col items-center justify-center text-center px-12 md:px-24">
                   <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                   <div className="relative z-10 flex flex-col items-center w-full">
                     <div className="w-12 h-12 bg-white/5 rounded-full mb-8" />
                     <div className="h-8 w-3/4 bg-white/10 mb-4 rounded" />
                     <div className="h-8 w-2/3 bg-white/10 mb-10 rounded" />
                     <div className="h-4 w-1/4 bg-white/5 mb-2 rounded" />
                     <div className="h-3 w-1/5 bg-white/5 rounded" />
                   </div>
                 </div>
               </div>
             ) : (
               <Suspense fallback={<ComponentLoader />}>
                 <TestimonialsCarousel testimonials={t.testimonials.items} />
               </Suspense>
             )}
          </FadeIn>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqData={t.faq} />

      {/* Studio Section (Image Gen) */}
      <section id="studio" className="py-32 relative bg-brand-dark z-10 border-t border-white/5 snap-start">
        <AnimatedSeparator />
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="container mx-auto px-6 max-w-7xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <StaggerContainer>
               <StaggerItem>
                 <h3 className="text-xs uppercase tracking-widest text-[#666] font-mono mb-4">{t.studio.subtitle}</h3>
               </StaggerItem>
               <StaggerItem>
                 <h2 className="font-heading text-4xl md:text-5xl font-light tracking-tight mb-8">{t.studio.titlePart1}<br/><span className="font-bold">{t.studio.titleHighlight}</span></h2>
               </StaggerItem>
               <StaggerItem>
                 <p className="text-brand-gray text-base mb-12 font-light leading-relaxed">
                   {t.studio.description}
                 </p>
               </StaggerItem>
               
               <div className="space-y-8 mb-12">
                  {t.studio.features.map((feature, idx) => (
                    <StaggerItem key={idx}>
                      <div className="flex items-start gap-6">
                         <div className="w-8 h-8 rounded-full border border-brand-white/20 flex items-center justify-center text-brand-white font-heading text-xs mt-1">
                            {String(idx + 1).padStart(2, '0')}
                         </div>
                         <div>
                            <h4 className="font-bold text-brand-white uppercase tracking-widest text-sm mb-2">{feature.title}</h4>
                            <p className="text-sm text-brand-gray font-light">{feature.desc}</p>
                         </div>
                      </div>
                    </StaggerItem>
                  ))}
               </div>
             </StaggerContainer>
             
             <FadeIn delay={0.3}>
                <Suspense fallback={<ComponentLoader />}>
                  <ImageGenerator />
                </Suspense>
             </FadeIn>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-brand-black text-center relative z-10 snap-start">
         <div className="container mx-auto px-6">
            <div className="w-20 h-20 mx-auto mb-8 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
               <img src={amanLogo} alt="AMAN Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center justify-center gap-6 mb-8">
              <a href="#" aria-label="LinkedIn" className="text-brand-gray opacity-60 hover:opacity-100 hover:text-brand-white transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-brand-gray opacity-60 hover:opacity-100 hover:text-brand-white transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="GitHub" className="text-brand-gray opacity-60 hover:opacity-100 hover:text-brand-white transition-all duration-300">
                <Github className="w-5 h-5" />
              </a>
            </div>
            <p className="text-brand-gray text-xs font-light tracking-widest uppercase mb-2">{t.footer.tagline}</p>
            <p className="text-[#444] text-[10px] font-mono tracking-widest">© {new Date().getFullYear()} {t.footer.copyright}</p>
         </div>
      </footer>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-black/95 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 p-10 md:p-16 flex flex-col md:flex-row gap-12 mt-8 md:mt-0"
            >
              <div className="absolute top-6 left-6 flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-brand-gray">
                <button onClick={() => setSelectedProduct(null)} className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Home' : 'Beranda'}
                </button>
                <span className="text-white/20">/</span>
                <button onClick={() => setSelectedProduct(null)} className="hover:text-white transition-colors">
                  {t.nav.ecosystem}
                </button>
                <span className="text-white/20">/</span>
                <span className="text-white truncate max-w-[100px] sm:max-w-[200px]">{selectedProduct.title}</span>
              </div>

              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 text-brand-gray hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex-1">
                 <h3 className="text-xs uppercase tracking-widest text-[#666] font-mono mb-4">{t.ecosystem.specsTitle}</h3>
                 <h2 className="font-heading text-3xl md:text-5xl font-light tracking-tight mb-6 text-white">{selectedProduct.title}</h2>
                 <p className="text-brand-gray font-light leading-relaxed mb-8">{selectedProduct.desc}</p>
                 
                 {selectedProduct.title === t.ecosystem.products[3].title && (
                   <button
                     onClick={handleDownloadReport}
                     disabled={isGeneratingReport}
                     className="group flex items-center gap-3 px-6 py-3 bg-white text-black text-sm font-semibold tracking-wide hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {isGeneratingReport ? (
                       <>
                         <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                         {lang === 'en' ? 'Generating...' : 'Menghasilkan...'}
                       </>
                     ) : (
                       <>
                         <FileText className="w-4 h-4" />
                         {lang === 'en' ? 'Download Sample Report' : 'Unduh Contoh Laporan'}
                         <Download className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                       </>
                     )}
                   </button>
                 )}
              </div>

              <div className="flex-1">
                 <div className="space-y-6">
                   {selectedProduct.specs.map((spec, idx) => (
                     <div key={idx} className="border-b border-white/5 pb-4">
                       <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">{spec.label}</h4>
                       <p className="text-sm text-brand-gray font-light">{spec.value}</p>
                     </div>
                   ))}
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-black/95 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 p-10 md:p-16 flex flex-col md:flex-row gap-16 mt-8 md:mt-0"
            >
              <div className="absolute top-6 left-6 flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-brand-gray">
                <button onClick={closeContactModal} className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Home' : 'Beranda'}
                </button>
                <span className="text-white/20">/</span>
                <span className="text-white">{t.nav.contact}</span>
              </div>

              <button 
                onClick={closeContactModal}
                className="absolute top-6 right-6 text-brand-gray hover:text-white transition-colors focus:outline-none"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                   <h3 className="text-xs uppercase tracking-widest text-[#666] font-mono mb-4">{t.contact.subtitle}</h3>
                   <h2 className="font-heading text-3xl md:text-5xl font-light tracking-tight mb-6 text-white">{t.contact.title}</h2>
                   <p className="text-brand-gray font-light leading-relaxed mb-8">{t.contact.description}</p>
                </div>
                
                <div className="mt-8 border-t border-white/5 pt-8">
                   <h3 className="text-xs uppercase tracking-widest text-[#666] font-mono mb-4">{t.contact.info.title}</h3>
                   <div className="space-y-3">
                     <p className="text-sm text-brand-gray font-light">Email: <span className="text-white">{t.contact.info.email}</span></p>
                     <p className="text-sm text-brand-gray font-light">Location: <span className="text-white">{t.contact.info.location}</span></p>
                   </div>
                </div>
              </div>

              <div className="flex-1 bg-brand-black/50 border border-white/5 p-8">
                <form className="space-y-6 flex flex-col h-full" onSubmit={handleContactSubmit}>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#666] font-mono mb-2">{t.contact.form.name}</label>
                    <input 
                      type="text" 
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      onBlur={handleContactBlur}
                      className={`w-full bg-transparent border-b pb-2 text-white font-light focus:outline-none transition-all duration-300 ${
                        contactErrors.name 
                          ? 'border-red-500/80 shadow-[0_4px_12px_-4px_rgba(220,38,38,0.3)] focus:border-red-500 focus:shadow-[0_4px_16px_-4px_rgba(220,38,38,0.5)]' 
                          : 'border-white/10 focus:border-white/50'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#666] font-mono mb-2">{t.contact.form.email}</label>
                    <input 
                      type="email" 
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      onBlur={handleContactBlur}
                      className={`w-full bg-transparent border-b pb-2 text-white font-light focus:outline-none transition-all duration-300 ${
                        contactErrors.email 
                          ? 'border-red-500/80 shadow-[0_4px_12px_-4px_rgba(220,38,38,0.3)] focus:border-red-500 focus:shadow-[0_4px_16px_-4px_rgba(220,38,38,0.5)]' 
                          : 'border-white/10 focus:border-white/50'
                      }`}
                      required
                    />
                  </div>
                  <div className="flex-grow">
                    <label className="block text-xs uppercase tracking-widest text-[#666] font-mono mb-2">{t.contact.form.message}</label>
                    <textarea 
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      onBlur={handleContactBlur}
                      className={`w-full h-full min-h-[120px] bg-transparent border-b pb-2 text-white font-light focus:outline-none transition-all duration-300 resize-none ${
                        contactErrors.message 
                          ? 'border-red-500/80 shadow-[0_4px_12px_-4px_rgba(220,38,38,0.3)] focus:border-red-500 focus:shadow-[0_4px_16px_-4px_rgba(220,38,38,0.5)]' 
                          : 'border-white/10 focus:border-white/50'
                      }`}
                      required
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isContactSubmitting || isContactSubmitted}
                    className="relative w-full bg-white text-black font-bold uppercase tracking-widest text-xs py-4 hover:bg-gray-200 transition-colors focus:outline-none disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      {isContactSubmitted ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-2 text-green-600"
                        >
                          <motion.div
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                          >
                            <Check className="w-5 h-5" strokeWidth={3} />
                          </motion.div>
                          <span>{lang === 'en' ? 'Sent Successfully' : 'Berhasil Terkirim'}</span>
                        </motion.div>
                      ) : isContactSubmitting ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                          <span>{lang === 'en' ? 'Sending...' : 'Mengirim...'}</span>
                        </motion.div>
                      ) : (
                        <motion.span
                          key="default"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {t.contact.form.submit}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[90] w-12 h-12 flex items-center justify-center bg-brand-black/80 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white transition-colors focus:outline-none"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Language Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-brand-black/90 backdrop-blur-md border border-white/10 rounded-none shadow-2xl flex items-center justify-center"
          >
            <span className="text-xs uppercase tracking-widest font-mono text-white/90">
              {toastMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    </>
  );
}


