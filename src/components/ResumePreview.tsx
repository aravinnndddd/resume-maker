import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Download, InfoIcon } from "lucide-react";
import { ResumeData, TemplateType } from "../types";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";

import { ExecutiveTemplate } from "./templates/ExecutiveTemplate";

interface ResumePreviewProps {
  data: ResumeData;
  selectedTemplate: TemplateType;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  selectedTemplate,
}) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${data.personalInfo.fullName || "Resume"}_Resume`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body { -webkit-print-color-adjust: exact; }
      }
    `,
  });

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "classic":
        return <ClassicTemplate data={data} />;
      case "modern":
        return <ModernTemplate data={data} />;

      case "executive":
        return <ExecutiveTemplate data={data} />;
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible((prev) => !prev);
  };
  return (
    <div className="bg-transparent rounded-lg shadow-sm b h-full flex flex-col">
      {/* Header with Download Button */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-white font-bold text-lg flex  gap-3">
          <InfoIcon
            color="white"
            size={30}
            onClick={handleToggle}
            className="cursor-pointer"
          />
          Resume Preview
        </h3>

        <button
          onClick={handlePrint}
          className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </button>
      </div>

      {/* Preview Area */}
      {isVisible && (
        <div className="flex-1 overflow-auto p-4 bg-gray-50">
          <div className="max-w-[8.5in] mx-auto bg-white shadow-lg">
            <div ref={componentRef} className="w-full">
              {renderTemplate()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
