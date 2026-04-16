
function initHeaderFooterFeatures() {
  const yearElement = document.getElementById("current-year");
  const lastModifiedElement = document.getElementById("last-modified");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  if (lastModifiedElement) {
    lastModifiedElement.textContent = document.lastModified;
  }

  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      navLinks.classList.toggle("show");
      menuToggle.textContent = navLinks.classList.contains("show")
        ? "✖"
        : "☰";
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  initHeaderFooterFeatures();
});


