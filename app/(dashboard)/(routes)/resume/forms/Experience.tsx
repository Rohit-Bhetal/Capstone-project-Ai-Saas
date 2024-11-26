import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useState, useEffect } from 'react';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { AIChatSession } from '@/app/api/AiModelApi';

interface ExperienceEntry {
    id?: string;
    title: string;
    companyName: string;
    city: string;
    state: string;
    startDate: string;
    endDate: string;
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
    workSummery: '',
};

function Experience() {
    const [experienceList, setExperienceList] = useState<ExperienceEntry[]>([]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext) as unknown as ResumeInfoContextType;
    const [loading, setLoading] = useState<boolean>(false);

    // Initialize state only if it's not already initialized
    useEffect(() => {
        if (resumeInfo?.Experience && experienceList.length === 0) {
            setExperienceList(resumeInfo.Experience);
        }
    }, [resumeInfo?.Experience, experienceList]);

    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>): void => {
        const updatedList = [...experienceList];
        const { name, value } = event.target;
        updatedList[index] = {
            ...updatedList[index],
            [name]: value,
        };
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
        setResumeInfo((prev:any) => ({
            ...prev,
            Experience: experienceList,
        }));
        setLoading(false);
        toast.success('Experience saved successfully!');
    };

    // Function to generate summary for an experience entry
    const GenerateSummeryFromAI = async (index: number): Promise<void> => {
        if (!experienceList[index].title) {
            toast('Please Add Position Title');
            return;
        }
        setLoading(true);
        const prompt = `position title: ${experienceList[index].title}, Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experience level and No JSON array), give me result in HTML tags`;

        try {
            const result = await AIChatSession.sendMessage(prompt); // Assuming AIChatSession is set up correctly
            const resp = await result.response.text();
            const updatedList = [...experienceList];
            updatedList[index] = {
                ...updatedList[index],
                workSummery: resp.replace('[', '').replace(']', ''), // Clean up if necessary
            };
            setExperienceList(updatedList);
        } catch (error) {
            toast('Error generating summary');
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
                                <div className="col-span-2">
                                    <RichTextEditor
                                        index={index}
                                        value={item?.workSummery}
                                        onRichTextEditorChange={(value: string) =>
                                            handleRichTextEditor(value, 'workSummery', index)
                                        }
                                        onGenerateSummary={() => GenerateSummeryFromAI(index)} // Trigger AI summary generation
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
