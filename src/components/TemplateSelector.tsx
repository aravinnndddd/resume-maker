import React from "react";
import { TemplateType } from "../types";
import { InfoIcon } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange,
}) => {
  const templates = [
    {
      id: "classic" as TemplateType,
      name: "Classic",
      description: "Traditional and professional",
    },
    {
      id: "modern" as TemplateType,
      name: "Modern",
      description: "Clean and contemporary",
    },

    {
      id: "executive" as TemplateType,
      name: "Executive",
      description: "Elegant and sophisticated",
    },
  ];

  return (
    <div className="bg-black/40 rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold text-white m-2">Choose Template</h3>

      <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateChange(template.id)}
            className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
              selectedTemplate === template.id
                ? "border-blue-500 bg-black/20 text-white"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="text-center">
              <h4 className="font-semibold mb-1  text-white">
                {template.name}
              </h4>
              <p className="text-xs  text-white/50">{template.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
