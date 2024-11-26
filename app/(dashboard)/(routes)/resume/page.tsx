// Marking the file as a client component
'use client';

import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useState, useEffect } from 'react';
import FormSection from '@/components/formSection';
import ResumePreview from '@/components/resumePreview';
import { useParams } from 'next/navigation';

interface ResumeInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
  themeColor: string;
  summery: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

interface Experience {
  id: number;
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  workSummery: string;
}

interface Education {
  id: number;
  universityName: string;
  startDate: string;
  endDate: string;
  degree: string;
  major: string;
  description: string;
}

interface Skill {
  id: number;
  name: string;
  rating: number;
}

const Resumepage: React.FC = () => {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default Resumepage;
