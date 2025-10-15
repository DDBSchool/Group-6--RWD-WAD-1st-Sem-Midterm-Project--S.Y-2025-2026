const slider = document.querySelector('.products-slider');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
const dotsContainer = document.querySelector('.slider-dots');
const cards = document.querySelectorAll('.product-card');

let currentIndex = 0;
let autoSlideTimer;

// Create dots
cards.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active');
  dot.onclick = () => goToSlide(index);
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// Go to specific slide
function goToSlide(index) {
  const cardWidth = cards[0].offsetWidth + 24;
  slider.scrollLeft = cardWidth * index;
  currentIndex = index;

  // Update dots
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  resetAutoSlide();
}

// Previous button
prevBtn.onclick = () => {
  if (currentIndex > 0) {
    goToSlide(currentIndex - 1);
  } else {
    goToSlide(cards.length - 1);
  }
};

// Next button
nextBtn.onclick = () => {
  if (currentIndex < cards.length - 1) {
    goToSlide(currentIndex + 1);
  } else {
    goToSlide(0);
  }
};

// Auto slide every 3 seconds
function startAutoSlide() {
  autoSlideTimer = setInterval(() => {
    if (currentIndex < cards.length - 1) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(0);
    }
  }, 3000);
}

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  startAutoSlide();
}

// Start auto sliding
startAutoSlide();

// Pause when hovering
slider.onmouseenter = () => clearInterval(autoSlideTimer);
slider.onmouseleave = () => startAutoSlide();