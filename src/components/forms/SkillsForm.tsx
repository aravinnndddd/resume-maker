import React, { useState } from "react";
import { Skill } from "../../types";
import { Sparkles, Plus, X, ChevronDown } from "lucide-react";

interface SkillsFormProps {
  skills: Skill[];
  updateSkills: (skills: Skill[]) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ skills, updateSkills }) => {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [level, setLevel] = useState(3);

  const addSkill = () => {
    if (!name.trim()) return;
    updateSkills([...skills, { id: Date.now().toString(), name: name.trim(), level }]);
    setName("");
    setLevel(3);
  };

  const removeSkill = (id: string) => {
    updateSkills(skills.filter((s) => s.id !== id));
  };

  return (
    <div className="form-section">
      <div className="section-header" onClick={() => setOpen(!open)}>
        <div className="section-title"><Sparkles /> Skills</div>
        <ChevronDown className={`chevron ${open ? "open" : ""}`} />
      </div>

      {open && (
        <div className="section-body">
          {/* Skill pills */}
          <div className="skill-pills">
            {skills.map((skill) => (
              <div key={skill.id} className="skill-pill">
                <span>{skill.name}</span>
                <div className="level-dots">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`dot ${i <= skill.level ? "filled" : ""}`} />
                  ))}
                </div>
                <button className="remove-skill" onClick={() => removeSkill(skill.id)}><X /></button>
              </div>
            ))}
          </div>

          {skills.length === 0 && (
            <div className="empty-state"><Sparkles /><p>No skills added yet</p></div>
          )}

          {/* Add skill */}
          <div className="add-skill-row">
            <div className="field">
              <label className="field-label">Skill Name</label>
              <input
                className="field-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                placeholder="e.g. JavaScript"
              />
            </div>
            <div className="field" style={{ maxWidth: 120 }}>
              <label className="field-label">Level</label>
              <select className="field-select" value={level} onChange={(e) => setLevel(Number(e.target.value))}>
                <option value={1}>Beginner</option>
                <option value={2}>Novice</option>
                <option value={3}>Intermediate</option>
                <option value={4}>Advanced</option>
                <option value={5}>Expert</option>
              </select>
            </div>
            <button className="btn-add" onClick={addSkill} disabled={!name.trim()} style={{ marginBottom: 1 }}>
              <Plus /> Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
