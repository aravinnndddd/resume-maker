import { useState, useEffect } from "react";
import { ResumeForm } from "./components/ResumeForm";
import { ResumePreview } from "./components/ResumePreview";
import { TemplateSelector } from "./components/TemplateSelector";
import { ResumeData, TemplateType } from "./types";
import { FileText } from "lucide-react";
import style from "./components/styles/Main/app.module.css";

const initialData: ResumeData = {
  personalInfo: {
    fullName: "",
    profilePicture: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
};

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateType>("classic");

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("resumeBuilderData");
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }

    const savedTemplate = localStorage.getItem("resumeBuilderTemplate");
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate as TemplateType);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("resumeBuilderData", JSON.stringify(resumeData));
  }, [resumeData]);

  // Save template preference to localStorage
  useEffect(() => {
    localStorage.setItem("resumeBuilderTemplate", selectedTemplate);
  }, [selectedTemplate]);

  const updateResumeData = (data: ResumeData) => {
    setResumeData(data);
  };

  return (
    <div className={style.body}>
      <div className={style.header}>
        <span style={{ display: "flex" }}>
          <FileText size={40} color="white" />
          <h1>Resume builder</h1>
        </span>

        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onTemplateChange={setSelectedTemplate}
        />
      </div>

      <div className={style.form_prev}>
        <div>
          <ResumeForm data={resumeData} updateData={updateResumeData} />{" "}
          <ResumePreview
            data={resumeData}
            selectedTemplate={selectedTemplate}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className={style.footer}>
        <p>Create professional resumes with ease.</p>
      </footer>
    </div>
  );
}

export default App;
