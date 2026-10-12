import { ArrowUpRight } from 'lucide-react';
import { SUPPORT_URL } from './editorialData';
import StoryReveal from './StoryReveal';

export default function CreatorChapter() {
  return <section className="creator-chapter story-shell" id="creator">
    <div className="story-section-top"><p className="story-eyebrow">07 / Behind the sound</p><img src="/images/muzix_new.png" width="36" height="36" alt="Muzix logo" /></div>
    <StoryReveal><h2>Made by <em>Subhajit Sardar.</em><br />Shared by everyone.</h2></StoryReveal>
    <div className="creator-bottom"><p className="creator-signature">Subhajit <span>/ Sam</span></p><div><p>A Discord music bot built around a simple idea: the best listening experiences are the ones you share. From the first command to the last track, Muzix keeps the community at the center.</p><a className="story-text-link" href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">Meet the community <ArrowUpRight size={17} /></a></div></div>
  </section>;
}
