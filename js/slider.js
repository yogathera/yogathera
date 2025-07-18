const track = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('sliderDots');

const visibleSlides = 3;
const totalSlides = slides.length;
const maxIndex = totalSlides - visibleSlides; // So we can slide one by one
let currentIndex = 0;

// Create dots for each slide set
for (let i = 0; i <= maxIndex; i++) {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}
const dots = dotsContainer.querySelectorAll('span');

// Navigate to a specific slide
function goToSlide(index) {
  const slideWidth = slides[0].offsetWidth + 20; // add margin/padding
  track.style.transform = `translateX(-${index * slideWidth}px)`;
  currentIndex = index;
  updateDots();
}

function updateDots() {
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[currentIndex]) dots[currentIndex].classList.add('active');
}

// Auto slide
setInterval(() => {
  currentIndex = (currentIndex + 1) > maxIndex ? 0 : currentIndex + 1;
  goToSlide(currentIndex);
}, 3000);

// Initial setup
goToSlide(0);
