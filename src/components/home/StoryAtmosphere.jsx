import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import ShaderGradientBackground from './ShaderGradientBackground';

export default function StoryAtmosphere({ target }) {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'start -80vh'] });
  const progress = useTransform(() => scrollYProgress.get());
  const opacity = useTransform(progress, [0, 0.2, 1], [0, 0.3, 1]);

  return (
    <div className="story-atmosphere" aria-hidden="true">
      <ShaderGradientBackground variant="heroRedShader" intensity="heroRedShader" fallback={false} priority />
      <motion.div className="story-matte" style={{ opacity: reducedMotion ? 1 : opacity }} />
    </div>
  );
}
