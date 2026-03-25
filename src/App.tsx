import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ResumeForm } from "./components/ResumeForm";
import { ResumePreview } from "./components/ResumePreview";
import { TemplateSelector } from "./components/TemplateSelector";
import { ResumeData, TemplateType } from "./types";
import { LandingPage } from "./components/LandingPage";
import { FeaturesPage } from "./components/FeaturesPage";
import { FileText, Check, Palette } from "lucide-react";
import "./App.css";

const ACCENT_COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f43f5e",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#64748b",
];

const initialData: ResumeData = {
  personalInfo: {
    fullName: "",
    profilePicture: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
};

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateType>("classic");
  const [accentColor, setAccentColor] = useState("#6366f1");
  const [zoom, setZoom] = useState(0.55);
  const [saved, setSaved] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const navigate = useNavigate();

  // Load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("resumeBuilderData");
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch {}
    }
    const savedTemplate = localStorage.getItem("resumeBuilderTemplate");
    if (savedTemplate) setSelectedTemplate(savedTemplate as TemplateType);
    const savedAccent = localStorage.getItem("resumeBuilderAccent");
    if (savedAccent) setAccentColor(savedAccent);
  }, []);

  // Auto-save with indicator
  const autoSave = useCallback(() => {
    localStorage.setItem("resumeBuilderData", JSON.stringify(resumeData));
    localStorage.setItem("resumeBuilderTemplate", selectedTemplate);
    localStorage.setItem("resumeBuilderAccent", accentColor);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }, [resumeData, selectedTemplate, accentColor]);

  useEffect(() => {
    const timer = setTimeout(autoSave, 800);
    return () => clearTimeout(timer);
  }, [autoSave]);

  // Apply accent color as CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accentColor);
  }, [accentColor]);

  const Builder = () => (
    <div className="app-root">
      {/* ── HEADER ── */}
      <header className="app-header no-print">
        <div className="header-left">
          <div
            className="logo-mark cursor-pointer"
            onClick={() => navigate("/")}
          >
            <FileText size={22} />
          </div>
          <h1
            className="logo-text cursor-pointer"
            onClick={() => navigate("/")}
          >
            Make Resume
          </h1>
          {saved && (
            <span className="save-badge">
              <Check size={13} /> Saved
            </span>
          )}
        </div>
        <div className="header-right">
          {/* Accent color */}
          <div className="accent-picker-wrap">
            <button
              className="icon-btn"
              onClick={() => setShowColorPicker(!showColorPicker)}
              title="Accent Color"
            >
              <Palette size={18} />
              <span className="color-dot" style={{ background: accentColor }} />
            </button>
            {showColorPicker && (
              <div className="accent-dropdown">
                {ACCENT_COLORS.map((c) => (
                  <button
                    key={c}
                    className={`color-swatch ${accentColor === c ? "active" : ""}`}
                    style={{ background: c }}
                    onClick={() => {
                      setAccentColor(c);
                      setShowColorPicker(false);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
          />
        </div>
      </header>

      {/* ── MAIN SPLIT ── */}
      <main className="app-main">
        {/* LEFT: Form */}
        <aside className="panel-form no-print">
          <ResumeForm data={resumeData} updateData={setResumeData} />
        </aside>

        {/* RIGHT: Preview */}
        <section className="panel-preview no-print">
          <ResumePreview
            data={resumeData}
            selectedTemplate={selectedTemplate}
            accentColor={accentColor}
            zoom={zoom}
            onZoomChange={setZoom}
          />
        </section>
      </main>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/builder" element={<Builder />} />
    </Routes>
  );
}

export default App;
