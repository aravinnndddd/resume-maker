import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, ExternalLink, Award } from 'lucide-react';

interface CreativeTemplateProps {
  data: ResumeData;
}

export const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 min-h-[11in] font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white p-8">
        <div className="max-w-4xl mx-auto">
           {data.personalInfo.profilePicture && (
  <img
    src={data.personalInfo.profilePicture}
    alt="Profile"
   className='w-[200px] h-[200px] rounded-full mx-auto mb-4 object-cover'
    style={{ objectFit: 'cover', borderRadius: '50%' }}
  />
)}
          <h1 className="text-4xl font-bold mb-4">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap gap-6 text-sm">
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
      </div>

      <div className="max-w-4xl mx-auto p-8">
        {/* Professional Summary */}
        {data.personalInfo.summary && (
          <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
              <Award className="w-6 h-6 mr-2" />
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{data.personalInfo.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            {data.experiences.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-purple-800 mb-6">Experience</h2>
                {data.experiences.map((exp, index) => (
                  <div key={exp.id} className="mb-6 relative">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                        {index + 1}
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                        <h4 className="text-purple-600 font-medium text-lg">{exp.company}</h4>
                        <p className="text-sm text-gray-500 mb-3">
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </p>
                        {exp.description && (
                          <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-purple-800 mb-6">Projects</h2>
                <div className="grid gap-4">
                  {data.projects.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border-l-4 border-purple-500"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                        {project.link && (
                          <a
                            href={project.link}
                            className="text-purple-600 hover:text-purple-800"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-purple-700 font-medium mb-2">{project.technologies}</p>
                      {project.description && (
                        <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Skills */}
            {data.skills.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-purple-800 mb-6">Skills</h2>
                <div className="space-y-3">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="relative">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-center text-sm font-medium shadow-md transform hover:scale-105 transition-transform">
                        {skill}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-purple-800 mb-6">Education</h2>
                {data.education.map((edu) => (
                  <div key={edu.id} className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <h3 className="font-semibold text-gray-800 text-lg">{edu.degree}</h3>
                    {edu.field && <p className="text-purple-600 font-medium">{edu.field}</p>}
                    <p className="text-gray-700">{edu.institution}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-500">{formatDate(edu.graduationDate)}</p>
                      {edu.gpa && (
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                          GPA: {edu.gpa}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};