import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Download, ZoomIn, ZoomOut } from "lucide-react";
import { ResumeData, TemplateType } from "../types";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { ExecutiveTemplate } from "./templates/ExecutiveTemplate";
import "./PreviewStyles.css";

interface ResumePreviewProps {
  data: ResumeData;
  selectedTemplate: TemplateType;
  accentColor: string;
  zoom: number;
  onZoomChange: (z: number) => void;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  data, selectedTemplate, accentColor, zoom, onZoomChange,
}) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${data.personalInfo.fullName || "Resume"}_Resume`,
    pageStyle: `
      @page { size: A4; margin: 0; }
      @media print {
        html, body { margin: 0; padding: 0; }
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    `,
  });

  const renderTemplate = () => {
    const props = { data, accentColor };
    switch (selectedTemplate) {
      case "modern": return <ModernTemplate {...props} />;
      case "executive": return <ExecutiveTemplate {...props} />;
      default: return <ClassicTemplate {...props} />;
    }
  };

  return (
    <div className="preview-root">
      {/* Toolbar */}
      <div className="preview-toolbar">
        <div className="zoom-controls">
          <button className="zoom-btn" onClick={() => onZoomChange(Math.max(0.3, zoom - 0.05))}><ZoomOut size={15} /></button>
          <span className="zoom-label">{Math.round(zoom * 100)}%</span>
          <button className="zoom-btn" onClick={() => onZoomChange(Math.min(1, zoom + 0.05))}><ZoomIn size={15} /></button>
        </div>
        <button className="download-btn" onClick={handlePrint}><Download size={15} /> Download PDF</button>
      </div>

      {/* A4 Preview Area */}
      <div className="preview-scroll">
        <div className="a4-wrapper" style={{ transform: `scale(${zoom})` }}>
          <div className="a4-page" ref={componentRef}>
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};
