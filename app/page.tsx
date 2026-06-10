'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Gift, 
  Star,
  X,
  Menu,
  Facebook,
  Youtube
} from 'lucide-react';
import Image from 'next/image';

// Custom TikTok SVG Icon
const TikTokIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.15 1.13 1.21 2.68 1.93 4.3 2.07v3.91c-1.25-.09-2.47-.56-3.48-1.3-.98-.72-1.72-1.74-2.11-2.9-.03 1.86-.02 3.71-.02 5.56 0 2.1-.44 4.19-1.37 6.07-.98 1.91-2.54 3.46-4.46 4.39-1.92.93-4.1.13-5.91-.65-1.83-.8-3.32-2.22-4.19-3.99-.95-1.97-1.12-4.32-.47-6.39.63-1.97 2.01-3.63 3.82-4.57 1.76-.92 3.87-1.13 5.76-.58v4.06c-1.1-.42-2.37-.3-3.37.34-.94.62-1.53 1.67-1.58 2.79-.04 1.33.66 2.6 1.78 3.25 1.05.61 2.39.59 3.4-.07.96-.64 1.48-1.77 1.48-2.91V.02z" />
  </svg>
);

// Green styled WhatsApp Outline Icon
const WhatsAppIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.1 1.4 4.8 1.4 5.3 0 9.7-4.3 9.7-9.7 0-2.6-1-5-2.8-6.8-1.8-1.8-4.2-2.8-6.9-2.8-5.3 0-9.7 4.3-9.7 9.7 0 1.8.5 3.5 1.4 5l-.3 1.1-.3 1 1-.3zm11.2-6.2c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6s.3-.3.4-.5c.1-.1.2-.3.2-.4s0-.3-.1-.5c-.1-.2-.7-1.6-.9-2.1-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.7.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4s-.3-.2-.6-.3z" />
  </svg>
);

// List of 14 premium nature & well-being slides
const SLIDES = [
  { id: 1, url: 'https://i.ibb.co/GfxWq7L7/Apana-et-Prana.png', alt: 'Apana-et-Prana-equilibre-sante-longevite', title: 'Apana & Prana', desc: 'L’équilibre subtil des souffles ascendant et descendant pour harmoniser le corps.' },
  { id: 2, url: 'https://i.ibb.co/PGPWqLNX/audio-1-Kumbhaka-natural-wind-oce-an-life.png', alt: 'audio-1-Kumbhaka-respiration-detox', title: 'Le Souffle de l’Océan', desc: 'Session audio sur le vent naturel, l’océan et la fluidité de la vie en nous.' },
  { id: 3, url: 'https://i.ibb.co/jkhFPpP1/audio-2-kumbhaka-meditacion.png', alt: 'audio-2-kumbhaka-meditacion-silence-interieur', title: 'Kumbhaka Méditation', desc: 'L’immensité du silence intérieur à travers les rétentions de souffle guidées.' },
  { id: 4, url: 'https://i.ibb.co/Zp9wRZKJ/audio-3-respirer-autrement.png', alt: 'audio-3-respirer-autrement-vitalite', title: 'Respirer Autrement', desc: 'Changer sa physiologie et reprogrammer son système nerveux au quotidien.' },
  { id: 5, url: 'https://i.ibb.co/4wccn08q/audio-4-kushi-relacher-les-tensions.png', alt: 'audio-4-kushi-relaxation-profonde', title: 'Relâcher les Tensions', desc: 'Protocole Kushi pour se libérer des blocages musculaires et mentaux accumulés.' },
  { id: 6, url: 'https://i.ibb.co/9RYSZ81/audio-5-rassambler-nergie.png', alt: 'audio-5-rassambler-energie-concentration', title: 'Rassembler l’Énergie', desc: 'Canaliser et condenser le Prana pour unifier vos forces intérieures.' },
  { id: 7, url: 'https://i.ibb.co/sJFYtZmr/audio-6-nourrir-l-int-rieur.png', alt: 'audio-6-nourrir-l-interieur-vitalite', title: 'Nourrir l’Intérieur', desc: 'Nourrir l’organisme en profondeur par la conscience et l’énergie pure.' },
  { id: 8, url: 'https://i.ibb.co/0SMLkY0/audio-7int-grer.png', alt: 'audio-7-integrer-bienfaits-durables', title: 'Intégration Somatique', desc: 'Ancrer les transformations cellulaires de la retraite pour le long terme.' },
  { id: 9, url: 'https://i.ibb.co/Z1pG2PtG/Kumbhaka-Yoga-les-pranas.png', alt: 'Kumbhaka-Yoga-les-pranas-circulation', title: 'Yoga Kumbhaka & Pranas', desc: 'Renouer avec les postures clés qui libèrent et amplifient l’énergie vitale.' },
  { id: 10, url: 'https://i.ibb.co/7Jwr92vJ/Mobilite-re-ge-ne-ration-longe-vite.png', alt: 'Mobilite-re-ge-ne-ration-longe-vite', title: 'Mobilité, Régénération & Longévité', desc: 'Mouvements fluides étudiés pour relâcher les fascias et stimuler la vitalité.' },
  { id: 11, url: 'https://i.ibb.co/fzY9r3zK/nettoyage-nasal.png', alt: 'nettoyage-nasal-hygiene-yogique', title: 'Nettoyage Nasal Sacré', desc: 'Purification délicate des voies respiratoires pour une clarté mentale immédiate.' },
  { id: 12, url: 'https://i.ibb.co/QjjW8BM2/Respiration-et-Nettoyage-abdominale-e-nergie-detox-force.png', alt: 'Respiration-et-Nettoyage-abdominale', title: 'Détox Abdominale', desc: 'Shatkarmas physiques et massage des organes digestifs pour éliminer les toxines.' },
  { id: 13, url: 'https://i.ibb.co/YBZzgGnm/video-1-yoga-Kumbhaka-Rotacions.png', alt: 'video-1-yoga-Kumbhaka-Rotacions', title: 'Rotations & Fascias', desc: 'Délier la colonne et libérer les méridiens d’énergie par de douces rotations.' },
  { id: 14, url: 'https://i.ibb.co/4n26g1xp/video-2-Humming.png', alt: 'video-2-Humming-vibration', title: 'Le Chant du Humming', desc: 'Vibration sonore apaisante pour stimuler instantanément le nerf vague.' }
];

const TESTIMONIALS = [
  { id: 1, name: 'FRANÇOISE', role: 'Participante Rejuvalife', text: 'Cette retraite a changé ma vie. J’ai retrouvé une énergie incroyable, ma peau est plus lumineuse, mon corps plus léger et mon esprit en paix.', avatar: 'https://i.ibb.co/YFmwtjL6/Francoise-cliente.jpg' }
];

// Updated Logo using your official transparent image url
const BrandLogo = () => (
  <div className="flex items-center gap-3 select-none">
    <div className="relative w-16 h-16 flex-shrink-0">
      <Image 
        src="https://i.ibb.co/BV5WJ1wX/logo-Rejuvalife.png" 
        alt="Logo Rejuvalife Medallion" 
        fill 
        className="object-contain"
      />
    </div>
  </div>
);

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handlePrev = () => { setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1)); };
  const handleNext = () => { setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1)); };

  useEffect(() => {
    const timer = setInterval(() => { handleNext(); }, 4500);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEndX(e.touches[0].clientX);
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

  const scrollToAnchor = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAF8F5] text-[#01140A] antialiased min-h-screen">
      
      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#C38F27]/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div onClick={() => scrollToAnchor('hero')} className="cursor-pointer">
            <BrandLogo />
          </div>
          <nav className="hidden lg:flex items-center gap-10 text-xs tracking-widest font-medium text-[#01140A]/75">
            <button onClick={() => scrollToAnchor('hero')} className="hover:text-[#C38F27] transition">ACCUEIL</button>
            <button onClick={() => scrollToAnchor('programme')} className="hover:text-[#C38F27] transition">PROGRAMME</button>
            <button onClick={() => scrollToAnchor('temoignages')} className="hover:text-[#C38F27] transition">TÉMOIGNAGES</button>
            <button onClick={() => scrollToAnchor('inscription')} className="hover:text-[#C38F27] transition">S'INSCRIRE</button>
          </nav>
          <div className="hidden sm:flex items-center">
            <a href="https://wa.me/34699037998" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00351B] text-white text-xs font-semibold hover:bg-[#001F0F] transition">
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>RÉSERVER SUR WHATSAPP</span>
            </a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-[#01140A]">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative overflow-hidden pt-12 pb-20 lg:py-24 min-h-[calc(100vh-90px)] flex items-center bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6 z-20">
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#D48F0F] block">RETRAITE DÉTOX & RÉGÉNÉRATION</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[#01140A] leading-tight">
                Retrouvez votre <span className="font-normal text-[#00351B]">énergie naturelle</span>, c'est possible.
              </h1>
              <p className="text-base text-[#4A433D] leading-relaxed">
                7 jours pour purifier votre corps, apaiser votre esprit et relancer votre vitalité profonde.
              </p>
              <div className="flex flex-col items-start gap-4 pt-2">
                <a href="https://wa.me/34699037998" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#00351B] text-white font-medium text-xs tracking-wider shadow-md hover:bg-[#001F0F] transition-all">
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>RÉSERVER SUR WHATSAPP</span>
                </a>
                <a href="tel:+34699037998" className="text-lg font-bold text-[#D48F0F] hover:text-[#00351B] transition pl-1">+34 699 03 79 98</a>
              </div>
            </div>
            <div className="lg:col-span-7 relative h-[400px] sm:h-[500px] lg:h-[600px] w-full">
              <div className="relative w-full h-full rounded-[40px] overflow-hidden shadow-xl">
                <Image src="https://i.ibb.co/xSJ7cVTL/Sissi-yogi.jpg" alt="Sissi Gilton Yogi, Rejuvalife" fill className="object-cover object-right-bottom saturate-[1.2]" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM & SLIDER SECTION */}
      <section id="programme" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold tracking-widest text-[#D48F0F] block">LE PROGRAMME</span>
              <h2 className="text-3xl font-serif font-normal text-[#01140A]">Une approche holistique pour des résultats profonds</h2>
              <div className="space-y-3 text-sm font-medium">
                {['Alimentation détox & anti-inflammatoire', 'Jeûne intermittent & nutrition fonctionnelle', 'Yoga, méditation & respiration Kumbhaka', 'Accompagnement personnalisé'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#00351B]/10 flex items-center justify-center text-[#00351B]"><Check className="w-3.5 h-3.5" /></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#FAF8F5] p-5 rounded-2xl flex items-start gap-4 border border-[#D48F0F]/10">
                <Gift className="w-8 h-8 text-[#D48F0F] flex-shrink-0" />
                <div>
                  <span className="bg-[#D48F0F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider">BONUS OFFERT</span>
                  <p className="text-xs mt-1 text-[#4A433D]">Accès immédiat au protocole exclusif de préparation avant la retraite.</p>
                </div>
              </div>
            </div>

            {/* DYNAMIC IMAGE SLIDER */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative h-[350px] sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-lg bg-[#FAF8F5]" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                <AnimatePresence mode="wait">
                  <motion.div key={currentIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="relative w-full h-full">
                    <Image src={SLIDES[currentIndex].url} alt={SLIDES[currentIndex].alt} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                      <h3 className="text-lg font-serif font-bold">{SLIDES[currentIndex].title}</h3>
                      <p className="text-xs text-white/80 max-w-md">{SLIDES[currentIndex].desc}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition"><ChevronLeft className="w-5 h-5" /></button>
                <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition"><ChevronRight className="w-5 h-5" /></button>
              </div>
              <div className="flex justify-center gap-1.5 overflow-x-auto py-2">
                {SLIDES.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrentIndex(idx)} className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'w-6 bg-[#00351B]' : 'w-1.5 bg-gray-300'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="temoignages" className="py-20 bg-[#FAF8F5] border-t border-[#D48F0F]/10">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs font-bold tracking-widest text-[#D48F0F] block">TÉMOIGNAGES</span>
          <div className="flex justify-center text-[#D48F0F]"><Star className="w-5 h-5 fill-current" /> <Star className="w-5 h-5 fill-current" /> <Star className="w-5 h-5 fill-current" /> <Star className="w-5 h-5 fill-current" /> <Star className="w-5 h-5 fill-current" /></div>
          <p className="text-xl sm:text-2xl font-serif italic text-[#00351B] leading-relaxed">"{TESTIMONIALS[0].text}"</p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#D48F0F]/30">
              <Image src={TESTIMONIALS[0].avatar} alt={TESTIMONIALS[0].name} fill className="object-cover" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-[#01140A] tracking-wider">{TESTIMONIALS[0].name}</h4>
              <p className="text-xs text-[#4A433D]">{TESTIMONIALS[0].role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM INSCRIPTION SECTION (TALLY EMBED READY) */}
      <section id="inscription" className="py-20 bg-white border-t border-[#D48F0F]/10">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-widest text-[#D48F0F] block">INSCRIPTION</span>
            <h2 className="text-3xl font-serif text-[#00351B]">Rejoignez la prochaine session</h2>
            <p className="text-sm text-[#4A433D]">Remplissez le formulaire ci-dessous pour postuler à la retraite.</p>
          </div>

          {/* ========================================================================= */}
          {/* ENCART : INSERER LE CODE D'EMBED TALLY ICI ULTERIEUREMENT                */}
          {/* ========================================================================= */}
          <div id="tally-form" className="w-full bg-[#FAF8F5] border border-dashed border-[#D48F0F]/30 rounded-3xl p-12 flex flex-col items-center justify-center min-h-[400px]">
            <p className="text-sm text-[#4A433D] font-medium">Votre formulaire d'inscription apparaîtra ici.</p>
            <p className="text-xs text-[#C38F27] mt-1">L'emplacement Tally est prêt et configuré.</p>
          </div>
          {/* ========================================================================= */}

        </div>
      </section>

      {/* FOOTER WITH YOUR REAL SOCIALS */}
      <footer className="bg-[#00351B] text-white/80 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-white font-serif font-bold tracking-wider text-lg">REJUVALIFE</h3>
            <p className="text-xs text-white/60 mt-1">© {new Date().getFullYear()} Rejuvalife. Tous droits réservés.</p>
          </div>
          
          {/* REAL SOCIAL MEDIA NETWORKS */}
          <div className="flex items-center gap-6">
            <a href="https://www.facebook.com/sissi.gilton" target="_blank" rel="noopener noreferrer" className="hover:text-[#C38F27] text-white transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.tiktok.com/@sissi999gilton" target="_blank" rel="noopener noreferrer" className="hover:text-[#C38F27] text-white transition-colors" aria-label="TikTok">
              <TikTokIcon className="w-5 h-5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[#C38F27] text-white transition-colors opacity-40 cursor-not-allowed" aria-label="YouTube">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="https://wa.me/34699037998" target="_blank" rel="noopener noreferrer" className="hover:text-[#C38F27] text-white transition-colors" aria-label="WhatsApp">
              <WhatsAppIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
