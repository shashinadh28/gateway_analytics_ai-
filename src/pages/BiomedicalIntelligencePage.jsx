import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import ScrollText from "../components/ScrollText.jsx";

const ease = [0.4, 0, 0.2, 1];
const springy = { type: "spring", stiffness: 260, damping: 28 };

const pal = {
  primary: "#7c3aed",
  secondary: "#a78bfa",
  tertiary: "#06b6d4",
  warm: "#f59e0b",
  glow1: "rgba(124,58,237,0.20)",
  glow2: "rgba(167,139,250,0.12)",
  glow3: "rgba(6,182,212,0.10)",
  gradient: "linear-gradient(135deg, #7c3aed, #a78bfa)",
  accentGrad: "linear-gradient(135deg, #7c3aed, #06b6d4)",
};

const HERO_IMG = "/biomedical-intelligence/AI_Biomedical_Indian_Researcher.webp";

const PROBLEMS = [
  { title: "Information Overload", text: "Thousands of biomedical papers published daily make manual literature review impractical and error-prone.", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
  { title: "Missed Connections", text: "Critical drug interactions and emerging research trends get buried across disconnected publications.", icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" },
  { title: "Slow Decision Cycles", text: "Weeks of manual analysis delay critical research and business decisions in pharmaceutical workflows.", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const ARCHITECTURE = [
  { step: "01", title: "Data Ingestion", text: "Automated PubMed API pipeline fetches and indexes biomedical papers continuously.", image: "/biomedical-intelligence/SOLUTION_ARCHITECTURE/Data_Ingestion.webp" },
  { step: "02", title: "NLP Processing", text: "AI models extract entities, relationships, drug interactions, and research themes.", image: "/biomedical-intelligence/SOLUTION_ARCHITECTURE/NLP_Processing.webp" },
  { step: "03", title: "Knowledge Graph", text: "Structured data is mapped into a queryable biomedical knowledge graph.", image: "/biomedical-intelligence/SOLUTION_ARCHITECTURE/Knowledge_Graph.webp" },
  { step: "04", title: "Power BI Dashboards", text: "Interactive visualizations surface trends, interactions, and research clusters.", image: "/biomedical-intelligence/SOLUTION_ARCHITECTURE/Power_BI_Dashboards.webp" },
];

const HELPS = [
  { title: "Accelerate Research Speed", text: "Turn weeks of literature review into minutes of interactive exploration.", image: "/How_It_Helps_You/_Accelerate_Research_Speed.webp" },
  { title: "Visualize Hidden Trends", text: "Instantly see which topics are trending, which drugs are being mentioned together, and where the industry is moving — all via clear Power BI charts.", image: "/How_It_Helps_You/_Visualize_Hidden_Trends.webp" },
  { title: "Make Evidence-Based Decisions", text: "Stop guessing. Access a live, data-backed snapshot of the medical landscape to support clinical, investment, or R&D decisions.", image: "/How_It_Helps_You/Make_Evidence-Based_Decisions.webp" },
];

const AUDIENCES = [
  { title: "Pharmaceutical R&D Teams", text: "Accelerate drug discovery with structured literature intelligence.", image: "/biomedical-intelligence/WHO_ITS_FOR/Pharmaceutical_R&D_Teams.webp" },
  { title: "Clinical Research Organizations", text: "Monitor emerging evidence and safety signals in real-time.", image: "/biomedical-intelligence/WHO_ITS_FOR/Clinical_Research_Organizations.webp" },
  { title: "Biotech Startups", text: "Competitive intelligence from research trends without a dedicated analyst team.", image: "/biomedical-intelligence/WHO_ITS_FOR/Biotech_Startups.webp" },
  { title: "Academic Research Labs", text: "Systematic reviews and meta-analyses powered by AI.", image: "/biomedical-intelligence/WHO_ITS_FOR/Academic_Research_Labs.webp" },
];

const TECH = [
  { name: "Python / NLP", desc: "Text mining, entity extraction, and classification pipelines" },
  { name: "PubMed API", desc: "Automated biomedical literature ingestion at scale" },
  { name: "Azure / Cloud", desc: "Scalable compute and storage infrastructure" },
  { name: "Power BI", desc: "Enterprise-grade interactive dashboards and reporting" },
  { name: "Knowledge Graph", desc: "Neo4j-style relationship mapping and querying" },
  { name: "ML Models", desc: "Custom classifiers for drug interactions and trend detection" },
];

/* ── deterministic particles ──────────────────────────────── */
const PARTICLES = Array.from({ length: 30 }, (_, i) => {
  const s = [13,29,7,41,19,37,11,23,17,31,43,5,47,2,53,3,61,59,67,71,73,79,83,89,97,4,14,26,38,50];
  const a = s[i % s.length], b = s[(i+7) % s.length], c = s[(i+3) % s.length];
  return { id: i, x: ((a*(i+1)*7)%92)+4, y: ((b*(i+2)*11)%88)+6, size: 1.5+(c%3), dur: 6+(a%8), delay: (i*0.12)%3.5, dx: (c%24)-12, dy: -(6+(a%14)) };
});

function FloatingParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: "linear-gradient(135deg, rgba(167,139,250,0.7), rgba(6,182,212,0.5))" }}
          animate={{ x: [0, p.dx, 0], y: [0, p.dy, 0], opacity: [0, 0.4, 0] }}
          transition={{ duration: p.dur, delay: p.delay, ease: "easeInOut", repeat: Infinity }}
        />
      ))}
    </div>
  );
}

/* ── animation variants ───────────────────────────────────── */
const stag = (d = 0.1) => ({ hidden: {}, visible: { transition: { staggerChildren: d, delayChildren: 0.15 } } });
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } };
const fadeLeft = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } } };
const fadeRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } } };

export default function BiomedicalIntelligencePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <div className="min-h-screen bg-[#08081a] text-white">
      {/* ── ambient backgrounds ── */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_18%_14%,rgba(124,58,237,0.14),transparent_50%),radial-gradient(ellipse_at_80%_70%,rgba(6,182,212,0.08),transparent_50%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "72px 72px", maskImage: "radial-gradient(circle at 50% 30%, black 0%, transparent 65%)", WebkitMaskImage: "radial-gradient(circle at 50% 30%, black 0%, transparent 65%)" }} />
      <FloatingParticles />

      {/* ── Nav ── */}
      <nav className="relative z-20 mx-auto max-w-6xl px-6 py-8">
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="flex items-center justify-between rounded-2xl border border-violet-500/15 bg-[#08081a]/75 px-4 py-3 backdrop-blur-2xl md:px-6">
          <Link to="/" className="group flex items-center gap-2 text-sm font-semibold text-white/85 transition-colors hover:text-white">
            <motion.span className="inline-block" whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>←</motion.span>
            Back to Home
          </Link>
          <a href="https://calendly.com/deepak-teja/introduction" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5" style={{ background: pal.gradient, boxShadow: `0 0 22px ${pal.glow1}` }}>
            <span className="pointer-events-none absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            Request Demo
          </a>
        </motion.div>
      </nav>

      {/* ══════════════════ HERO ══════════════════ */}
      <motion.section ref={heroRef} style={{ y: heroY }} className="relative z-10 mx-auto max-w-6xl px-6 pb-28 pt-6 md:pt-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease }}>
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease, delay: 0.1 }} className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.07] px-4 py-1.5">
              <motion.span className="h-2 w-2 rounded-full" style={{ background: pal.gradient }} animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }} />
              <span className="text-xs font-semibold tracking-[0.22em] text-violet-300/80">AI SOLUTION</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.15 }} className="mt-6 max-w-2xl text-4xl font-semibold tracking-[-0.03em] md:text-5xl lg:text-[3.5rem] lg:leading-[1.12]">
              AI-Powered <span className="bg-clip-text text-transparent" style={{ backgroundImage: pal.accentGrad }}>Biomedical Intelligence</span> Dashboard
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.25 }} className="mt-6 max-w-lg text-base leading-relaxed text-white/60 md:text-lg">
              Transform thousands of PubMed publications into structured, decision-ready intelligence. Our AI engine automates literature reviews, detects drug interactions, and surfaces research trends through interactive Power BI dashboards.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.35 }} className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="https://calendly.com/deepak-teja/introduction" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5" style={{ background: pal.gradient, boxShadow: `0 0 26px ${pal.glow1}` }}>
                <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ boxShadow: `0 0 0 1px ${pal.primary}55, 0 0 30px ${pal.glow1}` }} />
                Request a Demo
              </a>
              <Link to="/" className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/[0.08]">Back to Home</Link>
            </motion.div>
          </motion.div>

          {/* Hero image */}
          <motion.div initial={{ opacity: 0, scale: 0.92, rotateY: 8 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 1.1, ease, delay: 0.2 }} className="relative" style={{ perspective: 1000 }}>
            <div className="relative overflow-hidden rounded-3xl border border-violet-500/15 shadow-2xl shadow-violet-900/20">
              <div className="pointer-events-none absolute inset-0 z-10" style={{ background: `linear-gradient(160deg, ${pal.glow1}, transparent 55%), linear-gradient(to top, rgba(8,8,26,0.5) 0%, transparent 35%)` }} />
              <motion.img src={HERO_IMG} alt="AI Biomedical Research" className="h-full w-full object-cover" style={{ minHeight: 360 }} loading="eager" initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease }} />
            </div>
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-violet-600/8 blur-3xl" />
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════════════ PROBLEM ══════════════════ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stag(0.12)}>
          <ScrollText as="div" text="THE PROBLEM" blur={4} distance={10} className="text-sm font-semibold tracking-[0.22em] text-violet-300/70" />
          <ScrollText as="h2" text="Manual research can't keep pace with modern biomedical data" lineAnime blur={10} distance={14} staggerChildren={0.05} className="mt-4 max-w-3xl text-2xl font-semibold tracking-[-0.02em] md:text-3xl" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PROBLEMS.map((p, i) => (
              <motion.div key={p.title} variants={fadeUp} whileHover={{ y: -8, transition: springy }} className="group relative overflow-hidden rounded-2xl border border-violet-500/10 bg-white/[0.02] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-violet-400/25 hover:bg-white/[0.04]">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 50% 0%, ${pal.glow1}, transparent 70%)` }} />
                <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/[0.08]" style={{ boxShadow: `0 0 22px ${pal.glow1}` }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d={p.icon} stroke={pal.secondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div className="relative text-lg font-semibold tracking-tight">{p.title}</div>
                <div className="relative mt-3 text-sm leading-relaxed text-white/55">{p.text}</div>
                <motion.div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: pal.accentGrad }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease, delay: 0.3 + i * 0.1 }} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════ SOLUTION ARCHITECTURE ══════════════════ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stag(0.15)}>
          <ScrollText as="div" text="SOLUTION ARCHITECTURE" blur={4} distance={10} className="text-sm font-semibold tracking-[0.22em] text-violet-300/70" />
          <ScrollText as="h2" text="From raw publications to actionable intelligence" lineAnime blur={10} distance={14} staggerChildren={0.05} className="mt-4 max-w-3xl text-2xl font-semibold tracking-[-0.02em] md:text-3xl" />

          <div className="mt-14 space-y-10">
            {ARCHITECTURE.map((a, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={a.step}
                  variants={isEven ? fadeLeft : fadeRight}
                  className={`grid items-center gap-8 md:grid-cols-2 ${!isEven ? "md:direction-rtl" : ""}`}
                >
                  <div className={`${!isEven ? "md:order-2" : ""}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white" style={{ background: pal.accentGrad }}>{a.step}</div>
                      <div className="h-px flex-1 bg-gradient-to-r from-violet-500/30 to-transparent" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight">{a.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/55 md:text-base">{a.text}</p>
                  </div>
                  <motion.div
                    className={`relative overflow-hidden rounded-2xl border border-violet-500/12 ${!isEven ? "md:order-1" : ""}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#08081a]/50 via-transparent to-transparent" />
                    <img src={a.image} alt={a.title} className="h-56 w-full object-cover md:h-64" loading="lazy" decoding="async" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════ HOW IT HELPS YOU ══════════════════ */}
      <section className="relative z-10 overflow-hidden py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(124,58,237,0.08),transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stag(0.14)}>
            <ScrollText as="div" text="HOW IT HELPS YOU" blur={4} distance={10} className="text-sm font-semibold tracking-[0.22em] text-violet-300/70" />
            <ScrollText as="h2" text="From data overload to decision clarity" lineAnime blur={10} distance={14} staggerChildren={0.05} className="mt-4 max-w-3xl text-2xl font-semibold tracking-[-0.02em] md:text-3xl" />

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {HELPS.map((h, i) => (
                <motion.div
                  key={h.title}
                  variants={scaleIn}
                  whileHover={{ y: -10, transition: springy }}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-violet-500/10 bg-white/[0.02] backdrop-blur-sm transition-colors duration-300 hover:border-violet-400/25"
                >
                  {/* Image fills top half */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.img
                      src={h.image}
                      alt={h.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08081a] via-[#08081a]/50 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 z-10">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white" style={{ background: pal.accentGrad }}>{String(i + 1).padStart(2, "0")}</div>
                    </div>
                  </div>
                  {/* Text content */}
                  <div className="flex flex-1 flex-col p-6 pt-4">
                    <h3 className="text-xl font-semibold tracking-tight">{h.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{h.text}</p>
                  </div>
                  <motion.div className="h-[2px]" style={{ background: pal.accentGrad }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease, delay: 0.2 + i * 0.12 }} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ WHO IT'S FOR ══════════════════ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stag(0.12)}>
          <ScrollText as="div" text="WHO IT'S FOR" blur={4} distance={10} className="text-sm font-semibold tracking-[0.22em] text-violet-300/70" />
          <ScrollText as="h2" text="Built for teams that need research intelligence at scale" lineAnime blur={10} distance={14} staggerChildren={0.05} className="mt-4 max-w-3xl text-2xl font-semibold tracking-[-0.02em] md:text-3xl" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {AUDIENCES.map((a, i) => (
              <motion.div key={a.title} variants={fadeUp} whileHover={{ y: -6, transition: springy }} className="group relative overflow-hidden rounded-2xl border border-violet-500/10 bg-white/[0.02] backdrop-blur-sm transition-colors duration-300 hover:border-violet-400/25">
                <div className="relative h-44 overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#08081a] via-[#08081a]/40 to-transparent" />
                  <motion.img src={a.image} alt={a.title} className="h-full w-full object-cover" loading="lazy" decoding="async" whileHover={{ scale: 1.06 }} transition={{ duration: 0.6, ease }} />
                </div>
                <div className="relative p-6 pt-4">
                  <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-bold text-white" style={{ background: pal.accentGrad }}>{String(i + 1).padStart(2, "0")}</div>
                  <div className="text-lg font-semibold tracking-tight">{a.title}</div>
                  <div className="mt-2 text-sm leading-relaxed text-white/55">{a.text}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════ TECH STACK ══════════════════ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stag(0.1)}>
          <ScrollText as="div" text="TECH STACK" blur={4} distance={10} className="text-sm font-semibold tracking-[0.22em] text-violet-300/70" />
          <ScrollText as="h2" text="Enterprise-grade technology under the hood" lineAnime blur={10} distance={14} staggerChildren={0.05} className="mt-4 max-w-3xl text-2xl font-semibold tracking-[-0.02em] md:text-3xl" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TECH.map((t, i) => (
              <motion.div key={t.name} variants={scaleIn} whileHover={{ y: -4, transition: springy }} className="group relative overflow-hidden rounded-2xl border border-violet-500/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-violet-400/25 hover:bg-white/[0.04]">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 50% 100%, ${pal.glow3}, transparent 70%)` }} />
                <div className="relative mb-3 flex h-8 w-8 items-center justify-center rounded-lg text-[11px] font-bold text-white" style={{ background: pal.accentGrad }}>{String(i + 1).padStart(2, "0")}</div>
                <div className="relative text-base font-semibold tracking-tight">{t.name}</div>
                <div className="relative mt-2 text-sm leading-relaxed text-white/50">{t.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════ CTA ══════════════════ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28 pt-12">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease }} className="relative overflow-hidden rounded-3xl border border-violet-500/15 bg-white/[0.02] p-10 backdrop-blur-xl md:p-14">
          <div className="pointer-events-none absolute inset-0 rounded-3xl" style={{ background: `radial-gradient(ellipse at 25% 30%, ${pal.glow1}, transparent 55%), radial-gradient(ellipse at 75% 70%, ${pal.glow3}, transparent 55%)` }} />
          <motion.div className="pointer-events-none absolute inset-0 rounded-3xl" style={{ background: `conic-gradient(from 0deg at 50% 50%, transparent 0%, ${pal.primary}15 25%, transparent 50%, ${pal.tertiary}12 75%, transparent 100%)` }} animate={{ rotate: 360 }} transition={{ duration: 28, ease: "linear", repeat: Infinity }} />
          <div className="relative">
            <ScrollText as="div" text="NEXT STEP" blur={4} distance={10} className="text-sm font-semibold tracking-[0.22em] text-violet-300/70" />
            <ScrollText as="div" text="Ready to transform your biomedical research workflow?" lineAnime blur={10} distance={14} staggerChildren={0.05} className="mt-4 text-balance text-2xl font-semibold tracking-[-0.02em] md:text-3xl" />
            <ScrollText as="div" text="See how our AI intelligence engine can accelerate your literature reviews and surface insights that matter." blur={6} distance={10} className="mt-5 max-w-2xl text-base leading-relaxed text-white/60" />
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="https://calendly.com/deepak-teja/introduction" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5" style={{ background: pal.gradient, boxShadow: `0 0 28px ${pal.glow1}` }}>
                <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ boxShadow: `0 0 0 1px ${pal.primary}55, 0 0 30px ${pal.glow1}` }} />
                Request Demo
              </a>
              <Link to="/" className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/[0.08]">Back to Home</Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
