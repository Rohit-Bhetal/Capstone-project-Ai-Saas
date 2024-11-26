import React from 'react';

interface Education {
  universityName: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ResumeInfo {
  themeColor?: string;
  education: Education[];
}

interface EducationalPreviewProps {
  resumeInfo: ResumeInfo;
}

const EducationalPreview: React.FC<EducationalPreviewProps> = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2 
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor
        }}
      >
        Education
      </h2>
      <hr 
        style={{
          borderColor: resumeInfo?.themeColor
        }} 
      />
      {resumeInfo?.education.map((education, index) => (
        <div key={index} className="my-5">
          <h2 
            className="text-sm font-bold"
            style={{
              color: resumeInfo?.themeColor
            }}
          >
            {education.universityName}
          </h2>
          <h2 className="text-xs flex justify-between">
            {education.degree} in {education.major}
            <span>{education.startDate} - {education.endDate}</span>
          </h2>
          <p className="text-xs my-2">
            {education.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EducationalPreview;