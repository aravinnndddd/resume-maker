import React from "react";
import { ResumeData } from "../../types";
import { Mail, Phone, MapPin, Calendar, Star } from "lucide-react";
import style from "../styles/templates/classic.module.css";

interface ClassicTemplateProps {
  data: ResumeData;
}

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const renderStars = (level: number) => {
    return (
      <div className={style.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${style.star} ${
              star <= level ? style.starFilled : style.starEmpty
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={style.classicBody}>
      {/* Header */}
      <div className={style.classicPersonalInfo}>
        {data.personalInfo.profilePicture && (
          <img
            src={data.personalInfo.profilePicture}
            alt="Profile"
            className={style.profileImage}
          />
        )}

        <h1 className={style.Fullname}>
          {data.personalInfo.fullName || "Your Name"}
        </h1>

        <div className={style.infoDetail}>
          {data.personalInfo.email && (
            <div className={style.flexCenter}>
              <Mail className={style.icon} />
              {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo.phone && (
            <div className={style.flexCenter}>
              <Phone className={style.icon} />
              {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo.address && (
            <div className={style.flexCenter}>
              <MapPin className={style.icon} />
              {data.personalInfo.address}
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {data.personalInfo.summary && (
        <div className={style.section}>
          <h2 className={style.sectionHeading}>PROFESSIONAL SUMMARY</h2>
          <p className={style.paragraph}>{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experiences.length > 0 && (
        <div className={style.section}>
          <h2 className={style.sectionHeading}>PROFESSIONAL EXPERIENCE</h2>
          {data.experiences.map((exp) => (
            <div key={exp.id} className={style.experienceBlock}>
              <div className={style.flexBetween}>
                <h3 className={style.experiencePosition}>{exp.position}</h3>
                <span className={style.dateText}>
                  <Calendar className={style.iconSmall} />
                  {formatDate(exp.startDate)} -{" "}
                  {exp.current ? "Present" : formatDate(exp.endDate)}
                </span>
              </div>
              <h4 className={style.experienceCompany}>{exp.company}</h4>
              {exp.description && (
                <p className={style.descriptionText}>{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className={style.section}>
          <h2 className={style.sectionHeading}>EDUCATION</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className={style.educationBlock}>
              <div className={style.flexBetween}>
                <div>
                  <h3 className={style.educationDegree}>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <h4 className={style.institutionText}>{edu.institution}</h4>
                </div>
                <div className={style.educationRight}>
                  {formatDate(edu.graduationDate)}
                  {edu.gpa && <div>GPA: {edu.gpa}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className={style.section}>
          <h2 className={style.sectionHeading}>PROJECTS</h2>
          {data.projects.map((project) => (
            <div key={project.id} className={style.projectBlock}>
              <h3 className={style.projectName}>{project.name}</h3>
              <p className={style.techStack}>
                Technologies: {project.technologies}
              </p>
              {project.description && (
                <p className={style.descriptionText}>{project.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className={style.section}>
          <h2 className={style.sectionHeading}>SKILLS</h2>
          <div className={style.skillGrid}>
            {data.skills.map((skill, index) => (
              <div key={index} className={style.skillItem}>
                <span className={style.skillName}>{skill.name}</span>
                {renderStars(skill.level)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
