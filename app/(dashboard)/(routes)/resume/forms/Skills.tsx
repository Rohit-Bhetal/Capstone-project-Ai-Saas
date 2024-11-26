import { Input } from '@/components/ui/input';
import React, { useContext, useState, useEffect } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'next/navigation';
import { Check } from 'lucide-react'; // Import checkmark icon

interface Skill {
  id?: string;
  name: string;
  rating: number;
}

interface ResumeInfo {
  skills: Skill[];
  [key: string]: any;
}

interface ResumeInfoContextType {
  resumeInfo: ResumeInfo;
  setResumeInfo: React.Dispatch<React.SetStateAction<ResumeInfo>>;
}

function Skills() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext) as unknown as ResumeInfoContextType;
  const [skillsList, setSkillsList] = useState<Skill[]>(resumeInfo.skills || []);
  const { resumeId } = useParams<{ resumeId: string }>();
  const [loading, setLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false); // Track if input is confirmed

  // Handle input changes for skill name and rating
  const handleChange = (index: number, name: string, value: string | number): void => {
    setSkillsList((prevSkills) => {
      const newEntries = [...prevSkills];
      newEntries[index] = {
        ...newEntries[index],
        [name]: value,
      };
      return newEntries;
    });

    setIsConfirmed(false); // Reset confirmation status every time input changes
  };

  // Add a new skill entry
  const AddNewSkills = (): void => {
    setSkillsList((prevSkills) => [
      ...prevSkills,
      {
        name: '',
        rating: 0,
      },
    ]);
  };

  // Remove the last skill entry
  const RemoveSkills = (): void => {
    setSkillsList((prevSkills) => prevSkills.slice(0, -1));
  };

  // Update resumeInfo when skillsList changes (outside of handleChange)
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList, setResumeInfo, resumeInfo]);

  // Handle confirmation (when user clicks the tick button)
  const handleConfirm = (): void => {
    setIsConfirmed(true);
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add Your top professional key skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div key={index} className="flex justify-between mb-2 border rounded-lg p-3">
            <div>
              <label className="text-xs">Name</label>
              <Input
                className="w-full"
                value={item.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v: string | number) => handleChange(index, 'rating', v)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={AddNewSkills} className="text-primary">
            + Add More Skill
          </Button>
          <Button variant="outline" onClick={RemoveSkills} className="text-primary">
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={handleConfirm}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Tick'}
        </Button>
      </div>

      {/* Preview Section */}
      {isConfirmed && (
        <div className="mt-4">
          <h3 className="font-bold">Preview</h3>
          <div>
            {skillsList.map((item, index) => (
              <div key={index} className="flex justify-between mb-2">
                <span>{item.name}</span>
                <span>{item.rating}</span>
              </div>
            ))}
            <Check className="text-green-500 mt-2" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Skills;
