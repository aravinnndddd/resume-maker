import React, { useState, useEffect } from 'react';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { TemplateSelector } from './components/TemplateSelector';
import { ResumeData, TemplateType } from './types';
import { FileText } from 'lucide-react';

const initialData: ResumeData = {
  personalInfo: {
    profilePicture: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    summary: ''
  },
  experiences: [],
  education: [],
  skills: [],
  projects: []
};

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('classic');

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeBuilderData');
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }

    const savedTemplate = localStorage.getItem('resumeBuilderTemplate');
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate as TemplateType);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData));
  }, [resumeData]);

  // Save template preference to localStorage
  useEffect(() => {
    localStorage.setItem('resumeBuilderTemplate', selectedTemplate);
  }, [selectedTemplate]);

  const updateResumeData = (data: ResumeData) => {
    setResumeData(data);
  };

  return (
    <div className="min-h-screen bg-black/80">
      {/* Header */}
      <header className="bg-black/80 shadow-sm ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-white mr-3" />
            <h1 className="text-2xl font-bold text-white">Resume Builder</h1>
            
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Template Selector */}
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onTemplateChange={setSelectedTemplate}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Form Section */}
          <div className="overflow-hidden">
            <ResumeForm data={resumeData} updateData={updateResumeData} />
          </div>

          {/* Preview Section */}
          <div className="overflow-hidden">
            <ResumePreview data={resumeData} selectedTemplate={selectedTemplate} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>Create professional resumes with ease.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;