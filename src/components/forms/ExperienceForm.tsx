import React, { useState } from "react";
import { Experience } from "../../types";
import { Briefcase, Plus, Trash2, Calendar } from "lucide-react";
import styles from "../styles/Form/exp.module.css";

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
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <Briefcase className={styles.icon} />
          Work Experience
        </h3>
        <button onClick={addExperience} className={styles.addButton}>
          <Plus className={styles.iconSmall} />
          Add Experience
        </button>
      </div>

      <div className={styles.entries}>
        {experiences.map((exp) => (
          <div key={exp.id} className={styles.entry}>
            <div className={styles.entryHeader}>
              <h4 className={styles.entryTitle}>Experience Entry</h4>
              <button
                onClick={() => removeExperience(exp.id)}
                className={styles.removeButton}
              >
                <Trash2 className={styles.iconSmall} />
              </button>
            </div>

            <div className={styles.grid}>
              <div>
                <label className={styles.label}>Job Title</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) =>
                    updateExperience(exp.id, "position", e.target.value)
                  }
                  className={styles.input}
                  placeholder="Software Engineer"
                />
              </div>

              <div>
                <label className={styles.label}>Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(exp.id, "company", e.target.value)
                  }
                  className={styles.input}
                  placeholder="Company Name"
                />
              </div>
            </div>

            <div className={styles.grid}>
              <div>
                <label className={styles.label}>
                  <Calendar className={styles.iconInline} />
                  Start Date
                </label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateExperience(exp.id, "startDate", e.target.value)
                  }
                  className={styles.input}
                />
              </div>

              <div>
                <label className={styles.label}>
                  <Calendar className={styles.iconInline} />
                  End Date
                </label>
                <div className={styles.endDateBlock}>
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) =>
                      updateExperience(exp.id, "endDate", e.target.value)
                    }
                    disabled={exp.current}
                    className={`${styles.input} ${
                      exp.current ? styles.disabled : ""
                    }`}
                  />
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) =>
                        updateExperience(exp.id, "current", e.target.checked)
                      }
                      className={styles.checkbox}
                    />
                    <span className={styles.checkboxText}>
                      Currently working here
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className={styles.label}>Job Description</label>
              <textarea
                value={exp.description}
                onChange={(e) =>
                  updateExperience(exp.id, "description", e.target.value)
                }
                rows={5}
                className={`${styles.input} ${styles.textarea}`}
                placeholder={`e.g.\n• Developed RESTful APIs for internal tools\n• Collaborated with frontend team to integrate UI`}
              />
            </div>
          </div>
        ))}

        {experiences.length === 0 && (
          <div className={styles.empty}>
            <Briefcase className={styles.iconLarge} />
            <p>No work experience added yet.</p>
            <p className={styles.subtext}>
              Click "Add Experience" to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
