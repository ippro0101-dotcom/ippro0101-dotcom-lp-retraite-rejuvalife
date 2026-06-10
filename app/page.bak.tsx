'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Heart, 
  Sparkles, 
  Gift, 
  Star,
  Check,
  Instagram,
  Youtube,
  Send,
  Loader2,
  X,
  Menu,
  Globe,
  ShieldCheck,
  Cookie
} from 'lucide-react';
import Image from 'next/image';

// List of 14 premium nature & well-being slides with user-provided, SEO-optimized imagery
const SLIDES = [
  { 
    id: 1, 
    url: 'https://i.ibb.co/GfxWq7L7/Apana-et-Prana.png', 
    alt: 'Apana-et-Prana-equilibre-sante-longevite',
    title: 'Apana & Prana',
    desc: 'L’équilibre subtil des souffles ascendant et descendant pour harmoniser le corps.'
  },
  { 
    id: 2, 
    url: 'https://i.ibb.co/PGPWqLNX/audio-1-Kumbhaka-natural-wind-oce-an-life.png', 
    alt: 'audio-1-Kumbhaka-natural-wind-oce-an-life-respiration-detox',
    title: 'Le Souffle de l’Océan',
    desc: 'Session audio sur le vent naturel, l’océan et la fluidité de la vie en nous.'
  },
  { 
    id: 3, 
    url: 'https://i.ibb.co/jkhFPpP1/audio-2-kumbhaka-meditacion.png', 
    alt: 'audio-2-kumbhaka-meditacion-silence-interieur',
    title: 'Kumbhaka Méditation',
    desc: 'L’immensité du silence intérieur à travers les rétentions de souffle guidées.'
  },
  { 
    id: 4, 
    url: 'https://i.ibb.co/Zp9wRZKJ/audio-3-respirer-autrement.png', 
    alt: 'audio-3-respirer-autrement-vitalite-re-generation',
    title: 'Respirer Autrement',
    desc: 'Changer sa physiologie et reprogrammer son système nerveux au quotidien.'
  },
  { 
    id: 5, 
    url: 'https://i.ibb.co/4wccn08q/audio-4-kushi-relacher-les-tensions.png', 
    alt: 'audio-4-kushi-relacher-les-tensions-relaxation-profonde',
    title: 'Relâcher les Tensions',
    desc: 'Protocole Kushi pour se libérer des blocages musculaires et mentaux accumulés.'
  },
  { 
    id: 6, 
    url: 'https://i.ibb.co/9RYSZ81/audio-5-rassambler-nergie.png', 
    alt: 'audio-5-rassambler-energie-concentration-prana',
    title: 'Rassembler l’Énergie',
    desc: 'Canaliser et condenser le Prana pour unifier vos forces intérieures.'
  },
  { 
    id: 7, 
    url: 'https://i.ibb.co/sJFYtZmr/audio-6-nourrir-l-int-rieur.png', 
    alt: 'audio-6-nourrir-l-interieur-vitalite-cellulaire',
    title: 'Nourrir l’Intérieur',
    desc: 'Nourrir l’organisme en profondeur par la conscience et l’énergie pure.'
  },
  { 
    id: 8, 
    url: 'https://i.ibb.co/0SMLkY0/audio-7int-grer.png', 
    alt: 'audio-7-integrer-bienfaits-durables-sommeil',
    title: 'Intégration Somatique',
    desc: 'Ancrer les transformations cellulaires de la retraite pour le long terme.'
  },
  { 
    id: 9, 
    url: 'https://i.ibb.co/Z1pG2PtG/Kumbhaka-Yoga-les-pranas.png', 
    alt: 'Kumbhaka-Yoga-les-pranas-circulation-energetique',
    title: 'Yoga Kumbhaka & Pranas',
    desc: 'Renouer avec les postures clés qui libèrent et amplifient l’énergie vitale.'
  },
  { 
    id: 10, 
    url: 'https://i.ibb.co/7Jwr92vJ/Mobilite-re-ge-ne-ration-longe-vite.png', 
    alt: 'Mobilite-re-ge-ne-ration-longe-vite-articulaire',
    title: 'Mobilité, Régénération & Longévité',
    desc: 'Mouvements fluides étudiés pour relâcher les fascias et stimuler la vitalité.'
  },
  { 
    id: 11, 
    url: 'https://i.ibb.co/fzY9r3zK/nettoyage-nasal.png', 
    alt: 'nettoyage-nasal-hygiene-yogique-shatkarma',
    title: 'Nettoyage Nasal Sacré',
    desc: 'Purification délicate des voies respiratoires pour une clarté mentale immédiate.'
  },
  { 
    id: 12, 
    url: 'https://i.ibb.co/QjjW8BM2/Respiration-et-Nettoyage-abdominale-e-nergie-detox-force.png', 
    alt: 'Respiration-et-Nettoyage-abdominale-e-nergie-detox-force',
    title: 'Détox Abdominale',
    desc: 'Shatkarmas physiques et massage des organes digestifs pour éliminer les toxines.'
  },
  { 
    id: 13, 
    url: 'https://i.ibb.co/YBZzgGnm/video-1-yoga-Kumbhaka-Rotacions.png', 
    alt: 'video-1-yoga-Kumbhaka-Rotacions-fascias-dos',
    title: 'Rotations & Fascias',
    desc: 'Délier la colonne et libérer les méridiens d’énergie par de douces rotations.'
  },
  { 
    id: 14, 
    url: 'https://i.ibb.co/4n26g1xp/video-2-Humming.png', 
    alt: 'video-2-Humming-vibration-nerf-vague',
    title: 'Le Chant du Humming',
    desc: 'Vibration sonore apaisante pour stimuler instantanément le nerf vague.'
  }
];

// Testimonials data representing our happy participants
const TESTIMONIALS = [
  {
    id: 1,
    name: 'FRANÇOISE',
    role: 'Participante Rejuvalife',
    text: 'Cette retraite a changé ma vie. J’ai retrouvé une énergie incroyable, ma peau est plus lumineuse, mon corps plus léger et mon esprit en paix. Je me sens plus jeune, plus alignée et pleine de gratitude.',
    avatar: 'https://i.ibb.co/YFmwtjL6/Francoise-cliente.jpg',
  },
  {
    id: 2,
    name: 'MARC A.',
    role: 'Participant Rejuvalife',
    text: 'Un cocon de bienveillance extrême. L’accompagnement scientifique et holistique de Sissi m’a permis de faire un "reset" métabolique incroyable. Mes insomnies ont totalement disparu.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 3,
    name: 'HÉLÈNE D.',
    role: 'Participante Rejuvalife',
    text: 'Le protocole de 7 jours est d’une fluidité remarquable. Sissi distille ses précieux conseils de longévité avec une générosité rare. Je recommande à toute personne en quête d’un second souffle.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
  }
];

// Medallion double S flower logo SVG representing an authentic separate brand emblem
const BrandLogo = () => (
  <div className="flex items-center gap-4 select-none">
    <div className="relative w-14 h-14 flex-shrink-0 bg-[#00351B]/5 rounded-full p-1.5 border border-[#C38F27]/25 flex items-center justify-center">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#C38F27]">
        {/* Golden outer circle representing quality medallion */}
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="40" stroke="#00351B" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Lotus lines in the background */}
        <path d="M50 20 C54 35, 68 40, 50 80 C32 40, 46 35, 50 20 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M50 35 C62 45, 78 52, 62 68 C48 52, 45 45, 50 35 Z" stroke="currentColor" strokeWidth="1" opacity="0.8" />
        <path d="M50 35 C38 45, 22 52, 38 68 C52 52, 55 45, 50 35 Z" stroke="currentColor" strokeWidth="1" opacity="0.8" />
        
        {/* Elegantly styled central 'S' for Sissi Gilton */}
        <text x="50" y="58" textAnchor="middle" fill="#00351B" className="font-[family-name:var(--font-cursive)] text-4xl font-normal tracking-normal select-none">S</text>
      </svg>
    </div>
    <div className="flex flex-col">
      <span className="text-xl sm:text-2xl lg:text-3xl font-[family-name:var(--font-serif)] font-bold text-[#00351B] leading-[1.05] tracking-[0.04em]">REJUVALIFE</span>
      <span className="text-2xl sm:text-[28px] lg:text-[32px] font-[family-name:var(--font-cursive)] text-[#C38F27] leading-none mt-1">Longévité & Énergie</span>
    </div>
  </div>
);

// High-end vector icons matching design mockups using brand gold
const LotusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-[#D48F0F] mx-auto" strokeLinecap="round" strokeLinejoin="round">
    {/* Blooming outer left petal */}
    <path d="M12 21C6 19.5 2.5 15.5 2.5 11.5C2.5 11.5 6 11.5 8.5 13.5C10 14.5 11 16.5 12 21Z" />
    {/* Blooming outer right petal */}
    <path d="M12 21C18 19.5 21.5 15.5 21.5 11.5C21.5 11.5 18 11.5 15.5 13.5C14 14.5 13 16.5 12 21Z" />
    {/* Inner left petal */}
    <path d="M12 21C8.5 19.5 6.5 15.5 7.5 11C8.5 7 10.5 5 12 2.5C12 2.5 11 7 11.2 11" />
    {/* Inner right petal */}
    <path d="M12 21C15.5 19.5 17.5 15.5 16.5 11C15.5 7 13.5 5 12 2.5C12 2.5 13 8 12.8 11" />
    {/* Central blooming petal */}
    <path d="M12 21C10.5 18 9 14 9 10C9 6.5 10.5 4 12 1.5C13.5 4 15 6.5 15 10C15 14 13.5 18 12 21Z" />
    {/* Bottom water symbol curves */}
    <path d="M5.5 21C8 19.5 16 19.5 18.5 21" />
  </svg>
);

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-[#D48F0F] mx-auto" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.5a7 7 0 0 1-9 8.5z" />
    <path d="M19 2c-2.26 4.33-5.27 7.14-8 8" />
  </svg>
);

const BalanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-[#D48F0F] mx-auto" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a10 10 0 0 1 0 20Z" fill="currentColor" fillOpacity="0.08" stroke="none" />
    <circle cx="12" cy="7" r="1.5" strokeWidth="1.5" />
    <circle cx="12" cy="17" r="1.5" fill="currentColor" />
    <path d="M12 2a5 5 0 0 1 0 10a5 5 0 0 0 0 10" />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-[#D48F0F] mx-auto" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

// Green styled WhatsApp Outline Icon
const WhatsAppIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.1 1.4 4.8 1.4 5.3 0 9.7-4.3 9.7-9.7 0-2.6-1-5-2.8-6.8-1.8-1.8-4.2-2.8-6.9-2.8-5.3 0-9.7 4.3-9.7 9.7 0 1.8.5 3.5 1.4 5l-.3 1.1-.3 1 1-.3zm11.2-6.2c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6s.3-.3.4-.5c.1-.1.2-.3.2-.4s0-.3-.1-.5c-.1-.2-.7-1.6-.9-2.1-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.7.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4s-.3-.2-.6-.3z" />
  </svg>
);

export default function LandingPage() {
  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Program Slider state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Testimonials Carousel State
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Tally native fall-back contact model validation state
  const [tallyEmbedMode, setTallyEmbedMode] = useState(false); // Toggle to test real Tally embed or native beautiful form
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dietPreference: 'Tous',
    motivations: ''
  });

  // Cookie and GDPR states
  const [cookieConsent, setCookieConsent] = useState<string | null>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const consent = localStorage.getItem('rejuvalife-cookies-consent');
      if (consent) {
        setCookieConsent(consent);
        setShowCookieBanner(false);
      } else {
        setShowCookieBanner(true);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('rejuvalife-cookies-consent', 'accepted');
    setCookieConsent('accepted');
    setShowCookieBanner(false);
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('rejuvalife-cookies-consent', 'declined');
    setCookieConsent('declined');
    setShowCookieBanner(false);
  };

  const handleResetCookies = () => {
    localStorage.removeItem('rejuvalife-cookies-consent');
    setCookieConsent(null);
    setShowCookieBanner(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  // Autoplay function for Program Slide
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 9000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    setTouchStartX(0);
    setTouchEndX(0);
  };

  // Testimonials functions
  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  // Safe smooth anchor scrolls
  const scrollToAnchor = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Custom Form Submit Mock (Pristine UX UX feedback)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.phone) return;
    
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
    }, 1200);
  };

  return (
    <div className="bg-[#FAF8F5] text-[#01140A] font-sans antialiased min-h-screen selection:bg-[#C38F27]/20 selection:text-[#C38F27]">
      
      {/* EXQUISITE NAV TOP HEADER BAR */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#C38F27]/10 px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div onClick={() => scrollToAnchor('hero')} className="cursor-pointer">
            <BrandLogo />
          </div>

          {/* Desktop Navigation Links matching Mockup */}
          <nav className="hidden lg:flex items-center gap-10">
            <button onClick={() => scrollToAnchor('hero')} className="text-xs tracking-[0.15em] font-medium text-[#01140A]/75 hover:text-[#C38F27] transition">ACCUEIL</button>
            <button onClick={() => scrollToAnchor('programme')} className="text-xs tracking-[0.15em] font-medium text-[#01140A]/75 hover:text-[#C38F27] transition">PROGRAMME</button>
            <button onClick={() => scrollToAnchor('programme')} className="text-xs tracking-[0.15em] font-medium text-[#01140A]/75 hover:text-[#C38F27] transition">À PROPOS</button>
            <button onClick={() => scrollToAnchor('temoignages')} className="text-xs tracking-[0.15em] font-medium text-[#01140A]/75 hover:text-[#C38F27] transition">TÉMOIGNAGES</button>
            <button onClick={() => scrollToAnchor('inscription')} className="text-xs tracking-[0.15em] font-medium text-[#01140A]/75 hover:text-[#C38F27] transition">CONTACT</button>
          </nav>

          {/* Reserved WhatsApp Callout Button */}
          <div className="hidden sm:flex items-center gap-4">
            <a 
              href="https://wa.me/34699037998" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#00351B] text-white text-xs tracking-wider font-semibold hover:bg-[#001F0F] hover:shadow-lg hover:scale-[1.02] active:scale-100 transition-all duration-300"
              id="nav-whatsapp-cta"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>RÉSERVER MA DÉTOX</span>
            </a>
          </div>

          {/* Mobile Menu Button toggles mobile layout */}
          <div className="flex lg:hidden items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-[#01140A] p-2 hover:text-[#C38F27]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute left-0 right-0 top-full bg-[#FAF8F5] border-b border-[#C38F27]/10 flex flex-col p-6 gap-4 shadow-xl lg:hidden"
            >
              <button onClick={() => scrollToAnchor('hero')} className="text-sm font-medium tracking-widest text-[#01140A] text-left py-2 hover:text-[#C38F27] border-b border-[#C38F27]/5">ACCUEIL</button>
              <button onClick={() => scrollToAnchor('programme')} className="text-sm font-medium tracking-widest text-[#01140A] text-left py-2 hover:text-[#C38F27] border-b border-[#C38F27]/5">PROGRAMME</button>
              <button onClick={() => scrollToAnchor('programme')} className="text-sm font-medium tracking-widest text-[#01140A] text-left py-2 hover:text-[#C38F27] border-b border-[#C38F27]/5">À PROPOS</button>
              <button onClick={() => scrollToAnchor('temoignages')} className="text-sm font-medium tracking-widest text-[#01140A] text-left py-2 hover:text-[#C38F27] border-b border-[#C38F27]/5">TÉMOIGNAGES</button>
              <button onClick={() => scrollToAnchor('inscription')} className="text-sm font-medium tracking-widest text-[#01140A] text-left py-2 hover:text-[#C38F27]">CONTACT</button>
              
              <div className="pt-4 flex flex-col gap-3">
                <a 
                  href="https://wa.me/34699037998" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#00351B] text-white font-semibold text-sm hover:bg-[#001F0F] shadow-md"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                  <span>RÉSERVER MA DÉTOX</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* LUXURIOUS MODERN SPLIT HERO SECTION */}
      <section id="hero" className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-32 min-h-[calc(100vh-90px)] flex items-center bg-[#FAF8F5]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content column - narrower to allow wide image overlay */}
            <div className="lg:col-span-5 space-y-6 text-left z-20 pr-4">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <span className="inline-block text-xs sm:text-sm font-bold tracking-[0.22em] text-[#D48F0F] uppercase font-sans">
                  RETRAITE DÉTOX & RÉGÉNÉRATION
                </span>
                
                <h1 className="text-3xl sm:text-4xl lg:text-[3.85rem] xl:text-[4.55rem] lg:w-[135%] xl:w-[145%] lg:max-w-none font-[family-name:var(--font-serif)] font-light text-[#01140A] leading-[1.08] tracking-[0.01em] relative z-20">
                  Retrouvez votre<br />
                  <span className="font-normal text-[#00351B]">énergie naturelle</span>,<br />
                  <span className="font-light">c’est possible !</span>
                </h1>
                
                {/* Impeccable golden flowing calligraphic cursive text from the mockup, elegantly overlapping the image container on desktop and aligned left */}
                <span className="font-[family-name:var(--font-cursive)] text-[#D48F0F] text-5xl sm:text-6xl lg:text-[3.85rem] xl:text-[4.65rem] font-normal leading-none pt-1 tracking-wide block z-30 lg:relative drop-shadow-[0_1px_1px_rgba(250,248,245,0.8)] lg:drop-shadow-[0_2px_3px_rgba(250,248,245,0.95)]">
                  Rajeunissez de l’intérieur.
                </span>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-sm sm:text-base xl:text-lg text-[#4A433D] font-normal leading-relaxed lg:w-[120%] xl:w-[130%] lg:max-w-none relative z-20"
              >
                7 jours pour purifier votre corps,<br />
                apaiser votre esprit et relancer votre vitalité.
              </motion.p>

              {/* Action layout matching user mockup vertically - left-aligned */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col items-start justify-start gap-4 pt-3 max-w-full text-left relative z-20"
              >
                <a 
                  href="https://wa.me/34699037998" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group inline-flex items-center justify-start gap-3 px-6 sm:px-8 py-3.5 rounded-full bg-[#00351B] text-white font-medium text-xs sm:text-[13px] tracking-[0.14em] shadow-md hover:bg-[#001F0F] hover:shadow-xl active:scale-98 transition-all duration-300 w-auto whitespace-nowrap"
                  id="hero-whatsapp-cta"
                >
                  <WhatsAppIcon className="w-4 h-4 group-hover:scale-110 transition duration-300 flex-shrink-0" />
                  <span>RÉSERVER SUR WHATSAPP</span>
                </a>

                {/* Golden Styled phone link aligned nicely to the left with the button on desktop */}
                <a 
                  href="tel:+34699037998" 
                  className="inline-flex items-center justify-start text-base sm:text-lg font-bold text-[#D48F0F] hover:text-[#00351B] transition-colors duration-300 py-1 pl-1"
                >
                  <span>+34 699 03 79 98</span>
                </a>
              </motion.div>
            </div>

            {/* Right Column containing barefoot walking/yoga image - shifted left to cover center gap */}
            <div className="lg:col-span-7 relative w-full h-[380px] sm:h-[500px] lg:h-[650px] z-0 lg:-ml-48 xl:-ml-64 lg:w-[calc(100%+12rem)] xl:w-[calc(100%+16rem)]">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="relative w-full h-full rounded-[40px] overflow-hidden shadow-xl"
              >
                {/* Sissi Gilton yoga image in the hero section - positioned to the right to see more of the robe */}
                <Image 
                  src="https://i.ibb.co/xSJ7cVTL/Sissi-yogi.jpg"
                  alt="Sissi Gilton Yogi, Rejuvalife"
                  fill
                  className="object-cover object-right-bottom scale-[1.01] saturate-[1.65] contrast-[1.08] brightness-[1.04]"
                  priority
                  sizes="(max-w-1024px) 100vw, 66vw"
                  referrerPolicy="no-referrer"
                />
                
                {/* Smooth gradual liner gradient and soft glassmorphism overlay on the left to fade image beautifully behind the text - tighter to reveal maximum image area */}
                <div className="absolute inset-y-0 left-0 w-[240px] xl:w-[280px] bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/85 via-[#FAF8F5]/35 to-transparent z-10 pointer-events-none hidden lg:block" />
                
                {/* Decorative absolute element adding upscale graphic designer feeling */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                
                {/* Elegant gold corner curves representing high fidelity branding borders */}
                <div className="absolute top-8 right-8 border-t-2 border-r-2 border-[#D48F0F] w-12 h-12 rounded-tr-xl opacity-60" />
                <div className="absolute bottom-8 right-8 border-b-2 border-r-2 border-[#D48F0F] w-12 h-12 rounded-bl-xl opacity-60" />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* EXQUISITE FEATURES/CHARACTERISTICS SECTION */}
      <section className="py-10 sm:py-12 bg-[#FAF8F5] border-y border-[#D48F0F]/15 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 select-none">
            
            {/* Feature 1 */}
            <div className="bg-[#FDFBF7] border border-[#D48F0F]/20 p-5 sm:p-6 rounded-[22px] text-center flex flex-col items-center justify-start group hover:bg-[#FAF4EC] hover:border-[#D48F0F]/45 hover:shadow-md transition-all duration-300">
              <div className="mb-3 transition duration-300 group-hover:scale-105">
                <LeafIcon />
              </div>
              <h3 className="mb-2 text-xs sm:text-sm tracking-[0.2em] font-extrabold text-[#D48F0F] uppercase font-sans">DÉTOX PROFONDE</h3>
              <p className="text-[#01140A]/90 font-medium text-xs sm:text-[13px] leading-relaxed max-w-[240px] tracking-wide">
                Élimination des toxines, amélioration de la digestion et légèreté retrouvée.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#FDFBF7] border border-[#D48F0F]/20 p-5 sm:p-6 rounded-[22px] text-center flex flex-col items-center justify-start group hover:bg-[#FAF4EC] hover:border-[#D48F0F]/45 hover:shadow-md transition-all duration-300">
              <div className="mb-3 transition duration-300 group-hover:scale-105">
                <LotusIcon />
              </div>
              <h3 className="mb-2 text-xs sm:text-sm tracking-[0.2em] font-extrabold text-[#D48F0F] uppercase font-sans">ÉNERGIE & VITALITÉ</h3>
              <p className="text-[#01140A]/90 font-medium text-xs sm:text-[13px] leading-relaxed max-w-[240px] tracking-wide">
                Nutrition vivante, respiration et mouvements pour booster votre énergie.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#FDFBF7] border border-[#D48F0F]/20 p-5 sm:p-6 rounded-[22px] text-center flex flex-col items-center justify-start group hover:bg-[#FAF4EC] hover:border-[#D48F0F]/45 hover:shadow-md transition-all duration-300">
              <div className="mb-3 transition duration-300 group-hover:scale-105">
                <BalanceIcon />
              </div>
              <h3 className="mb-2 text-xs sm:text-sm tracking-[0.2em] font-extrabold text-[#D48F0F] uppercase font-sans">ÉQUILIBRE INTÉRIEUR</h3>
              <p className="text-[#01140A]/90 font-medium text-xs sm:text-[13px] leading-relaxed max-w-[240px] tracking-wide">
                Méditation, relaxation et soins pour réduire le stress et retrouver l’harmonie.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#FDFBF7] border border-[#D48F0F]/20 p-5 sm:p-6 rounded-[22px] text-center flex flex-col items-center justify-start group hover:bg-[#FAF4EC] hover:border-[#D48F0F]/45 hover:shadow-md transition-all duration-300">
              <div className="mb-3 transition duration-300 group-hover:scale-105">
                <SunIcon />
              </div>
              <h3 className="mb-2 text-xs sm:text-sm tracking-[0.2em] font-extrabold text-[#D48F0F] uppercase font-sans">LONGÉVITÉ & ANTI-ÂGE</h3>
              <p className="text-[#01140A]/90 font-medium text-xs sm:text-[13px] leading-relaxed max-w-[240px] tracking-wide">
                Ralentissez le vieillissement et activez votre potentiel de régénération.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SPLIT COLS SECTION: PROGRAM DATA & SLIDESHOW CAROUSEL */}
      <section id="programme" className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Description listing Program Details - occupying 4 columns */}
            <div className="lg:col-span-4 space-y-8 text-left">
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-[0.2em] text-[#D48F0F] uppercase font-sans block">LE PROGRAMME</span>
                <h2 className="text-2xl sm:text-3xl lg:text-[1.95rem] xl:text-[2.25rem] font-[family-name:var(--font-serif)] font-normal text-[#01140A] leading-[1.2]">
                  Une approche holistique pour des résultats profonds
                </h2>
              </div>

              {/* The clean check outline bullets seen in user mockup */}
              <div className="space-y-4 font-sans text-sm text-[#01140A]">
                {[
                  'Alimentation détox & anti-inflammatoire',
                  'Jeûne intermittent & nutrition fonctionnelle',
                  'Soins bien-être & thérapies régénérantes',
                  'Yoga, méditation & respiration',
                  'Ateliers Énergie & Transformation',
                  'Accompagnement personnalisé'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="w-5 h-5 flex-shrink-0 rounded-full bg-[#00351B]/15 flex items-center justify-center text-[#00351B]">
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </span>
                    <span className="font-semibold text-[#01140A] sm:text-[15px] tracking-wide">{item}</span>
                  </div>
                ))}
              </div>

              {/* EXQUISITE GIFT BONUS BOX */}
              <div className="bg-transparent p-1 pt-6 flex items-start gap-6 transform hover:scale-[1.015] transition-transform duration-300">
                <div className="flex-shrink-0 text-[#D48F0F] flex items-center justify-center bg-[#D48F0F]/8 p-4 rounded-full shadow-xs">
                  <Gift className="w-10 h-10 text-[#D48F0F]" strokeWidth={1.5} />
                </div>
                <div className="space-y-3 flex-1">
                  <div>
                    <span className="px-3.5 py-1 text-[10px] sm:text-[11px] tracking-[0.25em] font-extrabold text-white bg-[#D48F0F] rounded-full inline-block shadow-xs">
                      BONUS OFFERT
                    </span>
                  </div>
                  <p className="text-xs sm:text-[15px] text-[#01140A] leading-relaxed font-normal">
                    Accès immédiat au protocole exclusif <span className="font-semibold text-[#00351B] italic">&ldquo;21 jours pour une énergie nouvelle&rdquo;</span>
                    <span className="ml-2 font-bold text-[#D48F0F] bg-[#D48F0F]/10 px-2.5 py-0.5 rounded-md inline-block whitespace-nowrap text-xs shadow-xs">
                      valeur 79€
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side Slideshow Carousel - occupying 8 columns for a wider presentation (66% width) */}
            <div className="lg:col-span-8 space-y-6">
              <div 
                className="relative w-full h-[380px] sm:h-[480px] lg:h-[530px] overflow-hidden rounded-[34px] bg-[#FAF8F5] border border-[#D48F0F]/15 shadow-lg group"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Photo Slider */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.01 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={SLIDES[currentIndex].url}
                      alt={SLIDES[currentIndex].alt}
                      fill
                      priority
                      className="object-contain p-3 sm:p-5 bg-white"
                      sizes="(max-w-1024px) 100vw, 60vw"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Elegant overlay card containing active slide's Title and Description */}
                <div className="absolute bottom-6 left-6 right-16 md:right-24 bg-black/45 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-5 text-left z-20 text-white shadow-lg pointer-events-none transition-all duration-300">
                  <h4 className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#FFDF9B] mb-1 font-sans">
                    {SLIDES[currentIndex].title}
                  </h4>
                  <p className="text-[10px] sm:text-xs md:text-sm text-white/95 font-light font-sans leading-relaxed">
                    {SLIDES[currentIndex].desc}
                  </p>
                </div>

                {/* Left navigation arrow - elegant outline circle */}
                <button 
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/45 text-white w-10 h-10 rounded-full flex items-center justify-center transition duration-300 shadow-sm"
                  aria-label="Diapositive précédente"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                {/* Right navigation arrow - elegant outline circle */}
                <button 
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/45 text-white w-10 h-10 rounded-full flex items-center justify-center transition duration-300 shadow-sm"
                  aria-label="Diapositive suivante"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>

                {/* Slider Dots indicators layered beautifully at bottom center inside the image slideshow */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-1.5 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xs">
                  {SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-[#EBDBC5] scale-110' : 'bg-white/40 hover:bg-white/75'}`}
                      aria-label={`Aller à la diapositive ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* GRAND TESTIMONIALS (FRANÇOISE CAROUSEL) */}
      <section id="temoignages" className="py-8 sm:py-10 bg-[#FAF8F5] border-y border-[#D48F0F]/15 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-4xl mx-auto">
            
            {/* Elegant, interactive hover card with decreased vertical padding and deep dark green/black color shift on hover */}
            <div className="relative group bg-[#FCFAF7] hover:bg-[#01140A] border border-[#D48F0F]/12 hover:border-[#D48F0F]/30 p-5 sm:p-7 md:p-8 rounded-[28px] md:rounded-[34px] transition-all duration-500 ease-in-out shadow-xs hover:shadow-xl">
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={testimonialIndex}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 md:gap-10 items-center text-center md:text-left"
                >
                  {/* Clean circular photo on the left with custom border matching dark hover */}
                  <div className="relative w-[110px] h-[110px] sm:w-[125px] sm:h-[125px] mx-auto rounded-full overflow-hidden border border-[#D48F0F]/20 bg-white p-1 transition-all duration-500 group-hover:border-[#FFDF9B]/35 group-hover:scale-102">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image 
                        src={TESTIMONIALS[testimonialIndex].avatar}
                        alt={`${TESTIMONIALS[testimonialIndex].name} Sissi Gilton Rejuvalife`}
                        fill
                        className="object-cover"
                        sizes="130px"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Testimonial Quote details */}
                  <div className="space-y-3">
                    {/* Golden dual quotation marks that color-shift gracefully */}
                    <div className="flex justify-center md:justify-start">
                      <span className="text-6xl sm:text-7xl font-[family-name:var(--font-serif)] leading-none text-[#D48F0F]/70 group-hover:text-[#FFDF9B] select-none font-bold transition-colors duration-500 block -mt-2">“ ”</span>
                    </div>
                    
                    <p className="text-base sm:text-[17px] lg:text-[19px] font-[family-name:var(--font-serif)] italic text-[#01140A] group-hover:text-white/95 leading-[1.42] font-light max-w-2xl transition-colors duration-500">
                      {TESTIMONIALS[testimonialIndex].text}
                    </p>

                    <div className="pt-3 border-t border-[#D48F0F]/15 group-hover:border-white/10 transition-colors duration-500">
                      <h4 className="text-xs sm:text-sm tracking-[0.15em] font-bold text-[#D48F0F] group-hover:text-[#FFDF9B] uppercase font-sans transition-colors duration-500">
                        — {TESTIMONIALS[testimonialIndex].name}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-[#524B45] group-hover:text-white/60 font-light mt-0.5 font-sans uppercase tracking-wider transition-colors duration-500">
                        {TESTIMONIALS[testimonialIndex].role}
                      </p>
                    </div>

                    {/* Integrated custom navigation controls color-paired beautifully on hover */}
                    <div className="flex items-center justify-center md:justify-start gap-4 pt-3 select-none">
                      <button 
                        onClick={prevTestimonial}
                        className="w-9 h-9 rounded-full border border-[#D48F0F]/20 bg-white hover:bg-[#D48F0F]/5 text-[#D48F0F] group-hover:bg-white/10 group-hover:border-[#FFDF9B]/35 group-hover:text-white group-hover:hover:bg-white/20 flex items-center justify-center transition-all duration-300 shadow-xs"
                        aria-label="Témoignage précédent"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      
                      <div className="flex gap-1.5">
                        {TESTIMONIALS.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setTestimonialIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === testimonialIndex ? 'bg-[#D48F0F] group-hover:bg-[#FFDF9B]' : 'bg-[#D48F0F]/25 group-hover:bg-white/20'}`}
                            aria-label={`Aller au témoignage ${index + 1}`}
                          />
                        ))}
                      </div>

                      <button 
                        onClick={nextTestimonial}
                        className="w-9 h-9 rounded-full border border-[#D48F0F]/20 bg-white hover:bg-[#D48F0F]/5 text-[#D48F0F] group-hover:bg-white/10 group-hover:border-[#FFDF9B]/35 group-hover:text-white group-hover:hover:bg-white/20 flex items-center justify-center transition-all duration-300 shadow-xs"
                        aria-label="Témoignage suivant"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

          </div>
        </div>
      </section>

      {/* FORMULAIRE TALLY EMBEDDING & NATIVE REGISTRATION GRID */}
      <section id="inscription" className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-2xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-bold tracking-[0.2em] text-[#C38F27] uppercase">RÉSERVEZ VOTRE PLACE</span>
            <h3 className="text-3xl sm:text-4xl font-serif font-light text-[#01140A]">Inscrivez-vous à la prochaine session</h3>
            <p className="text-slate-600 font-light text-sm sm:text-base leading-relaxed">
              Pour réserver votre immersion ou débuter votre audit énergétique, veuillez renseigner vos coordonnées ci-dessous.
            </p>

            {/* Toggle Switch between beautiful native form and physical tally iframe so they can insert external integrations effortlessly */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <span className={`text-xs font-medium tracking-wider transition ${!tallyEmbedMode ? 'text-[#C38F27] font-bold' : 'text-slate-400'}`}>FORMULAIRE INTERACTIF</span>
              <button 
                onClick={() => setTallyEmbedMode(!tallyEmbedMode)}
                className={`relative w-12 h-6.5 rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${tallyEmbedMode ? 'bg-[#C38F27]' : 'bg-slate-300'}`}
              >
                <div className={`w-5.5 h-5.5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${tallyEmbedMode ? 'translate-x-5.5' : 'translate-x-0'}`} />
              </button>
              <span className={`text-xs font-medium tracking-wider transition ${tallyEmbedMode ? 'text-[#C38F27] font-bold' : 'text-slate-400'}`}>CODE EMBED [TALLY]</span>
            </div>
          </div>

          <div className="relative border border-[#C38F27]/15 bg-[#FAF7F2] rounded-[36px] overflow-hidden p-6 sm:p-10 shadow-lg min-h-[500px] flex flex-col justify-center">
            
            {!tallyEmbedMode ? (
              // NATIVE DÉTOX REGISTRATION FORM
              <div className="w-full">
                {formSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6 py-12 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#00351B]/10 flex items-center justify-center mx-auto text-[#00351B]">
                      <Check className="w-10 h-10" strokeWidth={3} />
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-2xl font-serif text-[#00351B]">Demande Envoyée avec Succès !</h4>
                      <p className="text-[#524B45] font-light max-w-md mx-auto text-sm leading-relaxed">
                        Merci beaucoup <strong>{formData.firstName}</strong>. Sissi Gilton va étudier votre profil énergétique et vous recontacter d&apos;ici quelques heures.
                      </p>
                    </div>
                    <div className="pt-4">
                      <button 
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({ firstName:'', lastName:'', email:'', phone:'', dietPreference:'Tous', motivations:'' });
                        }}
                        className="px-6 py-2.5 text-xs tracking-wider rounded-full bg-[#C38F27] text-white hover:bg-[#a6771d] transition"
                      >
                        REFAIRE UNE INSCRIPTION
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold tracking-wider text-slate-700 uppercase" htmlFor="firstName">Prénom *</label>
                        <input 
                          type="text" 
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="w-full bg-white border border-[#C38F27]/20 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-[#C38F27] focus:border-[#C38F27] outline-none transition"
                          placeholder="Françoise"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold tracking-wider text-slate-700 uppercase" htmlFor="lastName">Nom de famille</label>
                        <input 
                          type="text" 
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className="w-full bg-white border border-[#C38F27]/20 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-[#C38F27] focus:border-[#C38F27] outline-none transition"
                          placeholder="Dupont"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold tracking-wider text-slate-700 uppercase" htmlFor="email">Adresse E-mail *</label>
                        <input 
                          type="email" 
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-white border border-[#C38F27]/20 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-[#C38F27] focus:border-[#C38F27] outline-none transition"
                          placeholder="francoise@example.fr"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold tracking-wider text-slate-700 uppercase" htmlFor="phone">Téléphone WhatsApp *</label>
                        <input 
                          type="tel" 
                          id="phone"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-white border border-[#C38F27]/20 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-[#C38F27] focus:border-[#C38F27] outline-none transition"
                          placeholder="+34 699 03 79 98"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wider text-slate-700 uppercase">Avez-vous déjà pratiqué la détox holistique ou le yoga ?</label>
                      <div className="flex flex-wrap gap-3 pt-1">
                        {['Jamais', 'Débutant', 'Régulier', 'Avancé'].map((pref) => (
                          <button
                            key={pref}
                            type="button"
                            onClick={() => setFormData({...formData, dietPreference: pref})}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-colors ${formData.dietPreference === pref ? 'bg-[#C38F27] text-white border-transparent' : 'bg-white text-slate-600 border-[#C38F27]/20 hover:border-[#C38F27]'}`}
                          >
                            {pref}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wider text-slate-700 uppercase" htmlFor="motivations">Vos principales motivations ou attentes (optionnel)</label>
                      <textarea 
                        id="motivations"
                        rows={3}
                        value={formData.motivations}
                        onChange={(e) => setFormData({...formData, motivations: e.target.value})}
                        className="w-full bg-white border border-[#C38F27]/20 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-[#C38F27] focus:border-[#C38F27] outline-none transition resize-none"
                        placeholder="Retrouver mon tonus corporel, clarté mentale et régénération cellulaire..."
                      />
                    </div>

                    <div className="pt-4">
                      <button 
                        type="submit"
                        disabled={formLoading}
                        className="w-full py-4.5 rounded-xl bg-[#00351B] text-white font-semibold text-xs sm:text-sm tracking-widest hover:bg-[#001F0F] hover:scale-[1.01] active:scale-100 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md transition-all duration-300 cursor-pointer"
                      >
                        {formLoading ? (
                          <React.Fragment>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>VÉRIFICATION EN COURS...</span>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <Send className="w-4 h-4 text-white" />
                            <span>RÉSERVEZ VOTRE PREMIÈRE ÉVALUATION HOLISTIQUE OFFERTE*</span>
                          </React.Fragment>
                        )}
                      </button>
                      <div className="mt-3 text-center">
                        <p className="text-[10px] sm:text-xs text-[#01140A]/60 font-light tracking-wide italic">
                          *Cette offre de gratuité est valable jusqu’au 15 août inclus.
                        </p>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              // PHYSICAL TALLY FORM EMBED INTEGRATION (Fully functional iframe inside mockup container)
              <div className="w-full h-full min-h-[500px]">
                <div className="w-full overflow-hidden rounded-2xl bg-white border border-[#C38F27]/15">
                  <header className="bg-slate-50 border-b border-[#C38F27]/5 px-4 py-2 flex justify-between items-center text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5 font-sans">
                      <span className="w-2 C bg-green-500 rounded-full inline-block animate-pulse"></span>
                      Intégration Tally active: tally.so/embed
                    </span>
                    <span className="hidden sm:inline">w-full h-full iframe</span>
                  </header>
                  <iframe 
                    src="https://tally.so/embed/mOdp48?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
                    width="100%" 
                    height="500" 
                    frameBorder="0" 
                    marginHeight={0} 
                    marginWidth={0} 
                    title="Inscription Rejuvalife"
                    className="w-full min-h-[480px] bg-transparent"
                  ></iframe>
                </div>
              </div>
            )}
            
          </div>
          
        </div>
      </section>

      {/* EXQUISITE LOWER RETREAT HIGHLIGHTS RETRAITE DETAIL SECTION */}
      <section className="relative py-28 text-center text-white overflow-hidden" id="voyage-highlight">
        {/* Premium high-resolution background image using Next.js Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://i.ibb.co/yc1rY4SG/Arbre-au-couch-e-du-soleil.avif"
            alt="Arbre magnifique au coucher de soleil"
            fill
            className="object-cover object-center md:object-[center_40%] scale-102"
            sizes="100vw"
            referrerPolicy="no-referrer"
            priority={false}
          />
          {/* Subtle warm overlay allowing the sunset glow and majestic tree to be fully visible and beautiful */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-[#180C03]/35 to-black/65" />
        </div>
        
        {/* Dune curve layout overlay */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-white clip-path-dune shadow-inner z-10" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 space-y-16">
          
          <div className="max-w-3xl mx-auto space-y-8">
            <span className="text-[#FFDF9B] text-xs sm:text-sm tracking-[0.3em] font-bold uppercase select-none block drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
              VOTRE VOYAGE VERS LA DURABILITÉ
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-serif)] font-light leading-tight drop-shadow-[0_2.5px_8px_rgba(0,0,0,0.95)]">
              Une <span className="text-[#FFDF9B] font-[family-name:var(--font-serif)] font-normal italic">expérience de 7 jours</span>,<br className="hidden sm:inline" /> à intégrer à votre rythme sur un mois.
            </h2>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-4">
              <a 
                href="https://wa.me/34699037998" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-full bg-[#00351B] hover:bg-[#001F0F] text-white font-medium text-xs sm:text-[14px] tracking-[0.14em] shadow-xl transform hover:-translate-y-0.5 hover:shadow-2xl active:scale-98 transition-all duration-300 uppercase"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>RÉSERVER SUR WHATSAPP</span>
              </a>
              
              <div className="flex flex-col items-center sm:items-start text-white gap-1 select-all drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                <a href="tel:+34699037998" className="text-xl font-bold tracking-wide hover:text-[#FFDF9B] transition flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#FFDF9B]" />
                  <span>+34 699 03 79 98</span>
                </a>
                <span className="text-xs text-white/90 tracking-wider">{"Réponse immédiate s'adaptant à vos besoins"}</span>
              </div>
            </div>
          </div>

          {/* Under bottom stats list matching mockup 1 lowest footer bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10 max-w-5xl mx-auto">
            
            {/* Item 1 */}
            <div className="space-y-3 group">
              <div className="w-12 h-12 rounded-full border border-[#FFDF9B]/20 bg-white/5 flex items-center justify-center mx-auto text-[#FFDF9B] group-hover:scale-110 transition duration-300">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="text-[10px] tracking-[0.2em] font-bold uppercase text-white/90 group-hover:text-white transition duration-300">7 JOURS DE RETRAITE</h4>
            </div>

            {/* Item 2 */}
            <div className="space-y-3 group">
              <div className="w-12 h-12 rounded-full border border-[#FFDF9B]/20 bg-white/5 flex items-center justify-center mx-auto text-[#FFDF9B] group-hover:scale-110 transition duration-300">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="text-[10px] tracking-[0.2em] font-bold uppercase text-white/90 group-hover:text-white transition duration-300">ACCOMPAGNEMENT PERSO</h4>
            </div>

            {/* Item 3 */}
            <div className="space-y-3 group">
              <div className="w-12 h-12 rounded-full border border-[#FFDF9B]/20 bg-white/5 flex items-center justify-center mx-auto text-[#FFDF9B] group-hover:scale-110 transition duration-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-[10px] tracking-[0.2em] font-bold uppercase text-white/90 group-hover:text-white transition duration-300">RÉSULTATS DURABLES</h4>
            </div>

            {/* Item 4 */}
            <div className="space-y-3 group">
              <div className="w-12 h-12 rounded-full border border-[#FFDF9B]/20 bg-white/5 flex items-center justify-center mx-auto text-[#FFDF9B] group-hover:scale-110 transition duration-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8" />
                </svg>
              </div>
              <h4 className="text-[10px] tracking-[0.2em] font-bold uppercase text-white/90 group-hover:text-white transition duration-300">CORPS, ESPRIT & ÉNERGIE</h4>
            </div>

          </div>

        </div>
      </section>

      {/* COMPACT DETAILED FOOTER WITH SOCIALS */}
      <footer id="contact" className="bg-[#FAF8F5] text-[#01140A] py-20 relative border-t border-[#C38F27]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start text-left">
            
            {/* Brand Logo left side */}
            <div className="md:col-span-4 space-y-6">
              {/* Elegant Brand Logo identical to the top header for perfect alignment */}
              <div className="scale-95 origin-left">
                <BrandLogo />
              </div>
              <p className="text-xs text-[#524B45] leading-relaxed font-light max-w-xs">
                Une invitation holistique à rajeunir de l&apos;intérieur, à travers le souffle, la nutridétox vivante, et le yoga des cellules.
              </p>
              
              {/* Official website button link */}
              <div className="pt-2">
                <a 
                  href="https://www.rejuvalife.fr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C38F27]/25 text-[#00351B] hover:text-[#C38F27] hover:border-[#C38F27] text-xs font-semibold tracking-wider transition uppercase bg-white/50 active:scale-98 shadow-2xs"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Savoir plus : rejuvalife.fr</span>
                </a>
              </div>
            </div>

            {/* Direct Contacts details */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-[11px] tracking-[0.25em] font-bold text-[#C38F27] uppercase font-sans">CONTACT</h4>
              <ul className="space-y-3 font-light text-sm text-[#4A433D]">
                <li className="flex items-center gap-3">
                  <span className="text-[#C38F27]"><Phone className="w-4 h-4" /></span>
                  <a href="tel:+34699037998" className="hover:text-[#CB9225] text-[#01140A] font-medium transition">+34 699 03 79 98</a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#C38F27]"><Mail className="w-4 h-4" /></span>
                  <a href="mailto:contact@rejuvalife.fr" className="hover:text-[#CB9225] text-[#01140A] font-medium transition">contact@rejuvalife.fr</a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#C38F27]"><Globe className="w-4 h-4" /></span>
                  <a 
                    href="https://www.rejuvalife.fr" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[#C38F27] text-[#00351B] font-medium transition underline underline-offset-4 decoration-[#C38F27]/25"
                  >
                    https://www.rejuvalife.fr
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#C38F27]"><MapPin className="w-4 h-4" /></span>
                  <span className="text-[#4A433D]">Tarifa, Andalousie, Espagne</span>
                </li>
              </ul>
            </div>

            {/* Social handles links */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-[11px] tracking-[0.25em] font-bold text-[#C38F27] uppercase font-sans">SUIVEZ-NOUS</h4>
              <p className="text-xs text-[#524B45] font-light mb-4">Rejoignez notre cercle de vitalité et d&apos;ondes positives.</p>
              
              <div className="flex items-center gap-4">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full border border-[#C38F27]/20 hover:border-[#C38F27] bg-white hover:bg-[#FAF8F5] flex items-center justify-center text-[#C38F27] transition duration-300"
                  aria-label="Suivre Sissi sur Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full border border-[#C38F27]/20 hover:border-[#C38F27] bg-white hover:bg-[#FAF8F5] flex items-center justify-center text-[#C38F27] transition duration-300"
                  aria-label="Rejoindre Sissi sur Youtube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href="https://wa.me/34699037998" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full border border-[#C38F27]/20 hover:border-[#C38F27] bg-white hover:bg-[#FAF8F5] flex items-center justify-center text-[#C38F27] transition duration-300"
                  aria-label="Contacter Sissi sur WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* GDPR / RGPD Confidentiality notice block for premium security and confidence */}
          <div className="mt-12 pt-6 border-t border-[#C38F27]/10 text-left">
            <div className="flex items-center gap-2 mb-2 text-[#00351B] font-medium text-xs font-sans">
              <ShieldCheck className="w-4 h-4 text-[#C38F27]" />
              <span className="uppercase tracking-[0.15em] text-[10px]">Protection des données personnelles (RGPD)</span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#6E645A] leading-relaxed font-light font-sans max-w-5xl">
              En soumettant nos formulaires ou en prenant contact, vous acceptez que vos renseignements personnels soient traités exclusivement par REJUVALIFE afin de répondre à votre demande d&apos;informations et d&apos;élaboration de votre profil de cure personnalisé. Vos données de profil de vitalité et de santé globale restent strictement confidentielles et ne seront jamais partagées avec des tiers. Conformément à la réglementation RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et d&apos;effacement en nous contactant directement à <a href="mailto:contact@rejuvalife.fr" className="underline hover:text-[#C38F27]">contact@rejuvalife.fr</a>.
            </p>
          </div>

          {/* Copyright signature */}
          <div className="mt-10 pt-6 border-t border-[#C38F27]/15 flex flex-col sm:flex-row justify-between items-center gap-4 font-light text-[10px] text-[#6E645A] uppercase tracking-widest font-sans">
            <span>© 2026 REJUVALIFE - LONGÉVITÉ & ÉNERGIE</span>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleResetCookies}
                className="hover:text-[#C38F27] underline underline-offset-2 transition cursor-pointer"
              >
                Gérer les cookies
              </button>
              <span className="flex items-center gap-1">
                <span>DESIGN PAR SISSI GILTON</span>
                <span className="text-[#C38F27]">❤</span>
              </span>
            </div>
          </div>

        </div>
      </footer>

      {/* GDPR ANALYTICAL COOKIES CONSENT BANNER */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed bottom-5 right-5 left-5 md:left-auto md:max-w-sm bg-white/95 backdrop-blur-md border border-[#C38F27]/15 p-4 rounded-[18px] shadow-lg z-50 flex flex-col gap-3"
          >
            <div className="flex items-start gap-3">
              <div className="bg-[#FAF8F5] p-1.5 rounded-lg text-[#C38F27] flex-shrink-0">
                <Cookie className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-medium text-[#00351B] font-sans">Cookie & Confidentialité</h4>
                <p className="text-[11px] text-[#6E645A] leading-relaxed font-light">
                  Nous mesurons l&apos;audience de façon anonyme pour améliorer l&apos;expérience. Aucun profil publicitaire n&apos;est créé.
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-1 text-[11px] uppercase tracking-wider font-semibold">
              <button
                onClick={handleDeclineCookies}
                className="text-[#6E645A] hover:text-[#00351B] transition duration-200 cursor-pointer px-1 py-1"
              >
                Refuser
              </button>
              <button
                onClick={handleAcceptCookies}
                className="px-4 py-1.5 rounded-full bg-[#00351B]/8 hover:bg-[#00351B]/15 text-[#00351B] transition duration-200 cursor-pointer"
              >
                Accepter
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
