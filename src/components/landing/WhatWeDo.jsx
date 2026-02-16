import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper.jsx";
import { fadeUp, stagger, easeExecutive } from "./motion.js";

export default function WhatWeDo() {
  const items = [
    {
      title: "Data Architecture",
      description:
        "Scalable, governed foundations for trusted enterprise data products.",
      color: "#3b82f6",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M6 7.5C6 6.12 8.69 5 12 5s6 1.12 6 2.5S15.31 10 12 10 6 8.88 6 7.5Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 7.5V12c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5V7.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 12v4.5c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5V12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      title: "Modern Analytics",
      description:
        "Self-serve reporting, semantic layers, and KPI systems your leaders trust.",
      color: "#8b5cf6",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M4.5 19.5V5.5c0-.55.45-1 1-1H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7.5 16.5v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 16.5v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16.5 16.5v-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Applied AI",
      description:
        "Forecasting, anomaly detection, copilots, and automation tied to business value.",
      color: "#06b6d4",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M9 3v2M15 3v2M5 9H3M21 9h-2M9 21v-2M15 21v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8.5 7.5h7A2.5 2.5 0 0 1 18 10v4a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5v-4a2.5 2.5 0 0 1 2.5-2.5Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <SectionWrapper
      id="what-we-do"
      variant="light"
      eyebrow="What we do"
      title="Structured delivery. Enterprise outcomes."
      description="We align strategy, architecture, and delivery so analytics and AI become compounding advantages—not one-off initiatives."
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger(0.14)}
        className="grid gap-7 md:grid-cols-3"
      >
        {items.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4, ease: easeExecutive }}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            {/* top accent strip */}
            <div
              className="absolute inset-x-0 top-0 h-1"
              style={{ background: item.color }}
            />

            {/* icon */}
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
              style={{ background: item.color }}
            >
              {item.icon}
            </div>

            {/* content */}
            <h3 className="mt-6 text-lg font-semibold tracking-tight text-slate-900">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
