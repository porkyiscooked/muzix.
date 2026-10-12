import Navbar from './Navbar';
import Footer from './Footer';
import Preloader from './Preloader';
import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import ShaderGradientBackground from '../home/ShaderGradientBackground';
import '../../styles/anime-theme.css';

export default function Layout({ children }) {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="anime-app relative isolate min-h-screen flex flex-col">
      <ShaderGradientBackground fixed variant="pastel" intensity="pastel" className="idol-pastel-atmosphere" staticOnly={Boolean(reducedMotion)} priority />
      <Preloader key={location.pathname} />
      <Navbar />
      
      <main className="flex-grow pt-24 relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}
