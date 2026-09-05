document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("main section[id]");
  const revealItems = document.querySelectorAll(".reveal-item");

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.innerHTML = `<i class="fas fa-${isOpen ? "xmark" : "bars"}" aria-hidden="true"></i>`;
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
    });
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) =>
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`,
            ),
          );
        }
      });
    },
    { rootMargin: "-35% 0px -55% 0px" },
  );

  sections.forEach((section) => sectionObserver.observe(section));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
});
