import React from "react";
import { ResumeData } from "../../types";
import { Mail, Phone, MapPin } from "lucide-react";
import "./TemplateStyles.css";

interface ClassicTemplateProps {
  data: ResumeData;
  accentColor: string;
}

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data, accentColor }) => {
  const fmt = (d: string) => {
    if (!d) return "";
    const date = new Date(d);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  return (
    <div className="classic">
      {/* Header */}
      <div className="header-block" style={{ borderColor: accentColor }}>
        <div className="name">{data.personalInfo.fullName || "Your Name"}</div>
        <div className="contact-row">
          {data.personalInfo.email && <span><Mail />{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span><Phone />{data.personalInfo.phone}</span>}
          {data.personalInfo.address && <span><MapPin />{data.personalInfo.address}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="resume-section">
          <div className="section-heading">Professional Summary</div>
          <p className="summary-text">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experiences.length > 0 && (
        <div className="resume-section">
          <div className="section-heading">Experience</div>
          {data.experiences.map((exp) => (
            <div key={exp.id} className="exp-item">
              <div className="exp-top">
                <span className="exp-position">{exp.position}</span>
                <span className="date-range">{fmt(exp.startDate)} — {exp.current ? "Present" : fmt(exp.endDate)}</span>
              </div>
              <div className="exp-company">{exp.company}</div>
              {exp.description && <p className="exp-desc">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="resume-section">
          <div className="section-heading">Education</div>
          {data.education.map((edu) => (
            <div key={edu.id} className="edu-item">
              <div className="edu-left">
                <div className="degree">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</div>
                <div className="institution">{edu.institution}</div>
              </div>
              <div className="edu-right">
                <div>{edu.currentlyStudying ? "Present" : fmt(edu.graduationDate)}</div>
                {edu.gpa && <div>GPA: {edu.gpa}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="resume-section">
          <div className="section-heading">Projects</div>
          {data.projects.map((p) => (
            <div key={p.id} className="proj-item">
              <div className="proj-name">{p.name}</div>
              {p.technologies && <div className="proj-tech">{p.technologies}</div>}
              {p.description && <p className="proj-desc">{p.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="resume-section">
          <div className="section-heading">Skills</div>
          <div className="skills-grid">
            {data.skills.map((s) => (
              <span key={s.id} className="skill-chip" style={{ background: `${accentColor}15`, color: accentColor }}>{s.name}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
