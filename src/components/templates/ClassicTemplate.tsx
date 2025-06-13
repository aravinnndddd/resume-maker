import React from "react";
import { ResumeData } from "../../types";
import { Mail, Phone, MapPin, Calendar, Star } from "lucide-react";

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
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= level ? "text-gray-800 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-8 min-h-[11in] font-serif">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-800 pb-4">
        <img
          src={data.personalInfo.profilePicture}
          alt="Profile"
          className="w-[200px] h-[200px] rounded-full mx-auto mb-4 object-cover"
          style={{ objectFit: "cover", borderRadius: "50%" }}
        />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {data.personalInfo.email && (
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo.address && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {data.personalInfo.address}
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
            PROFESSIONAL EXPERIENCE
          </h2>
          {data.experiences.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {exp.position}
                </h3>
                <span className="text-sm text-gray-600 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(exp.startDate)} -{" "}
                  {exp.current ? "Present" : formatDate(exp.endDate)}
                </span>
              </div>
              <h4 className="text-md font-medium text-gray-700 mb-2">
                {exp.company}
              </h4>
              {exp.description && (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
            EDUCATION
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <h4 className="text-md text-gray-700">{edu.institution}</h4>
                </div>
                <div className="text-right text-sm text-gray-600">
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
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
            PROJECTS
          </h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {project.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                Technologies: {project.technologies}
              </p>
              {project.description && (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
            SKILLS
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {skill.name}
                </span>
                {renderStars(skill.level)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
