import { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Hero from "../components/landing/Hero.jsx";
import WhatWeDo from "../components/landing/WhatWeDo.jsx";
import CapabilitiesGrid from "../components/landing/CapabilitiesGrid.jsx";
import TechnologyPlatforms from "../components/landing/TechnologyPlatforms.jsx";
import IndustriesGrid from "../components/landing/IndustriesGrid.jsx";
import ApproachSection from "../components/landing/ApproachSection.jsx";
import WhyGateway from "../components/landing/WhyGateway.jsx";
import CTASection from "../components/landing/CTASection.jsx";
import { easeInOut } from "../components/landing/motion.js";

const ease = [0.4, 0, 0.2, 1];

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "How We Work", href: "#platforms" },
  { label: "Core Capabilities", href: "#capabilities" },
  { label: "Domains", href: "#industries" },
  { label: "Our Approach", href: "#approach" },
  { label: "Why Us", href: "#why" },
  { label: "Contact", href: "#contact" },
];

const NAV_LOGO_SRC = "/logo-icon.png";
const FOOTER_LOGO_SRC = "/Original_Gateway_Analytics_AI_Logo.png";

/* ── smooth-scroll helper ──────────────────────────────────── */
function smoothScrollTo(hash) {
  if (hash === "#hero") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: "smooth" });
}

/* ── hamburger icon ────────────────────────────────────────── */
function HamburgerIcon({ open }) {
  return (
    <div className="flex h-5 w-5 flex-col items-center justify-center gap-[5px]">
      <motion.span
        className="block h-[2px] w-5 rounded-full bg-white/80"
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease }}
      />
      <motion.span
        className="block h-[2px] w-5 rounded-full bg-white/80"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-[2px] w-5 rounded-full bg-white/80"
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease }}
      />
    </div>
  );
}

export default function LandingPage() {
  const [navHidden, setNavHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const scrollTimerRef = useRef(null);
  const isScrollingRef = useRef(false);

  /* ── scroll progress ─── */
  const { scrollYProgress } = useScroll();

  /* ── detect scroll past threshold ─── */
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrolled(v > 0.01);
  });

  /* ── hide navbar while scrolling, show when stopped ─── */
  useEffect(() => {
    const onScroll = () => {
      // at the very top of the page → always show
      if (window.scrollY < 60) {
        setNavHidden(false);
        isScrollingRef.current = false;
        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
        return;
      }
      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        setNavHidden(true);
      }
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        setNavHidden(false);
      }, 250);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  /* ── active section detection via IntersectionObserver ─── */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (window.scrollY < 300) {
              setActiveSection("");
            } else {
              setActiveSection(`#${id}`);
            }
          }
        },
        { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── smooth-scroll click handler ─── */
  const handleNavClick = useCallback(
    (e, href) => {
      e.preventDefault();
      smoothScrollTo(href);
      setMobileMenuOpen(false);
    },
    []
  );

  /* ── lock body scroll when mobile menu open ─── */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-ink-950 text-white">
      {/* ── NAVBAR ────────────────────────────────────────────── */}
      <motion.div
        ref={navRef}
        initial={false}
        animate={navHidden ? { y: -80, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: easeInOut }}
        className="fixed inset-x-0 top-4 z-50 px-4"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="mx-auto max-w-6xl">
          <div
            className="relative flex items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-500 md:px-6"
            style={{
              borderColor: scrolled
                ? "rgba(255,255,255,0.12)"
                : "rgba(255,255,255,0.08)",
              background: scrolled
                ? "rgba(11,15,26,0.85)"
                : "rgba(11,15,26,0.55)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: scrolled
                ? "0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.06) inset"
                : "none",
            }}
          >
            {/* scroll progress bar */}
            <motion.div
              className="absolute bottom-0 left-4 right-4 h-[2px] origin-left rounded-full"
              style={{
                scaleX: scrollYProgress,
                background:
                  "linear-gradient(90deg, #3b82f6, #06b6d4, #8b5cf6)",
              }}
            />

            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group flex items-center"
            >
              <img
                src={NAV_LOGO_SRC}
                alt="Gateway Analytics AI"
                className="h-9 w-auto object-contain transition-opacity group-hover:opacity-80"
              />
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200"
                    style={{
                      color: isActive
                        ? "rgba(255,255,255,1)"
                        : "rgba(255,255,255,0.6)",
                    }}
                  >
                    {/* active indicator pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(6,182,212,0.10))",
                          border: "1px solid rgba(59,130,246,0.2)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Desktop CTA + Mobile Menu Button */}
            <div className="flex items-center gap-3">
              <a
                href="https://calendly.com/deepak-teja/introduction"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative hidden items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg md:inline-flex"
                style={{
                  background:
                    "linear-gradient(135deg, #3b82f6, #2563eb)",
                  boxShadow: "0 0 20px rgba(59,130,246,0.2)",
                }}
              >
                <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-blue-400/55 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative">Book a Strategy Call</span>
              </a>

              {/* Hamburger (mobile only) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-colors hover:bg-white/[0.08] md:hidden"
                aria-label="Toggle menu"
              >
                <HamburgerIcon open={mobileMenuOpen} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── MOBILE MENU OVERLAY ──────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-ink-950/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* slide-down panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.35, ease }}
              className="fixed inset-x-4 top-24 z-50 overflow-hidden rounded-2xl border border-white/10 bg-ink-950/95 p-6 shadow-2xl backdrop-blur-xl"
            >
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        ease,
                        delay: 0.05 + i * 0.06,
                      }}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors"
                      style={{
                        color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                        background: isActive
                          ? "rgba(59,130,246,0.12)"
                          : "transparent",
                      }}
                    >
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                      )}
                      {link.label}
                    </motion.a>
                  );
                })}
              </nav>

              <div className="mt-5 border-t border-white/10 pt-5">
                <a
                  href="https://calendly.com/deepak-teja/introduction"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:from-blue-500 hover:to-blue-400"
                >
                  Book a Strategy Call
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── PAGE SECTIONS ────────────────────────────────────── */}
      <Hero />
      <WhatWeDo />
      <CapabilitiesGrid />
      <TechnologyPlatforms />
      <IndustriesGrid />
      <ApproachSection />
      <WhyGateway />
      <CTASection />

      <footer className="border-t border-white/10 bg-ink-950">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-12">
          {/* Top row: Logo + Nav + Social */}
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src={FOOTER_LOGO_SRC}
                alt="Gateway Analytics AI"
                className="h-10 w-auto object-contain"
              />
            </div>

            {/* Nav Links */}
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70">
              {NAV_LINKS.filter((l) => l.href !== "#industries").map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/gateway_workforce/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/gateway-workforce/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/people/Gateway-Workforce/61572421263740/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-8 border-t border-white/[0.06]" />

          {/* Copyright + Attribution */}
          <div className="mt-6 flex flex-col items-center gap-2 text-sm text-white/40">
            <div>&copy; 2026 Gateway Global Workforce, All rights reserved</div>
            <div className="flex items-center gap-3">
              <span>
                Images designed by{" "}
                <a
                  href="https://www.freepik.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 underline underline-offset-2 transition-colors hover:text-white/70"
                >
                  Freepik
                </a>
              </span>
              <span className="text-white/20">|</span>
              <Link
                to="/credits"
                className="text-white/50 underline underline-offset-2 transition-colors hover:text-white/70"
              >
                Image Credits
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
