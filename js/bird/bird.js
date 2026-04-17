const headerMount = document.getElementById("site-header");

async function loadHeader() {
  if (!headerMount) return;

  try {
    const response = await fetch("/components/heading.html", { cache: "no-cache" });

    if (!response.ok) {
      headerMount.remove();
      return;
    }

    headerMount.innerHTML = await response.text();
  } catch {
    headerMount.remove();
  }
}

function initHeroSlider() {
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const dots = Array.from(document.querySelectorAll(".dot"));

  if (slides.length < 2) return;

  let index = 0;

  window.setInterval(() => {
    slides[index].classList.remove("is-active");
    dots[index]?.classList.remove("is-active");

    index = (index + 1) % slides.length;

    slides[index].classList.add("is-active");
    dots[index]?.classList.add("is-active");
  }, 4200);
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");

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
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initButtons() {
  document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.getAttribute("data-scroll-target"));
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.getElementById("back-home")?.addEventListener("click", () => {
    window.location.href = "/";
  });
}

function initImageFallbacks() {
  const fallback = "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85";
  const imageElements = Array.from(document.querySelectorAll("[style*='background-image']"));

  imageElements.forEach((element) => {
    const match = element.getAttribute("style")?.match(/url\(['\"]?(.*?)['\"]?\)/);
    const imageUrl = match?.[1];

    if (!imageUrl) return;

    const image = new Image();
    image.onerror = () => {
      element.style.backgroundImage = `url('${fallback}')`;
    };
    image.src = imageUrl;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  initHeroSlider();
  initRevealAnimations();
  initButtons();
  initImageFallbacks();
});
