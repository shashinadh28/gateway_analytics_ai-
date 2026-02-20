import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { easeExecutive, stagger, fadeUp } from "./motion.js";

const ease = [0.4, 0, 0.2, 1];

const BULLETS = [
  {
    text: "AI-powered biomedical text mining",
    icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 01-1.59.659H9.06a2.25 2.25 0 01-1.591-.659L5 14.5m14 0V5a2 2 0 00-2-2H7a2 2 0 00-2 2v9.5",
  },
  {
    text: "Drug interaction & trend detection",
    icon: "M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z",
  },
  {
    text: "Interactive research visualization in Power BI",
    icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5",
  },
];

const HERO_IMAGE = "/biomedical-intelligence/AI_Biomedical_Indian_Researcher.webp";

export default function BiomedicalSection() {
  const bulletVariant = {
    hidden: { opacity: 0, x: -16 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease, delay: 0.4 + i * 0.12 },
    }),
  };

  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.12),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.06),transparent_55%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "84px 84px",
            maskImage: "radial-gradient(circle at 30% 40%, black 0%, transparent 60%)",
            WebkitMaskImage: "radial-gradient(circle at 30% 40%, black 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={stagger(0.1)}
        >
          {/* Full-width top section: eyebrow + heading centered */}
          <div className="text-center">
            <motion.p
              variants={fadeUp}
              className="text-sm font-semibold tracking-wider uppercase text-blue-400/80"
            >
              INDUSTRY AI SOLUTION
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="mx-auto mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.02em] md:text-4xl lg:text-5xl"
            >
              AI-Powered Biomedical Intelligence Dashboard
            </motion.h2>

            <motion.div
              variants={{
                hidden: { scaleX: 0, opacity: 0 },
                visible: { scaleX: 1, opacity: 1, transition: { duration: 0.7, ease: easeExecutive } },
              }}
              className="mx-auto mt-5 h-px w-48 origin-center bg-white/15"
            />

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/60 md:text-lg"
            >
              Replace manual literature reviews with an AI-driven intelligence engine that transforms thousands of PubMed papers into structured, decision-ready insights through interactive Power BI dashboards.
            </motion.p>
          </div>

          {/* Two-column: image left, bullets + CTA right */}
          <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Image */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease } },
              }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-blue-900/15">
                <div
                  className="pointer-events-none absolute inset-0 z-10"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(59,130,246,0.12), transparent 55%), linear-gradient(to top, rgba(7,11,20,0.5) 0%, transparent 35%)",
                  }}
                />
                <motion.img
                  src={HERO_IMAGE}
                  alt="AI Biomedical Research"
                  className="h-full w-full object-cover"
                  style={{ minHeight: 380 }}
                  loading="lazy"
                  decoding="async"
                  initial={{ scale: 1.05 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease }}
                />
              </div>
              <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-blue-600/6 blur-3xl" />
            </motion.div>

            {/* Bullets + CTA */}
            <div>
              <div className="space-y-5">
                {BULLETS.map((b, i) => (
                  <motion.div
                    key={b.text}
                    custom={i}
                    variants={bulletVariant}
                    className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
                  >
                    <div
                      className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/[0.08]"
                      style={{ boxShadow: "0 0 16px rgba(59,130,246,0.12)" }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d={b.icon}
                          stroke="#60a5fa"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-sm leading-relaxed text-white/70 md:text-base">
                      {b.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeUp} className="mt-8">
                <Link
                  to="/biomedical-intelligence"
                  className="group relative inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                    boxShadow: "0 0 22px rgba(59,130,246,0.22)",
                  }}
                >
                  <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-blue-400/55 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="pointer-events-none absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative">Explore the Platform</span>
                  <svg className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
