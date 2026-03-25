import React, { useState } from "react";
import { Education } from "../../types";
import { GraduationCap, Plus, Trash2, Calendar, ChevronDown } from "lucide-react";

interface EducationFormProps {
  education: Education[];
  updateEducation: (education: Education[]) => void;
}

const DEGREE_OPTIONS = ["High School", "Associate Degree", "Diploma", "Bachelor's", "Master's", "PhD"];
const FIELD_OPTIONS = [
  "Computer Science", "Information Technology", "Electronics", "Mechanical Engineering",
  "Civil Engineering", "Business Administration", "Arts", "Mathematics",
];

export const EducationForm: React.FC<EducationFormProps> = ({ education, updateEducation }) => {
  const [open, setOpen] = useState(true);

  const addEducation = () => {
    updateEducation([...education, {
      id: Date.now().toString(),
      institution: "", degree: "", field: "", graduationDate: "", currentlyStudying: false, gpa: "",
    }]);
  };

  const update = (id: string, field: keyof Education, value: string | boolean) => {
    updateEducation(education.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const remove = (id: string) => {
    updateEducation(education.filter((e) => e.id !== id));
  };

  return (
    <div className="form-section">
      <div className="section-header" onClick={() => setOpen(!open)}>
        <div className="section-title"><GraduationCap /> Education</div>
        <ChevronDown className={`chevron ${open ? "open" : ""}`} />
      </div>

      {open && (
        <div className="section-body">
          {education.map((edu) => (
            <div key={edu.id} className="entry-card">
              <div className="entry-header">
                <span className="entry-title">{edu.institution || "New Education"}</span>
                <button className="btn-danger" onClick={() => remove(edu.id)}><Trash2 /> Remove</button>
              </div>
              <div className="field-grid">
                <div className="field field-full">
                  <label className="field-label">Institution</label>
                  <input className="field-input" value={edu.institution} onChange={(e) => update(edu.id, "institution", e.target.value)} placeholder="University Name" />
                </div>
                <div className="field">
                  <label className="field-label">Degree</label>
                  <select className="field-select" value={edu.degree} onChange={(e) => update(edu.id, "degree", e.target.value)}>
                    <option value="">Select degree</option>
                    {DEGREE_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label className="field-label">Field of Study</label>
                  <select className="field-select" value={edu.field} onChange={(e) => update(edu.id, "field", e.target.value)}>
                    <option value="">Select field</option>
                    {FIELD_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label className="field-label"><Calendar /> Graduation Date</label>
                  <input className="field-input" type="month" value={edu.graduationDate} onChange={(e) => update(edu.id, "graduationDate", e.target.value)} disabled={edu.currentlyStudying} style={{ opacity: edu.currentlyStudying ? 0.4 : 1 }} />
                  <div className="checkbox-row">
                    <input type="checkbox" checked={edu.currentlyStudying || false} onChange={(e) => update(edu.id, "currentlyStudying", e.target.checked)} />
                    <span>Currently studying</span>
                  </div>
                </div>
                <div className="field">
                  <label className="field-label">GPA (Optional)</label>
                  <input className="field-input" value={edu.gpa || ""} onChange={(e) => update(edu.id, "gpa", e.target.value)} placeholder="e.g. 3.8/4.0" />
                </div>
              </div>
            </div>
          ))}

          {education.length === 0 && (
            <div className="empty-state"><GraduationCap /><p>No education added yet</p></div>
          )}

          <button className="btn-add" onClick={addEducation}><Plus /> Add Education</button>
        </div>
      )}
    </div>
  );
};
