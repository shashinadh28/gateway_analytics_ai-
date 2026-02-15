import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";
import { easeInOut, gentleFloat, stagger } from "./motion.js";

const fadeUp40 = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeInOut },
  },
};

function AnimatedNumber({ value, duration = 1.6, delay = 0, decimals = 0 }) {
  const mv = useMotionValue(0);

  useEffect(() => {
    const controls = animate(mv, value, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [delay, duration, mv, value]);

  const formatted = useTransform(mv, (latest) => {
    const safe = Number.isFinite(latest) ? latest : 0;
    if (decimals > 0) return safe.toFixed(decimals);
    return Math.round(safe).toString();
  });

  return <motion.span>{formatted}</motion.span>;
}

function HeroSignals() {
  const dots = [
    { top: "18%", left: "10%", s: 6, d: 0.0 },
    { top: "28%", left: "22%", s: 4, d: 0.4 },
    { top: "42%", left: "14%", s: 5, d: 0.9 },
    { top: "22%", left: "42%", s: 4, d: 0.2 },
    { top: "36%", left: "48%", s: 6, d: 0.7 },
    { top: "14%", left: "66%", s: 4, d: 0.5 },
    { top: "30%", left: "74%", s: 5, d: 0.1 },
    { top: "48%", left: "62%", s: 4, d: 0.8 },
    { top: "56%", left: "80%", s: 6, d: 0.3 },
    { top: "62%", left: "36%", s: 5, d: 0.6 },
    { top: "68%", left: "18%", s: 4, d: 0.25 },
    { top: "72%", left: "58%", s: 4, d: 0.55 },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <motion.svg
        viewBox="0 0 800 260"
        className="absolute -right-28 top-16 hidden w-[860px] opacity-[0.07] lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: easeInOut, delay: 0.25 }}
      >
        <defs>
          <linearGradient id="heroGraph" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="0.4" stopColor="#60A5FA" stopOpacity="0.9" />
            <stop offset="1" stopColor="#60A5FA" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroGraphSoft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="0.45" stopColor="#22D3EE" stopOpacity="0.55" />
            <stop offset="1" stopColor="#60A5FA" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroSweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="0.48" stopColor="#22D3EE" stopOpacity="0.0" />
            <stop offset="0.52" stopColor="#22D3EE" stopOpacity="0.9" />
            <stop offset="0.56" stopColor="#60A5FA" stopOpacity="0.0" />
            <stop offset="1" stopColor="#60A5FA" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M18 210 C 72 190, 112 156, 156 170 C 214 188, 252 112, 312 134 C 378 158, 416 84, 480 106 C 556 132, 612 78, 682 62 C 724 52, 760 64, 788 42"
          fill="none"
          stroke="url(#heroGraph)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: easeInOut, delay: 0.35 }}
        />
        <motion.path
          d="M22 224 C 94 196, 132 178, 178 186 C 234 196, 272 132, 334 150 C 396 168, 438 112, 506 124 C 572 136, 642 98, 702 84 C 740 76, 770 84, 794 70"
          fill="none"
          stroke="url(#heroGraphSoft)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.3, ease: easeInOut, delay: 0.55 }}
        />
        <path
          d="M18 210 C 72 190, 112 156, 156 170 C 214 188, 252 112, 312 134 C 378 158, 416 84, 480 106 C 556 132, 612 78, 682 62 C 724 52, 760 64, 788 42"
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <motion.path
          d="M18 210 C 72 190, 112 156, 156 170 C 214 188, 252 112, 312 134 C 378 158, 416 84, 480 106 C 556 132, 612 78, 682 62 C 724 52, 760 64, 788 42"
          fill="none"
          stroke="url(#heroSweep)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="56 760"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1],
            strokeDashoffset: [800, -800],
          }}
          transition={{
            opacity: { duration: 0.6, ease: easeInOut, delay: 0.75 },
            strokeDashoffset: {
              duration: 6.8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.9,
            },
          }}
        />
        <motion.circle
          r="2.6"
          fill="rgba(34,211,238,0.95)"
          initial={{ opacity: 0, cx: 18, cy: 210 }}
          animate={{
            opacity: [0, 1, 1, 0.9, 1],
            cx: [18, 156, 312, 480, 682, 788, 18],
            cy: [210, 170, 134, 106, 62, 42, 210],
          }}
          transition={{
            duration: 8.6,
            ease: "easeInOut",
            delay: 0.65,
            repeat: Infinity,
            repeatDelay: 0.4,
          }}
          style={{
            filter:
              "drop-shadow(0 0 6px rgba(34,211,238,0.28)) drop-shadow(0 0 16px rgba(59,130,246,0.18))",
          }}
        />
        <motion.circle
          r="2"
          fill="rgba(96,165,250,0.85)"
          initial={{ opacity: 0, cx: 22, cy: 224 }}
          animate={{
            opacity: [0, 0.95, 0.75, 0.95],
            cx: [22, 178, 334, 506, 702, 794, 22],
            cy: [224, 186, 150, 124, 84, 70, 224],
          }}
          transition={{
            duration: 9.4,
            ease: "easeInOut",
            delay: 0.95,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
          style={{
            filter:
              "drop-shadow(0 0 5px rgba(96,165,250,0.2)) drop-shadow(0 0 14px rgba(34,211,238,0.12))",
          }}
        />
      </motion.svg>

      {dots.map((dot, idx) => (
        <motion.span
          key={idx}
          className="absolute rounded-full bg-gradient-to-br from-cyan-300/35 to-blue-400/10"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.s,
            height: dot.s,
            willChange: "transform, opacity",
          }}
          initial={{ opacity: 0, y: 6 }}
          animate={{
            opacity: [0, 0.9, 0.55, 0.9],
            y: [0, -6, 0],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
            delay: dot.d,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Hero – Phase 1: "Gateway Analytics AI" intro text
         Phase 2: Main hero content
   ═══════════════════════════════════════════════════════════ */
export default function Hero() {
  const heroEase = [0.22, 1, 0.36, 1];
  /* Show intro text ONLY on the very first visit in a new tab (session).
     Once the IntroOverlay has played, we skip the hero intro text entirely. */
  const HERO_INTRO_KEY = "gateway_hero_intro_done_v1";
  const alreadySeen = (() => {
    try { return sessionStorage.getItem(HERO_INTRO_KEY) === "1"; }
    catch { return true; }
  })();

  const [showIntro, setShowIntro] = useState(!alreadySeen);

  useEffect(() => {
    if (alreadySeen) return;               // never show again this session
    const t = setTimeout(() => {
      setShowIntro(false);
      try { sessionStorage.setItem(HERO_INTRO_KEY, "1"); } catch { /* */ }
    }, 5500);
    return () => clearTimeout(t);
  }, [alreadySeen]);

  /* ── animation variants (unchanged) ── */
  const heroStack = {
    hidden: {},
    visible: {
      transition: { delayChildren: 0.15, staggerChildren: 0.18 },
    },
  };
  const heroBadge = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: heroEase },
    },
  };
  const heroHeadline = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: heroEase },
    },
  };
  const heroHeadlineStack = {
    hidden: {},
    visible: {
      transition: { delayChildren: 0.08, staggerChildren: 0.16 },
    },
  };
  const heroHeadlineLineFade = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.55, ease: heroEase },
    },
  };
  const heroHeadlineLineUp = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: heroEase },
    },
  };
  const heroHeadlineLineGlow = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: heroEase },
    },
  };
  const heroSubheadline = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: heroEase },
    },
  };
  const heroMicroProof = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: heroEase },
    },
  };
  const heroCtas = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.65, ease: heroEase },
    },
  };
  const heroCard = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: heroEase },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0B1120] text-white">
      {/* ── background (always visible) ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.14),transparent_40%)]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
            backgroundPosition: "0 0",
          }}
        />
      </div>

      <HeroSignals />

      {/* ── main area ── */}
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-24">
        <AnimatePresence mode="wait">
          {/* ═══ PHASE 1: intro text ═══ */}
          {showIntro ? (
            <motion.div
              key="hero-intro"
              className="flex w-full items-center justify-center"
              initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.06, filter: "blur(24px)" }}
              transition={{ duration: 1, ease: heroEase }}
            >
              <div className="text-center">
                <motion.h1
                  className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
                  style={{
                    textShadow:
                      "0 0 80px rgba(59,130,246,0.4), 0 0 160px rgba(34,211,238,0.2)",
                  }}
                >
                  <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-blue-500 bg-clip-text text-transparent">
                    Gateway Analytics AI
                  </span>
                </motion.h1>

                <motion.div
                  className="mx-auto mt-6 h-[2px] w-40 rounded-full bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{
                    delay: 0.6,
                    duration: 0.8,
                    ease: heroEase,
                  }}
                />

                <motion.p
                  className="mt-4 text-sm font-medium tracking-[0.25em] text-white/40"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.9,
                    duration: 0.6,
                    ease: heroEase,
                  }}
                >
                  ENTERPRISE ANALYTICS + AI
                </motion.p>

                {/* pulsing glow behind text */}
                <motion.div
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-60 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.25),transparent_60%)] blur-3xl"
                  animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.05, 0.95] }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />
              </div>
            </motion.div>
          ) : (
            /* ═══ PHASE 2: main hero ═══ */
            <motion.div
              key="hero-main"
              className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: heroEase }}
            >
              {/* LEFT */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={heroStack}
                className="space-y-8"
              >
                <motion.div
                  variants={heroBadge}
                  className="inline-flex"
                >
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                    Enterprise analytics + AI consulting
                  </span>
                </motion.div>

                <motion.h1
                  variants={heroHeadline}
                  className="relative max-w-4xl font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                  style={{
                    textShadow:
                      "0 0 42px rgba(59,130,246,0.18), 0 0 22px rgba(34,211,238,0.12), 0 0 10px rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-x-14 -inset-y-10 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_25%_40%,rgba(59,130,246,0.44),transparent_60%),radial-gradient(circle_at_65%_55%,rgba(34,211,238,0.28),transparent_64%)] blur-3xl"
                  />
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-x-20 -inset-y-12 -z-10 rounded-[44px] bg-[radial-gradient(circle_at_30%_35%,rgba(59,130,246,0.30),transparent_66%),radial-gradient(circle_at_70%_60%,rgba(34,211,238,0.18),transparent_70%)] blur-3xl"
                    initial={{ opacity: 0.45 }}
                    animate={{ opacity: [0.45, 0.65, 0.45] }}
                    transition={{
                      duration: 3.6,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  />
                  <motion.span
                    variants={heroHeadlineStack}
                    className="relative block"
                  >
                    <motion.span
                      variants={heroHeadlineLineFade}
                      className="block sm:whitespace-nowrap"
                    >
                      Turning Enterprise
                    </motion.span>
                    <motion.span
                      variants={heroHeadlineLineUp}
                      className="block sm:whitespace-nowrap"
                    >
                      Data into Strategic
                    </motion.span>
                    <motion.span
                      variants={heroHeadlineLineGlow}
                      className="block sm:whitespace-nowrap"
                    >
                      <span className="relative inline-flex">
                        <motion.span
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 rounded-[22px] bg-[radial-gradient(circle_at_35%_40%,rgba(34,211,238,0.42),transparent_62%),radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.28),transparent_66%)] blur-2xl"
                          initial={{ opacity: 0.55 }}
                          animate={{ opacity: [0.55, 0.78, 0.55] }}
                          transition={{
                            duration: 3.8,
                            ease: "easeInOut",
                            repeat: Infinity,
                          }}
                        />
                        <span className="bg-gradient-to-r from-cyan-200 via-sky-100 to-blue-200 bg-clip-text text-transparent">
                          Advantage
                        </span>
                      </span>
                    </motion.span>
                  </motion.span>
                </motion.h1>

                <motion.p
                  variants={heroSubheadline}
                  className="max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg"
                >
                  Gateway Analytics AI designs scalable data platforms and
                  decision-grade analytics systems that help organizations move
                  from fragmented reporting to confident, measurable
                  decision-making.
                </motion.p>

                <motion.div
                  variants={heroMicroProof}
                  className="text-sm font-medium tracking-wide text-cyan-200/75"
                >
                  From architecture to executive dashboards — built for
                  clarity, scale, and impact.
                </motion.div>

                <motion.div
                  variants={heroCtas}
                  className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center"
                >
                  <motion.a
                    href="https://calendly.com/deepak-teja/introduction"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6, ease: easeInOut }}
                    className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white"
                  >
                    <span className="relative z-10">
                      Book a Strategy Call
                    </span>
                    <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-cyan-300/60 transition-opacity duration-300 group-hover:opacity-100" />
                    <motion.span
                      className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-cyan-200/45"
                      animate={{ opacity: [0.14, 0.32, 0.14] }}
                      transition={{
                        duration: 3.8,
                        ease: easeInOut,
                        repeat: Infinity,
                      }}
                      style={{
                        boxShadow:
                          "0 0 24px rgba(34,211,238,0.3), 0 0 48px rgba(59,130,246,0.25)",
                      }}
                    />
                  </motion.a>

                  <motion.a
                    href="#capabilities"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.6, ease: easeInOut }}
                    className="group relative inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur"
                  >
                    <span className="relative z-10">
                      Explore Our Capabilities
                    </span>
                    <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-white/30 transition-opacity duration-300 group-hover:opacity-100" />
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* RIGHT – Executive View card */}
              <motion.aside
                initial="hidden"
                animate="visible"
                variants={heroCard}
                className="relative"
              >
                <motion.div
                  variants={gentleFloat}
                  initial="initial"
                  animate="animate"
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1324]/55 p-6 backdrop-blur-xl"
                  style={{ willChange: "transform" }}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_25%_15%,rgba(59,130,246,0.18),transparent_55%)]" />
                  <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-1 ring-cyan-300/18 shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_0_36px_rgba(34,211,238,0.08)] md:opacity-100" />

                  <div className="relative flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-semibold tracking-[0.2em] text-white/60">
                        EXECUTIVE VIEW
                      </div>
                      <div className="mt-2 text-sm font-semibold tracking-tight text-white/90">
                        Signal quality monitor
                      </div>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/70">
                      Live
                    </div>
                  </div>

                  <div className="relative mt-6 grid grid-cols-3 gap-3">
                    {[
                      { k: "Forecast", v: 94, suffix: "%" },
                      { k: "Anomalies", v: 2, suffix: "" },
                      { k: "Coverage", v: 68, suffix: "%" },
                    ].map((item) => (
                      <div
                        key={item.k}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                      >
                        <div className="text-[11px] font-semibold tracking-wide text-white/60">
                          {item.k}
                        </div>
                        <div className="mt-2 text-lg font-semibold tracking-tight text-white">
                          <AnimatedNumber
                            value={item.v}
                            duration={1.6}
                            delay={0.35}
                          />
                          {item.suffix}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="relative mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-semibold tracking-wide text-white/60">
                        KPI TREND
                      </div>
                      <div className="text-[11px] font-medium text-white/50">
                        7d
                      </div>
                    </div>
                    <div className="mt-3 h-16 w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600/10 via-white/0 to-cyan-400/10">
                      <svg
                        viewBox="0 0 240 60"
                        className="h-full w-full"
                      >
                        <defs>
                          <linearGradient
                            id="kpiStroke"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                          >
                            <stop
                              offset="0"
                              stopColor="#22D3EE"
                              stopOpacity="0"
                            />
                            <stop
                              offset="0.35"
                              stopColor="#60A5FA"
                              stopOpacity="0.85"
                            />
                            <stop
                              offset="1"
                              stopColor="#60A5FA"
                              stopOpacity="0"
                            />
                          </linearGradient>
                          <linearGradient
                            id="kpiSweep"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                          >
                            <stop
                              offset="0"
                              stopColor="#22D3EE"
                              stopOpacity="0"
                            />
                            <stop
                              offset="0.35"
                              stopColor="#22D3EE"
                              stopOpacity="0.0"
                            />
                            <stop
                              offset="0.5"
                              stopColor="#22D3EE"
                              stopOpacity="0.85"
                            />
                            <stop
                              offset="0.65"
                              stopColor="#60A5FA"
                              stopOpacity="0.0"
                            />
                            <stop
                              offset="1"
                              stopColor="#60A5FA"
                              stopOpacity="0"
                            />
                          </linearGradient>
                          <linearGradient
                            id="kpiFill"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0"
                              stopColor="#60A5FA"
                              stopOpacity="0.16"
                            />
                            <stop
                              offset="1"
                              stopColor="#60A5FA"
                              stopOpacity="0"
                            />
                          </linearGradient>
                          <pattern
                            id="kpiGrid"
                            width="24"
                            height="12"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M24 0H0V12"
                              fill="none"
                              stroke="rgba(255,255,255,0.10)"
                              strokeWidth="1"
                            />
                          </pattern>
                        </defs>
                        <rect
                          x="0"
                          y="0"
                          width="240"
                          height="60"
                          fill="url(#kpiGrid)"
                          opacity="0.35"
                        />
                        <path
                          d="M0 60 H240"
                          fill="none"
                          stroke="rgba(255,255,255,0.10)"
                          strokeWidth="1"
                        />
                        <motion.path
                          d="M0 44 C 24 36, 36 48, 52 40 C 74 28, 92 36, 110 26 C 130 14, 150 26, 170 20 C 194 12, 210 18, 240 8"
                          fill="none"
                          stroke="rgba(255,255,255,0.22)"
                          strokeWidth="1"
                          strokeLinecap="round"
                          initial={{
                            pathLength: 0,
                            opacity: 0,
                          }}
                          animate={{
                            pathLength: 1,
                            opacity: 1,
                          }}
                          transition={{
                            duration: 1.8,
                            ease: heroEase,
                            delay: 0.2,
                          }}
                        />
                        <motion.path
                          fill="url(#kpiFill)"
                          d="M0 44 C 24 36, 36 48, 52 40 C 74 28, 92 36, 110 26 C 130 14, 150 26, 170 20 C 194 12, 210 18, 240 8 L240 60 L0 60 Z"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.9,
                            ease: heroEase,
                            delay: 0.45,
                          }}
                        />
                        <motion.path
                          d="M0 44 C 24 36, 36 48, 52 40 C 74 28, 92 36, 110 26 C 130 14, 150 26, 170 20 C 194 12, 210 18, 240 8"
                          fill="none"
                          stroke="url(#kpiStroke)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          initial={{
                            pathLength: 0,
                            opacity: 0,
                          }}
                          animate={{
                            pathLength: 1,
                            opacity: [0, 1, 1, 0.95, 1],
                          }}
                          transition={{
                            pathLength: {
                              duration: 1.8,
                              ease: heroEase,
                              delay: 0.2,
                            },
                            opacity: {
                              duration: 4.8,
                              ease: "easeInOut",
                              delay: 0.25,
                              repeat: Infinity,
                            },
                          }}
                          style={{
                            filter:
                              "drop-shadow(0 0 6px rgba(34,211,238,0.18)) drop-shadow(0 0 18px rgba(59,130,246,0.12))",
                          }}
                        />
                        <motion.path
                          d="M0 44 C 24 36, 36 48, 52 40 C 74 28, 92 36, 110 26 C 130 14, 150 26, 170 20 C 194 12, 210 18, 240 8"
                          fill="none"
                          stroke="rgba(34,211,238,0.28)"
                          strokeWidth="6"
                          strokeLinecap="round"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.8,
                            ease: heroEase,
                            delay: 0.45,
                          }}
                          style={{ filter: "blur(2px)" }}
                        />
                        <motion.path
                          d="M0 44 C 24 36, 36 48, 52 40 C 74 28, 92 36, 110 26 C 130 14, 150 26, 170 20 C 194 12, 210 18, 240 8"
                          fill="none"
                          stroke="url(#kpiSweep)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray="38 202"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: [0, 1, 1],
                            strokeDashoffset: [240, -240],
                          }}
                          transition={{
                            opacity: {
                              duration: 0.8,
                              ease: heroEase,
                              delay: 0.55,
                            },
                            strokeDashoffset: {
                              duration: 4.8,
                              ease: "easeInOut",
                              repeat: Infinity,
                              repeatDelay: 0.3,
                            },
                          }}
                        />
                        <motion.circle
                          r="2.4"
                          fill="rgba(34,211,238,0.95)"
                          initial={{ opacity: 0, cx: 0, cy: 44 }}
                          animate={{
                            opacity: [0, 1, 1, 0.9, 1],
                            cx: [0, 52, 110, 170, 240, 0],
                            cy: [44, 40, 26, 20, 8, 44],
                          }}
                          transition={{
                            duration: 3.6,
                            ease: "easeInOut",
                            delay: 0.4,
                            repeat: Infinity,
                            repeatDelay: 0.2,
                          }}
                          style={{
                            filter:
                              "drop-shadow(0 0 6px rgba(34,211,238,0.35)) drop-shadow(0 0 14px rgba(59,130,246,0.18))",
                          }}
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── bottom proof cards (appear with main phase) ── */}
      <AnimatePresence>
        {!showIntro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: heroEase, delay: 0.6 }}
            className="relative mx-auto -mt-8 max-w-6xl px-6 pb-20"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger(0.12)}
              className="grid gap-6 md:grid-cols-3"
            >
              {[
                {
                  k: "CFO-ready",
                  v: "Decision-grade metrics and governance.",
                },
                {
                  k: "Platform-led",
                  v: "Modern, secure, scalable foundations.",
                },
                {
                  k: "AI with intent",
                  v: "Applied where it improves outcomes.",
                },
              ].map((item) => (
                <motion.div
                  key={item.k}
                  variants={fadeUp40}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.6, ease: easeInOut }}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
                  style={{ willChange: "transform" }}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-cyan-300/30 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="text-sm font-semibold tracking-tight">
                    {item.k}
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-white/70">
                    {item.v}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
