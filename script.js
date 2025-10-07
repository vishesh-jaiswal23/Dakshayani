// Inject shared header & footer, then wire up the menu.
(function(){
  // where to load from
  const headerURL = "partials/header.html";
  const footerURL = "partials/footer.html";

  // placeholders that exist on every page
  const headerPlaceholder = document.querySelector("header");
  const footerPlaceholder = document.querySelector("footer");

  // fetch and inject header
  if (headerPlaceholder) {
    fetch(headerURL)
      .then(r => r.text())
      .then(html => {
        headerPlaceholder.outerHTML = html;
        setupMenu(); // wire up after DOM fragment is in
      })
      .catch(console.error);
  }

  // fetch and inject footer
  if (footerPlaceholder) {
    fetch(footerURL)
      .then(r => r.text())
      .then(html => { footerPlaceholder.outerHTML = html; })
      .catch(console.error);
  }

  function setupMenu(){
    const btn = document.getElementById("menuToggle");
    const nav = document.getElementById("navLinks");
    if (btn && nav) {
      btn.addEventListener("click", () => {
        nav.classList.toggle("show");
      });
    }
  }
})();
