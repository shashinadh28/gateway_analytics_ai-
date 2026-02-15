import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ScrollText from "../ScrollText.jsx";

const ease = [0.22, 1, 0.36, 1];
const snap = [0.4, 0, 0.2, 1];

const STEPS = [
  {
    number: "01",
    title: "Understand the business first",
    image: "/Our_working_approach/Understand-the-business-first.webp",
    bullets: [
      "What decisions need to be made?",
      "Who are the stakeholders?",
      "What actions should data enable?",
    ],
    accent: "#3b82f6",
    accentEnd: "#06b6d4",
    glow: "rgba(59,130,246,0.25)",
  },
  {
    number: "02",
    title: "Design the right data architecture",
    image: "/Our_working_approach/Design-the-right-data-architecture.webp",
    bullets: [
      "Choose the right platform (Snowflake, Fabric, Azure)",
      "Build scalable, maintainable pipelines",
      "Ensure data quality & governance",
    ],
    accent: "#8b5cf6",
    accentEnd: "#a855f7",
    glow: "rgba(139,92,246,0.25)",
  },
  {
    number: "03",
    title: "Build analytics that drive action",
    image: "/Our_working_approach/Build_analytics_that_drive_action.webp",
    bullets: [
      "KPIs aligned to business goals",
      "Dashboards designed for clarity, not clutter",
      "Insights that are easy to explain and act on",
    ],
    accent: "#06b6d4",
    accentEnd: "#34d399",
    glow: "rgba(6,182,212,0.25)",
  },
  {
    number: "04",
    title: "Enable long-term value",
    image: "/Our_working_approach/Enable-long-term-value.webp",
    bullets: [
      "Documentation & handover",
      "Performance optimization",
      "Self-service analytics where needed",
      "Continuous improvement mindset",
    ],
    accent: "#10b981",
    accentEnd: "#2dd4bf",
    glow: "rgba(16,185,129,0.25)",
  },
];

const CYCLE_MS = 6000;
const RESUME_DELAY = 12000;

export default function ApproachSection() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimer = useRef(null);

  /* auto-advance */
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActive((p) => (p + 1) % STEPS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [isPaused]);

  const selectStep = (i) => {
    setActive(i);
    setIsPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsPaused(false), RESUME_DELAY);
  };

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  const step = STEPS[active];

  return (
    <section
      id="approach"
      className="relative overflow-hidden bg-[#070b14] text-white"
    >
      {/* ── background layers ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(59,130,246,0.14),transparent_48%),radial-gradient(circle_at_75%_65%,rgba(34,211,238,0.08),transparent_50%)]" />
        <motion.div
          className="absolute inset-0 opacity-[0.04]"
          animate={{ backgroundPosition: ["0px 0px", "80px 80px"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(circle at 50% 35%, black 0%, transparent 60%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 35%, black 0%, transparent 60%)",
          }}
        />
      </div>

      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 8 }, (_, i) => {
          const seeds = [17, 31, 43, 7, 29, 41, 13, 23];
          const a = seeds[i % 8];
          const b = seeds[(i + 3) % 8];
          return (
            <motion.span
              key={i}
              className="absolute rounded-full bg-blue-400/20"
              style={{
                left: `${((a * (i + 2) * 7) % 90) + 5}%`,
                top: `${((b * (i + 3) * 9) % 80) + 10}%`,
                width: 3,
                height: 3,
              }}
              animate={{ y: [0, -20, 0], opacity: [0.12, 0.35, 0.12] }}
              transition={{
                duration: 6 + (a % 5),
                delay: i * 0.4,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          );
        })}
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-28">
        {/* ── section header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="max-w-3xl"
        >
          <ScrollText
            as="p"
            text="OUR WORKING APPROACH"
            blur={7}
            distance={14}
            className="text-sm font-semibold tracking-[0.25em] text-white/50"
          />
          <div className="mt-5">
            <ScrollText
              as="h2"
              text="Structured delivery that stays practical"
              lineAnime
              blur={10}
              distance={18}
              staggerChildren={0.05}
              className="text-3xl font-semibold tracking-[-0.02em] md:text-5xl"
            />
            <motion.div
              variants={{
                hidden: { scaleX: 0 },
                visible: { scaleX: 1, transition: { duration: 0.9, ease } },
              }}
              className="mt-5 h-px origin-left bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-cyan-400/0"
            />
          </div>
          <ScrollText
            as="p"
            text="We start with business questions, design the right architecture, and deliver analytics that drives action — then enable your team for long-term value."
            blur={6}
            distance={12}
            className="mt-5 text-base leading-relaxed text-white/55 md:text-lg"
          />
        </motion.div>

        {/* ── step navigator (desktop) ── */}
        <div className="mt-16 hidden lg:flex items-center">
          {STEPS.map((s, i) => (
            <div key={i} className="flex flex-1 items-center last:flex-none">
              <button
                type="button"
                onClick={() => selectStep(i)}
                className={`group relative flex items-center gap-3 rounded-full px-4 py-2.5 transition-all duration-500 ${
                  active === i ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"
                }`}
              >
                <div
                  className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-500"
                  style={{
                    background:
                      active === i
                        ? `linear-gradient(135deg, ${s.accent}, ${s.accentEnd})`
                        : "rgba(255,255,255,0.06)",
                    boxShadow:
                      active === i
                        ? `0 0 20px ${s.glow}, 0 0 40px ${s.glow}`
                        : "none",
                  }}
                >
                  {active === i && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: `2px solid ${s.accent}` }}
                      animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                      transition={{
                        duration: 2,
                        ease: "easeOut",
                        repeat: Infinity,
                      }}
                    />
                  )}
                  <span className="relative z-10">{s.number}</span>
                </div>
                <span
                  className={`text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
                    active === i ? "text-white" : "text-white/40"
                  }`}
                >
                  {s.title}
                </span>
              </button>

              {i < STEPS.length - 1 && (
                <div className="relative mx-2 h-px flex-1">
                  <div className="absolute inset-0 bg-white/[0.06]" />
                  <motion.div
                    className="absolute inset-y-0 left-0"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${STEPS[i].accent}, ${STEPS[i + 1].accent})`,
                    }}
                    animate={{ width: active > i ? "100%" : "0%" }}
                    transition={{ duration: 0.6, ease }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── step navigator (mobile) ── */}
        <div className="mt-14 flex gap-2 overflow-x-auto pb-4 lg:hidden scrollbar-none">
          {STEPS.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => selectStep(i)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                active === i
                  ? "bg-white/10 text-white"
                  : "bg-white/[0.03] text-white/40"
              }`}
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  background:
                    active === i
                      ? `linear-gradient(135deg, ${s.accent}, ${s.accentEnd})`
                      : "rgba(255,255,255,0.08)",
                }}
              >
                {s.number}
              </span>
              {s.title}
            </button>
          ))}
        </div>

        {/* ── featured content ── */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease }}
              className="grid items-stretch gap-8 lg:grid-cols-2"
            >
              {/* image */}
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.06]">
                <div
                  className="pointer-events-none absolute inset-0 z-10"
                  style={{
                    background: `linear-gradient(135deg, ${step.accent}22 0%, transparent 60%), linear-gradient(to top, #070b14 0%, transparent 40%)`,
                  }}
                />
                <motion.img
                  src={step.image}
                  alt={step.title}
                  className="h-72 w-full object-cover lg:h-full lg:min-h-[420px]"
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease }}
                />
                {/* watermark number */}
                <div className="absolute bottom-5 right-5 z-20">
                  <span
                    className="text-8xl font-extrabold leading-none"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${step.accent}, ${step.accentEnd})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      opacity: 0.25,
                    }}
                  >
                    {step.number}
                  </span>
                </div>
              </div>

              {/* content */}
              <div className="flex flex-col justify-center py-4">
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.12 }}
                >
                  {/* badge row */}
                  <div className="mb-5 flex items-center gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-base font-bold text-white shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${step.accent}, ${step.accentEnd})`,
                        boxShadow: `0 4px 24px ${step.glow}`,
                      }}
                    >
                      {step.number}
                    </div>
                    <div
                      className="h-px flex-1"
                      style={{
                        background: `linear-gradient(to right, ${step.accent}40, transparent)`,
                      }}
                    />
                  </div>

                  {/* title */}
                  <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                    {step.title}
                  </h3>

                  {/* gradient underline */}
                  <motion.div
                    className="mt-4 h-[2px] rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${step.accent}, ${step.accentEnd})`,
                      transformOrigin: "left",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, ease, delay: 0.2 }}
                  />

                  {/* bullets */}
                  <ul className="mt-7 space-y-4">
                    {step.bullets.map((b, bi) => (
                      <motion.li
                        key={b}
                        className="flex items-start gap-3 text-[15px] leading-relaxed text-white/65"
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: snap,
                          delay: 0.25 + bi * 0.09,
                        }}
                      >
                        <span
                          className="mt-[9px] h-2 w-2 shrink-0 rounded-full"
                          style={{
                            background: `linear-gradient(135deg, ${step.accent}, ${step.accentEnd})`,
                            boxShadow: `0 0 8px ${step.glow}`,
                          }}
                        />
                        <span>{b}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* progress bar */}
          <div className="mt-8 h-[2px] w-full overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(to right, ${step.accent}, ${step.accentEnd})`,
              }}
              key={`progress-${active}-${isPaused}`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: isPaused ? RESUME_DELAY / 1000 : CYCLE_MS / 1000,
                ease: "linear",
              }}
            />
          </div>
        </div>
      </div>

      {/* edge gradients */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-ink-950/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-950/50 to-transparent" />
    </section>
  );
}
