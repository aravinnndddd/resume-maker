import React from "react";
import { ResumeData } from "../../types";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import styles from "../styles/templates/modern.module.css";

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const renderSkillBar = (skill: { name: string; level: number }) => {
    const percentage = (skill.level / 5) * 100;
    return (
      <div key={skill.name} className={styles.skillContainer}>
        <div className={styles.skillHeader}>
          <span className={styles.skillName}>{skill.name}</span>
        </div>
        <div className={styles.skillBarBg}>
          <div
            className={styles.skillBarFg}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.resumeWrapper}>
      <div className={styles.resumeFlex}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          <div className={styles.leftTop}>
            {data.personalInfo.profilePicture && (
              <img
                src={data.personalInfo.profilePicture}
                alt="Profile"
                className={styles.profileImage}
              />
            )}
            <h1 className={styles.nameText}>
              {data.personalInfo.fullName || "Your Name"}
            </h1>
            <div className={styles.contactList}>
              {data.personalInfo.email && (
                <div className={styles.contactItem}>
                  <Mail className={styles.iconSmall} />
                  <span className={styles.contactText}>
                    {data.personalInfo.email}
                  </span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className={styles.contactItem}>
                  <Phone className={styles.iconSmall} />
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.address && (
                <div className={styles.contactItem}>
                  <MapPin className={styles.iconSmall} />
                  <span>{data.personalInfo.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className={styles.leftSection}>
              <h2 className={styles.sectionHeading}>SKILLS</h2>
              <div className={styles.skillList}>
                {data.skills.map((skill) => renderSkillBar(skill))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className={styles.leftSection}>
              <h2 className={styles.sectionHeading}>EDUCATION</h2>
              {data.education.map((edu) => (
                <div key={edu.id} className={styles.educationItem}>
                  <h3 className={styles.educationDegree}>{edu.degree}</h3>
                  {edu.field && (
                    <p className={styles.educationField}>{edu.field}</p>
                  )}
                  <p className={styles.educationInstitution}>
                    {edu.institution}
                  </p>
                  <p className={styles.educationDate}>
                    {formatDate(edu.graduationDate)}
                  </p>
                  {edu.gpa && (
                    <p className={styles.educationDate}>GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          {/* Professional Summary */}
          {data.personalInfo.summary && (
            <div className={styles.rightSection}>
              <h2 className={styles.sectionHeading}>Professional Summary</h2>
              <p className={styles.paragraph}>{data.personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experiences.length > 0 && (
            <div className={styles.rightSection}>
              <h2 className={styles.sectionHeading}>Experience</h2>
              {data.experiences.map((exp) => (
                <div key={exp.id} className={styles.timelineItem}>
                  <div className={styles.timelineDot}></div>
                  <div className={styles.timelineContent}>
                    <h3 className={styles.experiencePosition}>
                      {exp.position}
                    </h3>
                    <h4 className={styles.experienceCompany}>{exp.company}</h4>
                    <p className={styles.experienceDate}>
                      {formatDate(exp.startDate)} -{" "}
                      {exp.current ? "Present" : formatDate(exp.endDate)}
                    </p>
                    {exp.description && (
                      <p className={styles.paragraph}>{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div className={styles.rightSection}>
              <h2 className={styles.sectionHeading}>Projects</h2>
              {data.projects.map((project) => (
                <div key={project.id} className={styles.projectCard}>
                  <div className={styles.projectHeader}>
                    <h3 className={styles.projectTitle}>{project.name}</h3>
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
      </div>
    </div>
  );
};
