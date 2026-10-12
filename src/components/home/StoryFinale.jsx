import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { INVITE_URL, WEBPLAYER_URL } from './editorialData';
import StoryReveal from './StoryReveal';

export default function StoryFinale() {
  return <section id="timeline" className="story-finale story-shell">
    <p className="story-eyebrow">08 / Your next chapter</p>
    <StoryReveal><h2>The next track<br />is <em>yours.</em></h2></StoryReveal>
    <div className="finale-bottom">
      <div><h3>Ready to make your server sound alive?</h3><p>Invite Muzix and turn your Discord server into a shared music room with high-quality playback, queues, filters, lyrics, and autoplay.</p></div>
      <div><div className="story-actions"><a className="story-button" href={INVITE_URL} target="_blank" rel="noopener noreferrer">Invite Bot <ArrowUpRight size={18} /></a><a className="story-text-link" href={WEBPLAYER_URL} target="_blank" rel="noopener noreferrer">Open Webplayer <ArrowUpRight size={18} /></a></div><div className="finale-links"><Link to="/premium">Explore Premium <ArrowUpRight size={15} /></Link><Link to="/docs">Read the docs <ArrowUpRight size={15} /></Link></div></div>
    </div>
  </section>;
}
