import { ArrowUp, ArrowUpRight, Heart } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { INVITE_URL, SUPPORT_URL } from '../home/editorialData';
import scrollToSection from '../../utils/scrollToSection';

const columns = [
  { title: 'Explore', links: [['Home', '/', '#home'], ['About', '/', '#about'], ['Sound guide', '/', '#sound-guide'], ['Commands', '/', '#features'], ['Premium', '/premium'], ['Docs', '/docs']] },
  { title: 'The setlist', links: [['High-quality playback', '/', '#sound-guide'], ['Smart queue', '/', '#overlap'], ['Audio filters', '/', '#features'], ['Lyrics', '/', '#features'], ['Autoplay', '/', '#timeline']] },
  { title: 'Stay close', links: [['Hollow Hearts', SUPPORT_URL], ['Vote on Top.gg', 'https://top.gg/bot/1328272164423729233/vote'], ['Invite Bot', INVITE_URL]] },
];

export default function Footer() {
  const location = useLocation();
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const scrollProgress = useTransform(() => scrollYProgress.get());
  const progress = useSpring(scrollProgress, { stiffness: 85, damping: 28, mass: 0.5 });
  // Cover most of the distance early, then settle gently as the footer fills the view.
  const y = useTransform(progress, value => 96 * Math.pow(1 - Math.max(0, Math.min(1, value)), 3));
  const opacity = useTransform(progress, [0, 0.55, 1], [0.65, 1, 1]);
  return <footer ref={ref} className="idol-footer"><motion.div style={reduced ? undefined : { y, opacity }}><div className="footer-top"><div><Link to="/" className="footer-brand"><img src="/images/muzix_new.png" width="34" height="34" alt="" /> Muzix</Link><p>A little music.<br />A little magic.<br />A whole lot of us.</p><Heart size={24} /></div>{columns.map(column => <nav key={column.title} aria-label={column.title}><h2>{column.title}</h2>{column.links.map(([label, href, target]) => href.startsWith('http') ? <a key={label} href={href} target="_blank" rel="noreferrer">{label}<ArrowUpRight size={14} /></a> : <Link key={label} to={href} state={target ? { scrollTarget: target } : undefined} onClick={event => { if (target && location.pathname === '/' && !event.metaKey && !event.ctrlKey) { event.preventDefault(); scrollToSection(target); } }}>{label}</Link>)}</nav>)}</div><div className="footer-signoff"><span>Made for listening. Together.</span><button aria-label="Back to top" title="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' })}><ArrowUp size={22} /></button></div><div className="footer-wordmark" aria-hidden="true">MUZIX<span>*</span></div><div className="footer-legal"><span>{new Date().getFullYear()} Muzix. All rights reserved.</span><span>Developed by Sam</span><div><Link to="/docs" state={{ scrollTarget: '#terms' }}>Terms</Link><Link to="/docs" state={{ scrollTarget: '#privacy' }}>Privacy Policy</Link></div></div></motion.div></footer>;
}
