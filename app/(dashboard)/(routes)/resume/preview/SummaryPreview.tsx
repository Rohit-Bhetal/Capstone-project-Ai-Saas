import React from 'react';

interface ResumeInfo {
  summery?: string; // Optional string field
}

interface SummaryPreviewProps {
  resumeInfo: ResumeInfo;
}

const SummaryPreview: React.FC<SummaryPreviewProps> = ({ resumeInfo }) => {
  return (
    <p className="text-xs">
      {resumeInfo?.summery}
    </p>
  );
};

export default SummaryPreview;
