import React from "react";
import { ResumeData } from "../../types";
import { Mail, Phone, MapPin } from "lucide-react";
import "./TemplateStyles.css";

interface ModernTemplateProps {
  data: ResumeData;
  accentColor: string;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, accentColor }) => {
  const fmt = (d: string) => {
    if (!d) return "";
    const date = new Date(d);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  return (
    <div className="modern">
      {/* Sidebar */}
      <div className="sidebar" style={{ background: accentColor }}>
        {data.personalInfo.profilePicture && (
          <img src={data.personalInfo.profilePicture} alt="" className="avatar" />
        )}
        <div className="name">{data.personalInfo.fullName || "Your Name"}</div>
        {data.personalInfo.summary && <div className="tagline">{data.personalInfo.summary.slice(0, 80)}...</div>}

        {/* Contact */}
        <div className="sb-heading">Contact</div>
        <div className="sb-contact">
          {data.personalInfo.email && <div className="sb-contact-item"><Mail />{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div className="sb-contact-item"><Phone />{data.personalInfo.phone}</div>}
          {data.personalInfo.address && <div className="sb-contact-item"><MapPin />{data.personalInfo.address}</div>}
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <>
            <div className="sb-heading">Skills</div>
            {data.skills.map((s) => (
              <div key={s.id} className="sb-skill-bar">
                <div className="sb-skill-name">{s.name}</div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${s.level * 20}%` }} />
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="resume-section">
            <div className="mc-heading" style={{ borderColor: accentColor }}>About Me</div>
            <p className="mc-summary">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experiences.length > 0 && (
          <div className="resume-section">
            <div className="mc-heading" style={{ borderColor: accentColor }}>Experience</div>
            {data.experiences.map((exp) => (
              <div key={exp.id} className="mc-exp-item">
                <div className="mc-exp-top">
                  <span className="mc-exp-position">{exp.position}</span>
                  <span className="date-range">{fmt(exp.startDate)} — {exp.current ? "Present" : fmt(exp.endDate)}</span>
                </div>
                <div className="mc-exp-company">{exp.company}</div>
                {exp.description && <p className="mc-exp-desc">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="resume-section">
            <div className="mc-heading" style={{ borderColor: accentColor }}>Education</div>
            {data.education.map((edu) => (
              <div key={edu.id} className="mc-edu-item">
                <div>
                  <div className="mc-edu-degree">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</div>
                  <div className="mc-edu-inst">{edu.institution}</div>
                </div>
                <div className="mc-edu-right">
                  <div className="date-range">{edu.currentlyStudying ? "Present" : fmt(edu.graduationDate)}</div>
                  {edu.gpa && <div style={{ fontSize: 10, color: "#6b7280" }}>GPA: {edu.gpa}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="resume-section">
            <div className="mc-heading" style={{ borderColor: accentColor }}>Projects</div>
            {data.projects.map((p) => (
              <div key={p.id} className="mc-proj-item">
                <div className="mc-proj-name">{p.name}</div>
                {p.technologies && <div className="mc-proj-tech">{p.technologies}</div>}
                {p.description && <p className="mc-proj-desc">{p.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
