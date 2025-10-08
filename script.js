// Function to inject a partial HTML file into a target element
async function injectPartial(targetSelector, url) {
  const host = document.querySelector(targetSelector);
  if (!host) return;

  try {
    const response = await fetch(url, { cache: "no-cache" });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const html = await response.text();
    host.innerHTML = html;

    // After injecting the header, add its specific behaviors
    if (targetSelector === "header.site-header") {
      // Highlight the active navigation link
      const currentPage = (location.pathname.split("/").pop() || "index.html").toLowerCase().replace(".html", "");
      
      document.querySelectorAll('header a[data-nav]').forEach(link => {
        const linkPage = (link.getAttribute("href") || "").toLowerCase().replace(".html", "");
        if (linkPage === currentPage) {
          link.classList.add("active");
        }
      });

      // Mobile menu toggle functionality
      const menuButton = document.getElementById("mobile-menu-button");
      const navMenu = document.getElementById("mobile-menu");
      if (menuButton && navMenu) {
        menuButton.addEventListener("click", () => {
          navMenu.classList.toggle("show");
        });
      }
    }
  } catch (error) {
    console.error(`Failed to load partial from ${url}:`, error);
  }
}

// When the page is loaded, inject the header and footer
document.addEventListener("DOMContentLoaded", () => {
  injectPartial("header.site-header", "partials/header.html");
  injectPartial("footer.site-footer", "partials/footer.html");
});