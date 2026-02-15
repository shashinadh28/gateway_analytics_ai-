import { motion } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "./SectionWrapper.jsx";
import { easeExecutive, fadeUp, stagger } from "./motion.js";

const ACCENTS = [
  { primary: "#3b82f6", secondary: "#06b6d4", glow: "rgba(59,130,246,0.18)" },
  { primary: "#8b5cf6", secondary: "#a855f7", glow: "rgba(139,92,246,0.18)" },
  { primary: "#06b6d4", secondary: "#34d399", glow: "rgba(6,182,212,0.18)" },
  { primary: "#f59e0b", secondary: "#f97316", glow: "rgba(245,158,11,0.18)" },
  { primary: "#10b981", secondary: "#14b8a6", glow: "rgba(16,185,129,0.18)" },
  { primary: "#ef4444", secondary: "#ec4899", glow: "rgba(239,68,68,0.18)" },
];

const ICONS = [
  "M7 17V9m5 8V5m5 12v-7",
  "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  "M4 6h16M4 10h16M4 14h16M4 18h16",
  "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  "M13 10V3L4 14h7v7l9-11h-7z",
  "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m7-10a4 4 0 100-8 4 4 0 000 8zm10 14v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
];

const cards = [
  {
    title: "Executive KPI Systems",
    description:
      "Define metrics, align owners, and make performance measurable across the org.",
  },
  {
    title: "Modern Data Platforms",
    description:
      "Cloud warehouses/lakes, orchestration, governance, and cost controls built-in.",
  },
  {
    title: "Analytics Engineering",
    description:
      "Semantic layers, transformation standards, and trusted datasets at scale.",
  },
  {
    title: "AI Strategy + Use Cases",
    description:
      "Identify where AI changes outcomes, scope value, and set responsible guardrails.",
  },
  {
    title: "Machine Learning Delivery",
    description:
      "From prototyping to production pipelines with monitoring and iteration loops.",
  },
  {
    title: "Enablement + Operating Model",
    description:
      "Upskill teams, establish governance, and build repeatable delivery rhythms.",
  },
];

export default function CapabilitiesGrid() {
  const [hovered, setHovered] = useState(null);

  return (
    <SectionWrapper
      id="capabilities"
      variant="dark"
      eyebrow="Core capabilities"
      title="Built for enterprise scale and governance"
      description="A modular set of services designed to meet you where you are — and compound value as maturity increases."
    >
      <div className="relative">
        <div className="pointer-events-none absolute -inset-16 rounded-[48px] bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.16),transparent_55%)]" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.12)}
          className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((card, i) => {
            const accent = ACCENTS[i];
            const num = String(i + 1).padStart(2, "0");
            const isActive = hovered === i;
            const isOtherHovered = hovered !== null && hovered !== i;

            return (
              <motion.div
                key={card.title}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, ease: easeExecutive }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
                style={{
                  willChange: "transform",
                  filter: isOtherHovered ? "blur(2px)" : "blur(0px)",
                  opacity: isOtherHovered ? 0.5 : 1,
                  transition:
                    "filter 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                {/* Background gradient on hover */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse at 30% 20%, ${accent.glow}, transparent 60%)`,
                  }}
                />

                {/* Ring glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${accent.primary}44, 0 8px 40px ${accent.glow}`,
                  }}
                />

                {/* Light sweep */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-in-out group-hover:translate-x-full group-hover:opacity-100" />

                {/* Header row: number badge + icon */}
                <div className="relative mb-6 flex items-center justify-between">
                  <motion.div
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold text-white shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${accent.primary}, ${accent.secondary})`,
                      boxShadow: isActive
                        ? `0 4px 24px ${accent.glow}, 0 0 40px ${accent.glow}`
                        : `0 4px 16px ${accent.glow}`,
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.25 }}
                  >
                    {num}
                  </motion.div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <motion.path
                        d={ICONS[i]}
                        stroke={accent.primary}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          ease: easeExecutive,
                          delay: 0.2 + i * 0.08,
                        }}
                      />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <div className="relative text-lg font-semibold tracking-tight">
                  {card.title}
                </div>

                {/* Gradient underline */}
                <div
                  className="mt-3 h-[2px] w-12 rounded-full transition-all duration-500 group-hover:w-20"
                  style={{
                    background: `linear-gradient(to right, ${accent.primary}, ${accent.secondary})`,
                  }}
                />

                {/* Description */}
                <div className="relative mt-4 text-sm leading-relaxed text-white/70">
                  {card.description}
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(to right, transparent, ${accent.primary}, ${accent.secondary}, transparent)`,
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
