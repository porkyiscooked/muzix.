import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { animate } from 'animejs';
import { Heart } from 'lucide-react';

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();
  const counter = useRef({ value: 0 });
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const animation = animate(counter.current, {
      value: [0, 100], duration: reduced ? 150 : 1100, ease: 'inOut(3)',
      onUpdate: () => setProgress(Math.round(counter.current.value)),
      onComplete: () => { setShow(false); document.body.style.overflow = previous; },
    });
    return () => { animation.revert(); document.body.style.overflow = previous; };
  }, [reduced]);
  return createPortal(<AnimatePresence>{show && <motion.div className="idol-loader" exit={{ opacity: 0, y: reduced ? 0 : -24 }} transition={{ duration: reduced ? 0 : 0.4 }}><div className="loader-heading"><img src="/images/muzix_new.png" alt="" width="30" height="30" /> Muzix <span>GETTING THE BAND TOGETHER</span></div><div className="loader-center"><div className="loader-companion"><img src="/images/muzix-idol-portrait.webp" alt="Muzix, your music companion" width="160" height="160" fetchPriority="high" /><span aria-hidden="true"><Heart size={20} /></span></div><h2>Your next<br /><em>favourite feeling.</em></h2><span className="loader-count">{String(progress).padStart(3, '0')}<small>%</small></span><div className="loader-track"><span style={{ transform: `scaleX(${progress / 100})` }} /></div></div><div className="loader-bottom">MUSIC LIVES CLOSER TO YOU.<span>MUZIX</span></div></motion.div>}</AnimatePresence>, document.body);
}
