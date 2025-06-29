import React from "react";
import { PersonalInfo } from "../../types";
import { User, Mail, Phone, MapPin, FileText, ImageIcon } from "lucide-react";
import styles from "../styles/Form/pers.module.css";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  updateData: (data: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  data,
  updateData,
}) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    updateData({ ...data, [field]: value });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>
        <User className={styles.icon} />
        Personal Information
      </h3>

      <div className={styles.formGroup}>
        {/* Profile Picture Upload */}
        <div>
          <label className={styles.label}>
            <ImageIcon className={styles.iconInline} />
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  updateData({
                    ...data,
                    profilePicture: reader.result as string,
                  });
                };
                reader.readAsDataURL(file);
              }
            }}
            className={`${styles.inputFile}`}
          />
          {data.profilePicture && (
            <img
              src={data.profilePicture}
              alt="Profile"
              className={styles.profilePreview}
            />
          )}
        </div>

        {/* Full Name */}
        <div>
          <label className={styles.label}>Full Name</label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className={styles.input}
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className={styles.label}>
            <Mail className={styles.iconInline} />
            Email
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={styles.input}
            placeholder="example@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label className={styles.label}>
            <Phone className={styles.iconInline} />
            Phone
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={styles.input}
            placeholder="Your phone number"
          />
        </div>

        {/* Address */}
        <div>
          <label className={styles.label}>
            <MapPin className={styles.iconInline} />
            Address
          </label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className={styles.input}
            placeholder="City, State, Country"
          />
        </div>

        {/* Summary */}
        <div>
          <label className={styles.label}>
            <FileText className={styles.iconInline} />
            Professional Summary
          </label>
          <textarea
            value={data.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            rows={4}
            className={`${styles.input} ${styles.textarea}`}
            placeholder="Write a brief professional summary highlighting your key skills and experience..."
          />
        </div>
      </div>
    </div>
  );
};
