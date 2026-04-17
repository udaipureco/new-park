document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  initRevealAnimations();
  initHeroSlider();
  initBackHomeButton();
});

async function loadHeader() {
  const headerContainer = document.getElementById("header-container");

  if (!headerContainer) {
    return;
  }

  try {
    const response = await fetch("/components/heading.html", { cache: "no-cache" });

    if (!response.ok) {
      throw new Error(`Header request failed with status ${response.status}`);
    }

    headerContainer.innerHTML = await response.text();
  } catch (error) {
    headerContainer.setAttribute("hidden", "");
    console.warn("Wildlife page header could not be loaded:", error);
  }
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");

  if (!revealItems.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initHeroSlider() {
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const dots = Array.from(document.querySelectorAll(".hero-dots span"));

  if (slides.length <= 1) {
    return;
  }

  let activeIndex = 0;

  window.setInterval(() => {
    slides[activeIndex].classList.remove("is-active");
    dots[activeIndex]?.classList.remove("is-active");

    activeIndex = (activeIndex + 1) % slides.length;

    slides[activeIndex].classList.add("is-active");
    dots[activeIndex]?.classList.add("is-active");
  }, 4200);
}

function initBackHomeButton() {
  const button = document.querySelector("[data-back-home]");

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    button.classList.add("is-pressed");

    window.setTimeout(() => {
      window.location.href = "/index.html";
    }, 120);
  });
}
