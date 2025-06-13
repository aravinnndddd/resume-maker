import React, { useState } from 'react';
import { Project } from '../../types';
import { Code, Plus, Trash2, ExternalLink } from 'lucide-react';

interface ProjectFormProps {
  projects: Project[];
  updateProjects: (projects: Project[]) => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ projects, updateProjects }) => {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
      link: ''
    };
    updateProjects([...projects, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    const updated = projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    );
    updateProjects(updated);
  };

  const removeProject = (id: string) => {
    updateProjects(projects.filter(project => project.id !== id));
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Code className="w-5 h-5 mr-2 text-blue-600" />
          Projects
        </h3>
        <button
          onClick={addProject}
          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Project
        </button>
      </div>

      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-gray-800">Project Entry</h4>
              <button
                onClick={() => removeProject(project.id)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="My Awesome Project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <ExternalLink className="w-4 h-4 inline mr-1" />
                  Project Link (Optional)
                </label>
                <input
                  type="url"
                  value={project.link || ''}
                  onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Technologies Used
              </label>
              <input
                type="text"
                value={project.technologies}
                onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="React, TypeScript, Node.js, MongoDB"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Description
              </label>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Describe what this project does and your role in it..."
              />
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Code className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No projects added yet.</p>
            <p className="text-sm">Click "Add Project" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};