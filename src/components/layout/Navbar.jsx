import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Grid2X2, Plus, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
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

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const location = useLocation();

  useEffect(() => {
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

  const handleSectionClick = (event, target) => {
    setIsOpen(false);
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
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
      <a href={INVITE_URL} target="_blank" rel="noopener noreferrer" className="studio-nav-invite"><Plus size={16} aria-hidden="true" /><span>Invite Bot</span></a>
    </header>
  );
}

export default function Navbar({ hidden = false }) {
  const location = useLocation();

  if (hidden || typeof document === 'undefined') return null;

  // Keep fixed positioning independent of page transforms; reset menus on navigation.
  return createPortal(<Navigation key={location.key} />, document.body);
}
