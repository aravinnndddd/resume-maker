import React from "react";
import { TemplateType } from "../types";
import { Layout } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
}

const templates: { id: TemplateType; name: string }[] = [
  { id: "classic", name: "Classic" },
  { id: "modern", name: "Modern" },
  { id: "executive", name: "Executive" },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, onTemplateChange }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <Layout size={15} style={{ color: "var(--text-muted)" }} />
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onTemplateChange(t.id)}
          style={{
            padding: "5px 12px",
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "var(--font)",
            border: `1px solid ${selectedTemplate === t.id ? "var(--accent)" : "var(--border)"}`,
            borderRadius: 6,
            background: selectedTemplate === t.id ? "var(--accent)" : "var(--bg-card)",
            color: selectedTemplate === t.id ? "#fff" : "var(--text-secondary)",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
};
