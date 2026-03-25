import React, { useState, useEffect } from "react";
import {
  FileText,

  Palette,

} from "lucide-react";
import { Link } from "react-router-dom";

const ACCENT_COLORS = [
  "#6366f1", // Indigo
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#f43f5e", // Rose
  "#f97316", // Orange
  "#eab308", // Yellow
  "#22c55e", // Green
  "#06b6d4", // Cyan
  "#3b82f6", // Blue
  "#ffffff", // White
];

export const LandingPage: React.FC = () => {
  const [heroColor, setHeroColor] = useState("#6366f1");
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClick = () => setShowColorPicker(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col font-sans scroll-smooth"
      style={{ backgroundColor: "var(--bg-app)", color: "var(--text-primary)" }}
    >
      {/* ── HEADER ── */}
      <header
        className="flex items-center justify-between px-5 md:px-10 py-4 border-b border-white/5 sticky top-0 z-50"
        style={{ backgroundColor: "var(--bg-panel)" }}
      >
        <div className="flex items-center gap-2 text-[18px] font-extrabold tracking-tight text-white">
          <FileText size={20} />
          <span>Make Resume</span>
        </div>
        <nav className="flex items-center gap-4 md:gap-6">
          {/* <button className="bg-transparent border-none text-white cursor-pointer flex items-center justify-center transition-opacity hover:opacity-70">
            <Lightbulb size={16} />
          </button> */}
          <Link
            to="/features"
            className="hidden md:block text-[#9494aa] hover:text-white no-underline text-[13px] font-medium transition-colors"
          >
            Features
          </Link>
          <Link
            to="/builder"
            className="text-white border-none rounded-full px-4 py-2 text-[13px] font-semibold cursor-pointer transition-colors no-underline inline-block"
            style={{ backgroundColor: heroColor }}
          >
            Make Resume
          </Link>
        </nav>
      </header>

      {/* ── HERO ── */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-5 py-24 md:py-32">
        <h1 className="text-[42px] md:text-[64px] font-extrabold tracking-tighter mb-4 max-w-[800px] leading-[1.1] text-white">
          Make Professional Resumes
        </h1>
        <p className="text-[16px] md:text-[18px] italic text-[#9494aa] mb-8 max-w-[600px]">
          Build standout resumes in minutes. Designed to help you land your
          dream job.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/builder"
            className="hover:-translate-y-0.5 text-white border-none rounded-full px-8 py-3 text-[16px] font-semibold cursor-pointer transition-transform duration-200 no-underline inline-block shadow-sm"
            style={{ backgroundColor: heroColor }}
          >
            Make Resume
          </Link>

          {/* Color Picker for Hero */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              className="flex items-center justify-center gap-2 text-white border border-white/10 rounded-full px-5 py-3 text-[14px] font-medium cursor-pointer transition-all duration-200 hover:border-white/30"
              style={{ backgroundColor: "var(--bg-card)" }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            >
              <Palette size={16} />
              Theme Color
            </button>

            {showColorPicker && (
              <div
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[240px] border border-white/10 rounded-xl shadow-2xl p-3 flex flex-wrap gap-2 z-50"
                style={{ backgroundColor: "var(--bg-panel)" }}
              >
                <div className="w-full text-left text-[11px] font-semibold text-[#9494aa] uppercase tracking-wider mb-1 px-1">
                  Choose Primary Color
                </div>
                {ACCENT_COLORS.map((c) => (
                  <button
                    key={c}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${heroColor === c ? "border-white" : "border-transparent"}`}
                    style={{ backgroundColor: c }}
                    onClick={() => {
                      setHeroColor(c);
                      setShowColorPicker(false);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer
        className="text-center p-8 text-[13px] text-[#5a5a72] border-t border-white/5"
        style={{ backgroundColor: "var(--bg-app)" }}
      >
        <p>Made with ❤️ by Aravind.</p>
      </footer>
    </div>
  );
};
