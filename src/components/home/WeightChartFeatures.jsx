import { weightFeatures } from './editorialData';
import StoryReveal from './StoryReveal';

export default function WeightChartFeatures() {
  return (
    <section id="stats" className="story-strengths story-shell">
      <div className="strengths-intro">
        <p className="story-eyebrow">06 / Built for every server</p>
        <StoryReveal><h2>From quiet calls.<br />To full rooms.</h2></StoryReveal>
        <p>The bot gets stronger where the room needs it. Whether it is a chill voice channel, a gaming night, a study room, or a community event, Muzix keeps the sound moving.</p>
      </div>
      <div className="strengths-list">
        {weightFeatures.map((item, index) => (
          <StoryReveal key={item.weight}><div className="strength-row"><span className="story-small">0{index + 1} / {item.weight}</span><h3 className={item.className}>{item.value}</h3></div></StoryReveal>
        ))}
      </div>
    </section>
  );
}
