import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { INVITE_URL, WEBPLAYER_URL, SUPPORT_URL } from './editorialData';
import ShaderGradientBackground from './ShaderGradientBackground';
import StoryReveal from './StoryReveal';
import scrollToSection from '../../utils/scrollToSection';

export default function MiduStyleHero({ sharedAtmosphere = false }) {
  const reducedMotion = useReducedMotion();
  return (
    <section id="home" className="music-hero">
      {!sharedAtmosphere && <ShaderGradientBackground variant="heroRedShader" intensity="heroRedShader" fallback={false} priority canvasClassName="hero-water-shader-canvas" />}
      <div className="music-hero-top">
        <StoryReveal>
          <p className="story-eyebrow"><span className="signal-dot" /> Muzix / Discord music bot</p>
          <h1>One room.<br />A shared <em>rhythm.</em></h1>
        </StoryReveal>
        <StoryReveal className="music-hero-intro">
          <p>Music for servers that want to sound alive.</p>
          <p className="story-muted">High-quality playback. A queue for everyone. The controls you need, right inside Discord.</p>
          <div className="story-actions">
            <a className="story-button" href={INVITE_URL} target="_blank" rel="noopener noreferrer">Invite Muzix <ArrowUpRight size={18} /></a>
            <a className="story-text-link" href={WEBPLAYER_URL} target="_blank" rel="noopener noreferrer">Open Webplayer <ArrowUpRight size={16} /></a>
          </div>
        </StoryReveal>
      </div>
      <div className="music-hero-caption">
        <span>Play. Queue. Filter. Repeat.</span>
        <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">For every voice room <ArrowUpRight size={14} /></a>
        <button type="button" onClick={() => scrollToSection('#about', reducedMotion ? 'instant' : 'smooth')}>The story starts here <ArrowDown size={16} /></button>
      </div>
      <div className="music-hero-brand" aria-hidden="true">
        <svg viewBox="0 0 1200 300" preserveAspectRatio="none">
          <defs>
            <filter id="music-glass" x="-2%" y="-5%" width="104%" height="110%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" result="noise" />
              <feColorMatrix in="noise" type="saturate" values="0" />
              <feComponentTransfer><feFuncA type="linear" slope="0.06" /></feComponentTransfer>
              <feComposite operator="in" in2="SourceGraphic" result="grain" />
              <feBlend in="SourceGraphic" in2="grain" mode="soft-light" />
            </filter>
          </defs>
          <text x="12" y="281" textLength="1176" lengthAdjust="spacingAndGlyphs" fontSize="376" fontWeight="900" fontFamily="Inter, Helvetica Neue, Arial, sans-serif" filter="url(#music-glass)">MUZIX</text>
        </svg>
      </div>
      <div className="music-hero-bottom"><span>01 / The beginning</span><span>Made for listening. Together.</span></div>
    </section>
  );
}
