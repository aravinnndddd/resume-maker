import React from 'react';
import { TemplateType } from '../types';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange
}) => {
  const templates = [
    { id: 'classic' as TemplateType, name: 'Classic', description: 'Traditional and professional' },
    { id: 'modern' as TemplateType, name: 'Modern', description: 'Clean and contemporary' },
    { id: 'creative' as TemplateType, name: 'Creative', description: 'Bold and distinctive' },
    { id: 'executive' as TemplateType, name: 'Executive', description: 'Elegant and sophisticated' }
  ];

  return (
    <div className="bg-black/50 rounded-lg shadow-sm  p-6 mb-6">
      <h3 className="text-lg font-semibold text-white mb-4">Choose Template</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateChange(template.id)}
            className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
              selectedTemplate === template.id
                ? 'border-white bg-black/60 text-white'
                : 'border-black hover:border-gray-300'
            }`}
          >
            <div className="text-center">
              <h4 className="font-semibold text-white mb-1">{template.name}</h4>
              <p className="text-xs text-white">{template.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};