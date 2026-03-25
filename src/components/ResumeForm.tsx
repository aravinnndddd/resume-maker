import React, { useState } from "react";
import { ResumeData } from "../types";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { ExperienceForm } from "./forms/ExperienceForm";
import { EducationForm } from "./forms/EducationForm";
import { ProjectForm } from "./forms/ProjectForm";
import { SkillsForm } from "./forms/SkillsForm";
import "./FormStyles.css";

interface ResumeFormProps {
  data: ResumeData;
  updateData: (data: ResumeData) => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ data, updateData }) => {
  return (
    <div>
      <PersonalInfoForm
        data={data.personalInfo}
        updateData={(personalInfo) => updateData({ ...data, personalInfo })}
      />
      <ExperienceForm
        experiences={data.experiences}
        updateExperiences={(experiences) => updateData({ ...data, experiences })}
      />
      <EducationForm
        education={data.education}
        updateEducation={(education) => updateData({ ...data, education })}
      />
      <ProjectForm
        projects={data.projects}
        updateProjects={(projects) => updateData({ ...data, projects })}
      />
      <SkillsForm
        skills={data.skills}
        updateSkills={(skills) => updateData({ ...data, skills })}
      />
    </div>
  );
};
