import React from "react";
import { Project } from "../../types";
import { Code, Plus, Trash2, ExternalLink } from "lucide-react";
import styles from "../styles/Form/proj.module.css";

interface ProjectFormProps {
  projects: Project[];
  updateProjects: (projects: Project[]) => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  projects,
  updateProjects,
}) => {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: "",
      link: "",
    };
    updateProjects([...projects, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    const updated = projects.map((project) =>
      project.id === id ? { ...project, [field]: value } : project
    );
    updateProjects(updated);
  };

  const removeProject = (id: string) => {
    updateProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <Code className={styles.icon} />
          Projects
        </h3>
        <button onClick={addProject} className={styles.addButton}>
          <Plus className={styles.iconSmall} />
          Add Project
        </button>
      </div>

      <div className={styles.entries}>
        {projects.map((project) => (
          <div key={project.id} className={styles.entry}>
            <div className={styles.entryHeader}>
              <h4 className={styles.entryTitle}>Project Entry</h4>
              <button
                onClick={() => removeProject(project.id)}
                className={styles.removeButton}
              >
                <Trash2 className={styles.iconSmall} />
              </button>
            </div>

            <div className={styles.grid}>
              <div>
                <label className={styles.label}>Project Name</label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) =>
                    updateProject(project.id, "name", e.target.value)
                  }
                  className={styles.input}
                  placeholder="My Awesome Project"
                />
              </div>

              <div>
                <label className={styles.label}>
                  <ExternalLink className={styles.iconInline} />
                  Project Link (Optional)
                </label>
                <input
                  type="url"
                  value={project.link || ""}
                  onChange={(e) =>
                    updateProject(project.id, "link", e.target.value)
                  }
                  className={styles.input}
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>

            <div className={styles.section}>
              <label className={styles.label}>Technologies Used</label>
              <input
                type="text"
                value={project.technologies}
                onChange={(e) =>
                  updateProject(project.id, "technologies", e.target.value)
                }
                className={styles.input}
                placeholder="React, TypeScript, Node.js, MongoDB"
              />
            </div>

            <div>
              <label className={styles.label}>Project Description</label>
              <textarea
                value={project.description}
                onChange={(e) =>
                  updateProject(project.id, "description", e.target.value)
                }
                rows={3}
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Describe what this project does and your role in it..."
              />
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className={styles.empty}>
            <Code className={styles.iconLarge} />
            <p>No projects added yet.</p>
            <p className={styles.subtext}>
              Click "Add Project" to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
