import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ResumeData, Experience, Education, Project } from '../types';

interface ResumeFormProps {
  data: ResumeData;
  updateData: (data: ResumeData) => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ data, updateData }) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    updateData({
      ...data,
      experiences: [...data.experiences, newExperience]
    });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    const updatedExperiences = data.experiences.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateData({ ...data, experiences: updatedExperiences });
  };

  const removeExperience = (id: string) => {
    const filteredExperiences = data.experiences.filter(exp => exp.id !== id);
    updateData({ ...data, experiences: filteredExperiences });
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      graduationDate: '',
      gpa: ''
    };
    updateData({
      ...data,
      education: [...data.education, newEducation]
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    const updatedEducation = data.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateData({ ...data, education: updatedEducation });
  };

  const removeEducation = (id: string) => {
    const filteredEducation = data.education.filter(edu => edu.id !== id);
    updateData({ ...data, education: filteredEducation });
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
      link: ''
    };
    updateData({
      ...data,
      projects: [...data.projects, newProject]
    });
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    const updatedProjects = data.projects.map(proj =>
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    updateData({ ...data, projects: updatedProjects });
  };

  const removeProject = (id: string) => {
    const filteredProjects = data.projects.filter(proj => proj.id !== id);
    updateData({ ...data, projects: filteredProjects });
  };

const [skillsInput, setSkillsInput] = useState(data.skills.join(','));

const updateSkills = (skillsString: string) => {
  setSkillsInput(skillsString);

  const skillsArray = skillsString
    .split(',')
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0);

  updateData({ ...data, skills: skillsArray });
};


  return (
    <div className="bg-black/50 rounded-lg shadow-sm p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Resume Builder</h2>
      
      {/* Personal Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
         <input
            type="file"
            placeholder="Profile Picture"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  updateData({
                    ...data,
                    personalInfo: {
                      ...data.personalInfo,
                      profilePicture: reader.result as string
                    }
                  });
                };
                reader.readAsDataURL(file); // Convert to base64
              }
            }}
            className="mb-4"
          />

          <input
            type="text"
            placeholder="Full Name"
            value={data.personalInfo.fullName}
            onChange={(e) => updateData({
              ...data,
              personalInfo: { ...data.personalInfo, fullName: e.target.value }
            })}
            className="px-4 py-2 border bg-black/20 text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="email"
            placeholder="Email"
            value={data.personalInfo.email}
            onChange={(e) => updateData({
              ...data,
              personalInfo: { ...data.personalInfo, email: e.target.value }
            })}
            className="px-4 py-2 border bg-black/20 text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={data.personalInfo.phone}
            onChange={(e) => updateData({
              ...data,
              personalInfo: { ...data.personalInfo, phone: e.target.value }
            })}
            className="px-4 py-2 border bg-black/20 text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Address"
            value={data.personalInfo.address}
            onChange={(e) => updateData({
              ...data,
              personalInfo: { ...data.personalInfo, address: e.target.value }
            })}
            className="px-4 py-2 border bg-black/20 text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <textarea
          placeholder="Professional Summary"
          value={data.personalInfo.summary}
          onChange={(e) => updateData({
            ...data,
            personalInfo: { ...data.personalInfo, summary: e.target.value }
          })}
          rows={3}
          className="w-full mt-4 px-4 bg-black/20 py-2 text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Experience */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Experience</h3>
          <button
            onClick={addExperience}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Experience
          </button>
        </div>
        
        {data.experiences.map((exp) => (
          <div key={exp.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-white">Experience Entry</h4>
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                className="px-3 py-2 border bg-black/20 text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Position"
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                className="px-3 py-2 border bg-black/20 text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="date"
                placeholder="Start Date"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                className="px-3 py-2 border bg-black/20 text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="date"
                placeholder="End Date"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                disabled={exp.current}
                className="px-3 py-2 border border-gray-300 text-white rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-black/20 disabled:bg-gray-100"
              />
            </div>
            <label className="flex items-center mb-3">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-white">Currently working here</span>
            </label>
            <textarea
              placeholder="Job Description"
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border bg-black/20 text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Education</h3>
          <button
            onClick={addEducation}
            className="flex items-center px-3 py-2 bg-blue-600  text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Education
          </button>
        </div>
        
        {data.education.map((edu) => (
          <div key={edu.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-white">Education Entry</h4>
              <button
                onClick={() => removeEducation(edu.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                className="px-3 py-2 border bg-black/20 text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                className="px-3 py-2 border bg-black/20 text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Field of Study"
                value={edu.field}
                onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                className="px-3 py-2 border bg-black/20 text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="date"
                placeholder="Graduation Date"
                value={edu.graduationDate}
                onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                className="px-3 py-2 border bg-black/20 text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="GPA (Optional)"
                value={edu.gpa || ''}
                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                className="px-3 py-2 border bg-black/20 text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Projects</h3>
          <button
            onClick={addProject}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Project
          </button>
        </div>
        
        {data.projects.map((project) => (
          <div key={project.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-white">Project Entry</h4>
              <button
                onClick={() => removeProject(project.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="Project Name"
                value={project.name}
                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                className="px-3 py-2 border bg-black/20 text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Technologies Used"
                value={project.technologies}
                onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                className="px-3 py-2 border bg-black/20 text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <input
              type="url"
              placeholder="Project Link (Optional)"
              value={project.link || ''}
              onChange={(e) => updateProject(project.id, 'link', e.target.value)}
              className="w-full px-3 py-2 border bg-black/20 text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
            />
            <textarea
              placeholder="Project Description"
              value={project.description}
              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border bg-black/20 text-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Skills</h3>
       <textarea
  placeholder="Enter skills separated by commas (e.g. JavaScript, React)"
  value={skillsInput}
  onChange={(e) => updateSkills(e.target.value)}
  rows={3}
  className="w-full px-4 py-2 border bg-black/20 text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
/>

        <p className="text-sm text-gray-500 mt-1">Separate skills with commas</p>
      </div>
    </div>
  );
};