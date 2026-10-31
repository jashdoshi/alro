"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * The motion engine. Markup opts in with data attributes, the engine wires
 * them up — the same API as the reference teardown:
 *
 *   data-hero="kicker|top|bottom|underline|text|cta|aside|hint"  intro timeline parts
 *   data-reveal="lines" | "fade"          masked line reveal / fade-up on enter
 *   data-reveal-group                     children rise .12s apart
 *   data-scrub-words                      word opacity tied to scroll
 *   data-clip (+ [data-clip-img])         clip-path reveal with inner scale
 *   data-parallax                         image yPercent drift
 *   data-drift                            ghost numerals slide against scroll
 *   data-magnetic="0.3"                   magnetic pull
 *   data-cursor-label="View" · data-cursor-invert · data-cursor-flower
 *   data-marquee / data-marquee-track     velocity-reactive marquee
 *   data-flow-line                        svg path drawn by scroll
 *   data-steps / data-step                process timeline active state
 *   data-nav-pill · #siteHeader           sliding hover pill, hide on scroll
 */

let lenis: Lenis | null = null;
let velocity = 0;

const REDUCE = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE = () => typeof window !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches;

export function scrollToTarget(target: string | number | HTMLElement) {
  if (lenis) lenis.scrollTo(target, { offset: -90 });
  else if (typeof target === "number") window.scrollTo({ top: target });
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: REDUCE() ? "auto" : "smooth" });
  }
}

export function FlowEngine() {
  const pathname = usePathname();
  const router = useRouter();
  const ready = useRef(false);
  const transitioning = useRef(false);

  /* ───────── once: smooth scroll, cursor, preloader, transitions ───────── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const reduce = REDUCE();
    const html = document.documentElement;
    const cleanups: (() => void)[] = [];

    /* Lenis on the GSAP ticker */
    if (!reduce) {
      lenis = new Lenis({
        autoRaf: false,
        duration: 1.35,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      lenis.on("scroll", (e: Lenis) => {
        velocity = e.velocity || 0;
        ScrollTrigger.update();
      });
      const raf = (t: number) => lenis?.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      cleanups.push(() => {
        gsap.ticker.remove(raf);
        lenis?.destroy();
        lenis = null;
      });
    }

    /* Custom cursor: arrow + lagging ring + flower badge */
    if (FINE() && !reduce) {
      html.classList.add("has-cursor");
      const dot = Object.assign(document.createElement("div"), { className: "c-dot is-hidden" });
      const ring = Object.assign(document.createElement("div"), { className: "c-ring is-hidden" });
      ring.innerHTML = '<span class="c-label"></span>';
      const flower = Object.assign(document.createElement("div"), { className: "c-flower" });
      flower.innerHTML =
        '<div class="in"><svg class="c-orbit" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="fo" d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" fill="none"/></defs><text font-size="16" font-weight="700" letter-spacing="4"><textPath href="#fo" textLength="502" lengthAdjust="spacingAndGlyphs">VIEW PROJECT • VIEW PROJECT • </textPath></text></svg><div class="core"><svg class="p" viewBox="0 0 100 100"><circle cx="80" cy="50" r="14"/><circle cx="71.2" cy="71.2" r="14"/><circle cx="50" cy="80" r="14"/><circle cx="28.8" cy="71.2" r="14"/><circle cx="20" cy="50" r="14"/><circle cx="28.8" cy="28.8" r="14"/><circle cx="50" cy="20" r="14"/><circle cx="71.2" cy="28.8" r="14"/><circle cx="50" cy="50" r="30"/></svg><svg class="a" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg></div></div>';
      document.body.append(dot, ring, flower);
      const label = ring.querySelector(".c-label") as HTMLElement;
      const q = (el: Element, p: string, d: number) => gsap.quickTo(el, p, { duration: d, ease: "power3.out" });
      const dX = q(dot, "x", 0.12), dY = q(dot, "y", 0.12), rX = q(ring, "x", 0.45), rY = q(ring, "y", 0.45), fX = q(flower, "x", 0.4), fY = q(flower, "y", 0.4);
      let shown = false, mx = 0, my = 0;
      let host: Element | null = null;
      const INTER = "a, button, input, textarea, select, label, [role=tab], [data-cursor]";
      const apply = (el: Element | null) => {
        if (!el || !el.closest) return;
        const inv = !!el.closest("[data-cursor-invert]");
        dot.classList.toggle("is-inv", inv);
        ring.classList.toggle("is-inv", inv);
        const fl = el.closest("[data-cursor-flower]");
        if (fl) {
          host = fl;
          flower.classList.add("is-active");
          dot.classList.add("is-sup");
          ring.classList.add("is-sup");
          ring.classList.remove("is-active", "is-label");
          return;
        }
        host = null;
        flower.classList.remove("is-active");
        dot.classList.remove("is-sup");
        ring.classList.remove("is-sup");
        const t = el.closest(INTER);
        if (!t) return ring.classList.remove("is-active", "is-label");
        const lab = el.closest<HTMLElement>("[data-cursor-label]");
        if (lab) {
          label.textContent = lab.dataset.cursorLabel ?? "";
          ring.classList.add("is-label");
          ring.classList.remove("is-active");
        } else {
          ring.classList.add("is-active");
          ring.classList.remove("is-label");
        }
      };
      const onMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
        if (!shown) {
          shown = true;
          gsap.set([dot, ring, flower], { x: mx, y: my });
          dot.classList.remove("is-hidden");
          ring.classList.remove("is-hidden");
        }
        dX(mx); dY(my); rX(mx); rY(my);
        let fx = mx, fy = my;
        if (host) {
          const r = host.getBoundingClientRect();
          fx = Math.min(Math.max(fx, r.left), r.right);
          fy = Math.min(Math.max(fy, r.top), r.bottom);
        }
        fX(fx); fY(fy);
      };
      const onLeave = () => {
        dot.classList.add("is-hidden");
        ring.classList.add("is-hidden");
        flower.classList.remove("is-active");
        shown = false;
      };
      const onOver = (e: MouseEvent) => apply(e.target as Element);
      const recheck = () => shown && apply(document.elementFromPoint(mx, my));
      addEventListener("mousemove", onMove);
      document.addEventListener("mouseleave", onLeave);
      document.addEventListener("mouseover", onOver);
      addEventListener("scroll", recheck, { passive: true });
      cleanups.push(() => {
        removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseleave", onLeave);
        document.removeEventListener("mouseover", onOver);
        removeEventListener("scroll", recheck);
        dot.remove(); ring.remove(); flower.remove();
        html.classList.remove("has-cursor");
      });
    }

    /* Preloader (first visit per session) → then the page intro */
    const pre = document.querySelector<HTMLElement>("[data-preloader]");
    const markReady = () => {
      ready.current = true;
      window.dispatchEvent(new Event("flow:ready"));
    };
    if (pre && !html.classList.contains("pl-skip") && !reduce) {
      lenis?.stop();
      const chars = pre.querySelectorAll(".pl-char"), tag = pre.querySelector(".pl-tag"), cnt = pre.querySelector(".pl-count") as HTMLElement;
      const n = { v: 0 };
      gsap
        .timeline({
          onComplete: () => {
            pre.style.display = "none";
            lenis?.start();
            try {
              sessionStorage.setItem("alro-pl", "1");
            } catch {}
          },
        })
        .set(pre, { yPercent: 0 })
        .from(chars, { yPercent: 130, duration: 0.9, ease: "power4.out", stagger: 0.055 })
        .to(tag, { opacity: 1, duration: 0.5 }, "-=0.4")
        .to(cnt, { opacity: 1, duration: 0.4 }, "<")
        .to(n, { v: 100, duration: 1.3, ease: "power2.inOut", onUpdate: () => void (cnt.textContent = String(Math.round(n.v))) }, 0.35)
        .to(chars, { yPercent: -130, duration: 0.6, ease: "power3.in", stagger: 0.04 }, "+=0.05")
        .to([tag, cnt], { opacity: 0, duration: 0.35 }, "<")
        .to(pre, { yPercent: -112, duration: 1.1, ease: "expo.inOut" }, "-=0.3")
        .add(markReady, "-=0.75");
    } else {
      if (pre) pre.style.display = "none";
      markReady();
    }

    /* Page transitions: cover, navigate, uncover */
    const layer = document.querySelector<HTMLElement>("[data-transition]");
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      // in-page anchor → smooth scroll
      if (url.pathname === location.pathname && url.hash) {
        const t = document.querySelector(url.hash);
        if (t) {
          e.preventDefault();
          e.stopPropagation();
          window.dispatchEvent(new Event("flow:navigate"));
          scrollToTarget(t as HTMLElement);
          history.replaceState(null, "", url.hash);
        }
        return;
      }
      if (url.pathname === location.pathname || reduce || !layer || transitioning.current) return;
      // capture phase: stop Next's <Link> from navigating instantly; we navigate after the cover
      e.preventDefault();
      e.stopPropagation();
      window.dispatchEvent(new Event("flow:navigate"));
      transitioning.current = true;
      layer.classList.add("on");
      const [back, front] = [layer.querySelector(".back"), layer.querySelector(".front")];
      gsap
        .timeline({ onComplete: () => router.push(url.pathname + url.search + url.hash) })
        .fromTo(back, { yPercent: 112 }, { yPercent: 0, duration: 0.6, ease: "expo.inOut" }, 0)
        .fromTo(front, { yPercent: 112 }, { yPercent: 0, duration: 0.6, ease: "expo.inOut" }, 0.09);
    };
    document.addEventListener("click", onClick, true);
    cleanups.push(() => document.removeEventListener("click", onClick, true));

    return () => cleanups.forEach((f) => f());
  }, [router]);

  /* ───────── per route: everything that scans the page ───────── */
  useEffect(() => {
    const reduce = REDUCE();
    const fine = FINE();
    lenis?.scrollTo(0, { immediate: true });

    // uncover after a transition
    const layer = document.querySelector<HTMLElement>("[data-transition]");
    if (transitioning.current && layer) {
      const [back, front] = [layer.querySelector(".back"), layer.querySelector(".front")];
      gsap
        .timeline({
          onComplete: () => {
            layer.classList.remove("on");
            transitioning.current = false;
          },
        })
        .to(front, { yPercent: -112, duration: 0.7, ease: "expo.inOut" }, 0.1)
        .to(back, { yPercent: -112, duration: 0.7, ease: "expo.inOut" }, 0.19);
    }

    const offs: (() => void)[] = [];
    const ctx = gsap.context(() => {
      /* masked lines */
      const pad = (s: SplitText) =>
        (s.masks?.length ? s.masks : s.lines.map((l) => l.parentElement)).forEach((m) => {
          if (!(m instanceof HTMLElement)) return;
          m.style.padding = "0.12em 0.18em 0.22em";
          m.style.margin = "-0.12em -0.18em -0.22em";
        });
      const lines = (el: Element) => {
        const s = new SplitText(el, { type: "lines", mask: "lines" });
        pad(s);
        return s.lines;
      };

      /* hero intro */
      const hero = (part: string) => gsap.utils.toArray<HTMLElement>(`[data-hero="${part}"]`);
      const intro = () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.set("[data-hero]", { opacity: 1 })
          .from(hero("kicker"), { opacity: 0, y: 20, duration: 1 }, 0.15)
          .fromTo(hero("top"), { xPercent: -110 }, { xPercent: 0, duration: 1.5 }, 0.1)
          .fromTo(hero("bottom"), { xPercent: 110 }, { xPercent: 0, duration: 1.5 }, 0.1)
          .from(hero("text"), { opacity: 0, y: 24, duration: 1 }, 0.65)
          .from(hero("cta"), { opacity: 0, y: 24, duration: 1, stagger: 0.08 }, 0.75)
          .from(hero("aside"), { opacity: 0, y: 44, duration: 1.2, stagger: 0.12 }, 0.7)
          .from(hero("hint"), { opacity: 0, duration: 0.8 }, 1.2)
          .from("#siteHeader nav", { y: -90, opacity: 0, duration: 1 }, 0);
        const ul = document.querySelector<SVGPathElement>('[data-hero="underline"] path');
        if (ul) {
          const len = ul.getTotalLength();
          tl.fromTo(ul, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, 0.95);
        }
      };
      if (document.querySelector("[data-hero]")) {
        if (reduce) gsap.set("[data-hero]", { opacity: 1 });
        else if (ready.current) intro();
        else {
          const go = () => ctx.add(intro);
          window.addEventListener("flow:ready", go, { once: true });
          offs.push(() => window.removeEventListener("flow:ready", go));
        }
        if (!reduce) {
          gsap.to(hero("top"), { x: () => innerWidth * 0.08, ease: "none", scrollTrigger: { trigger: "[data-hero-root]", start: "top top", end: "bottom top", scrub: 1, invalidateOnRefresh: true } });
          gsap.to(hero("bottom"), { x: () => -innerWidth * 0.08, ease: "none", scrollTrigger: { trigger: "[data-hero-root]", start: "top top", end: "bottom top", scrub: 1, invalidateOnRefresh: true } });
        }
      }

      if (reduce) return;

      /* reveals */
      gsap.utils.toArray<HTMLElement>('[data-reveal="lines"]').forEach((el) =>
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => gsap.fromTo(lines(el), { yPercent: 115 }, { yPercent: 0, duration: 1.1, stagger: 0.09, ease: "power4.out" }),
        }),
      );
      gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]').forEach((el) =>
        gsap.fromTo(el, { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 1.1, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }),
      );
      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((g) =>
        gsap.fromTo(g.children, { opacity: 0, y: 64 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power4.out", scrollTrigger: { trigger: g, start: "top 85%", once: true } }),
      );

      /* scrub words */
      gsap.utils.toArray<HTMLElement>("[data-scrub-words]").forEach((el) => {
        const s = new SplitText(el, { type: "words" });
        gsap.fromTo(s.words, { opacity: 0.12 }, { opacity: 1, stagger: 0.04, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "top 30%", scrub: 0.6 } });
      });

      /* clip reveal + parallax */
      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
        const img = el.querySelector("[data-clip-img]");
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "power4.inOut" });
            if (img) gsap.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 2, ease: "power2.out" });
          },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) =>
        gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }),
      );
      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) =>
        gsap.fromTo(el, { xPercent: 18 }, { xPercent: -14, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }),
      );

      /* scroll-drawn line */
      gsap.utils.toArray<SVGPathElement>("[data-flow-line] path").forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(p, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: p.closest("[data-flow-wrap]"), start: "top 75%", end: "bottom 85%", scrub: 1 } });
      });

      /* process steps: the step at the reading line is active, earlier ones done */
      gsap.utils.toArray<HTMLElement>("[data-steps]").forEach((wrap) => {
        const steps = gsap.utils.toArray<HTMLElement>("[data-step]", wrap);
        const fill = wrap.querySelector("[data-steps-fill]");
        if (fill) gsap.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: wrap, start: "top 60%", end: "bottom 60%", scrub: true } });
        steps.forEach((s, i) =>
          ScrollTrigger.create({
            trigger: s,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (self) => {
              if (!self.isActive) return;
              steps.forEach((o, k) => {
                o.classList.toggle("is-active", k === i);
                o.classList.toggle("is-done", k < i);
              });
            },
          }),
        );
      });

      /* velocity marquee */
      gsap.utils.toArray<HTMLElement>("[data-marquee-track]").forEach((track) => {
        const base = track.children[0] as HTMLElement;
        if (!base) return;
        while (track.scrollWidth < innerWidth * 2 && track.children.length < 8) {
          const c = base.cloneNode(true) as HTMLElement;
          c.setAttribute("aria-hidden", "true");
          track.appendChild(c);
        }
        const speed = Number(track.dataset.marqueeSpeed) || 70;
        const w = base.offsetWidth;
        const tw = gsap.to(track, { x: -w, duration: w / speed, ease: "none", repeat: -1 });
        const skew = gsap.quickTo(track, "skewX", { duration: 0.4, ease: "power2.out" });
        const tick = () => {
          const v = Math.min(Math.abs(velocity) / 60, 4);
          tw.timeScale(gsap.utils.interpolate(tw.timeScale(), 1 + v, 0.08));
          skew(gsap.utils.clamp(-8, 8, velocity * 0.08));
        };
        gsap.ticker.add(tick);
        offs.push(() => {
          gsap.ticker.remove(tick);
          track.querySelectorAll("[aria-hidden=true]").forEach((c) => c !== base && c.remove());
        });
      });

      /* magnetic */
      if (fine) {
        gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
          const s = parseFloat(el.dataset.magnetic || "") || 0.35;
          const move = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * s, y: (e.clientY - r.top - r.height / 2) * s, duration: 0.4, ease: "power3.out" });
          };
          const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
          el.addEventListener("mousemove", move);
          el.addEventListener("mouseleave", leave);
          offs.push(() => {
            el.removeEventListener("mousemove", move);
            el.removeEventListener("mouseleave", leave);
          });
        });
      }
    });

    /* nav pill */
    const nav = document.querySelector<HTMLElement>("[data-nav-pill]");
    if (nav) {
      const pill = Object.assign(document.createElement("span"), { className: "nav-pill" });
      nav.prepend(pill);
      let vis = false;
      const move = (a: HTMLElement) => {
        const n = nav.getBoundingClientRect(), r = a.getBoundingClientRect();
        const x = r.left - n.left - 14, width = r.width + 28;
        if (!vis) {
          gsap.set(pill, { x, width });
          gsap.to(pill, { opacity: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
        } else gsap.to(pill, { x, width, opacity: 1, duration: 0.45, ease: "power3.out", overwrite: "auto" });
        vis = true;
      };
      const links = Array.from(nav.querySelectorAll<HTMLElement>("a"));
      const enters = links.map((a) => {
        const f = () => move(a);
        a.addEventListener("mouseenter", f);
        return () => a.removeEventListener("mouseenter", f);
      });
      const leave = () => {
        vis = false;
        gsap.to(pill, { opacity: 0, duration: 0.25, ease: "power2.out", overwrite: "auto" });
      };
      nav.addEventListener("mouseleave", leave);
      offs.push(() => {
        enters.forEach((f) => f());
        nav.removeEventListener("mouseleave", leave);
        pill.remove();
      });
    }

    /* header hides scrolling down, returns scrolling up */
    const header = document.getElementById("siteHeader");
    if (header && !reduce) {
      let last = 0, hidden = false;
      const on = (y: number) => {
        if (y > 420 && y - last > 4 && !hidden) {
          hidden = true;
          gsap.to(header, { yPercent: -160, duration: 0.55, ease: "power3.out", overwrite: "auto" });
        } else if ((last - y > 4 || y < 420) && hidden) {
          hidden = false;
          gsap.to(header, { yPercent: 0, duration: 0.55, ease: "power3.out", overwrite: "auto" });
        }
        last = y;
      };
      const onScroll = () => on(window.scrollY);
      addEventListener("scroll", onScroll, { passive: true });
      offs.push(() => {
        removeEventListener("scroll", onScroll);
        gsap.set(header, { yPercent: 0 });
      });
    }

    const refresh = () => ScrollTrigger.refresh();
    addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      removeEventListener("load", refresh);
      offs.forEach((f) => f());
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
