import { useSyncExternalStore } from 'react';

const query = '(min-width: 1024px)';
const subscribe = callback => {
  const media = window.matchMedia(query);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
};
const getSnapshot = () => window.matchMedia(query).matches;

export default function useDesktopStory() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
