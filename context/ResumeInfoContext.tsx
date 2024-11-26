import React, { createContext, useState, ReactNode } from 'react';

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

interface ResumeInfoContextType {
  resumeInfo: ResumeInfo | null;
  setResumeInfo: React.Dispatch<React.SetStateAction<ResumeInfo | null>>;
}

const ResumeInfoContext = createContext<ResumeInfoContextType | undefined>(undefined);

const ResumeInfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      {children}
    </ResumeInfoContext.Provider>
  );
};

export { ResumeInfoContext, ResumeInfoProvider };
