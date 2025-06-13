import React from "react";
import { PersonalInfo } from "../../types";
import { User, Mail, Phone, MapPin, FileText, ImageIcon } from "lucide-react";

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
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <User className="w-5 h-5 mr-2 text-white" />
        Personal Information
      </h3>

      <div className="space-y-4">
        {/* Profile Picture Upload */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            <ImageIcon className="w-4 h-4 inline mr-1" />
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
                    profilePicture: reader.result as string, // base64 image string
                  });
                };
                reader.readAsDataURL(file);
              }
            }}
            className="w-full px-4 py-2 border bg-black/20 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {/* Profile Picture Preview */}
          {data.profilePicture && (
            <img
              src={data.profilePicture}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full mt-2 border border-gray-300"
            />
          )}
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            <Mail className="w-4 h-4 inline mr-1" />
            Email
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="example@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            <Phone className="w-4 h-4 inline mr-1" />
            Phone
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your phone number"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            <MapPin className="w-4 h-4 inline mr-1" />
            Address
          </label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="City, State, Country"
          />
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            <FileText className="w-4 h-4 inline mr-1" />
            Professional Summary
          </label>
          <textarea
            value={data.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Write a brief professional summary highlighting your key skills and experience..."
          />
        </div>
      </div>
    </div>
  );
};
