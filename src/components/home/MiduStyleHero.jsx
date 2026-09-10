import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { INVITE_URL, WEBPLAYER_URL, SUPPORT_URL } from './editorialData';
import ShaderGradientBackground from './ShaderGradientBackground';

export default function MiduStyleHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="home" className="muzix-studio-hero relative isolate -mt-24 overflow-hidden bg-black text-white">
      <ShaderGradientBackground variant="heroRedShader" intensity="heroRedShader" fallback={false} priority canvasClassName="hero-water-shader-canvas" />
      <div className="studio-hero-content">
        <motion.div initial={reducedMotion ? false : { opacity: 0, y: 18, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="studio-hero-statement">
          <h1>Music for servers that want to sound alive.</h1>
          <div className="studio-hero-actions">
            <a href={INVITE_URL} target="_blank" rel="noopener noreferrer">Invite Muzix <ArrowUpRight size={15} aria-hidden="true" /></a>
            <a href={WEBPLAYER_URL} target="_blank" rel="noopener noreferrer">Open Webplayer <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
        </motion.div>
        <div className="studio-hero-meta">
          <span>Discord music bot</span>
          <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">For every voice room <ArrowUpRight size={13} aria-hidden="true" /></a>
          <button type="button" onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' })} aria-label="Explore Muzix">Scroll to explore <ArrowDown size={14} aria-hidden="true" /></button>
        </div>
      </div>
      <div className="studio-hero-wordmark studio-hero-wordmark-base" aria-hidden="true">
        <svg viewBox="0 0 1200 370" preserveAspectRatio="none" className="h-full w-full overflow-visible">
          <text x="6" y="345" textLength="1188" lengthAdjust="spacingAndGlyphs" fontSize="465" fontWeight="900" fontFamily="Inter, Helvetica Neue, Arial, sans-serif">MUZIX</text>
        </svg>
      </div>
      <div className="studio-hero-wordmark" aria-hidden="true">
        <svg viewBox="0 0 1200 370" preserveAspectRatio="none" className="h-full w-full overflow-visible">
          <defs>
            <filter id="hero-wordmark-grain" x="-5%" y="-10%" width="110%" height="120%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" result="noise" />
              <feColorMatrix in="noise" type="saturate" values="0" />
              <feComponentTransfer><feFuncA type="linear" slope="0.1" /></feComponentTransfer>
              <feComposite operator="in" in2="SourceGraphic" result="grain" />
              <feBlend in="SourceGraphic" in2="grain" mode="soft-light" />
            </filter>
          </defs>
          <text x="6" y="345" textLength="1188" lengthAdjust="spacingAndGlyphs" fontSize="465" fontWeight="900" fontFamily="Inter, Helvetica Neue, Arial, sans-serif" filter="url(#hero-wordmark-grain)">MUZIX</text>
        </svg>
      </div>
    </section>
  );
}
