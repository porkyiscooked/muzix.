import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function ScrollAlphabetReveal({
  text,
  className = '',
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 24, filter: 'blur(14px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.34 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {text}
    </motion.p>
  );
}
