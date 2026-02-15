export const easeInOut = [0.22, 1, 0.36, 1];
export const easeExecutive = [0.4, 0, 0.2, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeExecutive },
  },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

export const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeExecutive, delay },
  },
});

export const underlineReveal = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: easeExecutive },
  },
};

export const gentleFloat = {
  initial: { y: 0 },
  animate: { y: [0, -3, 0], transition: { duration: 6, ease: "easeInOut", repeat: Infinity } },
};
