"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ensureRegistered,
  revealOnScroll,
  batchCards,
  parallaxLayer,
  idleFloat,
  countUp,
  clipWipe,
  drawLine,
} from "../lib/gsapHelpers";

/**
 * Splits a heading's direct text into word-level <span> wrappers, leaving any
 * existing child elements (e.g. an italic accent span) untouched as single units.
 * Idempotent: safe to call twice (React Strict Mode double-invokes effects in dev).
 */
function splitIntoWordSpans(heading: HTMLElement): HTMLElement[] {
  if (heading.dataset.scSplit === "1") {
    return Array.from(heading.querySelectorAll<HTMLElement>("[data-sc-word]"));
  }

  const words: HTMLElement[] = [];
  Array.from(heading.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      const frag = document.createDocumentFragment();
      text.split(/(\s+)/).forEach((part) => {
        if (part === "") return;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
        } else {
          const span = document.createElement("span");
          span.textContent = part;
          span.style.display = "inline-block";
          span.setAttribute("data-sc-word", "");
          frag.appendChild(span);
          words.push(span);
        }
      });
      node.replaceWith(frag);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      el.style.display = el.style.display || "inline-block";
      el.setAttribute("data-sc-word", "");
      words.push(el);
    }
  });

  heading.dataset.scSplit = "1";
  return words;
}

export default function ScrollAnimations() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    ensureRegistered();

    const ctx = gsap.context(() => {
      // --- On-mount entrance (above the fold, not scroll-tied) ---
      const heroBg = document.querySelector('[data-anim="hero-bg"]');
      if (heroBg) {
        gsap.fromTo(heroBg, { scale: 1.04 }, { scale: 1, duration: 1.2, ease: "power2.out", clearProps: "transform" });
      }

      const headerItems = document.querySelectorAll('[data-anim="header-item"]');
      gsap.set(headerItems, { autoAlpha: 0, y: -16 });
      gsap.to(headerItems, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05,
        delay: 0.1,
        clearProps: "transform",
      });

      // Hero badge -> word-split heading -> subtitle -> CTAs, staged
      const badge = document.querySelector('[data-anim="hero-badge"]');
      const heading = document.querySelector<HTMLElement>('[data-anim="hero-heading"]');
      const sub = document.querySelector('[data-anim="hero-sub"]');
      const cta = document.querySelector('[data-anim="hero-cta"]');

      const tl = gsap.timeline({ delay: 0.35 });
      if (badge) {
        gsap.set(badge, { autoAlpha: 0, y: 16 });
        tl.to(badge, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", clearProps: "transform" });
      }

      if (heading) {
        const words = splitIntoWordSpans(heading);
        gsap.set(words, { autoAlpha: 0, y: 20 });
        tl.to(
          words,
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.03, clearProps: "transform" },
          "-=0.15"
        );
      }

      if (sub) {
        gsap.set(sub, { autoAlpha: 0, y: 16 });
        tl.to(sub, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", clearProps: "transform" }, "-=0.2");
      }
      if (cta) {
        gsap.set(cta, { autoAlpha: 0, y: 16 });
        tl.to(cta, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", clearProps: "transform" }, "-=0.25");
      }

      // Floating ticket: idle float + scroll parallax
      const ticket = document.querySelector('[data-anim="ticket-float"]');
      if (ticket) {
        idleFloat(ticket, { distance: 10, duration: 3 });
        parallaxLayer(ticket, { speed: 0.5 });
      }

      // Booking card: fade + scale on scroll
      const bookingCard = document.querySelector('[data-anim="booking-card"]');
      if (bookingCard) {
        gsap.set(bookingCard, { autoAlpha: 0, y: 40, scale: 0.97 });
        gsap.to(bookingCard, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: bookingCard, start: "top 85%", toggleActions: "play none none none" },
        });
      }

      // Stat counters
      document.querySelectorAll('[data-anim="count-up"]').forEach((el) => countUp(el));

      // Generic single-element fade-up reveals (headings, standalone blocks)
      revealOnScroll(document.querySelectorAll('[data-anim="fade-up"]'), { stagger: 0 });

      // --- PREMIUM HEADING ANIMATIONS ---
      
      // 1. heading-split-up: Words stagger slide up
      document.querySelectorAll<HTMLElement>('[data-anim="heading-split-up"]').forEach((heading) => {
        const words = splitIntoWordSpans(heading);
        gsap.set(words, { autoAlpha: 0, y: 30 });
        gsap.to(words, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.05,
          clearProps: "transform",
          scrollTrigger: { trigger: heading, start: "top 85%", toggleActions: "play none none none" }
        });
      });

      // 2. heading-blur-in: Words stagger in with subtle scale and blur
      document.querySelectorAll<HTMLElement>('[data-anim="heading-blur-in"]').forEach((heading) => {
        const words = splitIntoWordSpans(heading);
        gsap.set(words, { autoAlpha: 0, scale: 1.05, filter: "blur(6px)" });
        gsap.to(words, {
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.06,
          clearProps: "transform,filter",
          scrollTrigger: { trigger: heading, start: "top 85%", toggleActions: "play none none none" }
        });
      });

      // 3. heading-clip-wipe: Clip path wipe from left to right per word
      document.querySelectorAll<HTMLElement>('[data-anim="heading-clip-wipe"]').forEach((heading) => {
        const words = splitIntoWordSpans(heading);
        gsap.set(words, { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", x: -10 });
        gsap.to(words, {
          clipPath: "polygon(0 0, 150% 0, 150% 100%, 0 100%)",
          x: 0,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.07,
          clearProps: "transform,clipPath",
          scrollTrigger: { trigger: heading, start: "top 85%", toggleActions: "play none none none" }
        });
      });

      // 4. heading-slide-left: Smooth glide from the right
      document.querySelectorAll<HTMLElement>('[data-anim="heading-slide-left"]').forEach((heading) => {
        gsap.set(heading, { autoAlpha: 0, x: 50 });
        gsap.to(heading, {
          autoAlpha: 1,
          x: 0,
          duration: 1.2,
          ease: "power4.out",
          clearProps: "transform",
          scrollTrigger: { trigger: heading, start: "top 85%", toggleActions: "play none none none" }
        });
      });

      // Generic parallax background layers
      document.querySelectorAll<HTMLElement>('[data-anim="parallax-bg"]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxSpeed || "0.6");
        parallaxLayer(el, { speed, trigger: el.parentElement || el });
      });

      // Destinations: clip-path wipe-up, each triggers independently on scroll into view
      document.querySelectorAll('[data-anim="clip-wipe-up"]').forEach((el) => {
        clipWipe(el, { direction: "up", start: "top 85%" });
      });

      // Visa cards: alternating slide-in
      const slideCards = document.querySelectorAll<HTMLElement>('[data-anim="slide-card"]');
      slideCards.forEach((el) => {
        const x = parseFloat(el.dataset.slideX || "0");
        gsap.set(el, { autoAlpha: 0, x });
        gsap.to(el, {
          autoAlpha: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        });
      });

      // Why Choose Us: main image scale-in
      const scaleIn = document.querySelector('[data-anim="scale-in"]');
      if (scaleIn) {
        gsap.set(scaleIn, { autoAlpha: 0, scale: 1.08 });
        gsap.to(scaleIn, {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: scaleIn, start: "top 75%", toggleActions: "play none none none" },
        });
      }

      // Generic card groups (feature cards, testimonial cards handled separately, faq items, footer columns, waypoints, arrival steps, doc list)
      document.querySelectorAll<HTMLElement>("[data-anim-group]").forEach((group) => {
        const name = group.dataset.animGroup;
        if (name === "testimonial-cards") return; // handled by tilt-in below
        const cards = group.querySelectorAll('[data-anim="card"]');
        if (!cards.length) return;
        const fast = name === "faq-items";
        batchCards(cards, { stagger: fast ? 0.08 : 0.12, start: fast ? "top 90%" : "top 85%" });
      });

      // Testimonials: tilt-in (rotateX + fade), batched
      const tiltCards = document.querySelectorAll<HTMLElement>('[data-anim="tilt-in"]');
      if (tiltCards.length) {
        gsap.set(tiltCards, { autoAlpha: 0, rotationX: -15, transformPerspective: 600, transformOrigin: "top center" });
        ScrollTrigger.batch(Array.from(tiltCards), {
          start: "top 85%",
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              rotationX: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.12,
              clearProps: "transform",
            }),
          once: true,
        });
      }

      // 3 Steps section: connecting line draw-on + step badges scale-pop
      const stepsSection = document.querySelector('[data-anim-section="steps"]');
      const line = document.querySelector('[data-anim="draw-line"]');
      if (line) {
        drawLine(line, { trigger: stepsSection || undefined, start: "top 70%", end: "bottom 60%" });
      }
      document.querySelectorAll<HTMLElement>('[data-anim="scale-pop"]').forEach((el) => {
        const delay = parseFloat(el.dataset.animDelay || "0");
        gsap.set(el, { autoAlpha: 0, scale: 0.6 });
        gsap.to(el, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          clearProps: "transform",
          scrollTrigger: {
            trigger: stepsSection || el,
            start: "top 65%",
            toggleActions: "play none none none",
          },
          delay,
        });
      });

      // MOROCCO giant type: scrubbed clip-path wipe
      const morocco = document.querySelector('[data-anim="clip-wipe-left"]');
      if (morocco) {
        clipWipe(morocco, { direction: "left", scrub: true, start: "top 70%", end: "top 30%" });
      }

      // Gate sticker: rotate-in
      const sticker = document.querySelector('[data-anim="rotate-in"]');
      if (sticker) {
        gsap.set(sticker, { autoAlpha: 0, rotate: -8, scale: 0.8 });
        gsap.to(sticker, {
          autoAlpha: 1,
          rotate: 0,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          clearProps: "transform",
          scrollTrigger: { trigger: sticker, start: "top 80%", toggleActions: "play none none none" },
        });
      }

      // Footer bottom bar: plain fade, no offset
      const fadeOnly = document.querySelector('[data-anim="fade-only"]');
      if (fadeOnly) {
        gsap.set(fadeOnly, { autoAlpha: 0 });
        gsap.to(fadeOnly, {
          autoAlpha: 1,
          duration: 0.8,
          ease: "power1.out",
          scrollTrigger: { trigger: fadeOnly, start: "top 95%", toggleActions: "play none none none" },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
