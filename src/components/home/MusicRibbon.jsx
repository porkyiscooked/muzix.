import { useState } from 'react';
import { Pause, Play, Sparkles } from 'lucide-react';

export default function MusicRibbon() {
  const [paused, setPaused] = useState(false);
  return <div className={`idol-ribbon${paused ? ' is-paused' : ''}`}>
    <p className="sr-only">Good music. Great company. One voice channel.</p>
    <div className="idol-ribbon-track" aria-hidden="true">
      {[0, 1].map(copy => <div className="idol-ribbon-group" key={copy}>
        <span>GOOD MUSIC</span><Sparkles /><span>GREAT COMPANY</span><Sparkles /><span>ONE VOICE CHANNEL</span><Sparkles />
      </div>)}
    </div>
    <button className="idol-ribbon-toggle" type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Play moving strip' : 'Pause moving strip'} title={paused ? 'Play moving strip' : 'Pause moving strip'}>
      {paused ? <Play size={14} /> : <Pause size={14} />}
    </button>
  </div>;
}
