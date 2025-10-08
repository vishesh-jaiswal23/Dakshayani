<!-- place this as /script.js (root) -->
<script>
// Inject a partial into a target element
async function injectPartial(targetSelector, url) {
  const host = document.querySelector(targetSelector);
  if (!host) return;

  try {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const html = await res.text();
    host.innerHTML = html;

    // After injection, wire up behaviors if header
    if (targetSelector === "header.site-header") {
      // Active nav highlight
      const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
      document.querySelectorAll('header a[data-nav]').forEach(a => {
        const href = (a.getAttribute("href") || "").toLowerCase();
        if (href === current) a.classList.add("active");
      });

      // Mobile menu toggle
      const btn = document.querySelector(".menu-btn");
      const nav = document.querySelector(".nav");
      if (btn && nav) btn.addEventListener("click", () => nav.classList.toggle("show"));
    }
  } catch (err) {
    console.error("Partial load failed:", url, err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  injectPartial("header.site-header", "partials/header.html");
  injectPartial("footer.site-footer", "partials/footer.html");
});
</script>
