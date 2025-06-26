import React from "react";
import { ResumeData } from "../../types";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Briefcase,
  Star,
} from "lucide-react";
import styles from "../styles/templates/executive.module.css";

interface ExecutiveTemplateProps {
  data: ResumeData;
}

export const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({
  data,
}) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const renderSkillLevel = (skill: { name: string; level: number }) => {
    const getLevelText = (level: number) => {
      switch (level) {
        case 5:
          return "Expert";
        case 4:
          return "Advanced";
        case 3:
          return "Proficient";
        case 2:
          return "Intermediate";
        case 1:
          return "Beginner";
        default:
          return "Proficient";
      }
    };

    return (
      <div key={skill.name} className={styles.skillBox}>
        <div className={styles.skillContent}>
          <span>{skill.name}</span>
          <div className={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3 h-3 ${
                  star <= skill.level ? styles.starFilled : styles.starEmpty
                }`}
              />
            ))}
          </div>
        </div>
        <div className={styles.tooltip}>{getLevelText(skill.level)}</div>
      </div>
    );
  };

  return (
    <div className={styles.resumeWrapper}>
      {/* Header */}
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          {data.personalInfo.profilePicture && (
            <img
              src={data.personalInfo.profilePicture}
              alt="Profile"
              className={styles.profileImage}
            />
          )}
          <h1 className={styles.name}>
            {data.personalInfo.fullName || "Your Name"}
          </h1>
          <div className={styles.contactList}>
            {data.personalInfo.email && (
              <div className={styles.contactItem}>
                <Mail className={styles.iconSmall} />
                {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo.phone && (
              <div className={styles.contactItem}>
                <Phone className={styles.iconSmall} />
                {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo.address && (
              <div className={styles.contactItem}>
                <MapPin className={styles.iconSmall} />
                {data.personalInfo.address}
              </div>
            )}
          </div>
        </div>

        {data.personalInfo.summary && (
          <div className={styles.summaryBlock}>
            <h2 className={styles.summaryTitle}>
              <Briefcase className={styles.iconMedium} /> EXECUTIVE SUMMARY
            </h2>
            <p className={styles.summaryText}>{data.personalInfo.summary}</p>
          </div>
        )}
      </div>

      <div className={styles.mainWrapper}>
        {data.experiences.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</h2>
            {data.experiences.map((exp) => (
              <div key={exp.id} className={styles.experienceCard}>
                <div className={styles.experienceHeader}>
                  <div>
                    <h3 className={styles.experiencePosition}>
                      {exp.position}
                    </h3>
                    <h4 className={styles.experienceCompany}>{exp.company}</h4>
                  </div>
                  <div className={styles.experienceDate}>
                    {formatDate(exp.startDate)} -{" "}
                    {exp.current ? "Present" : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <p className={styles.paragraph}>{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className={styles.gridTwoCols}>
          {data.education.length > 0 && (
            <div>
              <h2 className={styles.sectionTitle}>EDUCATION</h2>
              {data.education.map((edu) => (
                <div key={edu.id} className={styles.cardBlock}>
                  <h3 className={styles.eduDegree}>{edu.degree}</h3>
                  {edu.field && <p className={styles.eduField}>{edu.field}</p>}
                  <p className={styles.eduInstitute}>{edu.institution}</p>
                  <div className={styles.eduFooter}>
                    <span>{formatDate(edu.graduationDate)}</span>
                    {edu.gpa && (
                      <span className={styles.gpaText}>GPA: {edu.gpa}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {data.projects.length > 0 && (
            <div>
              <h2 className={styles.sectionTitle}>KEY PROJECTS</h2>
              {data.projects.map((project) => (
                <div key={project.id} className={styles.cardBlock}>
                  <div className={styles.projectHeader}>
                    <h3 className={styles.projectName}>{project.name}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        className={styles.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className={styles.iconSmall} />
                      </a>
                    )}
                  </div>
                  <p className={styles.projectTech}>{project.technologies}</p>
                  {project.description && (
                    <p className={styles.paragraph}>{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {data.skills.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.sectionTitle}>CORE COMPETENCIES</h2>
            <div className={styles.skillsGrid}>
              {data.skills.map((skill) => renderSkillLevel(skill))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
