import React from "react";
import { Education } from "../../types";
import { GraduationCap, Plus, Trash2, Calendar } from "lucide-react";
import Select from "react-select";
import styles from "../styles/Form/edu.module.css";

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
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <GraduationCap className={styles.icon} />
          Education
        </h3>
        <button onClick={addEducation} className={styles.addButton}>
          <Plus className={styles.iconSmall} />
          Add Education
        </button>
      </div>

      <div className={styles.entries}>
        {education.map((edu) => (
          <div key={edu.id} className={styles.entry}>
            <div className={styles.entryHeader}>
              <h4 className={styles.entryTitle}>Education Entry</h4>
              <button
                onClick={() => removeEducation(edu.id)}
                className={styles.removeButton}
              >
                <Trash2 className={styles.iconSmall} />
              </button>
            </div>

            <div className={styles.grid}>
              <div>
                <label className={styles.label}>Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) =>
                    updateEducationItem(edu.id, "institution", e.target.value)
                  }
                  className={styles.input}
                  placeholder="University Name"
                />
              </div>

              <div>
                <label className={styles.label}>Degree</label>
                <Select
                  options={degreeOptions}
                  value={degreeOptions.find(
                    (option) => option.value === edu.degree
                  )}
                  onChange={(selected) =>
                    updateEducationItem(edu.id, "degree", selected?.value || "")
                  }
                  className={styles.select}
                  classNamePrefix="react-select"
                  placeholder="Select or type degree"
                  isClearable
                />
              </div>
            </div>

            <div className={styles.grid}>
              <div>
                <label className={styles.label}>Field of Study</label>
                <Select
                  options={fieldOptions}
                  value={fieldOptions.find(
                    (option) => option.value === edu.field
                  )}
                  onChange={(selected) =>
                    updateEducationItem(edu.id, "field", selected?.value || "")
                  }
                  className={styles.select}
                  classNamePrefix="react-select"
                  placeholder="Select or type field"
                  isClearable
                />
              </div>

              <div>
                <label className={styles.label}>
                  <Calendar className={styles.iconInline} />
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
                  className={styles.input}
                />
                <label className={styles.checkboxLabel}>
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
                    className={styles.checkbox}
                  />
                  Currently studying here
                </label>
              </div>
            </div>

            <div>
              <label className={styles.label}>GPA (Optional)</label>
              <input
                type="text"
                value={edu.gpa || ""}
                onChange={(e) =>
                  updateEducationItem(edu.id, "gpa", e.target.value)
                }
                className={styles.input}
                placeholder="e.g. 3.8/4.0"
              />
            </div>
          </div>
        ))}

        {education.length === 0 && (
          <div className={styles.empty}>
            <GraduationCap className={styles.iconLarge} />
            <p>No education added yet.</p>
            <p>Click "Add Education" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};
