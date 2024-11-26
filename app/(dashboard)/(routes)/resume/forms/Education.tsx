import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

interface EducationEntry {
  id?: number;
  universityName: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  description: string;
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
  experience: Array<{
    id: number;
    title: string;
    companyName: string;
    city: string;
    state: string;
    startDate: string;
    endDate?: string;
    currentlyWorking: boolean;
    workSummery: string;
  }>;
  education: EducationEntry[];
  skills: Array<{
    id: number;
    name: string;
    rating: number;
  }>;
}

interface ResumeInfoContextType {
  resumeInfo: ResumeInfo;
  setResumeInfo: React.Dispatch<React.SetStateAction<ResumeInfo>>;
}

const Education: React.FC = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext) as ResumeInfoContextType;
  const [loading, setLoading] = useState<boolean>(false);
  const { resumeId } = useParams();

  const initialEducationEntry: EducationEntry = {
    universityName: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: ''
  };

  const [educationalList, setEducationalList] = useState<EducationEntry[]>(resumeInfo.education || [initialEducationEntry]);

  useEffect(() => {
    if (resumeInfo?.education) {
      setEducationalList(resumeInfo.education);
    }
  }, [resumeInfo]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ): void => {
    const newEntries = [...educationalList];
    const { name, value } = event.target;
    
    newEntries[index] = {
      ...newEntries[index],
      [name]: value
    };
    
    setEducationalList(newEntries);
  };

  const AddNewEducation = (): void => {
    setEducationalList([...educationalList, { ...initialEducationEntry }]);
  };

  const RemoveEducation = (): void => {
    if (educationalList.length > 1) {
      setEducationalList(prev => prev.slice(0, -1));
    }
  };

  const validateForm = (): boolean => {
    return educationalList.every(entry => {
      return entry.universityName && entry.degree && entry.major && entry.startDate;
    });
  };

  const onSave = (): void => {
    if (!validateForm()) {
      alert('Please fill out all required fields');
      return;
    }

    setLoading(true);

    // Update resumeInfo context with the new education list
    setResumeInfo((prevResumeInfo) => {
      if (prevResumeInfo) {
        return {
          ...prevResumeInfo,
          education: educationalList // Save the updated education list into context
        };
      }
      return prevResumeInfo;
    });

    setLoading(false);
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add Your educational details</p>
      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label>University Name</label>
                <Input 
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  value={item.universityName}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input 
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                  value={item.degree}
                />
              </div>
              <div>
                <label>Major</label>
                <Input 
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                  value={item.major}
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input 
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  value={item.startDate}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input 
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  value={item.endDate}
                />
              </div>
              <div className="col-span-2">
                <label>Description</label>
                <Textarea 
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  value={item.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={AddNewEducation} className="text-primary">
            + Add More Education
          </Button>
          <Button variant="outline" onClick={RemoveEducation} className="text-primary">
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  );
};

export default Education;
