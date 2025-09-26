document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxVideo = document.querySelector('.lightbox-video');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  let currentItemIndex;

  // Build an array of items (src + isVideo flag)
  const items = Array.from(galleryItems).map(item => ({
    src: item.getAttribute('data-src'),
    isVideo: item.classList.contains('video-item')
  }));

  // Open lightbox
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      currentItemIndex = index;
      showItem(currentItemIndex);
      lightbox.classList.add('visible');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox
  closeBtn.addEventListener('click', hideLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) hideLightbox();
  });

  // Prev / Next
  prevBtn.addEventListener('click', () => {
    currentItemIndex = (currentItemIndex - 1 + items.length) % items.length;
    showItem(currentItemIndex);
  });
  nextBtn.addEventListener('click', () => {
    currentItemIndex = (currentItemIndex + 1) % items.length;
    showItem(currentItemIndex);
  });

  function showItem(index) {
    const item = items[index];

    // Hide both first
    lightboxImage.style.display = 'none';
    if (lightboxVideo) {
      lightboxVideo.pause();
      lightboxVideo.style.display = 'none';
      lightboxVideo.removeAttribute('src'); // reset previous src
      lightboxVideo.load();
    }

    // Show image or video
    if (item.isVideo) {
      if (lightboxVideo) {
        lightboxVideo.src = item.src; // local MP4 file
        lightboxVideo.style.display = 'block';
        lightboxVideo.load();
        lightboxVideo.play();
      }
    } else {
      lightboxImage.src = item.src;
      lightboxImage.style.display = 'block';
    }
  }

  function hideLightbox() {
    lightbox.classList.remove('visible');
    document.body.style.overflow = '';
    if (lightboxVideo) {
      lightboxVideo.pause();
      lightboxVideo.removeAttribute('src'); // clear
      lightboxVideo.load();
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('visible')) {
      if (e.key === 'ArrowLeft') prevBtn.click();
      else if (e.key === 'ArrowRight') nextBtn.click();
      else if (e.key === 'Escape') closeBtn.click();
    }
  });
});


