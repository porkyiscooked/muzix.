import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { featureSpecimens } from './editorialData';
import StoryReveal from './StoryReveal';

export default function FeatureSpecimenGrid() {
  const ref = useRef(null);
  const windowRef = useRef(null);
  const trackRef = useRef(null);
  const [travel, setTravel] = useState(0);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useTransform(() => scrollYProgress.get());
  const x = useTransform(progress, [0.08, 0.88], [0, -travel]);
  const scaleX = useTransform(progress, [0.08, 0.88], [0, 1]);

  useEffect(() => {
    const measure = () => setTravel(Math.max(0, trackRef.current.scrollWidth - windowRef.current.clientWidth));
    const observer = new ResizeObserver(measure);
    observer.observe(windowRef.current);
    observer.observe(trackRef.current);
    measure();
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="features" className="story-commands story-shell">
      <div className="command-gallery-pin">
      <div className="story-section-top"><p className="story-eyebrow">05 / Small commands. Big moments.</p><span className="story-small">08 essentials</span></div>
      <div className="commands-heading">
        <StoryReveal><h2>Less typing.<br />More <em>listening.</em></h2></StoryReveal>
        <div><p>Explore how Muzix helps servers elevate their voice channels with slash commands built for playback, queues, filters, and lyrics.</p><Link to="/docs" state={{ scrollTarget: '#guide' }} className="story-text-link">Your first command <ArrowUpRight size={17} /></Link></div>
      </div>
      <div ref={windowRef} className="command-gallery-window">
      <motion.div ref={trackRef} className="command-specimens" style={reducedMotion ? undefined : { x }}>
        {featureSpecimens.map((feature, index) => (
            <article key={feature.command} className="command-specimen">
              <span className="story-small">0{index + 1} / Discord command</span>
              <h3>{feature.command}</h3>
              <p>{feature.description}</p>
            </article>
        ))}
      </motion.div>
      </div>
      <div className="command-gallery-progress" aria-hidden="true"><motion.span style={reducedMotion ? undefined : { scaleX }} /></div>
      </div>
    </section>
  );
}
