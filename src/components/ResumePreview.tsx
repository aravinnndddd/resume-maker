import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Download, InfoIcon } from "lucide-react";
import { ResumeData, TemplateType } from "../types";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";

import { ExecutiveTemplate } from "./templates/ExecutiveTemplate";
import style from "./styles/Form/form.module.css";
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
    <div className={style.prevBody}>
      {/* Header with Download Button */}
      <div className={style.prevHeader}>
        <h3 className={style.prevHeading}>
          <InfoIcon
            color="white"
            size={30}
            onClick={handleToggle}
            className="cursor-pointer"
          />
          Resume Preview
        </h3>

        <button onClick={handlePrint} className={style.downloadBtn}>
          <Download size={20} style={{ margin: "5px" }} />
          Download PDF
        </button>
      </div>

      {/* Preview Area */}
      {isVisible && <div ref={componentRef}>{renderTemplate()}</div>}
    </div>
  );
};
