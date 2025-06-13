import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, ExternalLink, Briefcase, Star } from 'lucide-react';

interface ExecutiveTemplateProps {
  data: ResumeData;
}

export const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const renderSkillLevel = (skill: { name: string; level: number }) => {
    const getLevelText = (level: number) => {
      switch (level) {
        case 5: return 'Expert';
        case 4: return 'Advanced';
        case 3: return 'Proficient';
        case 2: return 'Intermediate';
        case 1: return 'Beginner';
        default: return 'Proficient';
      }
    };

    return (
      <div key={skill.name} className="bg-gray-800 text-white text-center py-3 px-4 rounded font-semibold relative group">
        <div className="flex items-center justify-center space-x-2">
          <span>{skill.name}</span>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3 h-3 ${
                  star <= skill.level ? 'text-yellow-400 fill-current' : 'text-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {getLevelText(skill.level)}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-[11in] font-serif">
      {/* Header */}
      <div className="border-b-4 border-gray-800 pb-6 mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-wide">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex justify-center space-x-8 text-sm text-gray-600">
            {data.personalInfo.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo.address && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {data.personalInfo.address}
              </div>
            )}
          </div>
        </div>

        {/* Executive Summary */}
        {data.personalInfo.summary && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center justify-center">
              <Briefcase className="w-5 h-5 mr-2" />
              EXECUTIVE SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed text-center italic text-lg">
              {data.personalInfo.summary}
            </p>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-8">
        {/* Professional Experience */}
        {data.experiences.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b-2 border-gray-300 pb-2">
              PROFESSIONAL EXPERIENCE
            </h2>
            {data.experiences.map((exp) => (
              <div key={exp.id} className="mb-8 bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                    <h4 className="text-lg text-gray-700 font-semibold">{exp.company}</h4>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-gray-800 text-white px-3 py-1 rounded text-sm">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b-2 border-gray-300 pb-2">
                EDUCATION
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                  {edu.field && <p className="text-gray-700 font-semibold">{edu.field}</p>}
                  <p className="text-gray-600">{edu.institution}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">{formatDate(edu.graduationDate)}</span>
                    {edu.gpa && (
                      <span className="text-sm font-semibold text-gray-700">GPA: {edu.gpa}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b-2 border-gray-300 pb-2">
                KEY PROJECTS
              </h2>
              {data.projects.map((project) => (
                <div key={project.id} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        className="text-gray-600 hover:text-gray-800"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 font-semibold mb-2">{project.technologies}</p>
                  {project.description && (
                    <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Core Competencies */}
        {data.skills.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b-2 border-gray-300 pb-2">
              CORE COMPETENCIES
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.skills.map((skill) => renderSkillLevel(skill))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};