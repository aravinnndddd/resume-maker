import React, { useState, useRef, useEffect } from "react";
import { TemplateType } from "../types";
import { Layout, Menu } from "lucide-react";
import "./TemplateSelector.css";

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
}

const templates: { id: TemplateType; name: string }[] = [
  { id: "classic", name: "Classic" },
  { id: "modern", name: "Modern" },
  { id: "executive", name: "Executive" },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="template-selector-wrap" ref={dropdownRef}>
      <div className="ts-desktop">
        <Layout size={15} style={{ color: "var(--text-muted)" }} />
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onTemplateChange(t.id)}
            className={`ts-btn ${selectedTemplate === t.id ? "active" : ""}`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="ts-mobile">
        <button
          className="icon-btn ts-hamburger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={18} />
          <span className="ts-current-name">
            {templates.find((t) => t.id === selectedTemplate)?.name}
          </span>
        </button>
        {isOpen && (
          <div className="ts-dropdown">
            <div className="ts-dropdown-header">Select Template</div>
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  onTemplateChange(t.id);
                  setIsOpen(false);
                }}
                className={`ts-dropdown-item ${selectedTemplate === t.id ? "active" : ""}`}
              >
                {t.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
