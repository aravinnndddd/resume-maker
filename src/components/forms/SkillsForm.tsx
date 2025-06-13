import React, { useState } from "react";
import { Skill } from "../../types";
import { Award, Plus, Trash2, Star } from "lucide-react";

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
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= level ? "text-yellow-500 fill-current" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
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
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Award className="w-5 h-5 mr-2 text-white" />
        Skills
      </h3>

      {/* Add New Skill */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-white/40">
        <h4 className="font-medium text-white mb-3">Add New Skill</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-white mb-1">
              Skill Name
            </label>
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., JavaScript, Project Management, etc."
              onKeyPress={(e) => e.key === "Enter" && addSkill()}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Proficiency Level
            </label>
            <div className="space-y-2">
              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={1}>1 - Beginner</option>
                <option value={2}>2 - Novice</option>
                <option value={3}>3 - Intermediate</option>
                <option value={4}>4 - Advanced</option>
                <option value={5}>5 - Expert</option>
              </select>
              <div className="flex items-center justify-center">
                {renderStars(newSkillLevel)}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={addSkill}
          disabled={!newSkillName.trim()}
          className="mt-3 flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Skill
        </button>
      </div>

      {/* Skills List */}
      <div className="space-y-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center space-x-4 flex-grow">
              <div className="flex-grow">
                <h5 className="font-medium text-gray-800">{skill.name}</h5>
                <p className="text-sm text-gray-600">
                  {getLevelText(skill.level)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {renderStars(skill.level, skill.id, true)}
              </div>
            </div>
            <button
              onClick={() => removeSkill(skill.id)}
              className="ml-4 text-red-600 hover:text-red-800 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {skills.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Award className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No skills added yet.</p>
            <p className="text-sm">
              Add your first skill above to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
