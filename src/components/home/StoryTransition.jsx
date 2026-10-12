import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export default function StoryTransition({ children, tone = '#080808', treatment = 'continuous' }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 65%'],
  });
  // Measure the untransformed section, not a pinned overlay or animated child.
  // All channels share JS progress so sticky geometry behaves across browsers.
  const progress = useTransform(() => scrollYProgress.get());
  const y = useTransform(progress, [0, 1], [treatment === 'cover' ? 40 : 24, 0]);
  const scale = useTransform(progress, [0, 1], [treatment === 'cover' ? 0.985 : 1, 1]);
  const surfaceMotion = !reducedMotion && treatment !== 'continuous';

  return (
    <div ref={ref} className="story-boundary" data-story-boundary data-treatment={treatment} style={{ backgroundColor: tone }}>
      <motion.div
        className="story-surface"
        style={surfaceMotion ? { y, scale } : undefined}
      >
        {children}
      </motion.div>
    </div>
  );
}
