import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import MiduStyleHero from './MiduStyleHero';
import MiduAboutSection from './MiduAboutSection';

export default function OpeningStory({ desktopGlass = false }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useTransform(() => scrollYProgress.get());
  const scale = useTransform(progress, [0, 0.15, 1], [1, 1, 0.96]);
  const opacity = useTransform(progress, [0, 0.04, 0.28, 1], [1, 1, 0, 0]);
  const visibility = useTransform(progress, value => value >= 0.28 ? 'hidden' : 'visible');
  const pointerEvents = useTransform(progress, value => value >= 0.28 ? 'none' : 'auto');
  const shade = useTransform(progress, [0, 0.8, 1], [0.82, 0.98, 1]);

  return (
    <div ref={ref} className="opening-story">
      <div className="opening-pin">
        <motion.div className="opening-camera" style={reducedMotion ? undefined : { scale, '--opening-opacity': opacity, ...(desktopGlass ? { visibility, pointerEvents } : {}) }}>
          <MiduStyleHero sharedAtmosphere={desktopGlass} />
        </motion.div>
      </div>
      <div className="opening-intro">
        <motion.div className="opening-shade" aria-hidden="true" style={{ opacity: reducedMotion ? 1 : shade }} />
        <MiduAboutSection />
      </div>
    </div>
  );
}
