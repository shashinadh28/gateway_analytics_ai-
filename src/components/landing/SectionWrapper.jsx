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

  return (
    <section
      id={id}
      className={[
        "relative overflow-hidden",
        isLight
          ? "bg-slate-50 text-slate-900"
          : "bg-ink-950 text-white",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.1)}
        >
          {(eyebrow || title || description) && (
            <div className="relative max-w-3xl">
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
                          ? "bg-slate-300"
                          : "bg-white/15",
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
                    isLight ? "text-slate-600" : "text-white/60",
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
