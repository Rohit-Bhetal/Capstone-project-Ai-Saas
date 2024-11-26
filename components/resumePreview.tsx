import React, { useContext } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import PersonalDetailPreview from '@/app/(dashboard)/(routes)/resume/preview/PersonalDetailPreview';
import ExperiencePreview from '@/app/(dashboard)/(routes)/resume/preview/ExperiencePreview';
import EducationalPreview from '@/app/(dashboard)/(routes)/resume/preview/EducationPreview';
import SkillsPreview from '@/app/(dashboard)/(routes)/resume/preview/SkillsPreview';

// Define types for ResumeInfo
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

// Adjust the context type
interface ResumeInfoContextType {
  resumeInfo: ResumeInfo;
  setResumeInfo: React.Dispatch<React.SetStateAction<ResumeInfo | null>>;
}

function ResumePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext) as ResumeInfoContextType;

  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* Personal Detail  */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      {/* Summery  */}
      <div>{resumeInfo?.summery}</div> {/* Assuming you want to display the summary */}
      {/* Professional Experience  */}
      {resumeInfo?.experience?.length > 0 && <ExperiencePreview resumeInfo={resumeInfo} />}
      {/* Educational  */}
      {resumeInfo?.education?.length > 0 && <EducationalPreview resumeInfo={resumeInfo} />}
      {/* Skills  */}
      {resumeInfo?.skills?.length > 0 && <SkillsPreview resumeInfo={resumeInfo} />}
    </div>
  );
}

export default ResumePreview;
