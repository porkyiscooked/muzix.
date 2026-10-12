import { ArrowUp, ArrowUpRight, Heart } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { INVITE_URL, SUPPORT_URL } from '../home/editorialData';
import scrollToSection from '../../utils/scrollToSection';

const columns = [
  { title: 'Explore', links: [['Home', '/', '#home'], ['About', '/', '#about'], ['Sound guide', '/', '#sound-guide'], ['Commands', '/', '#features'], ['Premium', '/premium'], ['Docs', '/docs']] },
  { title: 'The setlist', links: [['High-quality playback', '/', '#sound-guide'], ['Smart queue', '/', '#overlap'], ['Audio filters', '/', '#features'], ['Lyrics', '/', '#features'], ['Autoplay', '/', '#timeline']] },
  { title: 'Stay close', links: [['Support Server', SUPPORT_URL], ['Vote on Top.gg', 'https://top.gg/bot/1328272164423729233/vote'], ['Invite Bot', INVITE_URL]] },
];

export default function Footer() {
  const location = useLocation();
  const reduced = useReducedMotion();
  return <footer className="idol-footer"><motion.div initial={reduced ? false : { y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}><div className="footer-top"><div><Link to="/" className="footer-brand"><img src="/images/muzix_new.png" width="34" height="34" alt="" /> Muzix</Link><p>A little music.<br />A little magic.<br />A whole lot of us.</p><Heart size={24} /></div>{columns.map(column => <nav key={column.title} aria-label={column.title}><h2>{column.title}</h2>{column.links.map(([label, href, target]) => href.startsWith('http') ? <a key={label} href={href} target="_blank" rel="noreferrer">{label}<ArrowUpRight size={14} /></a> : <Link key={label} to={href} state={target ? { scrollTarget: target } : undefined} onClick={event => { if (target && location.pathname === '/' && !event.metaKey && !event.ctrlKey) { event.preventDefault(); scrollToSection(target); } }}>{label}</Link>)}</nav>)}</div><div className="footer-signoff"><span>Made for listening. Together.</span><button aria-label="Back to top" title="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' })}><ArrowUp size={22} /></button></div><div className="footer-wordmark" aria-hidden="true">MUZIX<span>*</span></div><div className="footer-legal"><span>{new Date().getFullYear()} Muzix. All rights reserved.</span><span>Developed by Sam</span><div><Link to="/docs" state={{ scrollTarget: '#terms' }}>Terms</Link><Link to="/docs" state={{ scrollTarget: '#privacy' }}>Privacy Policy</Link></div></div></motion.div></footer>;
}
