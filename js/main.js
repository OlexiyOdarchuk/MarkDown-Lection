Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: true,
  hash: true,
  transition: 'slide', // 'slide', 'fade', 'convex', 'zoom'

  plugins: [
    RevealMarkdown,
    RevealHighlight,
    RevealNotes,
    RevealMath.KaTeX
  ]
});

function renderMermaidOnCurrentSlide() {
  const slide = Reveal.getCurrentSlide();
  const diagrams = slide.querySelectorAll('.mermaid:not([data-processed])');
  diagrams.forEach(diagram => {
    mermaid.init(undefined, diagram);
    diagram.setAttribute('data-processed', 'true');
  });
}

Reveal.addEventListener('ready', event => {
  mermaid.initialize({ startOnLoad: false, theme: 'dark' });
  renderMermaidOnCurrentSlide();
});

Reveal.addEventListener('slidechanged', event => {
  renderMermaidOnCurrentSlide();
});