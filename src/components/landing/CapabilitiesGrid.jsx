import { motion } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "./SectionWrapper.jsx";
import { easeExecutive, fadeUp, stagger } from "./motion.js";

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
    image: "/Core_capabilities/Executive_KPI_Systems.webp",
  },
  {
    title: "Modern Data Platforms",
    description:
      "Cloud warehouses/lakes, orchestration, governance, and cost controls built-in.",
    image: "/Core_capabilities/Modern_Data_Platforms.webp",
  },
  {
    title: "Analytics Engineering",
    description:
      "Semantic layers, transformation standards, and trusted datasets at scale.",
    image: "/Core_capabilities/Analytics_Engineering.webp",
  },
  {
    title: "AI Strategy + Use Cases",
    description:
      "Identify where AI changes outcomes, scope value, and set responsible guardrails.",
    image: "/Core_capabilities/AI_Strategy_Use_Cases.webp",
  },
  {
    title: "Machine Learning Delivery",
    description:
      "From prototyping to production pipelines with monitoring and iteration loops.",
    image: "/Core_capabilities/Machine_Learning_Delivery.webp",
  },
  {
    title: "Enablement + Operating Model",
    description:
      "Upskill teams, establish governance, and build repeatable delivery rhythms.",
    image: null,
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
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger(0.12)}
        className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {cards.map((card, i) => {
          const num = String(i + 1).padStart(2, "0");
          const isActive = hovered === i;
          const isOtherHovered = hovered !== null && hovered !== i;

          return (
            <motion.div
              key={card.title}
              variants={fadeUp}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all duration-500"
              style={{
                willChange: "transform",
                opacity: isOtherHovered ? 0.55 : 1,
                transition:
                  "opacity 0.4s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              {/* Image area - hidden by default, revealed on hover */}
              {card.image && (
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: isActive ? 200 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                    className="h-48 w-full object-cover"
                  />
                </div>
              )}

              <div className="p-7">
                {/* Header row: number badge + icon */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
                    {num}
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d={ICONS[i]}
                        stroke="rgba(148,163,184,0.8)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <div className="text-lg font-semibold tracking-tight text-white">
                  {card.title}
                </div>

                {/* Simple underline */}
                <div className="mt-3 h-px w-12 bg-white/20 transition-all duration-500 group-hover:w-20 group-hover:bg-white/40" />

                {/* Description */}
                <div className="mt-4 text-sm leading-relaxed text-white/60">
                  {card.description}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
