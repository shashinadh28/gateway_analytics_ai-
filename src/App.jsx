import { useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import IntroOverlay from "./components/IntroOverlay.jsx";
import DomainPage from "./pages/DomainPage.jsx";
import CreditsPage from "./pages/CreditsPage.jsx";

function ScrollManager() {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  /* Instant scroll to top on route change — fires before paint */
  useLayoutEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      window.scrollTo(0, 0);
    }
    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  /* Smooth scroll for same-page hash navigation */
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 60);
      }
    }
  }, [location.hash]);

  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <IntroOverlay />
      <ScrollManager />
      <Routes location={location}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/domains/:slug" element={<DomainPage />} />
        <Route path="/credits" element={<CreditsPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>

      {/* Fixed "Schedule 15 Min Call" button – bottom-right */}
      <motion.a
        href="https://calendly.com/deepak-teja/introduction"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-105 sm:px-6 sm:py-3.5"
        style={{
          background: "linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8)",
          boxShadow:
            "0 4px 24px rgba(59,130,246,0.35), 0 2px 8px rgba(0,0,0,0.25)",
        }}
      >
        {/* Calendar icon */}
        <svg
          className="h-4 w-4 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="hidden sm:inline">Schedule 15 Min Call</span>
        <span className="sm:hidden">Schedule Call</span>
      </motion.a>
    </>
  );
}
