import { motion } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "./SectionWrapper.jsx";
import { easeInOut, stagger } from "./motion.js";

const ACCENTS = [
  { bg: "from-blue-500 to-blue-600", border: "rgba(59,130,246,0.18)" },
  { bg: "from-cyan-500 to-teal-500", border: "rgba(6,182,212,0.18)" },
  { bg: "from-violet-500 to-purple-500", border: "rgba(139,92,246,0.18)" },
  { bg: "from-amber-500 to-orange-500", border: "rgba(245,158,11,0.18)" },
  { bg: "from-emerald-500 to-green-500", border: "rgba(16,185,129,0.18)" },
];

const bullets = [
  {
    title: "Engineering + analytics + business thinking",
    description:
      "A balanced approach that connects data work directly to measurable decisions.",
    image: "/Why_work_with_us/Engineering_analytics_business thinking.webp",
  },
  {
    title: "Multi-domain experience",
    description:
      "Patterns across finance, marketing, services, operations, and compliance use cases.",
    image: "/Why_work_with_us/Multi-domain-experience.webp",
  },
  {
    title: "Modern analytics platforms",
    description:
      "Expertise across Snowflake, Azure, Fabric, and Power BI with enterprise governance in mind.",
    image: "/Why_work_with_us/Modern_analytics_platforms.webp",
  },
  {
    title: "Impact over reporting",
    description:
      "KPIs and dashboards designed for clarity, alignment, and action — not just visuals.",
    image: "/Why_work_with_us/Impact_over_reporting.webp",
  },
  {
    title: "Solutions that scale with you",
    description:
      "From foundational pipelines to advanced analytics, built to evolve with maturity and demand.",
    image: "/Why_work_with_us/Solutions_that_scale_with_you.webp",
  },
];

export default function WhyGateway() {
  const [hovered, setHovered] = useState(null);

  return (
    <SectionWrapper
      id="why"
      variant="light"
      eyebrow="Why work with us"
      title="Enterprise-grade analytics without one-size-fits-all thinking"
      description="A controlled, modern delivery approach — built around your business questions, constraints, and goals."
    >
      {/* decorative blurred orbs */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 h-48 w-48 rounded-full bg-cyan-100/30 blur-3xl" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger(0.1)}
        className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {bullets.map((b, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          const isBlurred = hovered !== null && hovered !== i;

          return (
            <motion.div
              key={b.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.65, ease: easeInOut },
                },
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                filter: isBlurred ? "blur(4px)" : "blur(0px)",
                opacity: isBlurred ? 0.45 : 1,
                transform: isBlurred ? "scale(0.97)" : "scale(1)",
                transition:
                  "filter 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              <div
                className="group relative h-full overflow-hidden rounded-2xl border bg-white transition-shadow duration-500 hover:shadow-xl"
                style={{ borderColor: accent.border }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={b.image}
                    alt={b.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 pt-3">
                  <h3 className="mb-2 text-base font-bold tracking-tight text-slate-900">
                    {b.title}
                  </h3>
                  <div
                    className={`mb-3 h-0.5 w-10 rounded-full bg-gradient-to-r ${accent.bg} opacity-60 transition-all duration-500 group-hover:w-16 group-hover:opacity-100`}
                  />
                  <p className="text-sm leading-relaxed text-slate-600">
                    {b.description}
                  </p>
                </div>

                {/* Bottom accent stripe */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${accent.bg} opacity-0 transition-opacity duration-500 group-hover:opacity-80`}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
