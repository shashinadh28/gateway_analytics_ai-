import { motion } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "./SectionWrapper.jsx";
import { easeInOut, stagger } from "./motion.js";

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
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger(0.1)}
        className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {bullets.map((b, i) => {
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
                opacity: isBlurred ? 0.5 : 1,
                transform: isBlurred ? "scale(0.97)" : "scale(1)",
                transition:
                  "opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow duration-500 hover:shadow-md">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={b.image}
                    alt={b.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-6 pt-4">
                  <h3 className="mb-2 text-base font-bold tracking-tight text-slate-900">
                    {b.title}
                  </h3>
                  <div className="mb-3 h-px w-10 bg-slate-300 transition-all duration-500 group-hover:w-16 group-hover:bg-slate-400" />
                  <p className="text-sm leading-relaxed text-slate-600">
                    {b.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
