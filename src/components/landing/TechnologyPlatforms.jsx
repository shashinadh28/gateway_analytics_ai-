import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import SectionWrapper from "./SectionWrapper.jsx";
import { fadeUp, stagger } from "./motion.js";

function PlusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 7l10 10M17 7L7 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function TechnologyPlatforms() {
  const ease = [0.4, 0, 0.2, 1];
  const items = useMemo(
    () => [
      {
        id: 1,
        url: "/How_We_Work/Cloud-Data-Platforms-&-Warehouses.webp",
        title: "Cloud Data Platforms & Warehouses",
        description: "We design analytics solutions that scale as your data grows.",
        blocks: [
          {
            name: "Snowflake",
            bullets: [
              "Cloud-native data warehousing",
              "Optimized for performance, cost efficiency, and secure data sharing",
              "Ideal for high-volume, multi-source analytics",
            ],
          },
          {
            name: "Azure Data Platform",
            bullets: [
              "Azure SQL, Azure Data Lake, Synapse Analytics",
              "Enterprise-grade security and governance",
              "Seamless integration with Microsoft ecosystem",
            ],
          },
        ],
      },
      {
        id: 2,
        url: "/How_We_Work/Microsoft-Fabric-(End-to-End-Analytics.webp",
        title: "Microsoft Fabric (End-to-End Analytics)",
        description: "We help organizations leverage Microsoft Fabric as a unified analytics solution:",
        bullets: [
          "OneLake architecture for centralized data",
          "Lakehouse & Warehouse modeling",
          "Seamless integration with Power BI",
          "Simplified data engineering + analytics workflows",
          "Ideal for organizations moving toward a single analytics platform",
        ],
      },
      {
        id: 3,
        url: "/How_We_Work/ETL-ELT-and-Data-Engineering.webp",
        title: "ETL / ELT & Data Engineering",
        description: "Reliable analytics starts with clean, well-modeled data.",
        bullets: [
          "Azure Data Factory (ADF)",
          "Fabric Data Pipelines",
          "SQL-based transformations",
          "Incremental loads, performance tuning, error handling",
          "Automated pipelines with monitoring & alerts",
        ],
      },
      {
        id: 4,
        url: "/How_We_Work/Business_Intelligence_Visualization.webp",
        title: "Business Intelligence & Visualization",
        description: "We focus on decision-driven dashboards, not just visuals.",
        bullets: [
          "Power BI",
          "Enterprise dashboards & executive reporting",
          "Row-level security (RLS)",
          "Performance-optimized data models",
          "Dynamic KPIs and drill-down analysis",
          "KPI frameworks",
          "Self-service BI enablement",
          "Stakeholder-friendly storytelling with data",
        ],
      },
      {
        id: 5,
        url: "/How_We_Work/Advanced_Analytics_%20Machine%20Learning.webp",
        title: "Advanced Analytics & Machine Learning (When Needed)",
        description:
          "Beyond descriptive analytics, we help clients move into predictive and prescriptive insights.",
        bullets: [
          "Python-based analytics",
          "Forecasting models",
          "Customer segmentation (RFM, cohort analysis)",
          "Churn & retention analysis",
          "Experimentation & metric optimization",
        ],
      },
    ],
    []
  );

  const [openId, setOpenId] = useState(null);
  const openItem = items.find((i) => i.id === openId) ?? null;

  useEffect(() => {
    if (!openItem) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openItem]);

  return (
    <SectionWrapper
      id="platforms"
      variant="light"
      eyebrow="How we work"
      title="Our Technology Stack (Modern, Scalable & Future-Ready)"
      description="We work with today’s most in-demand analytics and data platforms to ensure performance, scalability, and long-term value."
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger(0.1)}
        className="relative mt-12"
      >
        <div className="pointer-events-none absolute -inset-12 rounded-[44px] bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.10),transparent_55%),radial-gradient(circle_at_85%_65%,rgba(14,165,233,0.08),transparent_55%)]" />
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <motion.button
              key={item.id}
              variants={fadeUp}
              type="button"
              onClick={() => setOpenId(item.id)}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.6, ease }}
              className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-[0_18px_40px_-34px_rgba(15,23,42,0.55)]"
              style={{ borderRadius: 16, willChange: "transform" }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 ring-1 ring-blue-600/20 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-52 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/15 to-transparent" />
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_15%,rgba(59,130,246,0.26),transparent_55%)]" />
                </div>
              </div>

              <div className="relative flex grow flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold tracking-tight text-slate-900">{item.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</div>
                  </div>
                  <div className="mt-0.5 flex flex-col items-end gap-2">
                    <span className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-900 shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-colors group-hover:bg-slate-50">
                      <PlusIcon className="h-6 w-6" />
                    </span>
                    <span className="text-[11px] font-semibold tracking-wide text-slate-500">
                      View details
                    </span>
                  </div>
                </div>

                {"bullets" in item ? (
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
                    {item.bullets.slice(0, 3).map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600/60" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {item.blocks.map((blk) => (
                      <div key={blk.name} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
                        <div className="text-sm font-semibold tracking-tight text-slate-900">{blk.name}</div>
                        <div className="mt-2 text-sm text-slate-600">{blk.bullets[0]}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {openItem ? (
          <motion.div
            className="fixed inset-0 z-[70]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              aria-label="Close dialog"
              className="absolute inset-0 h-full w-full bg-slate-950/70 backdrop-blur-[2px]"
              onClick={() => setOpenId(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(125%_125%_at_50%_10%,rgba(59,130,246,0.22)_0%,rgba(2,6,23,0.88)_55%,rgba(2,6,23,1)_100%)]" />

            <div className="relative z-[71] mx-auto flex h-full max-w-[1200px] items-start justify-center px-6 pt-16 md:pt-20">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={openItem.title}
                onClick={(e) => e.stopPropagation()}
                className="relative flex h-[86vh] w-full flex-col overflow-y-auto rounded-[24px] border border-white/10 bg-[#0B1324]"
                style={{ borderRadius: 24 }}
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 18 }}
                transition={{ type: "spring", bounce: 0.05, duration: 0.5 }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.14),transparent_52%),radial-gradient(circle_at_80%_35%,rgba(59,130,246,0.18),transparent_55%)]" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                      backgroundSize: "86px 86px",
                      backgroundPosition: "0 0",
                      maskImage: "radial-gradient(circle at 50% 18%, black 0%, transparent 62%)",
                      WebkitMaskImage: "radial-gradient(circle at 50% 18%, black 0%, transparent 62%)",
                    }}
                  />
                </div>

                <div className="absolute right-4 top-4 z-10">
                  <button
                    type="button"
                    onClick={() => setOpenId(null)}
                    className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/10 p-3 text-white/90 transition-colors hover:bg-white/15"
                    aria-label="Close"
                  >
                    <CloseIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="relative px-6 pb-12 pt-10 md:px-10">
                  <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.55, ease }}
                      className="relative"
                    >
                      <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.22),transparent_60%)] opacity-60 blur-2xl" />
                      <img
                        src={openItem.url}
                        alt={openItem.title}
                        className="relative h-[240px] w-full rounded-2xl object-cover md:h-[320px]"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                    </motion.div>

                    <div className="relative">
                      <div className="text-xs font-semibold tracking-[0.28em] text-white/60">HOW WE WORK</div>
                      <div className="mt-4 text-balance text-2xl font-semibold tracking-tight text-white md:text-4xl">
                        {openItem.title}
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease, delay: 0.05 }}
                      >
                        <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
                          {openItem.description}
                        </p>
                      </motion.div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {["Enterprise-ready", "Scalable", "Governed"].map((chip) => (
                          <div
                            key={chip}
                            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-white/75"
                          >
                            {chip}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {"blocks" in openItem ? (
                    <div className="mt-10 grid gap-5 md:grid-cols-2">
                      {openItem.blocks.map((blk) => (
                        <div
                          key={blk.name}
                          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                        >
                          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.16),transparent_60%)] opacity-65" />
                          <div className="pointer-events-none absolute inset-0 opacity-0 ring-1 ring-cyan-300/20 transition-opacity duration-300 group-hover:opacity-100" />
                          <div className="relative text-base font-semibold tracking-tight text-white">{blk.name}</div>
                          <ul className="relative mt-4 space-y-2 text-sm leading-relaxed text-white/70">
                            {blk.bullets.map((b) => (
                              <li key={b} className="flex items-start gap-2">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/70" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                      <div className="text-sm font-semibold tracking-[0.22em] text-white/65">KEY CAPABILITIES</div>
                      <div className="mt-5 grid gap-3 md:grid-cols-2">
                        {openItem.bullets.map((b) => (
                          <div
                            key={b}
                            className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/70" />
                            <span className="text-sm leading-relaxed text-white/70">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SectionWrapper>
  );
}
