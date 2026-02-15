import { motion } from "framer-motion";

const easeExecutive = [0.4, 0, 0.2, 1];

function getOffset(direction, distance) {
  if (direction === "down") return { y: -distance };
  if (direction === "left") return { x: distance };
  if (direction === "right") return { x: -distance };
  return { y: distance };
}

function defaultItemVariants({ direction, blur, distance, duration, ease }) {
  const offset = getOffset(direction, distance);
  return {
    hidden: { opacity: 0, filter: `blur(${blur}px)`, ...offset },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0,
      transition: { duration, ease },
    },
  };
}

function splitIntoWords(text) {
  return text.trim().split(/\s+/g);
}

function splitIntoChars(text) {
  return Array.from(text);
}

export default function ScrollText({
  text,
  as = "div",
  className = "",
  direction = "up",
  variants,
  letterAnime = false,
  lineAnime = false,
  useParent = false,
  once = true,
  amount = 0.35,
  blur = 10,
  distance = 20,
  duration = 0.6,
  staggerChildren = 0.04,
  delayChildren = 0,
}) {
  const Tag = motion[as] ?? motion.div;
  const itemVariants =
    variants ??
    defaultItemVariants({
      direction,
      blur,
      distance,
      duration,
      ease: easeExecutive,
    });

  const shouldSplit = letterAnime || lineAnime;

  const wrapperProps = useParent
    ? { variants: shouldSplit ? { hidden: {}, visible: { transition: { staggerChildren, delayChildren } } } : itemVariants }
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once, amount },
        variants: shouldSplit ? { hidden: {}, visible: { transition: { staggerChildren, delayChildren } } } : itemVariants,
      };

  if (!shouldSplit) {
    return (
      <Tag className={className} {...wrapperProps}>
        {text}
      </Tag>
    );
  }

  const segments = letterAnime ? splitIntoChars(text) : splitIntoWords(text);

  return (
    <Tag className={className} {...wrapperProps}>
      {segments.map((segment, idx) => {
        const key = `${segment}-${idx}`;
        if (letterAnime) {
          const isSpace = segment === " ";
          return (
            <motion.span
              key={key}
              variants={itemVariants}
              className="inline-block will-change-transform"
              style={{ whiteSpace: isSpace ? "pre" : "normal" }}
            >
              {isSpace ? "\u00A0" : segment}
            </motion.span>
          );
        }

        return (
          <motion.span key={key} variants={itemVariants} className="inline-block will-change-transform">
            {segment}
            {idx < segments.length - 1 ? "\u00A0" : ""}
          </motion.span>
        );
      })}
    </Tag>
  );
}

