import React from "react";
import { Education } from "../../types";
import { GraduationCap, Plus, Trash2, Calendar } from "lucide-react";
import Select from "react-select";

interface EducationFormProps {
  education: Education[];
  updateEducation: (education: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  education,
  updateEducation,
}) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      graduationDate: "",
      currentlyStudying: false,
      gpa: "",
    };
    updateEducation([...education, newEducation]);
  };

  const updateEducationItem = (
    id: string,
    field: keyof Education,
    value: string | boolean
  ) => {
    const updated = education.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateEducation(updated);
  };

  const removeEducation = (id: string) => {
    updateEducation(education.filter((edu) => edu.id !== id));
  };

  const degreeOptions = [
    { value: "Bachelor's", label: "Bachelor's" },
    { value: "Master's", label: "Master's" },
    { value: "PhD", label: "PhD" },
    { value: "Diploma", label: "Diploma" },
    { value: "Associate Degree", label: "Associate Degree" },
    { value: "High School", label: "High School" },
  ];

  const fieldOptions = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "Information Technology", label: "Information Technology" },
    { value: "Electronics", label: "Electronics" },
    { value: "Mechanical Engineering", label: "Mechanical Engineering" },
    { value: "Civil Engineering", label: "Civil Engineering" },
    { value: "Business Administration", label: "Business Administration" },
    { value: "Arts", label: "Arts" },
    { value: "Mathematics", label: "Mathematics" },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <GraduationCap className="w-5 h-5 mr-2 text-white" />
          Education
        </h3>
        <button
          onClick={addEducation}
          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Education
        </button>
        {/* Add Education*/}
      </div>

      <div className="space-y-6">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="p-4 border border-gray-200 rounded-lg bg-white/40"
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-white">Education Entry</h4>
              <button
                onClick={() => removeEducation(edu.id)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Institution
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) =>
                    updateEducationItem(edu.id, "institution", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="University Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Degree
                </label>
                <Select
                  options={degreeOptions}
                  value={degreeOptions.find(
                    (option) => option.value === edu.degree
                  )}
                  onChange={(selected) =>
                    updateEducationItem(edu.id, "degree", selected?.value || "")
                  }
                  className="text-black"
                  classNamePrefix="react-select"
                  placeholder="Select or type degree"
                  isClearable
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Field of Study
                </label>
                <Select
                  options={fieldOptions}
                  value={fieldOptions.find(
                    (option) => option.value === edu.field
                  )}
                  onChange={(selected) =>
                    updateEducationItem(edu.id, "field", selected?.value || "")
                  }
                  className="text-black"
                  classNamePrefix="react-select"
                  placeholder="Select or type field"
                  isClearable
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Graduation Date
                </label>
                <input
                  type="month"
                  value={edu.graduationDate}
                  onChange={(e) =>
                    updateEducationItem(
                      edu.id,
                      "graduationDate",
                      e.target.value
                    )
                  }
                  disabled={edu.currentlyStudying}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
                />
                <label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={edu.currentlyStudying || false}
                    onChange={(e) =>
                      updateEducationItem(
                        edu.id,
                        "currentlyStudying",
                        e.target.checked
                      )
                    }
                    className="mr-2"
                  />
                  <span className="text-sm text-white">
                    Currently studying here
                  </span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  GPA (Optional)
                </label>
                <input
                  type="text"
                  value={edu.gpa || ""}
                  onChange={(e) =>
                    updateEducationItem(edu.id, "gpa", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. 3.8/4.0"
                />
              </div>
            </div>
          </div>
        ))}

        {education.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <GraduationCap className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No education added yet.</p>
            <p className="text-sm">Click "Add Education" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};
