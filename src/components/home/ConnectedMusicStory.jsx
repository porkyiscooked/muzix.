import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { AudioLines, Heart, ListMusic, SlidersHorizontal } from 'lucide-react';
import { soundAttractions } from './editorialData';
import StoryReveal from './StoryReveal';

const chapters = [
  { title: 'It starts with /play.', cue: '02 / Press play', command: '/play', sub: 'A track enters the room.', description: 'We build for Discord communities, gaming servers, and late-night voice rooms that need music to feel polished, stable, and easy to control.', features: [6, 7], Icon: AudioLines },
  { title: 'One song becomes a night.', cue: '03 / Build the queue', command: '/queue', sub: 'Everyone brings a favourite.', description: 'Keep every request ordered and readable while the room stays locked into the session. Your next track, your favourite playlist, your shared rhythm.', features: [0, 3, 4], Icon: ListMusic },
  { title: 'Make the moment yours.', cue: '04 / Find your frequency', command: '/filter', sub: 'Same room. A different feeling.', description: 'Turn up the bass, bring in the lyrics, and let autoplay carry the night. The music changes. The room stays connected.', features: [1, 2, 5], Icon: SlidersHorizontal },
];

export default function ConnectedMusicStory() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });
  const progress = useTransform(() => scrollYProgress.get());
  const rotation = useTransform(progress, [0, 1], [0, 110]);
  const recordScale = useTransform(progress, [0, 0.35, 0.7, 1], [0.94, 1.06, 1, 0.96]);
  const scaleY = useTransform(progress, [0, 0.3, 0.65, 1], [0.35, 1, 0.55, 0.9]);
  useEffect(() => {
    const nodes = Array.from(ref.current.querySelectorAll('.music-chapter'));
    let frame = 0;
    const update = () => {
      frame = 0;
      // Follow actual chapter boundaries, including unequal mobile text heights.
      const readingLine = window.innerHeight * 0.5;
      let index = 0;
      nodes.forEach((node, i) => {
        if (node.getBoundingClientRect().top <= readingLine) index = i;
      });
      setActive(previous => previous === index ? previous : index);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    nodes.forEach(node => observer.observe(node));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  const current = chapters[active];

  return (
    <section ref={ref} id="sound-guide" className="connected-music story-shell" aria-label="The Muzix listening story">
      <div className="music-scene" aria-hidden="true">
        <div className="music-scene-top"><span>MUZIX / SOUND GUIDE</span><span>0{active + 1} / 03</span></div>
        <motion.div className="music-record" style={reducedMotion ? undefined : { scale: recordScale }}>
          <motion.div className="record-grooves" style={reducedMotion ? undefined : { rotate: rotation }}>
            <svg viewBox="0 0 400 400"><circle cx="200" cy="200" r="194" />{[174, 160, 146, 132, 118, 104, 90].map(r => <circle key={r} cx="200" cy="200" r={r} />)}<path d="M200 6v48M200 346v48M6 200h48M346 200h48" /></svg>
          </motion.div>
          <img src="/images/muzix_new.png" width="92" height="92" alt="" />
          <span className="record-label">MUSIC IS BETTER TOGETHER</span>
        </motion.div>
        <div className="scene-command"><current.Icon size={26} /><span>{current.command}</span><Heart size={21} /></div>
        <p className="scene-sub">{current.sub}</p>
        <motion.div className="scene-wave" style={reducedMotion ? undefined : { scaleY }}>{Array.from({ length: 48 }, (_, i) => <i key={i} style={{ height: `${18 + Math.abs(Math.sin(i * 0.64) * Math.cos(i * 0.19)) * 80}%` }} />)}</motion.div>
        <div className="scene-track">{chapters.map((chapter, i) => <span className={i === active ? 'is-active' : ''} key={chapter.command} />)}</div>
      </div>
      <div className="music-chapters">
        {chapters.map((chapter, index) => (
          <article key={chapter.command} id={index === 1 ? 'overlap' : undefined} className="music-chapter">
            <StoryReveal>
              <p className="story-eyebrow">{chapter.cue}</p>
              <h2>{chapter.title}</h2>
              <p className="chapter-description">{chapter.description}</p>
            </StoryReveal>
            <div className="chapter-features">
              {chapter.features.map(featureIndex => {
                const feature = soundAttractions[featureIndex];
                return <StoryReveal key={feature.title}><div className="chapter-feature"><span className="story-small">{feature.command}</span><div><h3>{feature.title}</h3><p>{feature.body}</p></div></div></StoryReveal>;
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
