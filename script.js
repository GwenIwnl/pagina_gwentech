(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById("site-header");
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  navToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });
  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => mobileMenu.classList.remove("open"));
  });

  /* ---------- Services tabs ---------- */
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = {
    hardware: document.getElementById("tab-hardware"),
    software: document.getElementById("tab-software"),
  };
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      tabBtns.forEach((b) => b.classList.toggle("active", b === btn));
      Object.entries(tabPanels).forEach(([key, el]) => {
        el.classList.toggle("active", key === target);
      });
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    // Only now do .reveal elements start hidden (see CSS) — JS is
    // confirmed able to run, so it can also confirm it's able to reveal them.
    document.documentElement.classList.add("js-anim");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  /* ---------- Hero hardware "assemble" trigger ---------- */
  const hwStage = document.getElementById("hw-stage");
  if (hwStage) {
    if ("IntersectionObserver" in window && !reduceMotion) {
      const hwObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              hwStage.classList.add("in-view");
              hwObserver.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      hwObserver.observe(hwStage);
    } else {
      hwStage.classList.add("in-view");
    }
  }

  /* ---------- Request form → WhatsApp ---------- */
  const WA_NUMBER = "529841082210";
  const osButtons = document.querySelectorAll(".os-btn");
  let selectedOS = "Windows";
  osButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      osButtons.forEach((b) => b.classList.toggle("active", b === btn));
      selectedOS = btn.dataset.os;
    });
  });

  const problemField = document.getElementById("f-problem");
  const charCount = document.getElementById("f-count");
  if (problemField && charCount) {
    problemField.addEventListener("input", () => {
      charCount.textContent = problemField.value.length;
    });
  }

  const requestForm = document.getElementById("request-form");
  if (requestForm) {
    requestForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("f-name").value.trim();
      const device = document.getElementById("f-device").value.trim();
      const model = document.getElementById("f-model").value.trim();
      const problem = document.getElementById("f-problem").value.trim();

      const lines = ["Hola GwenTech, quisiera solicitar un servicio."];
      if (name) lines.push(`Nombre: ${name}`);
      lines.push(`Sistema: ${selectedOS}`);
      if (device) lines.push(`Equipo: ${device}`);
      if (model) lines.push(`Modelo: ${model}`);
      if (problem) lines.push(`Problema: ${problem}`);

      const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
      window.open(url, "_blank", "noopener");
    });
  }

  /* ---------- Ambient circuit particle background ---------- */
  const canvas = document.getElementById("circuit-bg");
  const ctx = canvas.getContext("2d");
  let W, H, DPR;
  let nodes = [];

  const NODE_COLORS = ["91,124,255", "139,122,255", "169,150,255"];

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    buildNodes();
  }

  function buildNodes() {
    const density = Math.min(70, Math.floor((W * H) / 22000));
    nodes = Array.from({ length: density }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      r: Math.random() * 1.4 + 0.6,
      c: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
    }));
  }

  const LINK_DIST = 150;

  function drawFrame() {
    ctx.clearRect(0, 0, W, H);

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < -20) n.x = W + 20;
      if (n.x > W + 20) n.x = -20;
      if (n.y < -20) n.y = H + 20;
      if (n.y > H + 20) n.y = -20;
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          const alpha = (1 - dist / LINK_DIST) * 0.14;
          ctx.strokeStyle = `rgba(${a.c},${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(${n.c},0.55)`;
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  let rafId;
  function loop() {
    drawFrame();
    rafId = requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });

  if (reduceMotion) {
    drawFrame(); // single static frame, no motion
  } else {
    loop();
  }

  document.addEventListener("visibilitychange", () => {
    if (reduceMotion) return;
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      loop();
    }
  });
})();
