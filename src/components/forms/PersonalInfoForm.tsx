import React, { useState } from "react";
import { PersonalInfo } from "../../types";
import { User, Mail, Phone, MapPin, FileText, ImageIcon, ChevronDown } from "lucide-react";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  updateData: (data: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, updateData }) => {
  const [open, setOpen] = useState(true);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    updateData({ ...data, [field]: value });
  };

  return (
    <div className="form-section">
      <div className="section-header" onClick={() => setOpen(!open)}>
        <div className="section-title">
          <User /> Personal Information
        </div>
        <ChevronDown className={`chevron ${open ? "open" : ""}`} />
      </div>

      {open && (
        <div className="section-body">
          {/* Avatar */}
          <div className="avatar-upload">
            {data.profilePicture ? (
              <img src={data.profilePicture} alt="Profile" className="avatar-preview" />
            ) : (
              <div className="avatar-placeholder"><ImageIcon /></div>
            )}
            <label className="file-input-label">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                className="file-input-hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => updateData({ ...data, profilePicture: reader.result as string });
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>

          <div className="field-grid">
            <div className="field field-full">
              <label className="field-label"><User /> Full Name</label>
              <input className="field-input" value={data.fullName} onChange={(e) => handleChange("fullName", e.target.value)} placeholder="Your Name" />
            </div>
            <div className="field">
              <label className="field-label"><Mail /> Email</label>
              <input className="field-input" type="email" value={data.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="field">
              <label className="field-label"><Phone /> Phone</label>
              <input className="field-input" type="tel" value={data.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="+1 234 567 890" />
            </div>
            <div className="field field-full">
              <label className="field-label"><MapPin /> Address</label>
              <input className="field-input" value={data.address} onChange={(e) => handleChange("address", e.target.value)} placeholder="City, State, Country" />
            </div>
            <div className="field field-full">
              <label className="field-label"><FileText /> Professional Summary</label>
              <textarea className="field-textarea" value={data.summary} onChange={(e) => handleChange("summary", e.target.value)} rows={3} placeholder="Brief summary of your professional background..." />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
