import React, { useState } from "react";
import { Project } from "../../types";
import { FolderKanban, Plus, Trash2, ExternalLink, ChevronDown } from "lucide-react";

interface ProjectFormProps {
  projects: Project[];
  updateProjects: (projects: Project[]) => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ projects, updateProjects }) => {
  const [open, setOpen] = useState(true);

  const addProject = () => {
    updateProjects([...projects, {
      id: Date.now().toString(),
      name: "", description: "", technologies: "", link: "",
    }]);
  };

  const update = (id: string, field: keyof Project, value: string) => {
    updateProjects(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const remove = (id: string) => {
    updateProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="form-section">
      <div className="section-header" onClick={() => setOpen(!open)}>
        <div className="section-title"><FolderKanban /> Projects</div>
        <ChevronDown className={`chevron ${open ? "open" : ""}`} />
      </div>

      {open && (
        <div className="section-body">
          {projects.map((proj) => (
            <div key={proj.id} className="entry-card">
              <div className="entry-header">
                <span className="entry-title">{proj.name || "New Project"}</span>
                <button className="btn-danger" onClick={() => remove(proj.id)}><Trash2 /> Remove</button>
              </div>
              <div className="field-grid">
                <div className="field">
                  <label className="field-label">Project Name</label>
                  <input className="field-input" value={proj.name} onChange={(e) => update(proj.id, "name", e.target.value)} placeholder="My Awesome Project" />
                </div>
                <div className="field">
                  <label className="field-label"><ExternalLink /> Link (Optional)</label>
                  <input className="field-input" type="url" value={proj.link || ""} onChange={(e) => update(proj.id, "link", e.target.value)} placeholder="https://github.com/..." />
                </div>
                <div className="field field-full">
                  <label className="field-label">Technologies</label>
                  <input className="field-input" value={proj.technologies} onChange={(e) => update(proj.id, "technologies", e.target.value)} placeholder="React, TypeScript, Node.js" />
                </div>
                <div className="field field-full">
                  <label className="field-label">Description</label>
                  <textarea className="field-textarea" value={proj.description} onChange={(e) => update(proj.id, "description", e.target.value)} rows={2} placeholder="What does this project do?" />
                </div>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="empty-state"><FolderKanban /><p>No projects added yet</p></div>
          )}

          <button className="btn-add" onClick={addProject}><Plus /> Add Project</button>
        </div>
      )}
    </div>
  );
};
