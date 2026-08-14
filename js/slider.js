const slides = [...document.querySelectorAll(".floating-card")];
const indicators = [...document.querySelectorAll(".card-preview__indicator")];
const eyebrow = document.querySelector(".card-preview__eyebrow");
const cardDetails = document.querySelector(".card-details");

const slideData = [
  {
    eyebrow: "Flip-flops optional. RSVP appreciated.",
    background: "hsl(278, 42%, 91%)",
  },
  {
    eyebrow: "Make it official. Save the date",
    background: "hsl(130, 20%, 94%)",
  },
  {
    eyebrow: "They grow fast. Go all out.",
    background: "hsl(20, 98%, 82%)",
  },
];

export function initSlider() {
  let currentSlide = 0;
  let intervalId;

  if (slides.length === 0) return;

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  }

  function goToSlide(index) {
    currentSlide = index % slides.length;
    updateSlides();
  }

  function startAutoPlay() {
    intervalId = setInterval(nextSlide, 4000);
  }

  function resetAutoPlay() {
    clearInterval(intervalId);
    startAutoPlay();
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      goToSlide(index);
      resetAutoPlay();
    });
  });

  function updateSlideContent() {
    const currentData = slideData[currentSlide];

    eyebrow.textContent = currentData.eyebrow;
    cardDetails.style.backgroundColor = currentData.background;
  }

  function updateSlides() {
    slides.forEach((slide, index) => {
      const position = (index - currentSlide + slides.length) % slides.length;
      slide.classList.remove("active", "previous", "next");

      if (position === 0) {
        slide.classList.add("active");
      } else if (position === 1) {
        slide.classList.add("next");
      } else if (position === slides.length - 1) {
        slide.classList.add("previous");
      }
    });

    indicators.forEach((indicator, index) => {
      indicator.classList.remove("active");

      if (index === currentSlide) {
        indicator.classList.add("active");
      }
    });

    updateSlideContent();
  }

  updateSlides();
  startAutoPlay();
}
