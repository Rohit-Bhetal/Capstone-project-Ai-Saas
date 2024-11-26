import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState, useRef } from 'react';

interface PersonalDetailProps {
  enabledNext: (isValid: boolean) => void;
}

interface FormData {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  address?: string;
  phone?: string;
  email?: string;
  [key: string]: string | undefined;
}

interface ResumeInfo extends FormData {
  [key: string]: any;
}

interface ResumeInfoContextType {
  resumeInfo: ResumeInfo;
  setResumeInfo: React.Dispatch<React.SetStateAction<ResumeInfo>>;
}

function PersonalDetail({ enabledNext }: PersonalDetailProps) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext) as unknown as ResumeInfoContextType;

  // Initialize formData with default values or resumeInfo from context, handling null or undefined values
  const [formData, setFormData] = useState<FormData>({
    firstName: resumeInfo?.firstName || '',
    lastName: resumeInfo?.lastName || '',
    jobTitle: resumeInfo?.jobTitle || '',
    address: resumeInfo?.address || '',
    phone: resumeInfo?.phone || '',
    email: resumeInfo?.email || '',
  });

  const isFirstRender = useRef(true); // Ref to check if it's the first render

  // Update enabledNext based on formData only after the first render
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Skip the first render
      return;
    }

    // Check if all fields are filled
    const allFieldsFilled = Object.values(formData).every((value) => typeof value === 'string' && value.length > 0);

    enabledNext(allFieldsFilled); // Enable or disable the "Next" button
  }, [formData, enabledNext]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Sync resumeInfo with formData when formData changes
  useEffect(() => {
    setResumeInfo((prevResumeInfo) => ({
      ...prevResumeInfo,
      ...formData,
    }));
  }, [formData, setResumeInfo]);

  return (
    <div className="p-5  shadow-lg rounded-lg border-t-primary  border-t-4 mt-10">
      <h2 className="font-bold text-lg text-[#a80024]">Personal Detail</h2>
      <p>Get Started with the basic information</p>
      <div className="grid grid-cols-2 mt-5 gap-3">
        <div>
          <label className="text-sm">First Name</label>
          <Input
            name="firstName"
            value={formData.firstName || ''} // Use formData directly
            required
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="text-sm">Last Name</label>
          <Input
            name="lastName"
            value={formData.lastName || ''}
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-2">
          <label className="text-sm">Job Title</label>
          <Input
            name="jobTitle"
            value={formData.jobTitle || ''}
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-2">
          <label className="text-sm">Address</label>
          <Input
            name="address"
            value={formData.address || ''}
            required
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="text-sm">Phone</label>
          <Input
            name="phone"
            value={formData.phone || ''}
            required
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="text-sm">Email</label>
          <Input
            name="email"
            value={formData.email || ''}
            required
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}

export default PersonalDetail;
