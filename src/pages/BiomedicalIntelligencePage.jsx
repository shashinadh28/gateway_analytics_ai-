import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import ScrollText from "../components/ScrollText.jsx";

const ease = [0.4, 0, 0.2, 1];

const palette = {
  primary: "#7c3aed",
  secondary: "#a78bfa",
  tertiary: "#06b6d4",
  glow1: "rgba(124,58,237,0.20)",
  glow2: "rgba(167,139,250,0.12)",
  glow3: "rgba(6,182,212,0.10)",
  gradientCSS: "linear-gradient(135deg, #7c3aed, #a78bfa)",
  accentGradient: "linear-gradient(135deg, #7c3aed, #06b6d4)",
  bgRadial:
    "radial-gradient(ellipse at 18% 14%, rgba(124,58,237,0.18), transparent 52%), radial-gradient(ellipse at 75% 65%, rgba(6,182,212,0.10), transparent 55%)",
};

const HERO_IMAGE = "/biomedical-intelligence/AI_Biomedical_Indian_Researcher.webp";

const PROBLEMS = [
  {
    title: "Information Overload",
    text: "Thousands of biomedical papers published daily make manual literature review impractical and error-prone.",
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  },
  {
    title: "Missed Connections",
    text: "Critical drug interactions and emerging research trends get buried across disconnected publications.",
    icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
  },
  {
    title: "Slow Decision Cycles",
    text: "Weeks of manual analysis delay critical research and business decisions in pharmaceutical workflows.",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const ARCHITECTURE = [
  { step: "01", title: "Data Ingestion", text: "Automated PubMed API pipeline fetches and indexes biomedical papers continuously.", icon: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" },
  { step: "02", title: "NLP Processing", text: "AI models extract entities, relationships, drug interactions, and research themes.", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" },
  { step: "03", title: "Knowledge Graph", text: "Structured data is mapped into a queryable biomedical knowledge graph.", icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" },
  { step: "04", title: "Power BI Dashboards", text: "Interactive visualizations surface trends, interactions, and research clusters.", icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" },
];

const IMPACTS = [
  { value: "90%", label: "Reduction in manual review time" },
  { value: "10K+", label: "Papers processed per cycle" },
  { value: "Real-time", label: "Drug interaction alerts" },
  { value: "3x", label: "Faster research-to-insight cycles" },
];

const AUDIENCES = [
  { title: "Pharmaceutical R&D Teams", text: "Accelerate drug discovery with structured literature intelligence.", icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5" },
  { title: "Clinical Research Organizations", text: "Monitor emerging evidence and safety signals in real-time.", icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" },
  { title: "Biotech Startups", text: "Competitive intelligence from research trends without a dedicated analyst team.", icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" },
  { title: "Academic Research Labs", text: "Systematic reviews and meta-analyses powered by AI.", icon: "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" },
];

const TECH_STACK = [
  { name: "Python / NLP", desc: "Text mining, entity extraction, and classification pipelines" },
  { name: "PubMed API", desc: "Automated biomedical literature ingestion at scale" },
  { name: "Azure / Cloud", desc: "Scalable compute and storage infrastructure" },
  { name: "Power BI", desc: "Enterprise-grade interactive dashboards and reporting" },
  { name: "Knowledge Graph", desc: "Neo4j-style relationship mapping and querying" },
  { name: "ML Models", desc: "Custom classifiers for drug interactions and trend detection" },
];

const staggerCards = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const cardUp = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } },
};

export default function BiomedicalIntelligencePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* ─── Global background ─── */}
      <div className="pointer-events-none fixed inset-0" style={{ background: palette.bgRadial }} />

      {/* ─── Nav ─── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center justify-between rounded-2xl border border-violet-500/15 bg-[#0a0a1a]/70 px-4 py-3 backdrop-blur-xl md:px-6"
        >
          <Link
            to="/"
            className="group flex items-center gap-2 text-sm font-semibold tracking-wide text-white/85 transition-colors hover:text-white"
          >
            <motion.span className="inline-block" whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>←</motion.span>
            Back to Home
          </Link>
          <a
            href="https://calendly.com/deepak-teja/introduction"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: palette.gradientCSS, boxShadow: `0 0 20px ${palette.glow1}` }}
          >
            Request Demo
          </a>
        </motion.div>
      </div>

      {/* ─── Hero ─── */}
      <motion.div ref={heroRef} style={{ y: heroY }} className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-8 md:pt-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Text */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.06] px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full" style={{ background: palette.gradientCSS }} />
              <span className="text-xs font-semibold tracking-[0.22em] text-violet-300/80">AI SOLUTION</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.15 }}
              className="mt-6 max-w-xl text-balance text-4xl font-semibold tracking-[-0.03em] md:text-5xl lg:text-[3.4rem] lg:leading-[1.1]"
            >
              AI-Powered{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: palette.accentGradient }}>
                Biomedical Intelligence
              </span>{" "}
              Dashboard
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.25 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-white/65 md:text-lg"
            >
              Transform thousands of PubMed publications into structured, decision-ready intelligence. Our AI engine automates literature reviews, detects drug interactions, and surfaces research trends through interactive Power BI dashboards.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.35 }}
              className="mt-9 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="https://calendly.com/deepak-teja/introduction"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: palette.gradientCSS, boxShadow: `0 0 24px ${palette.glow1}` }}
              >
                <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ boxShadow: `0 0 0 1px ${palette.primary}55, 0 0 30px ${palette.glow1}` }} />
                Request a Demo
              </a>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/85 transition-colors hover:bg-white/[0.08]"
              >
                Back to Home
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-violet-500/15">
              <div
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background: `linear-gradient(160deg, ${palette.glow1}, transparent 55%), linear-gradient(to top, rgba(10,10,26,0.55) 0%, transparent 35%)`,
                }}
              />
              <img
                src={HERO_IMAGE}
                alt="AI Biomedical Research"
                className="h-full w-full object-cover"
                style={{ minHeight: 340 }}
                loading="eager"
                decoding="async"
              />
            </div>
            {/* decorative glow behind image */}
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-violet-600/10 blur-3xl" />
          </motion.div>
        </div>
      </motion.div>

      {/* ─── Problem ─── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerCards}>
          <ScrollText as="div" text="THE PROBLEM" blur={4} distance={10} className="text-sm font-semibold tracking-[0.22em] text-violet-300/70" />
          <ScrollText
            as="h2"
            text="Manual research can't keep pace with modern biomedical data"
            lineAnime blur={10} distance={14} staggerChildren={0.05}
            className="mt-4 max-w-3xl text-2xl font-semibold tracking-[-0.02em] md:text-3xl"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PROBLEMS.map((p) => (
              <motion.div
                key={p.title}
                variants={cardUp}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-2xl border border-violet-500/12 bg-white/[0.025] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-violet-500/25"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/[0.08]" style={{ boxShadow: `0 0 20px ${palette.glow1}` }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d={p.icon} stroke={palette.secondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div className="text-lg font-semibold tracking-tight">{p.title}</div>
                <div className="mt-3 text-sm leading-relaxed text-white/60">{p.text}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── Solution Architecture ─── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerCards}>
          <ScrollText as="div" text="SOLUTION ARCHITECTURE" blur={4} distance={10} className="text-sm font-semibold tracking-[0.22em] text-violet-300/70" />
          <ScrollText
            as="h2"
            text="From raw publications to actionable intelligence"
            lineAnime blur={10} distance={14} staggerChildren={0.05}
            className="mt-4 max-w-3xl text-2xl font-semibold tracking-[-0.02em] md:text-3xl"
          />

          {/* Horizontal flow */}
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {ARCHITECTURE.map((a, i) => (
              <motion.div
                key={a.step}
                variants={cardUp}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-2xl border border-violet-500/12 bg-white/[0.025] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-violet-500/25"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white" style={{ background: palette.accentGradient }}>
                    {a.step}
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/[0.06]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d={a.icon} stroke={palette.secondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </div>
                <div className="text-lg font-semibold tracking-tight">{a.title}</div>
                <div className="mt-3 text-sm leading-relaxed text-white/60">{a.text}</div>
                {i < ARCHITECTURE.length - 1 && (
                  <div className="pointer-events-none absolute -right-4 top-1/2 hidden -translate-y-1/2 text-violet-400/25 lg:block">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── Impact (numbers strip) ─── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerCards}>
          <ScrollText as="div" text="IMPACT" blur={4} distance={10} className="text-sm font-semibold tracking-[0.22em] text-violet-300/70" />
          <ScrollText
            as="h2"
            text="Measurable outcomes from day one"
            lineAnime blur={10} distance={14} staggerChildren={0.05}
            className="mt-4 max-w-3xl text-2xl font-semibold tracking-[-0.02em] md:text-3xl"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {IMPACTS.map((m) => (
              <motion.div
                key={m.label}
                variants={cardUp}
                className="relative overflow-hidden rounded-2xl border border-violet-500/12 bg-white/[0.025] p-8 text-center backdrop-blur-sm"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.08),transparent_70%)]" />
                <div className="relative text-4xl font-bold tracking-tight" style={{ background: palette.accentGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{m.value}</div>
                <div className="relative mt-3 text-sm text-white/55">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── Who It's For ─── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerCards}>
          <ScrollText as="div" text="WHO IT'S FOR" blur={4} distance={10} className="text-sm font-semibold tracking-[0.22em] text-violet-300/70" />
          <ScrollText
            as="h2"
            text="Built for teams that need research intelligence at scale"
            lineAnime blur={10} distance={14} staggerChildren={0.05}
            className="mt-4 max-w-3xl text-2xl font-semibold tracking-[-0.02em] md:text-3xl"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {AUDIENCES.map((a, i) => (
              <motion.div
                key={a.title}
                variants={cardUp}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="group relative flex gap-5 overflow-hidden rounded-2xl border border-violet-500/12 bg-white/[0.025] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-violet-500/25"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-500/15 bg-violet-500/[0.06]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d={a.icon} stroke={palette.secondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div>
                  <div className="text-lg font-semibold tracking-tight">{a.title}</div>
                  <div className="mt-2 text-sm leading-relaxed text-white/60">{a.text}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── Tech Stack ─── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerCards}>
          <ScrollText as="div" text="TECH STACK" blur={4} distance={10} className="text-sm font-semibold tracking-[0.22em] text-violet-300/70" />
          <ScrollText
            as="h2"
            text="Enterprise-grade technology under the hood"
            lineAnime blur={10} distance={14} staggerChildren={0.05}
            className="mt-4 max-w-3xl text-2xl font-semibold tracking-[-0.02em] md:text-3xl"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_STACK.map((t, i) => (
              <motion.div
                key={t.name}
                variants={cardUp}
                className="group relative overflow-hidden rounded-2xl border border-violet-500/12 bg-white/[0.025] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-violet-500/25"
              >
                <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-bold text-white/80" style={{ background: palette.accentGradient }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-base font-semibold tracking-tight text-white">{t.name}</div>
                <div className="mt-2 text-sm leading-relaxed text-white/55">{t.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── CTA ─── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="relative overflow-hidden rounded-3xl border border-violet-500/15 bg-white/[0.025] p-10 backdrop-blur-xl md:p-14"
        >
          <div className="pointer-events-none absolute inset-0 rounded-3xl" style={{ background: `radial-gradient(ellipse at 25% 30%, ${palette.glow1}, transparent 55%), radial-gradient(ellipse at 75% 70%, ${palette.glow3}, transparent 55%)` }} />
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{ background: `conic-gradient(from 0deg at 50% 50%, transparent 0%, ${palette.primary}18 25%, transparent 50%, ${palette.tertiary}15 75%, transparent 100%)` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 24, ease: "linear", repeat: Infinity }}
          />
          <div className="relative">
            <ScrollText as="div" text="NEXT STEP" blur={4} distance={10} className="text-sm font-semibold tracking-[0.22em] text-violet-300/70" />
            <ScrollText
              as="div"
              text="Ready to transform your biomedical research workflow?"
              lineAnime blur={10} distance={14} staggerChildren={0.05}
              className="mt-4 text-balance text-2xl font-semibold tracking-[-0.02em] md:text-3xl"
            />
            <ScrollText
              as="div"
              text="See how our AI intelligence engine can accelerate your literature reviews and surface insights that matter."
              blur={6} distance={10}
              className="mt-5 max-w-2xl text-base leading-relaxed text-white/65"
            />
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://calendly.com/deepak-teja/introduction"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: palette.gradientCSS, boxShadow: `0 0 28px ${palette.glow1}` }}
              >
                <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ boxShadow: `0 0 0 1px ${palette.primary}55, 0 0 30px ${palette.glow1}` }} />
                Request Demo
              </a>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white/85 transition-colors hover:bg-white/[0.08]"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
