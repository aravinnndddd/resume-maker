import React, { useState } from "react";
import { Skill } from "../../types";
import { Award, Plus, Trash2, Star } from "lucide-react";
import styles from "../styles/Form/skill.module.css";

interface SkillsFormProps {
  skills: Skill[];
  updateSkills: (skills: Skill[]) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({
  skills,
  updateSkills,
}) => {
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState(3);

  const addSkill = () => {
    if (newSkillName.trim()) {
      const newSkill: Skill = {
        id: Date.now().toString(),
        name: newSkillName.trim(),
        level: newSkillLevel,
      };
      updateSkills([...skills, newSkill]);
      setNewSkillName("");
      setNewSkillLevel(3);
    }
  };

  const removeSkill = (id: string) => {
    updateSkills(skills.filter((skill) => skill.id !== id));
  };

  const updateSkillLevel = (id: string, level: number) => {
    const updated = skills.map((skill) =>
      skill.id === id ? { ...skill, level } : skill
    );
    updateSkills(updated);
  };

  const renderStars = (
    level: number,
    skillId?: string,
    interactive = false
  ) => {
    return (
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${styles.star} ${
              star <= level ? styles.starFilled : styles.starEmpty
            } ${interactive ? styles.starInteractive : ""}`}
            onClick={
              interactive && skillId
                ? () => updateSkillLevel(skillId, star)
                : undefined
            }
          />
        ))}
      </div>
    );
  };

  const getLevelText = (level: number) => {
    switch (level) {
      case 1:
        return "Beginner";
      case 2:
        return "Novice";
      case 3:
        return "Intermediate";
      case 4:
        return "Advanced";
      case 5:
        return "Expert";
      default:
        return "Intermediate";
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>
        <Award className={styles.icon} />
        Skills
      </h3>

      {/* Add New Skill */}
      <div className={styles.addBox}>
        <h4 className={styles.subheading}>Add New Skill</h4>
        <div className={styles.grid}>
          <div className={styles.colSpanTwo}>
            <label className={styles.label}>Skill Name</label>
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addSkill()}
              className={styles.input}
              placeholder="e.g., JavaScript, Project Management, etc."
            />
          </div>
          <div>
            <label className={styles.label}>Proficiency Level</label>
            <div className={styles.levelSelect}>
              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                className={styles.input}
              >
                <option value={1}>1 - Beginner</option>
                <option value={2}>2 - Novice</option>
                <option value={3}>3 - Intermediate</option>
                <option value={4}>4 - Advanced</option>
                <option value={5}>5 - Expert</option>
              </select>
              {renderStars(newSkillLevel)}
            </div>
          </div>
        </div>
        <button
          onClick={addSkill}
          disabled={!newSkillName.trim()}
          className={styles.addButton}
        >
          <Plus className={styles.iconSmall} />
          Add Skill
        </button>
      </div>

      {/* Skills List */}
      <div className={styles.skillList}>
        {skills.map((skill) => (
          <div key={skill.id} className={styles.skillCard}>
            <div className={styles.skillInfo}>
              <div className={styles.skillText}>
                <h5 className={styles.skillName}>{skill.name}</h5>
                <p className={styles.skillLevel}>{getLevelText(skill.level)}</p>
              </div>
              {renderStars(skill.level, skill.id, true)}
            </div>
            <button
              onClick={() => removeSkill(skill.id)}
              className={styles.removeButton}
            >
              <Trash2 className={styles.iconSmall} />
            </button>
          </div>
        ))}

        {skills.length === 0 && (
          <div className={styles.emptyState}>
            <Award className={styles.emptyIcon} />
            <p>No skills added yet.</p>
            <p className={styles.emptySubtext}>
              Add your first skill above to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
