const totalImages = 47;  // Set the number of images in your "images" folder (e.g., image1.jpg, image2.jpg, etc.)
const carouselContainer = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const currentCounter = document.querySelector('.current');
const totalCounter = document.querySelector('.total');
let currentIndex = 0;

// Set the total number of images
totalCounter.textContent = totalImages;

// Generate image elements dynamically
for (let i = 1; i <= totalImages; i++) {
  const imgElement = document.createElement('img');
  imgElement.classList.add('carousel-slide');
  imgElement.src = `images/image${i}.jpg`;  // Assuming your images are named image1.jpg, image2.jpg, etc.
  imgElement.alt = `Image ${i}`;
  carouselContainer.appendChild(imgElement);
}

// Update carousel position
function updateCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  
  // Update the counter
  currentCounter.textContent = currentIndex + 1;
}

// Move to next or previous slide
function moveSlide(direction) {
  const slides = document.querySelectorAll('.carousel-slide');
  const totalSlides = slides.length;

  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalSlides - 1; // Go to last image
  } else if (currentIndex >= totalSlides) {
    currentIndex = 0; // Go to first image
  }

  updateCarousel();
}

// Event listeners for prev and next buttons
prevButton.addEventListener('click', () => moveSlide(-1));
nextButton.addEventListener('click', () => moveSlide(1));

// Initialize the carousel
updateCarousel();

// Swipe functionality
let startX = 0;
let endX = 0;

// Detect swipe start
carouselContainer.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX; // Get the initial touch position
});

// Detect swipe end
carouselContainer.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX; // Get the final touch position

  if (startX - endX > 50) {
    moveSlide(1); // Swipe left, move to the next image
  } else if (endX - startX > 50) {
    moveSlide(-1); // Swipe right, move to the previous image
  }
});
