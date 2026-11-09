const carousel = document.querySelector(".carousel");
const dots = [...document.querySelectorAll(".dot")];
const carouselTrack = carousel?.querySelector(".carousel__track");
const carouselImages = carousel ? [...carousel.querySelectorAll(".carousel__track img")] : [];
const previousButton = carousel?.querySelector(".carousel__arrow--prev");
const nextButton = carousel?.querySelector(".carousel__arrow--next");
let transitionId = 0;

const slides = [
  ["assets/carousel-left.png", "assets/carousel-center.png", "assets/carousel-right.png"],
  ["assets/carousel-center.png", "assets/carousel-right.png", "assets/project-juilliard.png"],
  ["assets/carousel-right.png", "assets/project-juilliard.png", "assets/project-cct.png"],
  ["assets/project-juilliard.png", "assets/project-cct.png", "assets/carousel-left.png"],
  ["assets/project-cct.png", "assets/carousel-left.png", "assets/carousel-center.png"],
];

function showSlide(index) {
  const slide = slides[index];
  if (!slide) return;

  const currentTransition = ++transitionId;
  carouselTrack?.classList.add("is-transitioning");
  window.setTimeout(() => {
    if (currentTransition !== transitionId) return;
    carouselImages.forEach((image, imageIndex) => {
      image.src = slide[imageIndex];
    });
    window.requestAnimationFrame(() => {
      carouselTrack?.classList.remove("is-transitioning");
    });
  }, 180);

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === index;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-selected", String(isActive));
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => showSlide(index));
});

let activeSlide = 0;
const changeSlide = (direction) => {
  activeSlide = (activeSlide + direction + slides.length) % slides.length;
  showSlide(activeSlide);
};

previousButton?.addEventListener("click", () => changeSlide(-1));
nextButton?.addEventListener("click", () => changeSlide(1));
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    activeSlide = index;
  });
});