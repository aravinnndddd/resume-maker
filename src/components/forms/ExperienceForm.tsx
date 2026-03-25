import React, { useState } from "react";
import { Experience } from "../../types";
import { Briefcase, Plus, Trash2, Calendar, ChevronDown } from "lucide-react";

interface ExperienceFormProps {
  experiences: Experience[];
  updateExperiences: (experiences: Experience[]) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ experiences, updateExperiences }) => {
  const [open, setOpen] = useState(true);

  const addExperience = () => {
    updateExperiences([...experiences, {
      id: Date.now().toString(),
      company: "", position: "", startDate: "", endDate: "", current: false, description: "",
    }]);
  };

  const update = (id: string, field: keyof Experience, value: string | boolean) => {
    updateExperiences(experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const remove = (id: string) => {
    updateExperiences(experiences.filter((e) => e.id !== id));
  };

  return (
    <div className="form-section">
      <div className="section-header" onClick={() => setOpen(!open)}>
        <div className="section-title"><Briefcase /> Work Experience</div>
        <ChevronDown className={`chevron ${open ? "open" : ""}`} />
      </div>

      {open && (
        <div className="section-body">
          {experiences.map((exp) => (
            <div key={exp.id} className="entry-card">
              <div className="entry-header">
                <span className="entry-title">{exp.position || "New Experience"}</span>
                <button className="btn-danger" onClick={() => remove(exp.id)}><Trash2 /> Remove</button>
              </div>
              <div className="field-grid">
                <div className="field">
                  <label className="field-label">Job Title</label>
                  <input className="field-input" value={exp.position} onChange={(e) => update(exp.id, "position", e.target.value)} placeholder="Software Engineer" />
                </div>
                <div className="field">
                  <label className="field-label">Company</label>
                  <input className="field-input" value={exp.company} onChange={(e) => update(exp.id, "company", e.target.value)} placeholder="Company Name" />
                </div>
                <div className="field">
                  <label className="field-label"><Calendar /> Start Date</label>
                  <input className="field-input" type="month" value={exp.startDate} onChange={(e) => update(exp.id, "startDate", e.target.value)} />
                </div>
                <div className="field">
                  <label className="field-label"><Calendar /> End Date</label>
                  <input className="field-input" type="month" value={exp.endDate} onChange={(e) => update(exp.id, "endDate", e.target.value)} disabled={exp.current} style={{ opacity: exp.current ? 0.4 : 1 }} />
                  <div className="checkbox-row">
                    <input type="checkbox" checked={exp.current} onChange={(e) => update(exp.id, "current", e.target.checked)} />
                    <span>Currently working here</span>
                  </div>
                </div>
                <div className="field field-full">
                  <label className="field-label">Description</label>
                  <textarea className="field-textarea" value={exp.description} onChange={(e) => update(exp.id, "description", e.target.value)} rows={3} placeholder={"• Built RESTful APIs...\n• Led a team of 5..."} />
                </div>
              </div>
            </div>
          ))}

          {experiences.length === 0 && (
            <div className="empty-state"><Briefcase /><p>No experience added yet</p></div>
          )}

          <button className="btn-add" onClick={addExperience}><Plus /> Add Experience</button>
        </div>
      )}
    </div>
  );
};
