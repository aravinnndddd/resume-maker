import React, { useState } from "react";
import { Experience } from "../../types";
import { Briefcase, Plus, Trash2, Calendar } from "lucide-react";

interface ExperienceFormProps {
  experiences: Experience[];
  updateExperiences: (experiences: Experience[]) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experiences,
  updateExperiences,
}) => {
  const [isAdding, setIsAdding] = useState(false);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    updateExperiences([...experiences, newExperience]);
    setIsAdding(true);
  };

  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: string | boolean
  ) => {
    const updated = experiences.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateExperiences(updated);
  };

  const removeExperience = (id: string) => {
    updateExperiences(experiences.filter((exp) => exp.id !== id));
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Briefcase className="w-5 h-5 mr-2 text-white" />
          Work Experience
        </h3>
        <button
          onClick={addExperience}
          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-4 border border-gray-200 rounded-lg bg-white/40"
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-white">Experience Entry</h4>
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) =>
                    updateExperience(exp.id, "position", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(exp.id, "company", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Company Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Start Date
                </label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateExperience(exp.id, "startDate", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  End Date
                </label>
                <div className="space-y-2">
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) =>
                      updateExperience(exp.id, "endDate", e.target.value)
                    }
                    disabled={exp.current}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  />
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) =>
                        updateExperience(exp.id, "current", e.target.checked)
                      }
                      className="mr-2"
                    />
                    <span className="text-sm text-white">
                      Currently working here
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Job Description{" "}
              </label>
              <div>
                <textarea
                  value={exp.description}
                  onChange={(e) =>
                    updateExperience(exp.id, "description", e.target.value)
                  }
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                  placeholder={`e.g.\n• Developed RESTful APIs for internal tools\n• Collaborated with frontend team to integrate UI`}
                />
              </div>
            </div>
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Briefcase className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No work experience added yet.</p>
            <p className="text-sm">Click "Add Experience" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};
