import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AnimeHome from '../components/home/AnimeHome';
import scrollToSection from '../utils/scrollToSection';

export default function Home() {
  const location = useLocation();
  useEffect(() => {
    const target = location.state?.scrollTarget || location.hash;
    if (!target) return;
    const frame = requestAnimationFrame(() => {
      scrollToSection(target);
      if (location.hash) window.history.replaceState(window.history.state, '', location.pathname);
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash, location.pathname, location.state]);

  return <AnimeHome />;
}
