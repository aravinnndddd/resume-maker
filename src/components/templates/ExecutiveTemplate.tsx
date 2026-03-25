import React from "react";
import { ResumeData } from "../../types";
import { Mail, Phone, MapPin } from "lucide-react";
import "./TemplateStyles.css";

interface ExecutiveTemplateProps {
  data: ResumeData;
  accentColor: string;
}

export const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ data, accentColor }) => {
  const fmt = (d: string) => {
    if (!d) return "";
    const date = new Date(d);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  return (
    <div className="executive">
      {/* Hero Header */}
      <div className="exec-header" style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` }}>
        <div className="name">{data.personalInfo.fullName || "Your Name"}</div>
        {data.personalInfo.summary && <div className="title-line">{data.personalInfo.summary.slice(0, 100)}</div>}
        <div className="contact-row">
          {data.personalInfo.email && <span><Mail />{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span><Phone />{data.personalInfo.phone}</span>}
          {data.personalInfo.address && <span><MapPin />{data.personalInfo.address}</span>}
        </div>
      </div>

      {/* Body */}
      <div className="exec-body">
        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="exec-section">
            <div className="exec-heading" style={{ borderColor: accentColor, color: accentColor }}>Professional Summary</div>
            <p className="exec-summary">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experiences.length > 0 && (
          <div className="exec-section">
            <div className="exec-heading" style={{ borderColor: accentColor, color: accentColor }}>Experience</div>
            {data.experiences.map((exp) => (
              <div key={exp.id} className="exec-exp-item">
                <div className="exec-exp-top">
                  <span className="exec-exp-position">{exp.position}</span>
                  <span className="date-range">{fmt(exp.startDate)} — {exp.current ? "Present" : fmt(exp.endDate)}</span>
                </div>
                <div className="exec-exp-company">{exp.company}</div>
                {exp.description && <p className="exec-exp-desc">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="exec-section">
            <div className="exec-heading" style={{ borderColor: accentColor, color: accentColor }}>Education</div>
            {data.education.map((edu) => (
              <div key={edu.id} className="exec-edu-item">
                <div>
                  <div className="exec-edu-degree">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</div>
                  <div className="exec-edu-inst">{edu.institution}</div>
                </div>
                <div className="exec-edu-right">
                  <div className="date-range">{edu.currentlyStudying ? "Present" : fmt(edu.graduationDate)}</div>
                  {edu.gpa && <div style={{ fontSize: 10, color: "#6b7280" }}>GPA: {edu.gpa}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="exec-section">
            <div className="exec-heading" style={{ borderColor: accentColor, color: accentColor }}>Projects</div>
            {data.projects.map((p) => (
              <div key={p.id} className="exec-proj-item">
                <div className="exec-proj-name">{p.name}</div>
                {p.technologies && <div className="exec-proj-tech">{p.technologies}</div>}
                {p.description && <p className="exec-proj-desc">{p.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="exec-section">
            <div className="exec-heading" style={{ borderColor: accentColor, color: accentColor }}>Skills</div>
            <div className="exec-skills-wrap">
              {data.skills.map((s) => (
                <span key={s.id} className="exec-skill-chip" style={{ background: accentColor }}>{s.name}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
