import React, { useState, useContext } from 'react';
import PersonalDetail from '@/app/(dashboard)/(routes)/resume/forms/PersonalDetail';
import Summery from '@/app/(dashboard)/(routes)/resume/forms/Summary';
import Experience from '@/app/(dashboard)/(routes)/resume/forms/Experience';
import Education from '@/app/(dashboard)/(routes)/resume/forms/Education';
import Skills from '@/app/(dashboard)/(routes)/resume/forms/Skills';

import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';
import ThemeColor from '@/app/(dashboard)/(routes)/resume/ThemeColor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import ResumePreview from './resumePreview';

const FormSection: React.FC = () => {
  const [activeFormIndex, setActiveFormIndex] = useState<number>(1);
  const [enableNext, setEnableNext] = useState<boolean>(false); // Default is false, change once form is validated
  useContext(ResumeInfoContext); // Access resume data

  const renderFormComponent = () => {
    switch (activeFormIndex) {
      case 1:
        return <PersonalDetail enabledNext={setEnableNext} />;
      case 2:
        return <Summery enabledNext={setEnableNext} />;
      case 3:
        return <Experience />;
      case 4:
        return <Education />;
      case 5:
        return <Skills />;
      case 6:
        return (
          <div>
            <h2 className="text-2xl font-medium mb-4 text-center">
              Your Resume Preview
            </h2>
            <div id="resume-preview">
              <ResumePreview />
            </div>
            <div className="mt-4 flex justify-center gap-4">
              {/* Remove Download PDF button */}
              <Button onClick={() => window.print()} className="bg-gray-500 text-white">
                Print
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link href="/dashboard">
            <Button className=' bg-[#a80024]'>
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button 
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          {activeFormIndex < 6 && (
            <Button
              disabled={!enableNext}
              className="flex gap-2"
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            >
              Next
              <ArrowRight />
            </Button>
          )}
        </div>
      </div>

      {renderFormComponent()}
    </div>
  );
};

export default FormSection;
