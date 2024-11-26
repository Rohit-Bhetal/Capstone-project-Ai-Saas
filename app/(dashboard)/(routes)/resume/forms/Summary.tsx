import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

import { jsPDF } from 'jspdf'; // Import jsPDF to generate the PDF
import { AIChatSession } from '@/app/api/AiModelApi';

// Define the expected structure for AI-generated summary
interface AIGeneratedSummary {
  experience_level: string;
  summary: string;
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

const prompt = "Job Title: {jobTitle} , Depends on job title give me list of summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";

interface SummeryProps {
  enabledNext: (enabled: boolean) => void;
}

const Summery: React.FC<SummeryProps> = ({ enabledNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext) as { resumeInfo: ResumeInfo | null, setResumeInfo: React.Dispatch<React.SetStateAction<ResumeInfo | null>> }; // Type assertion
  const [summery, setSummery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { resumeId } = useParams<{ resumeId: string }>();
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState<AIGeneratedSummary[]>([]); // Initialize as an empty array

  useEffect(() => {
    if (summery && resumeInfo) {
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
    }
  }, [summery, resumeInfo, setResumeInfo]);

  // Generate summary using AI
  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle || '');
    console.log(PROMPT);
    const result = await AIChatSession.sendMessage(PROMPT);
    const generatedSummaries = JSON.parse(result.response.text()) as AIGeneratedSummary[];
    setAiGenerateSummeryList(generatedSummaries);
    setLoading(false);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summery</h2>
        <p>Add Summery for your job title</p>

        <form className="mt-7">
          <div className="flex justify-between items-end">
            <label>Add Summery</label>
            <Button
              variant="outline"
              onClick={GenerateSummeryFromAI}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            value={summery}
            defaultValue={summery || resumeInfo?.summery}
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList.length > 0 && ( // Check if there are items in the list
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummery(item?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">Level: {item?.experience_level}</h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Summery;
