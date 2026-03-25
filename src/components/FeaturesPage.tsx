import React from "react";
import { Link } from "react-router-dom";
import { Layout, Zap, Download, FileText, ArrowLeft } from "lucide-react";

export const FeaturesPage: React.FC = () => {
  return (
    <div
      className="h-screen flex flex-col font-sans overflow-hidden"
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
        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-[#9494aa] hover:text-white no-underline text-[13px] font-medium transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <Link
            to="/builder"
            className="bg-[var(--accent)] hover:opacity-90 text-white border-none rounded-full px-4 py-2 text-[13px] font-semibold cursor-pointer transition-opacity no-underline inline-block"
          >
            Make Resume
          </Link>
        </nav>
      </header>

      {/* ── FEATURES SECTION ── */}
      <main className="flex-1 flex flex-col items-center justify-center py-10 px-5">
        <div className="max-w-[1000px] mx-auto text-center">
          <h1 className="text-[36px] md:text-[52px] font-extrabold tracking-tight mb-4 text-white">
            Everything you need.
          </h1>
          <p className="text-[15px] md:text-[17px] text-[#9494aa] mb-10 max-w-[550px] mx-auto">
            Powerful features built specifically to make the resume creation
            process as seamless and professional as possible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="p-8 rounded-2xl shadow-sm border border-white/5 text-left flex flex-col items-start transition-transform hover:-translate-y-1"
              style={{ backgroundColor: "var(--bg-card)" }}
            >
              <div className="p-3 bg-white/5 rounded-xl mb-4 text-[var(--accent)]">
                <Layout size={24} />
              </div>
              <h3 className="text-[18px] font-bold mb-2 text-white">
                Premium Templates
              </h3>
              <p className="text-[14px] text-[#9494aa] leading-relaxed">
                Choose from Classic, Modern, and Executive templates engineered
                to pass ATS systems and catch recruiters' eyes.
              </p>
            </div>

            <div
              className="p-8 rounded-2xl shadow-sm border border-white/5 text-left flex flex-col items-start transition-transform hover:-translate-y-1"
              style={{ backgroundColor: "var(--bg-card)" }}
            >
              <div className="p-3 bg-white/5 rounded-xl mb-4 text-[var(--accent)]">
                <Zap size={24} />
              </div>
              <h3 className="text-[18px] font-bold mb-2 text-white">
                Real-Time Editing
              </h3>
              <p className="text-[14px] text-[#9494aa] leading-relaxed">
                Watch your resume build instantly as you type. A perfectly
                scaled A4 preview ensures what you see is what you print.
              </p>
            </div>

            <div
              className="p-8 rounded-2xl shadow-sm border border-white/5 text-left flex flex-col items-start transition-transform hover:-translate-y-1"
              style={{ backgroundColor: "var(--bg-card)" }}
            >
              <div className="p-3 bg-white/5 rounded-xl mb-4 text-[var(--accent)]">
                <Download size={24} />
              </div>
              <h3 className="text-[18px] font-bold mb-2 text-white">
                Instant Export
              </h3>
              <p className="text-[14px] text-[#9494aa] leading-relaxed">
                Download a pixel-perfect, printer-ready PDF in one click. Fully
                localized to your device with no watermarks.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer
        className="text-center p-6 text-[13px] text-[#5a5a72] border-t border-white/5"
        style={{ backgroundColor: "var(--bg-app)" }}
      >
        <p>Made with ❤️ by Aravind.</p>
      </footer>
    </div>
  );
};
