// ===== Fade in (all .fade) =====
(() => {
  const fades = document.querySelectorAll(".fade");
  if (fades.length === 0) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("show");
      });
    },
    { threshold: 0.18 }
  );

  fades.forEach((el) => io.observe(el));
})();

// ===== Header shrink =====
(() => {
  const header = document.querySelector("header");
  if (!header) return;

  window.addEventListener(
    "scroll",
    () => {
      header.classList.toggle("shrink", window.scrollY > 80);
    },
    { passive: true }
  );
})();

// ===== Cursor follow =====
(() => {
  const cursor = document.querySelector(".cursor");
  if (!cursor) return;

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  const interactiveSelector = [
    "a",
    "button",
    ".btn",
    "input",
    "textarea",
    "select",
    "[role='button']",
    "[data-cursor='hover']",
  ].join(",");

  const ctaSelector = [".btn", "[data-cursor='cta']"].join(",");

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(interactiveSelector)) cursor.classList.add("is-hover");
    if (e.target.closest(ctaSelector)) cursor.classList.add("is-cta");
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(interactiveSelector)) cursor.classList.remove("is-hover");
    if (e.target.closest(ctaSelector)) cursor.classList.remove("is-cta");
  });
})();

// ===== Nav active auto (data-page) =====
(() => {
  const file = location.pathname.split("/").pop() || "index.html";
  const page = file.replace(".html", "");
  document.querySelectorAll("nav a[data-page]").forEach((a) => {
    if (a.dataset.page === page) a.classList.add("active");
  });
})();

// ===== About: auto age (fill ALL .age) =====
(() => {
  const ageEls = document.querySelectorAll(".age");
  if (ageEls.length === 0) return;

  const birthDate = new Date(2007, 1, 1); // 2007-02-01
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

  ageEls.forEach((el) => {
    el.textContent = `専門学生 ${age}歳`;
  });
})();

// ===== About: subtle hero parallax (About only) =====
(() => {
  if (!document.body.classList.contains("page-about")) return;

  const items = Array.from(document.querySelectorAll(".about-parallax"));
  if (items.length === 0) return;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const onScroll = () => {
    const y = window.scrollY || 0;
    const limited = clamp(y, 0, 520);
    items.forEach((el) => {
      const speed = parseFloat(el.dataset.speed || "0.12");
      el.style.transform = `translate3d(0, ${limited * speed}px, 0)`;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// ===== Loading (SAFE: show only when JS is alive, hide always) =====
(() => {
  const loading = document.getElementById("loading");
  if (!loading) return;

  const KEY = "kyle_loading_done";
  const already = sessionStorage.getItem(KEY) === "1";

  if (!already) {
    loading.classList.remove("is-hide");

    const forceHide = () => {
      loading.classList.add("is-hide");
      sessionStorage.setItem(KEY, "1");
    };

    window.addEventListener("load", () => {
      setTimeout(forceHide, 450);
    });

    setTimeout(forceHide, 2500);
  } else {
    loading.classList.add("is-hide");
  }
})();
