import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import ScrollText from "../components/ScrollText.jsx";

const ease = [0.4, 0, 0.2, 1];

/* ── domain-specific accent palettes ────────────────────────── */
const accentMap = {
  finance: {
    primary: "#3b82f6",
    secondary: "#06b6d4",
    glow1: "rgba(59,130,246,0.22)",
    glow2: "rgba(6,182,212,0.14)",
    gradient: "from-blue-500 to-cyan-400",
    gradientCSS: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    bgRadial:
      "radial-gradient(circle at 15% 12%, rgba(59,130,246,0.24), transparent 55%), radial-gradient(circle at 78% 68%, rgba(6,182,212,0.16), transparent 58%)",
    ring: "ring-blue-400/40",
    cardHover: "rgba(59,130,246,0.08)",
  },
  growth: {
    primary: "#8b5cf6",
    secondary: "#ec4899",
    glow1: "rgba(139,92,246,0.22)",
    glow2: "rgba(236,72,153,0.14)",
    gradient: "from-violet-500 to-pink-400",
    gradientCSS: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    bgRadial:
      "radial-gradient(circle at 15% 12%, rgba(139,92,246,0.24), transparent 55%), radial-gradient(circle at 78% 68%, rgba(236,72,153,0.16), transparent 58%)",
    ring: "ring-violet-400/40",
    cardHover: "rgba(139,92,246,0.08)",
  },
  services: {
    primary: "#f59e0b",
    secondary: "#f97316",
    glow1: "rgba(245,158,11,0.22)",
    glow2: "rgba(249,115,22,0.14)",
    gradient: "from-amber-500 to-orange-400",
    gradientCSS: "linear-gradient(135deg, #f59e0b, #f97316)",
    bgRadial:
      "radial-gradient(circle at 15% 12%, rgba(245,158,11,0.22), transparent 55%), radial-gradient(circle at 78% 68%, rgba(249,115,22,0.14), transparent 58%)",
    ring: "ring-amber-400/40",
    cardHover: "rgba(245,158,11,0.08)",
  },
  retail: {
    primary: "#10b981",
    secondary: "#14b8a6",
    glow1: "rgba(16,185,129,0.22)",
    glow2: "rgba(20,184,166,0.14)",
    gradient: "from-emerald-500 to-teal-400",
    gradientCSS: "linear-gradient(135deg, #10b981, #14b8a6)",
    bgRadial:
      "radial-gradient(circle at 15% 12%, rgba(16,185,129,0.24), transparent 55%), radial-gradient(circle at 78% 68%, rgba(20,184,166,0.16), transparent 58%)",
    ring: "ring-emerald-400/40",
    cardHover: "rgba(16,185,129,0.08)",
  },
  risk: {
    primary: "#ef4444",
    secondary: "#f97316",
    glow1: "rgba(239,68,68,0.22)",
    glow2: "rgba(249,115,22,0.14)",
    gradient: "from-red-500 to-orange-400",
    gradientCSS: "linear-gradient(135deg, #ef4444, #f97316)",
    bgRadial:
      "radial-gradient(circle at 15% 12%, rgba(239,68,68,0.22), transparent 55%), radial-gradient(circle at 78% 68%, rgba(249,115,22,0.14), transparent 58%)",
    ring: "ring-red-400/40",
    cardHover: "rgba(239,68,68,0.08)",
  },
  operations: {
    primary: "#06b6d4",
    secondary: "#3b82f6",
    glow1: "rgba(6,182,212,0.22)",
    glow2: "rgba(59,130,246,0.14)",
    gradient: "from-cyan-500 to-blue-400",
    gradientCSS: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    bgRadial:
      "radial-gradient(circle at 15% 12%, rgba(6,182,212,0.24), transparent 55%), radial-gradient(circle at 78% 68%, rgba(59,130,246,0.16), transparent 58%)",
    ring: "ring-cyan-400/40",
    cardHover: "rgba(6,182,212,0.08)",
  },
};

const defaultAccent = accentMap.finance;

/* ── domain data ────────────────────────────────────────────── */
const domains = {
  finance: {
    title: "Finance & FP&A",
    image: "/DOMAINS_WE_WORK_ACROSS/Finance_FP&A.webp",
    subheading:
      "Decision-grade financial intelligence for CFOs and enterprise finance teams—built for trust, speed, and accountability.",
    heroLine:
      "From reporting to operating rhythm: metrics, ownership, and decision cadence.",
    outcomes: [
      {
        title: "Forecast Confidence",
        text: "Scenario-ready models that leaders can defend and act on.",
        icon: "M3 10h4l3-7 4 14 3-7h4",
      },
      {
        title: "Margin Clarity",
        text: "Unit economics and profitability visibility across products and segments.",
        icon: "M12 2v10l5 5M12 12l-5 5",
      },
      {
        title: "Spend Control",
        text: "Cost drivers, variance, and accountability—without spreadsheet debt.",
        icon: "M9 14l-4 4m0 0h4m-4 0v-4m11-7a2 2 0 11-4 0 2 2 0 014 0z",
      },
    ],
    build: [
      {
        title: "KPI System",
        text: "Definitions, owners, hierarchies, and executive narratives.",
      },
      {
        title: "Finance Data Model",
        text: "Clean, governed layers aligned to close, plan, and forecast.",
      },
      {
        title: "Executive Dashboards",
        text: 'Board-ready views with drill paths that answer "why" fast.',
      },
    ],
  },
  growth: {
    title: "Marketing & Growth Analytics",
    image: "/DOMAINS_WE_WORK_ACROSS/Marketing_Growth.webp",
    subheading:
      "Performance analytics that connects spend to measurable growth outcomes—so leaders can scale what works.",
    heroLine:
      "Attribution you can explain. Metrics you can manage. Experiments you can trust.",
    outcomes: [
      {
        title: "ROI Visibility",
        text: "Spend-to-outcome traceability across channels and journeys.",
        icon: "M12 8c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5zm0-4v2m0 14v2m8-8h-2M6 12H4",
      },
      {
        title: "Retention Lift",
        text: "Cohort and lifecycle insights that improve conversion and LTV.",
        icon: "M13 17V7m-2 10V3M7 17v-4m10 4V9",
      },
      {
        title: "Faster Decisions",
        text: "A single source of truth for growth reporting and planning.",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
      },
    ],
    build: [
      {
        title: "Growth Data Layer",
        text: "Events + spend + revenue stitched into reliable pipelines.",
      },
      {
        title: "Measurement Framework",
        text: "North-star metrics, guardrails, and experiment standards.",
      },
      {
        title: "Executive Views",
        text: "Performance rollups that connect strategy to execution.",
      },
    ],
  },
  services: {
    title: "Consulting & Services",
    image: "/DOMAINS_WE_WORK_ACROSS/Consulting_Services.webp",
    subheading:
      "Client-level performance systems for professional services organizations—visibility that improves margin and delivery.",
    heroLine:
      "Utilization, delivery, and profitability—connected into one operating view.",
    outcomes: [
      {
        title: "Utilization Accuracy",
        text: "Clear supply/demand visibility across teams and skills.",
        icon: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M12 14a4 4 0 100-8 4 4 0 000 8z",
      },
      {
        title: "Margin Improvement",
        text: "Engagement profitability with early signals and guardrails.",
        icon: "M12 8c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5zm0-4v2m0 14v2m8-8h-2M6 12H4",
      },
      {
        title: "Delivery Control",
        text: "SLA and throughput visibility with actionable drill paths.",
        icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      },
    ],
    build: [
      {
        title: "Engagement Model",
        text: "Client/project structures aligned to billing and delivery reality.",
      },
      {
        title: "KPI Operating Rhythm",
        text: "Weekly leadership views and accountability by owner.",
      },
      {
        title: "Delivery Dashboards",
        text: "Executive + manager layers with consistent definitions.",
      },
    ],
  },
  retail: {
    title: "Retail & CPG",
    image: "/DOMAINS_WE_WORK_ACROSS/Retail_CPG.webp",
    subheading:
      "Demand, pricing, and supply intelligence across channels—so teams can move faster with less volatility.",
    heroLine:
      "From shelves to supply: unify demand signals, pricing levers, and inventory truth.",
    outcomes: [
      {
        title: "Demand Signal Clarity",
        text: "Planning inputs that reduce noise and improve accuracy.",
        icon: "M3 10h4l3-7 4 14 3-7h4",
      },
      {
        title: "Pricing Insight",
        text: "Promo and pricing impact visibility across channels.",
        icon: "M7 17V9M12 17V7M17 17v-5M6 19h12",
      },
      {
        title: "Inventory Balance",
        text: "Better availability and lower working-capital drag.",
        icon: "M20 7l-8 4-8-4m16 0v10l-8 4m8-14L12 3 4 7m0 0v10l8 4",
      },
    ],
    build: [
      {
        title: "Channel Intelligence",
        text: "Store, ecom, and distributor signals harmonized for decisions.",
      },
      {
        title: "Supply Visibility",
        text: "Lead times, fill rates, and service levels in one view.",
      },
      {
        title: "Decision Dashboards",
        text: "Clear levers for merchandising, pricing, and planning teams.",
      },
    ],
  },
  risk: {
    title: "Risk & Compliance",
    image: "/DOMAINS_WE_WORK_ACROSS/Risk_Compliance.webp",
    subheading:
      "Governance-first analytics systems for regulated environments—built to withstand scrutiny, not just produce charts.",
    heroLine:
      "Reliable reporting is a control. Good analytics is a risk reducer.",
    outcomes: [
      {
        title: "Audit Readiness",
        text: "Traceable definitions, lineage awareness, and controlled access.",
        icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      },
      {
        title: "Operational Risk Signals",
        text: "Early warnings surfaced through consistent monitoring.",
        icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
      },
      {
        title: "Confidence in Reporting",
        text: "Standardized metrics and governed delivery workflows.",
        icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
      },
    ],
    build: [
      {
        title: "Governed Data Layers",
        text: "Role-based access, quality checks, and policy alignment.",
      },
      {
        title: "Compliance Reporting",
        text: "Repeatable, explainable reports with consistent definitions.",
      },
      {
        title: "Control Narratives",
        text: "What is measured, why it matters, and who owns it.",
      },
    ],
  },
  operations: {
    title: "Operations",
    image: "/DOMAINS_WE_WORK_ACROSS/Operations.webp",
    subheading:
      "Process visibility and KPI frameworks that improve execution—so leaders can remove friction and scale throughput.",
    heroLine: "Measure flow, not activity. Improve systems, not dashboards.",
    outcomes: [
      {
        title: "Throughput Visibility",
        text: "Cycle time and bottleneck insight tied to outcomes.",
        icon: "M13 17V7m-2 10V3M7 17v-4m10 4V9",
      },
      {
        title: "KPI Accountability",
        text: "Owner-based metrics that drive operating behavior.",
        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      },
      {
        title: "Execution Quality",
        text: "Consistency, predictability, and fewer escalations.",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
      },
    ],
    build: [
      {
        title: "Operational Data Model",
        text: "Events and process steps mapped into a decision-ready layer.",
      },
      {
        title: "KPI Framework",
        text: "Inputs, outputs, and leading indicators aligned to goals.",
      },
      {
        title: "Execution Dashboards",
        text: "Leader + team views with reliable drill paths.",
      },
    ],
  },
};

/* ── animated illustration ──────────────────────────────────── */
function Illustration({ accent }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: accent.bgRadial }}
      />
      {/* subtle animated mesh */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        style={{
          backgroundImage: `linear-gradient(${accent.primary}66 1px, transparent 1px), linear-gradient(90deg, ${accent.primary}66 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(circle at 50% 50%, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, black 0%, transparent 70%)",
        }}
      />
      <svg viewBox="0 0 520 320" className="relative h-[260px] w-full">
        <defs>
          <linearGradient id="dpStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={accent.primary} stopOpacity="0.95" />
            <stop offset="1" stopColor={accent.secondary} stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="dpFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={accent.primary} stopOpacity="0.12" />
            <stop offset="1" stopColor={accent.secondary} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* area fill under curve */}
        <motion.path
          d="M40 220 C 120 120, 210 260, 290 170 S 430 190, 480 120 L 480 300 L 40 300 Z"
          fill="url(#dpFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
        />

        {[
          "M40 220 C 120 120, 210 260, 290 170 S 430 190, 480 120",
          "M30 140 C 120 110, 190 160, 260 120 S 380 110, 480 150",
        ].map((d) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="url(#dpStroke)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.5 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease, delay: 0.15 }}
          />
        ))}

        {[
          [92, 195],
          [170, 155],
          [260, 120],
          [338, 160],
          [418, 132],
        ].map(([cx, cy]) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="5"
            fill={accent.primary}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0.5, 0.9, 0.5],
              scale: [0.96, 1.1, 0.96],
            }}
            transition={{
              duration: 3.2,
              ease: "easeInOut",
              repeat: Infinity,
              delay: cx * 0.001,
            }}
          />
        ))}

        {/* animated data points */}
        {[
          [92, 195],
          [260, 120],
          [418, 132],
        ].map(([cx, cy]) => (
          <motion.circle
            key={`ring-${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="12"
            fill="none"
            stroke={accent.primary}
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0.8, 1.6, 0.8],
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              delay: cx * 0.002,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ── floating particles background ──────────────────────────── */
function FloatingParticles({ accent }) {
  const particles = Array.from({ length: 20 }, (_, i) => {
    const seed = [13, 29, 7, 41, 19, 37, 11, 23, 17, 31, 43, 5, 47, 2, 53, 3, 61, 59, 67, 71];
    const a = seed[i % seed.length];
    const b = seed[(i + 7) % seed.length];
    return {
      id: i,
      left: (a * (i + 3) * 7) % 100,
      top: (b * (i + 2) * 9) % 100,
      size: 2 + (a % 3),
      duration: 10 + (b % 12),
      delay: (a % 8) * 0.4,
    };
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: accent.primary,
            opacity: 0.12,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.08, 0.2, 0.08],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

/* ── main page ──────────────────────────────────────────────── */
export default function DomainPage() {
  const { slug } = useParams();
  const domain = domains[slug] ?? null;
  const accent = accentMap[slug] ?? defaultAccent;
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  if (!domain) {
    return (
      <div className="min-h-screen bg-ink-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-sm font-semibold tracking-[0.24em] text-white/70">
            DOMAIN
          </div>
          <div className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
            Not Found
          </div>
          <div className="mt-6 text-base text-white/70">
            This domain page does not exist. Choose a domain from the homepage.
          </div>
          <div className="mt-10">
            <Link
              to="/#industries"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
            >
              Back to Domains
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const staggerCards = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const cardUp = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease },
    },
  };

  return (
    <div className="min-h-screen bg-ink-950 text-white">
      {/* Background layers */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: accent.bgRadial }}
      />
      <FloatingParticles accent={accent} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundPosition: ["0px 0px", "84px 84px"] }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "84px 84px",
            backgroundPosition: "0 0",
            maskImage:
              "radial-gradient(circle at 45% 18%, black 0%, transparent 58%)",
            WebkitMaskImage:
              "radial-gradient(circle at 45% 18%, black 0%, transparent 58%)",
          }}
        />
      </div>

      {/* Top nav bar */}
      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center justify-between rounded-2xl border border-white/10 bg-ink-950/60 px-4 py-3 backdrop-blur-xl md:px-6"
        >
          <Link
            to="/#industries"
            className="group flex items-center gap-2 text-sm font-semibold tracking-wide text-white/85 transition-colors hover:text-white"
          >
            <motion.span
              className="inline-block"
              whileHover={{ x: -3 }}
              transition={{ duration: 0.2 }}
            >
              ←
            </motion.span>
            Back to Domains
          </Link>
          <Link
            to="/#contact"
            className="group relative inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg"
            style={{
              background: accent.gradientCSS,
              boxShadow: `0 0 20px ${accent.glow1}`,
            }}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 transition-opacity duration-300 group-hover:opacity-100"
              style={{ boxShadow: `0 0 0 1px ${accent.primary}88` }}
            />
            Talk to our team
          </Link>
        </motion.div>
      </div>

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        style={{ y: heroY }}
        className="relative mx-auto max-w-6xl px-6 pb-24 pt-10 md:pt-14"
      >
        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            {/* eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: accent.gradientCSS }}
              />
              <span className="text-xs font-semibold tracking-[0.22em] text-white/70">
                DOMAIN
              </span>
            </motion.div>

            {/* title with gradient accent */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.15 }}
              className="mt-5 text-balance text-4xl font-semibold tracking-[-0.03em] md:text-6xl"
            >
              <span className="bg-clip-text" style={{ color: "white" }}>
                {domain.title.split(" ")[0]}{" "}
              </span>
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: accent.gradientCSS }}
              >
                {domain.title.split(" ").slice(1).join(" ")}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.25 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"
            >
              {domain.subheading}
            </motion.div>

            {/* hero line card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.35 }}
              className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse at 0% 0%, ${accent.glow1}, transparent 60%)`,
                }}
              />
              <div className="relative text-sm font-semibold tracking-tight text-white/90">
                {domain.heroLine}
              </div>
              <div
                className="relative mt-4 h-px w-full"
                style={{
                  background: `linear-gradient(to right, transparent, ${accent.primary}88, ${accent.secondary}66, transparent)`,
                }}
              />
              <div className="relative mt-5 text-sm leading-relaxed text-white/70">
                We design systems that make the right decision easy: trusted
                data foundations, clear KPI definitions, and executive-ready
                analytics that holds up under scrutiny.
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <div
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background: `linear-gradient(135deg, ${accent.glow1}, transparent 60%), linear-gradient(to top, rgba(7,11,20,0.6) 0%, transparent 40%)`,
                }}
              />
              <motion.img
                src={domain.image}
                alt={domain.title}
                className="h-full w-full object-cover"
                style={{ minHeight: 280 }}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Outcomes Section */}
      <div className="relative mx-auto max-w-6xl px-6 pb-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerCards}
        >
          <ScrollText
            as="div"
            text="OUTCOMES"
            blur={4}
            distance={10}
            className="text-sm font-semibold tracking-[0.22em] text-white/70"
          />
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {domain.outcomes.map((o, i) => (
              <motion.div
                key={o.title}
                variants={cardUp}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-shadow duration-300"
                style={{
                  boxShadow: "0 0 0 0 transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 8px 40px ${accent.glow1}, 0 0 0 1px ${accent.primary}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 0 transparent";
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse at 20% 20%, ${accent.glow1}, transparent 60%)`,
                  }}
                />

                {/* icon */}
                {o.icon && (
                  <div
                    className="relative mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
                    style={{
                      boxShadow: `0 0 16px ${accent.glow1}`,
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <motion.path
                        d={o.icon}
                        stroke={accent.primary}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          ease,
                          delay: 0.2 + i * 0.1,
                        }}
                      />
                    </svg>
                  </div>
                )}

                <div className="relative text-lg font-semibold tracking-tight">
                  {o.title}
                </div>
                <div className="relative mt-3 text-sm leading-relaxed text-white/70">
                  {o.text}
                </div>

                {/* bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(to right, transparent, ${accent.primary}, ${accent.secondary}, transparent)`,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: 0.3 + i * 0.08 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* What We Build Section */}
      <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerCards}
        >
          <ScrollText
            as="div"
            text="WHAT WE BUILD"
            blur={4}
            distance={10}
            className="text-sm font-semibold tracking-[0.22em] text-white/70"
          />
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {domain.build.map((b, i) => (
              <motion.div
                key={b.title}
                variants={cardUp}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl"
              >
                {/* gradient overlay on hover */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-white/0 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-30"
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${accent.primary}33`,
                    borderRadius: "1rem",
                  }}
                />

                {/* step number badge */}
                <div
                  className="relative mb-4 flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
                  style={{ background: accent.gradientCSS }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="relative text-lg font-semibold tracking-tight">
                  {b.title}
                </div>
                <div className="relative mt-3 text-sm leading-relaxed text-white/70">
                  {b.text}
                </div>

                {/* hover bottom line */}
                <div
                  className="pointer-events-none relative mt-6 h-px w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(to right, transparent, ${accent.primary}44, transparent)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl md:p-12"
        >
          {/* background glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              background: `radial-gradient(ellipse at 20% 30%, ${accent.glow1}, transparent 60%), radial-gradient(ellipse at 80% 70%, ${accent.glow2}, transparent 60%)`,
            }}
          />

          {/* animated border shimmer */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%, transparent 0%, ${accent.primary}22 25%, transparent 50%, ${accent.secondary}22 75%, transparent 100%)`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          />

          <div className="relative">
            <ScrollText
              as="div"
              text="NEXT STEP"
              blur={4}
              distance={10}
              className="text-sm font-semibold tracking-[0.22em] text-white/70"
            />
            <ScrollText
              as="div"
              text="Ready to make this domain decision-ready?"
              lineAnime
              blur={10}
              distance={14}
              staggerChildren={0.05}
              className="mt-4 text-balance text-2xl font-semibold tracking-[-0.02em] md:text-3xl"
            />
            <ScrollText
              as="div"
              text="We align stakeholders, define metrics that matter, and build analytics systems designed for adoption."
              blur={6}
              distance={10}
              className="mt-5 max-w-2xl text-base leading-relaxed text-white/70"
            />
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://calendly.com/deepak-teja/introduction"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg"
                style={{
                  background: accent.gradientCSS,
                  boxShadow: `0 0 24px ${accent.glow1}`,
                }}
              >
                <span
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow: `0 0 0 1px ${accent.primary}55, 0 0 30px ${accent.glow1}`,
                  }}
                />
                Book a Strategy Call
              </a>
              <Link
                to="/#industries"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
              >
                Explore Other Domains
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
