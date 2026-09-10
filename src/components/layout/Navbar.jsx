<<<<<<< HEAD
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Grid2X2, Plus, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
=======
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
>>>>>>> 24fba4fe240974c10639325577f93e59573c7dd3
import { Link, useLocation } from 'react-router-dom';
import { INVITE_URL, SUPPORT_URL } from '../home/editorialData';

const navLinks = [
  { name: 'Home', to: '/', target: '#home' },
  { name: 'Sound', to: '/', target: '#sound-guide' },
  { name: 'Story', to: '/', target: '#about' },
  { name: 'Features', to: '/', target: '#features' },
  { name: 'Premium', to: '/premium' },
  { name: 'Docs', to: '/docs' },
];

<<<<<<< HEAD
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const reducedMotion = useReducedMotion();
=======
const ease = [0.22, 1, 0.36, 1];

function scrollToTarget(target) {
  if (target === '#home') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    return;
  }

  const element = document.querySelector(target);

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

export default function Navbar({ hidden = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

>>>>>>> 24fba4fe240974c10639325577f93e59573c7dd3
  const location = useLocation();

  // Wait until client mount before creating portal
  useEffect(() => {
<<<<<<< HEAD
    if (!isOpen) return;
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (event) => {
      if (!menuRef.current?.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [isOpen]);
=======
    setMounted(true);
  }, []);
>>>>>>> 24fba4fe240974c10639325577f93e59573c7dd3

  // Detect page scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close mobile menu if navbar becomes hidden
  useEffect(() => {
    if (hidden) {
      setIsOpen(false);
    }
  }, [hidden]);

  // Prevent background scrolling while mobile menu is open
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleSectionClick = (event, target) => {
    setIsOpen(false);
<<<<<<< HEAD
    if (!target || location.pathname !== '/' || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (target === '#home') window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' });
    else document.querySelector(target)?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' });
  };

  return (
    <header className="studio-nav" aria-label="Muzix navigation">
      <Link to="/" state={{ scrollTarget: '#home' }} onClick={(event) => handleSectionClick(event, '#home')} className="studio-nav-brand" aria-label="Muzix home">
        <img src="/images/muzix_new.png" alt="" width="28" height="28" /><span>Muzix</span>
      </Link>
      <div ref={menuRef} className="studio-menu" onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}>
        <button ref={toggleRef} type="button" className="studio-menu-toggle" aria-expanded={isOpen} aria-controls="muzix-navigation" onClick={() => setIsOpen((open) => !open)}>
          <span>{isOpen ? <X size={15} aria-hidden="true" /> : <Grid2X2 size={13} aria-hidden="true" />}{isOpen ? 'Close' : 'Menu'}</span>
          <span className="studio-menu-caption">Discord music bot</span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.nav id="muzix-navigation" aria-label="Main" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }} className="studio-menu-panel">
              <div className="studio-menu-links">
                {navLinks.map((link, index) => (
                  <motion.div key={link.name} initial={reducedMotion ? false : { opacity: 0, y: 12, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: reducedMotion ? 0 : index * 0.035, duration: 0.28 }}>
                    <Link to={link.to} state={link.target ? { scrollTarget: link.target } : undefined} onClick={(event) => handleSectionClick(event, link.target)} aria-current={!link.target && location.pathname === link.to ? 'page' : undefined}>{link.name}<ArrowUpRight size={18} aria-hidden="true" /></Link>
                  </motion.div>
                ))}
                <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer" className="studio-menu-support" onClick={() => setIsOpen(false)}>Support Server <ArrowUpRight size={15} aria-hidden="true" /></a>
=======

    if (!target) return;

    if (location.pathname === '/') {
      event.preventDefault();
      scrollToTarget(target);
    }
  };

  // Don't render before mount OR while loading screen is active
  if (!mounted || hidden) {
    return null;
  }

  const navbar = (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[99999] w-full px-4">
      <motion.header
        initial={{
          y: -32,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.55,
          ease,
        }}
        className="pointer-events-auto mx-auto max-w-7xl"
      >
        <div
          className={`mt-4 border px-4 py-3 transition-all duration-300 md:px-5 ${
            scrolled
              ? 'border-[#f4f1ea]/14 bg-[#050505]/82 shadow-2xl shadow-black/40 backdrop-blur-2xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* LOGO */}
            <Link
              to="/"
              className="editorial-display inline-flex items-center gap-2 text-2xl font-black uppercase leading-none tracking-normal text-[#f4f1ea] transition-colors hover:text-white"
              onClick={(event) => {
                setIsOpen(false);

                if (location.pathname === '/') {
                  event.preventDefault();

                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }
              }}
            >
              <img
                src="/images/muzix_new.png"
                alt="Muzix"
                className="h-8 w-8 object-contain"
              />

              Muzix
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => {
                const isRouteActive =
                  !link.target && location.pathname === link.to;

                const isHomeActive =
                  link.target === '#home' &&
                  location.pathname === '/';

                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    state={
                      link.target
                        ? {
                            scrollTarget: link.target,
                          }
                        : undefined
                    }
                    onClick={(event) =>
                      handleSectionClick(event, link.target)
                    }
                    className={`text-xs font-semibold uppercase transition-colors ${
                      isRouteActive || isHomeActive
                        ? 'text-[#f4f1ea]'
                        : 'text-[#f4f1ea]/58 hover:text-[#f4f1ea]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* DESKTOP CTA */}
            <div className="hidden items-center gap-3 md:flex">
              <a
                href={INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center justify-center gap-2 border border-[#f4f1ea]/35 px-4 py-2 text-xs font-bold uppercase text-[#f4f1ea] transition-all duration-300 hover:border-accent-primary hover:bg-accent-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
              >
                Invite Bot

                <ArrowUpRight
                  size={14}
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              aria-label={
                isOpen
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
              aria-expanded={isOpen}
              onClick={() => {
                setIsOpen((open) => !open);
              }}
              className="inline-flex h-11 w-11 items-center justify-center border border-[#f4f1ea]/20 text-[#f4f1ea] transition-colors hover:border-[#f4f1ea] md:hidden"
            >
              {isOpen ? (
                <X size={22} aria-hidden="true" />
              ) : (
                <Menu size={22} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.22,
                ease,
              }}
              className="mt-2 border border-[#f4f1ea]/14 bg-[#050505]/94 p-4 shadow-2xl shadow-black/50 backdrop-blur-2xl md:hidden"
            >
              <div className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    state={
                      link.target
                        ? {
                            scrollTarget: link.target,
                          }
                        : undefined
                    }
                    onClick={(event) =>
                      handleSectionClick(event, link.target)
                    }
                    className="border-b border-[#f4f1ea]/10 py-4 text-sm font-bold uppercase text-[#f4f1ea]/72 transition-colors hover:text-[#f4f1ea]"
                  >
                    {link.name}
                  </Link>
                ))}

                <a
                  href={INVITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 border border-[#f4f1ea] bg-[#f4f1ea] px-5 py-3 text-sm font-bold uppercase text-[#050505]"
                >
                  Invite Bot

                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                  />
                </a>
>>>>>>> 24fba4fe240974c10639325577f93e59573c7dd3
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
      <a href={INVITE_URL} target="_blank" rel="noopener noreferrer" className="studio-nav-invite"><Plus size={16} aria-hidden="true" /><span>Invite Bot</span></a>
    </header>
  );

  return createPortal(navbar, document.body);
}
