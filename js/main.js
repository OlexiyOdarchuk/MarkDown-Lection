Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: true,
  hash: true,
  transition: 'slide', // 'slide', 'fade', 'convex', 'zoom'
  transitionSpeed: 'default',
  backgroundTransition: 'fade',

  plugins: [
    RevealMarkdown,
    RevealHighlight,
    RevealNotes,
    RevealMath.KaTeX
  ]
});

// Функція для рендерингу Mermaid діаграм
function renderMermaidOnCurrentSlide() {
  const slide = Reveal.getCurrentSlide();
  const diagrams = slide.querySelectorAll('.mermaid:not([data-processed])');
  diagrams.forEach(diagram => {
    mermaid.init(undefined, diagram);
    diagram.setAttribute('data-processed', 'true');
  });
}

// Функція для додавання анімацій до елементів
function addAnimations() {
  // Додаємо анімації до іконок
  const icons = document.querySelectorAll('.icon');
  icons.forEach((icon, index) => {
    setTimeout(() => {
      icon.classList.add('animated-slide');
    }, index * 100);
  });

  // Додаємо анімації до карток статистики
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animated-pulse');
    }, index * 200);
  });

  // Додаємо hover ефекти до мемів
  const memeImages = document.querySelectorAll('.meme-image');
  memeImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.05)';
      img.style.transition = 'transform 0.3s ease';
    });
    
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });
}

// Функція для створення інтерактивного квізу
function createInteractiveQuiz() {
  const quizContainer = document.querySelector('.quiz-container');
  if (!quizContainer) return;

  const answers = quizContainer.querySelectorAll('.quiz-answer');
  answers.forEach(answer => {
    answer.addEventListener('click', () => {
      // Видаляємо попередні вибрані відповіді
      answers.forEach(a => a.classList.remove('selected'));
      
      // Додаємо клас до вибраної відповіді
      answer.classList.add('selected');
      
      // Додаємо анімацію
      answer.style.animation = 'bounce 0.6s ease';
      
      // Показуємо результат через 1 секунду
      setTimeout(() => {
        const isCorrect = answer.dataset.correct === 'true';
        const resultDiv = document.createElement('div');
        resultDiv.className = `quiz-result ${isCorrect ? 'correct' : 'incorrect'}`;
        resultDiv.textContent = isCorrect ? '🎉 Правильно!' : '❌ Спробуйте ще раз!';
        resultDiv.style.cssText = `
          margin-top: 15px;
          padding: 10px;
          border-radius: 8px;
          text-align: center;
          font-weight: bold;
          animation: slideIn 0.5s ease;
        `;
        
        if (isCorrect) {
          resultDiv.style.background = 'rgba(78, 205, 196, 0.2)';
          resultDiv.style.border = '1px solid #4ecdc4';
          resultDiv.style.color = '#4ecdc4';
        } else {
          resultDiv.style.background = 'rgba(255, 107, 107, 0.2)';
          resultDiv.style.border = '1px solid #ff6b6b';
          resultDiv.style.color = '#ff6b6b';
        }
        
        // Видаляємо попередній результат
        const existingResult = quizContainer.querySelector('.quiz-result');
        if (existingResult) {
          existingResult.remove();
        }
        
        quizContainer.appendChild(resultDiv);
      }, 1000);
    });
  });
}

// Функція для додавання ефектів до секретних трюків
function addSecretTricksEffects() {
  const secretTricks = document.querySelectorAll('.secret-trick');
  secretTricks.forEach(trick => {
    trick.addEventListener('mouseenter', () => {
      trick.style.animation = 'glow 1s ease-in-out';
    });
    
    trick.addEventListener('mouseleave', () => {
      trick.style.animation = 'none';
    });
  });
}

// Функція для створення прогресу навчання
function createLearningProgress() {
  const progressBar = document.createElement('div');
  progressBar.id = 'learning-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 200px;
    height: 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    z-index: 1000;
    overflow: hidden;
  `;
  
  const progressFill = document.createElement('div');
  progressFill.style.cssText = `
    height: 100%;
    background: linear-gradient(90deg, #4ecdc4, #42affa);
    width: 0%;
    transition: width 0.5s ease;
    border-radius: 5px;
  `;
  
  progressBar.appendChild(progressFill);
  document.body.appendChild(progressBar);
  
  // Оновлюємо прогрес при зміні слайдів
  Reveal.addEventListener('slidechanged', event => {
    const totalSlides = Reveal.getTotalSlides();
    const currentSlide = Reveal.getState().indexh;
    const progress = (currentSlide / totalSlides) * 100;
    progressFill.style.width = `${progress}%`;
  });
}

// Функція для додавання звукових ефектів (опціонально)
function addSoundEffects() {
  // Створюємо аудіо контекст для звукових ефектів
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  function playSound(frequency, duration) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }
  
  // Додаємо звукові ефекти до кнопок та інтерактивних елементів
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('quiz-answer') || 
        e.target.classList.contains('tool-card') ||
        e.target.closest('.secret-trick')) {
      playSound(800, 0.1);
    }
  });
}

// Функція для створення easter eggs
function createEasterEggs() {
  let konamiCode = [];
  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];
  
  document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
      // Easter egg: змінюємо тему на радужну
      document.body.style.background = 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)';
      document.body.style.backgroundSize = '400% 400%';
      document.body.style.animation = 'rainbow 2s ease infinite';
      
      // Додаємо CSS анімацію радуги
      const style = document.createElement('style');
      style.textContent = `
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `;
      document.head.appendChild(style);
      
      // Показуємо повідомлення
      const message = document.createElement('div');
      message.textContent = '🌈 Ви знайшли секретний код! 🌈';
      message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 20px;
        border-radius: 10px;
        font-size: 1.5em;
        z-index: 10000;
        animation: bounce 1s ease;
      `;
      document.body.appendChild(message);
      
      setTimeout(() => {
        message.remove();
      }, 3000);
      
      konamiCode = [];
    }
  });
}

// Ініціалізація всіх функцій
Reveal.addEventListener('ready', event => {
  mermaid.initialize({ 
    startOnLoad: false, 
    theme: 'dark',
    themeVariables: {
      primaryColor: '#4ecdc4',
      primaryTextColor: '#ffffff',
      primaryBorderColor: '#42affa',
      lineColor: '#ffffff',
      secondaryColor: '#006100',
      tertiaryColor: '#ffffff'
    }
  });
  
  renderMermaidOnCurrentSlide();
  addAnimations();
  createInteractiveQuiz();
  addSecretTricksEffects();
  createLearningProgress();
  createEasterEggs();
  
  // Додаємо звукові ефекти тільки якщо користувач взаємодіяв зі сторінкою
  document.addEventListener('click', () => {
    addSoundEffects();
  }, { once: true });
});

Reveal.addEventListener('slidechanged', event => {
  renderMermaidOnCurrentSlide();
  
  // Додаємо анімації до нових елементів на слайді
  setTimeout(() => {
    addAnimations();
  }, 100);
});

// Додаємо обробник для клавіші Escape (скидання easter egg)
document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    document.body.style.background = '';
    document.body.style.animation = '';
  }
});