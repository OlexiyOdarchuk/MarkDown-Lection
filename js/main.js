Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: true,
  hash: true,
  transition: "slide", // 'slide', 'fade', 'convex', 'zoom'
  transitionSpeed: "default",
  backgroundTransition: "fade",

  plugins: [RevealMarkdown, RevealHighlight, RevealNotes, RevealMath.KaTeX],
});

function renderMermaidOnCurrentSlide() {
  const slide = Reveal.getCurrentSlide();
  const diagrams = slide.querySelectorAll(".mermaid:not([data-processed])");
  diagrams.forEach((diagram) => {
    mermaid.run({ nodes: [diagram] });
    diagram.setAttribute("data-processed", "true");
  });
}

function addAnimations() {
  const icons = document.querySelectorAll(".icon");
  icons.forEach((icon, index) => {
    setTimeout(() => {
      icon.classList.add("animated-slide");
    }, index * 100);
  });

  const statCards = document.querySelectorAll(".stat-card");
  statCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("animated-pulse");
    }, index * 200);
  });

  const memeImages = document.querySelectorAll(".meme-image");
  memeImages.forEach((img) => {
    img.addEventListener("mouseenter", () => {
      img.style.transform = "scale(1.05)";
      img.style.transition = "transform 0.3s ease";
    });

    img.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1)";
    });
  });
}

Reveal.addEventListener("ready", (event) => {
  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    themeVariables: {
      primaryColor: "#4ecdc4",
      primaryTextColor: "#ffffff",
      primaryBorderColor: "#42affa",
      lineColor: "#ffffff",
      secondaryColor: "#006100",
      tertiaryColor: "#ffffff",
    },
  });

  renderMermaidOnCurrentSlide();
  addAnimations();
  createEasterEggs();
});

Reveal.addEventListener("slidechanged", (event) => {
  renderMermaidOnCurrentSlide();

  setTimeout(() => {
    addAnimations();
  }, 100);
});
