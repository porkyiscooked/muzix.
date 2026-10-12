export default function scrollToSection(target, behavior) {
  const node = document.getElementById(target.replace(/^#/, ''));
  if (!node) return;
  // Layout offsets ignore the small entrance transforms on section surfaces.
  let top = 0;
  for (let element = node; element; element = element.offsetParent) {
    top += element.offsetTop;
  }
  window.scrollTo({
    top: target === '#home' ? 0 : Math.max(0, top),
    behavior: behavior || 'instant',
  });
}
