import { Children, cloneElement, isValidElement, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

function plainText(node) {
  return Children.toArray(node).map(child => typeof child === 'string' ? child : isValidElement(child) ? plainText(child.props.children) : '').join(' ');
}

function maskHeading(node) {
  let order = 0;
  const words = (content) => Children.map(content, child => {
    if (typeof child === 'string') return child.split(/(\s+)/).map((word, index) => /\s+/.test(word) ? word : <span key={index} className="story-word-mask" aria-hidden="true"><span className="story-word" style={{ '--word-order': Math.min(order++, 8) }}>{word}</span></span>);
    if (isValidElement(child) && child.props.children) return cloneElement(child, {}, words(child.props.children));
    return child;
  });
  return Children.map(node, child => {
    if (!isValidElement(child)) return child;
    if (child.type === 'h1' || child.type === 'h2') return cloneElement(child, { 'aria-label': plainText(child.props.children) }, words(child.props.children));
    return child;
  });
}

export default function StoryReveal({ children, className = '' }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 96%', 'start 72%'] });
  const progress = useTransform(() => scrollYProgress.get());
  return (
    <motion.div ref={ref} className={`t-stagger story-reveal ${className}`} style={{ '--story-reveal': reducedMotion ? 1 : progress }}>
      <div className="t-stagger-line">{maskHeading(children)}</div>
    </motion.div>
  );
}
