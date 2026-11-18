import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Headphones } from 'lucide-react';
import useSimpleScrollMotion from '../hooks/useSimpleScrollMotion';
import { SUPPORT_URL } from '../components/home/editorialData';

const durations = ['Weekly', 'Monthly', 'Yearly', 'Lifetime'];
const packages = [
  {
    id: 'auxiliary',
    name: 'Muzix 2 + Muzix 3 Package',
    description: 'One package unlocks both auxiliary bots for one Discord server.',
    features: ['Muzix 2 premium', 'Muzix 3 premium', 'One Discord server'],
    inr: ['15', '49', '399', '999'],
  },
];

export default function Premium() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const simpleScrollMotion = useSimpleScrollMotion();
  const stableMotion = reducedMotion || simpleScrollMotion;

  useEffect(() => {
    if (!location.hash) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'instant', block: 'start' });
      window.history.replaceState(window.history.state, '', location.pathname + location.search);
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash, location.pathname, location.search]);

  function showPurchaseSteps() {
    const section = document.getElementById('how-to-buy');
    section?.focus({ preventScroll: true });
    section?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
  }

  return (
    <section className="idol-subpage idol-premium relative -mt-24 min-h-screen overflow-hidden px-5 pb-20 pt-36 sm:px-8 md:px-10 md:pt-40">
      <div className="subpage-art" aria-hidden="true"><img src="/images/muzix-idol-concert.webp" alt="" /></div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="premium-intro">
          <p className="idol-label">PREMIUM ACCESS</p>
          <h1>Your backstage pass.</h1>
          <p>Add Muzix 2 and Muzix 3 to your server with one affordable auxiliary-bot package.</p>
          <div className="premium-account-note"><Check size={18} aria-hidden="true" /><div><strong>Two bots. One server. One package.</strong> Premium access is server-based and includes both Muzix 2 and Muzix 3.</div></div>
          <button type="button" onClick={showPurchaseSteps} className="idol-link">How to buy <ArrowUpRight size={17} aria-hidden="true" /></button>
        </header>

        {packages.map((pack) => (
          <section key={pack.id} className="premium-package" aria-labelledby={`package-${pack.id}`}>
            <div className="premium-package-heading">
              <div>
                <h2 id={`package-${pack.id}`}>{pack.name}</h2>
                <p>{pack.description}</p>
              </div>
              {pack.id === 'auxiliary' && <div className="premium-bot-duo">
                <figure><img src="/images/muzix-2-green.webp" alt="Muzix 2 with green headphones" width="700" height="1050" loading="lazy" /><figcaption>Muzix 2</figcaption></figure>
                <figure><img src="/images/muzix-3-blue.webp" alt="Muzix 3 with blue headphones" width="700" height="1050" loading="lazy" /><figcaption>Muzix 3</figcaption></figure>
              </div>}
            </div>
            <ul className="premium-inclusions">{pack.features.map(feature => <li key={feature}><Check size={16} aria-hidden="true" />{feature}</li>)}</ul>
            <div className="premium-price-grid">
              {durations.map((duration, index) => (
                <motion.article
                  key={duration}
                  initial={stableMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: stableMotion ? 0 : 0.35, delay: stableMotion ? 0 : index * 0.05 }}
                  className={duration === 'Yearly' ? 'premium-price-card z-20' : 'premium-price-card'}
                >
                  <h3>{duration}</h3>
                  <p className="premium-price">{'\u20B9'}{pack.inr[index]}</p>
                  {duration === 'Yearly' && <p className="premium-price-note">Save {'\u20B9'}189 versus 12 monthly purchases.</p>}
                  <a href={SUPPORT_URL} target="_blank" rel="noreferrer" aria-label={`Buy ${pack.name}, ${duration}, by contacting a developer in Hollow Hearts`}>
                    <Headphones size={16} aria-hidden="true" />Buy {duration}<ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </motion.article>
              ))}
            </div>
          </section>
        ))}
        <p className="premium-price-note">All prices are in INR. Join Hollow Hearts and contact a developer to purchase and activate premium.</p>

        <section id="how-to-buy" className="premium-purchase" aria-labelledby="purchase-title" tabIndex={-1}>
          <p className="idol-label">YOUR NEXT STEP</p>
          <h2 id="purchase-title">Your next favourite song starts here.</h2>
          <ol>
            <li><span>01</span><div><h3>Join Hollow Hearts</h3><p>Join our Discord community and support server using the button below.</p></div></li>
            <li><span>02</span><div><h3>Tag a developer</h3><p>Mention a developer in the server chat. Share your preferred duration and the Discord server where you want Muzix 2 and Muzix 3 activated.</p></div></li>
            <li><span>03</span><div><h3>Purchase and activate</h3><p>Follow the developer's payment instructions. They will help complete your purchase and activate both auxiliary bots for your server.</p></div></li>
          </ol>
          <a className="idol-button" href={SUPPORT_URL} target="_blank" rel="noreferrer"><Headphones size={18} aria-hidden="true" />Join Hollow Hearts<ArrowUpRight size={17} aria-hidden="true" /></a>
        </section>
      </div>
    </section>
  );
}
