import { motion } from "framer-motion";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { stagger, underlineReveal } from "./motion.js";
import ScrollText from "../ScrollText.jsx";

function ExploreButton({ to, label }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="group inline-flex h-14 w-14 items-center overflow-hidden rounded-full bg-transparent outline-none transition-[width] duration-500 hover:w-[260px] focus-visible:w-[260px]"
      style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
    >
      <span className="relative block h-14 w-14 shrink-0">
        <span
          aria-hidden="true"
          className="absolute inset-2 rounded-full border-[4px] border-[#F0EEEF] opacity-100 group-hover:opacity-0 group-hover:scale-[0.7] group-focus-visible:opacity-0 group-focus-visible:scale-[0.7]"
          style={{
            transitionProperty: "opacity, transform",
            transitionDuration: "500ms",
            transitionTimingFunction: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
          }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-2 scale-[1.3] rounded-full border-[4px] border-[#96DAF0] opacity-0 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100"
          style={{
            transitionProperty: "opacity, transform",
            transitionDuration: "500ms",
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />

        <span
          aria-hidden="true"
          className="absolute left-0 top-0 flex h-14 w-28 translate-x-0 group-hover:-translate-x-14 group-focus-visible:-translate-x-14"
          style={{ transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
        >
          {[0, 1].map((idx) => (
            <span
              key={idx}
              className="flex h-14 w-14 items-center justify-center"
            >
              <svg viewBox="0 0 46 40" className="h-5 w-5 fill-[#F0EEEF]">
                <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
              </svg>
            </span>
          ))}
        </span>
      </span>

      <span
        className="ml-2 translate-x-2 whitespace-nowrap pr-4 text-sm font-semibold text-white/80 opacity-0 transition-[opacity,transform] duration-[450ms] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {label}
      </span>
    </Link>
  );
}

export default function IndustriesGrid() {
  const ease = [0.4, 0, 0.2, 1];

  const domains = useMemo(
    () => [
      {
        slug: "finance",
        title: "Finance & FP&A",
        sentence: "Decision-grade financial intelligence for CFOs and enterprise finance teams.",
        link: "Explore Finance Analytics",
        icon: "M7 17V9M12 17V7M17 17v-5M6 19h12",
        image: "/DOMAINS_WE_WORK_ACROSS/Finance_FP&A.webp",
      },
      {
        slug: "growth",
        title: "Marketing & Growth",
        sentence: "Performance analytics that connects spend to measurable growth outcomes.",
        link: "Explore Growth Analytics",
        icon: "M6 15l4-4 3 3 5-6M6 19h12",
        image: "/DOMAINS_WE_WORK_ACROSS/Marketing_Growth.webp",
      },
      {
        slug: "services",
        title: "Consulting & Services",
        sentence: "Client-level performance systems for professional services organizations.",
        link: "Explore Services Analytics",
        icon: "M8 17v-6a2 2 0 0 1 4 0v6M6 19h12M9 9h6",
        image: "/DOMAINS_WE_WORK_ACROSS/Consulting_Services.webp",
      },
      {
        slug: "retail",
        title: "Retail & CPG",
        sentence: "Demand, pricing, and supply intelligence across channels.",
        link: "Explore Retail Analytics",
        icon: "M7 10h10l-1 9H8L7 10Zm2-2a3 3 0 0 1 6 0",
        image: "/DOMAINS_WE_WORK_ACROSS/Retail_CPG.webp",
      },
      {
        slug: "risk",
        title: "Risk & Compliance",
        sentence: "Governance-first analytics systems for regulated environments.",
        link: "Explore Risk Analytics",
        icon: "M12 21s7-3 7-10V6l-7-3-7 3v5c0 7 7 10 7 10Zm0-10v4",
        image: "/DOMAINS_WE_WORK_ACROSS/Risk_Compliance.webp",
      },
      {
        slug: "operations",
        title: "Operations",
        sentence: "Process visibility and KPI frameworks that improve execution.",
        link: "Explore Operations Analytics",
        icon: "M7 12h10M12 7v10M6 7h3M15 7h3M6 17h3M15 17h3",
        image: "/DOMAINS_WE_WORK_ACROSS/Operations.webp",
      },
    ],
    []
  );

  const intro = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };

  const card = {
    rest: { y: 0 },
    hover: { y: -6, transition: { duration: 0.6, ease } },
  };

  return (
    <section id="industries" className="relative overflow-hidden bg-ink-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={intro}
          className="relative max-w-3xl"
        >
          <ScrollText
            useParent
            as="p"
            text="DOMAINS WE WORK ACROSS"
            blur={7}
            distance={14}
            className="text-sm font-semibold tracking-wider uppercase text-white/70"
          />

          <div className="mt-4">
            <ScrollText
              useParent
              as="h2"
              text="Domain fluency. Decision-ready systems."
              lineAnime
              blur={10}
              distance={18}
              staggerChildren={0.055}
              className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl"
            />
            <motion.div
              variants={underlineReveal}
              className="mt-4 h-px origin-left bg-white/15"
            />
          </div>

          <ScrollText
            useParent
            as="p"
            text="We combine deep business context with modern analytics architecture to deliver measurable outcomes."
            blur={6}
            distance={12}
            className="mt-5 text-base leading-relaxed text-white/60 md:text-lg"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.08)}
          className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {domains.map((d) => (
            <motion.div key={d.slug} variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>
              <motion.div initial="rest" whileHover="hover" animate="rest" variants={card} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
                  {/* Domain Image */}
                  <div className="relative overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                    <img
                      src={d.image}
                      alt={d.title}
                      loading="lazy"
                      decoding="async"
                      className="h-44 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Icon badge overlaid on image */}
                    <div className="absolute bottom-3 left-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-ink-950/80 backdrop-blur-sm">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d={d.icon}
                          stroke="rgba(148,163,184,0.9)"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="relative p-6 pt-4">
                    <div className="text-lg font-semibold tracking-tight text-white">{d.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/60">{d.sentence}</div>

                    <div className="mt-6 flex items-center">
                      <ExploreButton to={`/domains/${d.slug}`} label={d.link} />
                      <div className="w-4" />
                      <div className="h-px flex-1 bg-white/10" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
