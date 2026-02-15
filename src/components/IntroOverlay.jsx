import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";

const INTRO_KEY = "gateway_analytics_ai_intro_seen_v3";
const ease = [0.22, 1, 0.36, 1];
const isDev = import.meta.env.DEV;

/* ── deterministic floating particles ─────────────────────── */
const PARTICLES = Array.from({ length: 40 }, (_, i) => {
  const seeds = [
    13, 29, 7, 41, 19, 37, 11, 23, 17, 31, 43, 5, 47, 2, 53, 3, 61, 59, 67,
    71,
  ];
  const a = seeds[i % seeds.length];
  const b = seeds[(i + 7) % seeds.length];
  const c = seeds[(i + 3) % seeds.length];
  return {
    id: i,
    x: ((a * (i + 1) * 7) % 90) + 5,
    y: ((b * (i + 2) * 11) % 85) + 8,
    size: 1.5 + (c % 3),
    dur: 3.5 + (a % 5),
    delay: (i * 0.08) % 2.8,
    dx: (c % 30) - 15,
    dy: -(8 + (a % 16)),
  };
});

export default function IntroOverlay() {
  const [isOpen, setIsOpen] = useState(true);
  const textMeasureRef = useRef(null);
  const textWidthRef = useRef(0);

  const textControls = useAnimationControls();
  const textWrapControls = useAnimationControls();
  const overlayControls = useAnimationControls();
  const gridControls = useAnimationControls();
  const ambientControls = useAnimationControls();
  const particleControls = useAnimationControls();
  const groupControls = useAnimationControls();
  const logoControls = useAnimationControls();
  const glowControls = useAnimationControls();
  const shrinkGlowControls = useAnimationControls();

  useEffect(() => {
    let seen = false;
    if (!isDev) {
      try {
        seen = window.sessionStorage.getItem(INTRO_KEY) === "1";
      } catch (error) {
        seen = false;
        void error;
      }
    }

    if (seen) {
      setIsOpen(false);
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let cancelled = false;
    const timeouts = [];
    let rafId = 0;

    const measureTextWidth = () => {
      const el = textMeasureRef.current;
      if (!el) return 0;
      const width = Math.ceil(el.getBoundingClientRect().width);
      if (width > 0) textWidthRef.current = width + 32; // buffer for "AI"
      return width;
    };

    overlayControls.set({ opacity: 1 });
    gridControls.set({ opacity: 0 });
    ambientControls.set({ opacity: 0, x: 0, y: 0, scale: 1 });
    particleControls.set({ opacity: 0, backgroundPosition: "0px 0px" });
    groupControls.set({ x: 0 });
    textWrapControls.set({ width: 0 });
    logoControls.set({ scale: 0.8, opacity: 0, x: 0 });
    glowControls.set({ opacity: 0, scale: 0.9 });
    shrinkGlowControls.set({ opacity: 0, scale: 0.85 });
    textControls.set({ opacity: 0, x: "-100%" });

    measureTextWidth();
    if (textWidthRef.current === 0) {
      rafId = window.requestAnimationFrame(() => {
        if (cancelled) return;
        measureTextWidth();
      });
    }

    gridControls.start({
      opacity: 0.075,
      transition: { duration: 1.8, ease },
    });
    ambientControls.start({
      opacity: 0.12,
      x: [0, 18, -12, 0],
      y: [0, -10, 14, 0],
      scale: [1, 1.03, 1.01, 1],
      transition: { duration: 14, ease: "easeInOut", repeat: Infinity },
    });
    particleControls.start({
      opacity: 0.045,
      backgroundPosition: ["0px 0px", "160px 220px"],
      transition: {
        duration: 18,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      },
    });

    overlayControls.start({
      opacity: 1,
      transition: { duration: 0.6, ease },
    });
    logoControls.start({
      opacity: 1,
      scale: 1.6,
      transition: { duration: 1.0, ease },
    });
    glowControls.start({
      opacity: 0.35,
      scale: 1.15,
      transition: { duration: 1.0, ease },
    });

    timeouts.push(
      window.setTimeout(() => {
        if (cancelled) return;
        shrinkGlowControls.start({
          opacity: 0.22,
          scale: 1.65,
          transition: { duration: 1.0, ease },
        });
        groupControls.start({
          x: -10,
          transition: { duration: 1.0, ease },
        });
        logoControls.start({
          scale: 1,
          transition: { duration: 1.0, ease },
        });
        glowControls.start({
          opacity: 0.18,
          scale: 1,
          transition: { duration: 1.0, ease },
        });
      }, 1000)
    );

    timeouts.push(
      window.setTimeout(() => {
        if (cancelled) return;
        shrinkGlowControls.start({
          opacity: 0.12,
          scale: 1.3,
          transition: { duration: 0.9, ease },
        });
      }, 2200)
    );

    timeouts.push(
      window.setTimeout(() => {
        if (cancelled) return;
        textWrapControls.start({
          width: textWidthRef.current || 400,
          transition: { duration: 1.1, ease },
        });
        textControls.start({
          opacity: 1,
          x: "0%",
          transition: { duration: 1.1, ease },
        });
      }, 1400)
    );

    timeouts.push(
      window.setTimeout(() => {
        if (cancelled) return;
        overlayControls.start({
          opacity: 0,
          transition: { duration: 0.6, ease },
        });
      }, 3200)
    );

    timeouts.push(
      window.setTimeout(() => {
        if (cancelled) return;
        if (!isDev) {
          try {
            window.sessionStorage.setItem(INTRO_KEY, "1");
          } catch (error) {
            void error;
          }
        }
        setIsOpen(false);
        document.body.style.overflow = prevOverflow;
      }, 3800)
    );

    return () => {
      cancelled = true;
      if (rafId) window.cancelAnimationFrame(rafId);
      timeouts.forEach((t) => window.clearTimeout(t));
      document.body.style.overflow = prevOverflow;
    };
  }, [
    ambientControls,
    glowControls,
    groupControls,
    gridControls,
    logoControls,
    overlayControls,
    particleControls,
    shrinkGlowControls,
    textControls,
    textWrapControls,
  ]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#05070D]"
          initial={{ opacity: 1 }}
          animate={overlayControls}
          exit={{ opacity: 0 }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(59,130,246,0.18),transparent_55%)]"
          />

          <motion.div
            aria-hidden="true"
            animate={ambientControls}
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 35%, rgba(59,130,246,0.14), transparent 55%), radial-gradient(circle at 85% 75%, rgba(34,211,238,0.08), transparent 62%), radial-gradient(circle at 15% 80%, rgba(96,165,250,0.06), transparent 60%)",
              willChange: "transform, opacity",
            }}
          />

          <motion.div
            aria-hidden="true"
            animate={gridControls}
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "84px 84px",
              backgroundPosition: "0 0",
              maskImage:
                "radial-gradient(circle at 50% 45%, black 0%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(circle at 50% 45%, black 0%, transparent 70%)",
              willChange: "opacity",
            }}
          />

          <motion.div
            aria-hidden="true"
            animate={particleControls}
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(147,197,253,0.55) 1px, transparent 1px)",
              backgroundSize: "140px 140px",
              maskImage:
                "radial-gradient(circle at 50% 45%, black 0%, transparent 66%)",
              WebkitMaskImage:
                "radial-gradient(circle at 50% 45%, black 0%, transparent 66%)",
              willChange: "opacity, background-position",
            }}
          />

          {/* ── floating particles ── */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {PARTICLES.map((p) => (
              <motion.span
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  background:
                    "linear-gradient(135deg, rgba(147,197,253,0.8), rgba(34,211,238,0.6))",
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.45, 0],
                  x: [0, p.dx],
                  y: [0, p.dy],
                }}
                transition={{
                  duration: p.dur,
                  delay: p.delay,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            ))}
          </div>

          {/* ── logo + text group ── */}
          <motion.div
            animate={groupControls}
            className="relative flex items-center px-6"
          >
            <span
              aria-hidden="true"
              ref={textMeasureRef}
              className="pointer-events-none absolute -left-[9999px] -top-[9999px] whitespace-nowrap pr-6 text-[clamp(1.25rem,3.2vw,2.75rem)] font-semibold tracking-[-0.02em] text-white"
            >
              Gateway Analytics AI
            </span>

            <div className="relative flex items-center justify-center">
              <div className="relative h-[clamp(3.5rem,7vw,6rem)] w-[clamp(3.5rem,7vw,6rem)] shrink-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={shrinkGlowControls}
                  className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.28),transparent_62%)] blur-2xl md:-inset-12 lg:-inset-14"
                  style={{ willChange: "transform, opacity" }}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={glowControls}
                  className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.22),transparent_60%)] blur-2xl md:-inset-10 lg:-inset-12"
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, x: 0 }}
                  animate={logoControls}
                  className="absolute inset-0 z-20"
                  style={{ willChange: "transform" }}
                >
                  <img
                    src="/logo-icon.png"
                    alt="Gateway Analytics AI"
                    className="h-full w-full select-none"
                    draggable="false"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ width: 0 }}
                animate={textWrapControls}
                className="overflow-hidden"
                style={{ willChange: "width" }}
              >
                <motion.div
                  initial={{ opacity: 0, x: "-100%" }}
                  animate={textControls}
                  className="whitespace-nowrap pl-1 pr-6 text-[clamp(1.25rem,3.2vw,2.75rem)] font-semibold tracking-[-0.02em] text-white"
                >
                  Gateway Analytics{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    AI
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
