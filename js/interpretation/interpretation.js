const revealItems = document.querySelectorAll(".fade-item");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -28px 0px" }
);

revealItems.forEach((item, index) => {
  item.style.setProperty("--delay", `${Math.min(index * 70, 360)}ms`);
  observer.observe(item);
});

document.querySelectorAll("[data-scroll-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.getAttribute("data-scroll-target"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

document.querySelector(".cta-button")?.addEventListener("click", () => {
  document.querySelector("#top")?.scrollIntoView({ behavior: "smooth", block: "start" });
});
