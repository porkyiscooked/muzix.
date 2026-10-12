import { useEffect, useRef, useState } from 'react';
import { animate, createScope, stagger } from 'animejs';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, AudioLines, Check, Copy, Heart, Headphones, Star } from 'lucide-react';
import { INVITE_URL, WEBPLAYER_URL, SUPPORT_URL, featureSpecimens, soundAttractions } from './editorialData';
import WeightChartFeatures from './WeightChartFeatures';
import MiduTestimonials from './MiduTestimonials';
import CreatorChapter from './CreatorChapter';
import scrollToSection from '../../utils/scrollToSection';
import MusicRibbon from './MusicRibbon';

function Reveal({ children, className = '' }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

export function IdolActions() {
  return <div className="idol-actions"><a className="idol-button" href={INVITE_URL} target="_blank" rel="noreferrer"><Headphones size={18} /> Invite Muzix <ArrowUpRight size={17} /></a><a className="idol-button secondary" href={WEBPLAYER_URL} target="_blank" rel="noreferrer">Open Webplayer <ArrowUpRight size={17} /></a></div>;
}

function CommandCard({ item, index }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(item.command);
      setCopied(true); setError('');
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch { setError('Select the command to copy it.'); }
  }
  return <Reveal><article className="idol-command"><div className="command-index"><span>TRACK / {String(index + 1).padStart(2, '0')}</span>{item.command.startsWith('/') ? <button onClick={copy} aria-label={`Copy ${item.command}`} title={`Copy ${item.command}`}>{copied ? <Check size={18} /> : <Copy size={18} />}</button> : <Heart size={18} />}</div><h3>{item.command}</h3><p>{item.description}</p><span className="copy-status" role="status">{copied ? 'Copied!' : error}</span></article></Reveal>;
}

export default function AnimeHome() {
  const root = useRef(null);
  const hero = useRef(null);
  const reduced = useReducedMotion();
  const [mood, setMood] = useState(0);
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const moods = [
    { label: 'Press play', title: 'Every room deserves an opening theme.', features: [6, 7] },
    { label: 'Find your people', title: 'One song becomes a whole night.', features: [0, 3, 4] },
    { label: 'Make it yours', title: 'Same server. A different feeling.', features: [1, 2, 5] },
  ];
  useEffect(() => {
    if (reduced) return;
    const scope = createScope({ root }).add(() => {
      animate('.idol-title-letter', { y: [65, 0], opacity: [0, 1], rotate: [5, 0], delay: stagger(70, { start: 450 }), duration: 950, ease: 'out(4)' });
      animate('.idol-hero-stamp', { rotate: [-10, 0], scale: [0.85, 1], duration: 1000, delay: 700, ease: 'out(3)' });
    });
    return () => scope.revert();
  }, [reduced]);

  return <div className="idol-home" ref={root}>
    <section id="home" className="idol-hero" ref={hero}>
      <motion.img className="idol-hero-art" src="/images/muzix-hero-wave.webp" alt="Muzix waving hello while listening through her headphones" fetchPriority="high" width="900" height="1350" style={reduced ? undefined : { y: imageY }} />
      <div className="idol-hero-top"><span><span className="live-dot" /> YOUR DISCORD MUSIC BOT</span><span>EST. IN YOUR VOICE CHANNEL <Star size={14} /></span></div>
      <div className="idol-hero-copy"><div className="idol-hero-stamp"><AudioLines size={19} /> Music lives closer to you.</div><h1 aria-label="Muzix">{'MUZIX'.split('').map((letter, index) => <span className="idol-title-letter" aria-hidden="true" key={index}>{letter}</span>)}<span className="title-star" aria-hidden="true">*</span></h1><p>Your server. Your soundtrack.<br />A little more music. A lot more together.</p><IdolActions /></div>
      <button className="idol-scroll" onClick={() => scrollToSection('#about')} aria-label="Explore Muzix"><ArrowDown size={21} /></button>
      <div className="hero-issue">THE MUZIX PROJECT / VOL. 01</div>
    </section>

    <MusicRibbon />

    <section className="idol-intro idol-section" id="about"><Reveal><p className="idol-label">01 / MEET YOUR NEW MUSIC COMPANION</p><h2>A soundtrack for<br />your <em>main-character</em> moments.</h2></Reveal><Reveal className="intro-aside"><Heart size={28} /><p>Muzix turns simple Discord commands into a shared listening experience. High-quality playback, smart queues, playlists, filters, lyrics, and autoplay. All in the place your friends already call home.</p><a href={SUPPORT_URL} target="_blank" rel="noreferrer" className="idol-link">Meet the community <ArrowUpRight size={18} /></a></Reveal></section>

    <section className="idol-guide idol-section" id="sound-guide">
      <div className="idol-portrait"><img src="/images/muzix-idol-portrait.webp" alt="Muzix's silver-haired, blue-eyed character wearing her red Muzix headphones" width="1254" height="1254" loading="lazy" /><div className="portrait-caption"><span>YOUR PLUS ONE<br />FOR EVERY PLAYLIST.</span><Heart size={26} /></div></div>
      <div className="idol-guide-copy"><p className="idol-label">02 / SOUND CHECK</p><div className="idol-tabs" role="tablist" aria-label="Explore music features">{moods.map((item, index) => <button key={item.label} role="tab" id={`mood-tab-${index}`} aria-selected={mood === index} aria-controls="mood-panel" tabIndex={mood === index ? 0 : -1} onKeyDown={event => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (mood + (event.key === 'ArrowRight' ? 1 : 2)) % 3; setMood(next); document.getElementById(`mood-tab-${next}`)?.focus(); } }} onClick={() => setMood(index)}>{item.label}</button>)}</div><motion.div id="mood-panel" role="tabpanel" aria-labelledby={`mood-tab-${mood}`} key={mood} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}><h2>{moods[mood].title}</h2><div id="overlap" className="idol-feature-list">{moods[mood].features.map(index => <div key={index}><span>{soundAttractions[index].command}</span><h3>{soundAttractions[index].title}</h3><p>{soundAttractions[index].body}</p></div>)}</div></motion.div></div>
    </section>

    <section className="idol-commands idol-section" id="features"><div className="idol-section-heading"><Reveal><p className="idol-label">03 / THE SETLIST</p><h2>Small commands.<br /><em>Big feelings.</em></h2></Reveal><p>From your first track to the encore.<br />Everything you need, right inside Discord.</p></div><div className="idol-command-grid">{featureSpecimens.map((item, index) => <CommandCard key={item.command} item={item} index={index} />)}</div></section>

    <WeightChartFeatures />
    <MiduTestimonials />
    <CreatorChapter />

    <section className="idol-finale" id="timeline"><img src="/images/muzix-logo-hug.webp" alt="Muzix hugging a plush Muzix logo with a pastel blue record beside her" width="1100" height="1100" loading="lazy" /><div className="idol-finale-copy"><Reveal><p className="idol-label">ONE MORE SONG?</p><h2>Your friends.<br />Your favourite songs.<br /><em>Your Muzix.</em></h2><p>Invite Muzix and turn your Discord server into a shared music room.</p><IdolActions /></Reveal></div></section>
  </div>;
}
