import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Headphones, Ticket } from 'lucide-react';
import useSimpleScrollMotion from '../hooks/useSimpleScrollMotion';
import { SUPPORT_URL } from '../components/home/editorialData';

const durations = ['Weekly', 'Monthly', 'Yearly', 'Lifetime'];
const packages = [
  {
    id: 'auxiliary',
    name: 'Muzix 2 + Muzix 3 Package',
    description: 'Unlock premium features for both Muzix 2 and Muzix 3 auxiliary bots.',
    features: ['Muzix 2 premium', 'Muzix 3 premium', 'User-based access'],
    inr: ['29', '99', '999', '2,499'],
    usd: ['0.35', '1.19', '11.99', '29.99'],
  },
  {
    id: 'no-prefix',
    name: 'No Prefix Package',
    description: 'Use all commands without needing any prefix.',
    features: ['No-prefix commands', 'User-based access'],
    inr: ['19', '69', '699', '1,499'],
    usd: ['0.23', '0.83', '8.37', '17.95'],
  },
  {
    id: 'combined',
    name: 'Combined Package',
    description: 'Muzix 2 + Muzix 3 + No Prefix. Get both auxiliary bots premium and the No Prefix package together.',
    features: ['Muzix 2 premium', 'Muzix 3 premium', 'No-prefix commands', 'User-based access'],
    inr: ['39', '149', '1,499', '3,499'],
    usd: ['0.47', '1.79', '17.95', '41.90'],
  },
];

export default function Premium() {
  const reducedMotion = useReducedMotion();
  const simpleScrollMotion = useSimpleScrollMotion();
  const stableMotion = reducedMotion || simpleScrollMotion;

  return (
    <section className="idol-subpage idol-premium relative -mt-24 min-h-screen overflow-hidden px-5 pb-20 pt-36 sm:px-8 md:px-10 md:pt-40">
      <div className="subpage-art" aria-hidden="true"><img src="/images/muzix-idol-concert.webp" alt="" /></div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="premium-intro">
          <p className="idol-label">PREMIUM ACCESS</p>
          <h1>Your backstage pass.</h1>
          <p>Meet Muzix 2 and Muzix 3, skip the prefix, or bring everything together in one package.</p>
          <div className="premium-account-note"><Check size={18} aria-hidden="true" /><strong>Premium is user-based, not server-wide.</strong> Access is linked to your Discord account.</div>
          <a href="#how-to-buy" className="idol-link">How to buy <ArrowUpRight size={17} aria-hidden="true" /></a>
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
                  className={pack.id === 'combined' ? 'premium-price-card z-20' : 'premium-price-card'}
                >
                  <h3>{duration}</h3>
                  <p className="premium-price">{'\u20B9'}{pack.inr[index]}</p>
                  <p className="premium-usd">Approx. ${pack.usd[index]} USD</p>
                  <a href={SUPPORT_URL} target="_blank" rel="noreferrer" aria-label={`Buy ${pack.name}, ${duration}, through a Hollow Hearts ticket`}>
                    <Ticket size={16} aria-hidden="true" />Buy {duration}<ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </motion.article>
              ))}
            </div>
          </section>
        ))}
        <p className="premium-price-note">USD amounts are approximate. Confirm the payment amount and method with the team in your ticket.</p>

        <section id="how-to-buy" className="premium-purchase" aria-labelledby="purchase-title">
          <p className="idol-label">YOUR NEXT STEP</p>
          <h2 id="purchase-title">A ticket to your next favourite song.</h2>
          <ol>
            <li><span>01</span><div><h3>Join Hollow Hearts</h3><p>Join our Discord community and support server using the button below.</p></div></li>
            <li><span>02</span><div><h3>Create a purchase ticket</h3><p>Open a ticket in Hollow Hearts. Tell the team which package and duration you want, and the Discord account that should receive access.</p></div></li>
            <li><span>03</span><div><h3>Complete your purchase</h3><p>Follow the team's payment instructions in your ticket. They will help you activate your user-based premium access.</p></div></li>
          </ol>
          <a className="idol-button" href={SUPPORT_URL} target="_blank" rel="noreferrer"><Headphones size={18} aria-hidden="true" />Join Hollow Hearts<ArrowUpRight size={17} aria-hidden="true" /></a>
        </section>
      </div>
    </section>
  );
}
