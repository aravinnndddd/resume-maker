import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-white min-h-[11in] font-sans">
      <div className="flex">
        {/* Left Column */}
        <div className="w-1/3 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-8">
          <div className="mb-8">
             {data.personalInfo.profilePicture && (
  <img
    src={data.personalInfo.profilePicture}
    alt="Profile"
   className='w-[200px] h-[200px] rounded-full mx-auto mb-4 object-cover'
    style={{ objectFit: 'cover', borderRadius: '50%' }}
  />
)}
            <h1 className="text-2xl font-bold mb-4">
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="space-y-3 text-sm">
              {data.personalInfo.email && (
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="break-all">{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.address && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{data.personalInfo.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 border-b border-blue-400 pb-2">SKILLS</h2>
              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span>{skill}</span>
                    </div>
                    <div className="w-full bg-blue-700 rounded-full h-1">
                      <div className="bg-white h-1 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4 border-b border-blue-400 pb-2">EDUCATION</h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-4 text-sm">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-blue-200">{edu.institution}</p>
                  <p className="text-blue-100 text-xs">{formatDate(edu.graduationDate)}</p>
                  {edu.gpa && <p className="text-blue-100 text-xs">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-2/3 p-8">
          {/* Professional Summary */}
          {data.personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Professional Summary</h2>
              <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experiences.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Experience</h2>
              {data.experiences.map((exp) => (
                <div key={exp.id} className="mb-6 relative pl-4 border-l-2 border-blue-200">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                    <h4 className="text-blue-600 font-medium">{exp.company}</h4>
                    <p className="text-sm text-gray-500">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Projects</h2>
              {data.projects.map((project) => (
                <div key={project.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        className="text-blue-600 hover:text-blue-800"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-blue-600 mb-2">{project.technologies}</p>
                  {project.description && (
                    <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
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