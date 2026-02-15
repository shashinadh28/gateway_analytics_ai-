import { motion } from "framer-motion";
import ScrollText from "../ScrollText.jsx";
import { stagger, underlineReveal } from "./motion.js";

export default function SectionWrapper({
  id,
  variant = "dark",
  eyebrow,
  title,
  description,
  underline = true,
  children,
}) {
  const isLight = variant === "light";
  const isMid = variant === "mid";
  const isGlass = variant === "glass";

  return (
    <section
      id={id}
      className={[
        "relative overflow-hidden",
        isLight
          ? "bg-slate-50 text-slate-900"
          : isMid
            ? "bg-[linear-gradient(180deg,#0F1C2F_0%,#0B1220_100%)] text-white"
            : isGlass
              ? "bg-[linear-gradient(180deg,#0B1220_0%,#0F1C2F_100%)] text-white"
              : "bg-[linear-gradient(180deg,#0B1220_0%,#0F1C2F_100%)] text-white",
      ].join(" ")}
    >
      {!isLight ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(47,128,237,0.18),transparent_55%),radial-gradient(circle_at_75%_55%,rgba(0,194,255,0.12),transparent_58%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.055]">
            <motion.div
              className="absolute inset-0"
              animate={{ backgroundPosition: ["0px 0px", "72px 72px"] }}
              transition={{ duration: 38, ease: "linear", repeat: Infinity }}
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
                backgroundSize: "72px 72px",
                backgroundPosition: "0 0",
                maskImage: "radial-gradient(circle at 35% 25%, black 0%, transparent 58%)",
                WebkitMaskImage: "radial-gradient(circle at 35% 25%, black 0%, transparent 58%)",
              }}
            />
          </div>
          {isGlass ? (
            <div className="pointer-events-none absolute inset-0 bg-white/[0.02] backdrop-blur-[1px]" />
          ) : null}
        </>
      ) : null}

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-x-0 top-0 h-16",
          isLight ? "bg-gradient-to-b from-ink-950/10 to-transparent" : "bg-gradient-to-b from-black/0 to-transparent",
        ].join(" ")}
      />
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-x-0 bottom-0 h-20",
          isLight ? "bg-gradient-to-t from-ink-950/6 to-transparent" : "bg-gradient-to-t from-black/0 to-transparent",
        ].join(" ")}
      />

      <div className="mx-auto max-w-6xl px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.1)}
        >
          {(eyebrow || title || description) && (
            <div className="relative max-w-3xl">
              {!isLight ? (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10 rounded-[36px] bg-[radial-gradient(circle_at_20%_30%,rgba(47,128,237,0.26),transparent_60%),radial-gradient(circle_at_70%_50%,rgba(0,194,255,0.14),transparent_62%)] blur-2xl"
                />
              ) : null}
              {eyebrow ? (
                <ScrollText
                  useParent
                  as="p"
                  text={eyebrow}
                  blur={7}
                  distance={14}
                  className={[
                    "text-sm font-semibold tracking-wider uppercase",
                    isLight ? "text-slate-600" : "text-white/70",
                  ].join(" ")}
                />
              ) : null}
              {title ? (
                <div className="mt-4">
                  <ScrollText
                    useParent
                    as="h2"
                    text={title}
                    lineAnime
                    blur={10}
                    distance={18}
                    staggerChildren={0.055}
                    className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl"
                  />
                  {underline ? (
                    <motion.div
                      variants={underlineReveal}
                      className={[
                        "mt-4 h-px origin-left",
                        isLight
                          ? "bg-gradient-to-r from-blue-600/0 via-blue-600/35 to-blue-600/0"
                          : "bg-gradient-to-r from-blue-600/0 via-blue-500/70 to-cyan-400/0",
                      ].join(" ")}
                    />
                  ) : null}
                </div>
              ) : null}
              {description ? (
                <ScrollText
                  useParent
                  as="p"
                  text={description}
                  blur={6}
                  distance={12}
                  className={[
                    "mt-5 text-base leading-relaxed md:text-lg",
                    isLight ? "text-slate-600" : "text-white/70",
                  ].join(" ")}
                />
              ) : null}
            </div>
          )}
          <div className="mt-12">{children}</div>
        </motion.div>
      </div>
    </section>
  );
}
