import { motion } from "framer-motion";
import ScrollText from "../ScrollText.jsx";
import { easeInOut, fadeUp, stagger } from "./motion.js";

export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ink-950 text-white"
    >
      {/* ── animated background orbs ── */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full opacity-25 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #3b82f6, transparent 70%)",
          }}
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 h-[480px] w-[480px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #8b5cf6, transparent 70%)",
          }}
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[100px]"
          style={{
            background: "radial-gradient(circle, #06b6d4, transparent 70%)",
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
        />
      </div>

      {/* subtle grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(circle at 50% 50%, black 0%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, black 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.1)}
          className="relative"
        >
          {/* ── card with animated conic-gradient border ── */}
          <div className="relative overflow-hidden rounded-3xl p-px">
            {/* rotating border glow */}
            <motion.div
              className="absolute inset-[-200%]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, #3b82f6 10%, transparent 20%, #8b5cf6 30%, transparent 40%, #06b6d4 50%, transparent 60%, #3b82f6 70%, transparent 80%, #8b5cf6 90%, transparent 100%)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            />

            {/* inner card */}
            <div className="relative rounded-3xl bg-[#0b0f1a]/95 px-8 py-14 backdrop-blur-xl md:px-16 md:py-20">
              {/* inner radial glows */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_25%_20%,rgba(59,130,246,0.14),transparent_50%),radial-gradient(circle_at_75%_80%,rgba(139,92,246,0.09),transparent_50%)]" />

              {/* noise texture */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-[0.06]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.24'/%3E%3C/svg%3E\")",
                }}
              />

              {/* content */}
              <div className="relative mx-auto max-w-3xl text-center">
                {/* eyebrow badge */}
                <motion.div variants={fadeUp} className="mb-8">
                  <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-xs font-semibold tracking-widest text-blue-300">
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-blue-400"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
                    />
                    LET&apos;S BUILD SOMETHING GREAT
                  </span>
                </motion.div>

                {/* headline */}
                <ScrollText
                  useParent
                  as="h3"
                  text="Ready to Turn Data into Competitive Advantage?"
                  lineAnime
                  blur={10}
                  distance={16}
                  staggerChildren={0.055}
                  className="relative text-balance text-3xl font-semibold tracking-[-0.02em] md:text-5xl"
                />

                {/* subtitle */}
                <ScrollText
                  useParent
                  as="p"
                  text="Strategy. Architecture. Delivery. — aligned around measurable outcomes that move your business forward."
                  blur={6}
                  distance={12}
                  className="relative mt-6 text-base leading-relaxed text-white/60 md:text-lg"
                />

                {/* buttons */}
                <motion.div
                  variants={fadeUp}
                  className="relative mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
                >
                  {/* primary with shimmer */}
                  <a
                    href="https://calendly.com/deepak-teja/introduction"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]"
                    style={{
                      background:
                        "linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8)",
                      boxShadow:
                        "0 0 30px rgba(59,130,246,0.25), 0 4px 15px rgba(59,130,246,0.15)",
                    }}
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-blue-400/55 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                    <span className="relative flex items-center gap-2">
                      Schedule a Consultation
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </a>

                  {/* secondary */}
                  <a
                    href="#capabilities"
                    className="group inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-8 py-4 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
                  >
                    View Capabilities
                  </a>
                </motion.div>

                {/* trust indicators */}
                <motion.div
                  variants={fadeUp}
                  className="relative mt-14 flex flex-wrap items-center justify-center gap-10 border-t border-white/[0.06] pt-8"
                >
                  {[
                    { value: "50+", label: "Projects Delivered" },
                    { value: "100%", label: "Enterprise Ready" },
                    { value: "End-to-End", label: "Analytics Delivery" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-xl font-bold text-transparent">
                        {stat.value}
                      </div>
                      <div className="mt-1 text-xs tracking-wide text-white/40">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
