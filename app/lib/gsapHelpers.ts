import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
export function ensureRegistered() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

type RevealOptions = {
  y?: number;
  duration?: number;
  ease?: string;
  start?: string;
  stagger?: number;
  delay?: number;
};

/** Fade + rise entrance for one or more elements, plays once on scroll into view. */
export function revealOnScroll(
  targets: Element[] | NodeListOf<Element>,
  opts: RevealOptions = {}
) {
  const els = Array.from(targets);
  if (!els.length) return;
  const {
    y = 40,
    duration = 0.9,
    ease = "power3.out",
    start = "top 85%",
    stagger = 0,
    delay = 0,
  } = opts;

  els.forEach((el, i) => {
    gsap.set(el, { autoAlpha: 0, y });
    gsap.to(el, {
      autoAlpha: 1,
      y: 0,
      duration,
      ease,
      delay: delay + i * stagger,
      clearProps: "transform",
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    });
  });
}

/** Batched fade+rise for a repeated card grid, using ScrollTrigger.batch for a cascading feel. */
export function batchCards(
  targets: Element[] | NodeListOf<Element>,
  opts: RevealOptions & { xFrom?: number[] } = {}
) {
  const els = Array.from(targets);
  if (!els.length) return;
  const { y = 40, duration = 0.9, ease = "power3.out", start = "top 85%", stagger = 0.12, xFrom } = opts;

  els.forEach((el, i) => {
    const x = xFrom ? xFrom[i % xFrom.length] : 0;
    gsap.set(el, { autoAlpha: 0, y, x });
  });

  ScrollTrigger.batch(els, {
    start,
    onEnter: (batch) => {
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        x: 0,
        duration,
        ease,
        stagger,
        clearProps: "transform",
      });
    },
    once: true,
  });
}

/** Scroll-scrubbed vertical drift for a background/decorative layer. */
export function parallaxLayer(
  target: Element | null,
  opts: { speed?: number; trigger?: Element | string } = {}
) {
  if (!target) return;
  const { speed = 0.6, trigger } = opts;
  gsap.to(target, {
    yPercent: (1 - speed) * 30,
    ease: "none",
    scrollTrigger: {
      trigger: (trigger as Element) || target,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5,
    },
  });
}

/** Continuous idle float loop, independent of scroll position. */
export function idleFloat(target: Element | null, opts: { distance?: number; duration?: number } = {}) {
  if (!target) return;
  const { distance = 10, duration = 3 } = opts;
  gsap.to(target, {
    y: `+=${distance}`,
    duration,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
}

/** Count up a number span from 0 (or a given start) to its target value on scroll into view. */
export function countUp(
  el: Element | null,
  opts: { duration?: number; start?: string } = {}
) {
  if (!el) return;
  const raw = el.textContent || "";
  const match = raw.match(/[\d,.]+/);
  if (!match) return;
  const target = parseFloat(match[0].replace(/,/g, ""));
  if (Number.isNaN(target)) return;
  const prefix = raw.slice(0, match.index);
  const suffix = raw.slice((match.index || 0) + match[0].length);
  const hasDecimal = match[0].includes(".");

  const counter = { val: 0 };
  ScrollTrigger.create({
    trigger: el,
    start: opts.start || "top 90%",
    once: true,
    onEnter: () => {
      gsap.to(counter, {
        val: target,
        duration: opts.duration || 1.4,
        ease: "power1.out",
        onUpdate: () => {
          const current = hasDecimal ? counter.val.toFixed(1) : Math.round(counter.val).toLocaleString();
          el.textContent = `${prefix}${current}${suffix}`;
        },
      });
    },
  });
}

/** Reveal a clipped element with a directional wipe, either playing once or scrubbed to scroll. */
export function clipWipe(
  target: Element | null,
  opts: { direction?: "up" | "left"; scrub?: boolean; trigger?: Element | string; start?: string; end?: string } = {}
) {
  if (!target) return;
  const { direction = "up", scrub = false, trigger, start = "top 85%", end = "top 30%" } = opts;
  const from = direction === "up" ? "inset(100% 0 0 0)" : "inset(0 100% 0 0)";
  gsap.set(target, { clipPath: from, webkitClipPath: from });

  const tween = {
    clipPath: "inset(0 0 0 0)",
    webkitClipPath: "inset(0 0 0 0)",
    ease: scrub ? "none" : "power3.out",
    duration: scrub ? undefined : 1,
  };

  gsap.to(target, {
    ...tween,
    scrollTrigger: scrub
      ? { trigger: (trigger as Element) || target, start, end, scrub: true }
      : { trigger: (trigger as Element) || target, start, toggleActions: "play none none none" },
  });
}

/** Draw-on effect for an SVG stroke path, scrubbed to the section's scroll range. */
export function strokeDraw(
  path: SVGPathElement | null,
  opts: { trigger?: Element | string; start?: string; end?: string } = {}
) {
  if (!path) return;
  const length = path.getTotalLength();
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  gsap.to(path, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: (opts.trigger as Element) || path,
      start: opts.start || "top 70%",
      end: opts.end || "bottom 60%",
      scrub: true,
    },
  });
}

/** Horizontal line draw-on via scaleX, scrubbed to scroll. */
export function drawLine(
  target: Element | null,
  opts: { trigger?: Element | string; start?: string; end?: string } = {}
) {
  if (!target) return;
  gsap.set(target, { scaleX: 0, transformOrigin: "left center" });
  gsap.to(target, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: (opts.trigger as Element) || target,
      start: opts.start || "top 70%",
      end: opts.end || "bottom 60%",
      scrub: true,
    },
  });
}
