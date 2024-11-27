import React, { useContext, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import RichTextEditor from '../RichTextEditor';
import { AIChatSession } from '@/app/api/AiModelApi';

interface ExperienceEntry {
  id?: string;
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  workSummery: string;
}

interface ResumeInfoContextType {
  resumeInfo: {
    Experience: ExperienceEntry[];
  };
  setResumeInfo: React.Dispatch<React.SetStateAction<any>>;
}

const formField: ExperienceEntry = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  currentlyWorking: false,
  workSummery: '',
};

function Experience() {
  const [experienceList, setExperienceList] = useState<ExperienceEntry[]>([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext) as unknown as ResumeInfoContextType;
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (resumeInfo?.Experience && experienceList.length === 0) {
      setExperienceList(resumeInfo.Experience);
    }
  }, [resumeInfo?.Experience, experienceList]);

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>): void => {
    const updatedList = [...experienceList];
    const { name, type, checked, value } = event.target;

    // Handle checkbox specifically for 'currentlyWorking' field
    if (type === "checkbox" && name === "currentlyWorking") {
      updatedList[index] = {
        ...updatedList[index],
        [name]: checked,  // 'checked' is boolean, it will match the boolean expected by 'currentlyWorking'
      };
    } else {
      updatedList[index] = {
        ...updatedList[index],
        [name]: value,  // for other fields (like text or date), use 'value'
      };
    }

    setExperienceList(updatedList);
  };

  const handleRichTextEditor = (value: string, name: string, index: number): void => {
    const updatedList = [...experienceList];
    updatedList[index] = {
      ...updatedList[index],
      [name]: value,
    };
    setExperienceList(updatedList);
  };

  const addNewExperience = (): void => {
    const updatedList = [...experienceList, { ...formField }];
    setExperienceList(updatedList);
  };

  const onSave = (): void => {
    setLoading(true);
    setResumeInfo((prev: any) => {
      const updatedResumeInfo = {
        ...prev,
        Experience: experienceList,
      };
      console.log(updatedResumeInfo); // Log to check if the state is updated
      return updatedResumeInfo;
    });
    setLoading(false);
    toast.success('Experience saved successfully!');
  };

  const GenerateSummeryFromAI = async (index: number): Promise<void> => {
  setLoading(true);
  const PROMPT = `Generate a summary for the job experience: ${experienceList[index].title || 'Software Developer'}.`;
  
  try {
    const result = await AIChatSession.sendMessage(PROMPT);
    const generatedSummaries = JSON.parse(result.response.text());
    
    const updatedList = [...experienceList];
    updatedList[index].workSummery = generatedSummaries.summary;
    setExperienceList(updatedList);
    
    toast.success('Summary generated successfully!');
  } catch (error) {
    toast.error('Failed to generate summary.');
    console.error(error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your previous job experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.title}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.companyName}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.city}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.state}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.startDate}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.endDate}
                  />
                </div>
                <div>
                  <label className="text-xs">Currently Working</label>
                  <Input
                    type="checkbox"
                    name="currentlyWorking"
                    onChange={(e) => handleChange(index, e)}
                    checked={item?.currentlyWorking}
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    value={item?.workSummery || ''} // Ensure value is a string
                    onRichTextEditorChange={(value: string) =>
                      handleRichTextEditor(value, 'workSummery', index)
                    }
                    onGenerateSummary={() => GenerateSummeryFromAI(index)} // Pass the generate summary function
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={addNewExperience} className="text-primary">
            + Add More Experience
          </Button>
          <Button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
