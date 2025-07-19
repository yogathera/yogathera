const sliderTrack = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('sliderDots');

let currentIndex = 0;
const visibleSlides = window.innerWidth <= 768 ? 1 : 3;
const totalSlides = slides.length;
const maxIndex = totalSlides - visibleSlides;

// Create dots
for (let i = 0; i <= maxIndex; i++) {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}
updateDots();

function goToSlide(index) {
  currentIndex = index;
  const slideWidth = slides[0].offsetWidth;
  sliderTrack.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  updateDots();
}

function updateDots() {
  const dots = dotsContainer.querySelectorAll('span');
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[currentIndex]) dots[currentIndex].classList.add('active');
}

// Auto-slide
setInterval(() => {
  currentIndex = (currentIndex + 1) % (maxIndex + 1);
  goToSlide(currentIndex);
}, 4000);
