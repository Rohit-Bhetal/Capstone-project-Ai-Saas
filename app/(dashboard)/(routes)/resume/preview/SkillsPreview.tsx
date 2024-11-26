import React from 'react';

interface Skill {
  name: string;
  rating: number; // Assuming `rating` is a number between 0 and 5 (or 0-100 scaled to percentage).
}

interface ResumeInfo {
  themeColor?: string;
  skills: Skill[];
}

interface SkillsPreviewProps {
  resumeInfo: ResumeInfo;
}

const SkillsPreview: React.FC<SkillsPreviewProps> = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Skills
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      <div className="grid grid-cols-2 gap-3 my-4">
        {resumeInfo?.skills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            <h2 className="text-xs">{skill.name}</h2>
            <div className="h-2 bg-gray-200 w-[120px]">
              <div
                className="h-2"
                style={{
                  backgroundColor: resumeInfo?.themeColor,
                  width: skill?.rating * 20 + '%', // Assuming rating is scaled 1-5; adjust multiplier if not.
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsPreview;
