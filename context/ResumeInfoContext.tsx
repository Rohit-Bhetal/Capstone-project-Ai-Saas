// ResumeInfoContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface ResumeInfo {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  address?: string;
  phone?: string;
  email?: string;
  themeColor?: string;
  summery?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: Skill[];
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
  resumeInfo: ResumeInfo | null; // Allowing null
  setResumeInfo: React.Dispatch<React.SetStateAction<ResumeInfo | null>>; // Allowing null for state update
}

export const ResumeInfoContext = createContext<ResumeInfoContextType | undefined>(undefined);

interface ResumeInfoProviderProps {
  children: ReactNode;
}

export const ResumeInfoProvider: React.FC<ResumeInfoProviderProps> = ({ children }) => {
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null); // Allowing null in the state

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      {children}
    </ResumeInfoContext.Provider>
  );
};
