import { ArrowDownRight } from 'lucide-react';
import StoryReveal from './StoryReveal';

export default function MiduAboutSection() {
  return (
    <section id="about" className="story-intro story-shell">
      <span id="story" />
      <div className="story-section-top"><p className="story-eyebrow">01 / More than a track</p><ArrowDownRight size={28} aria-hidden="true" /></div>
      <StoryReveal><h2>A voice channel.<br />Then, <span className="story-muted">a whole feeling.</span></h2></StoryReveal>
      <div className="story-intro-bottom">
        <p className="story-small">Playback built for Discord rooms<br />that never go quiet.</p>
        <StoryReveal>
          <p>Muzix is a Discord-native music bot that treats every voice channel like a shared listening room. We focus on stable playback, readable queues, and slash commands your community already knows how to use.</p>
          <p className="story-muted">The result: music that does not just play. It keeps the server together.</p>
        </StoryReveal>
      </div>
    </section>
  );
}
