import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'next/navigation'

// Import or define the ResumeInfo interface
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
    education: Array<{
        id: number;
        universityName: string;
        startDate: string;
        endDate: string;
        degree: string;
        major: string;
        description: string;
    }>;
    skills: Array<{
        id: number;
        name: string;
        rating: number;
    }>;
}

interface ResumeInfoContextType {
    resumeInfo: ResumeInfo | null;
    setResumeInfo: React.Dispatch<React.SetStateAction<ResumeInfo | null>>;
}

const ThemeColor: React.FC = () => {
    const colors: string[] = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
    ];

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext) as ResumeInfoContextType;
    const [selectedColor, setSelectedColor] = useState<string>(resumeInfo?.themeColor || colors[0]);
    const { resumeId } = useParams();

    const onColorSelect = (color: string): void => {
        if (!resumeInfo) return;
        
        setSelectedColor(color);
        setResumeInfo({
            ...resumeInfo,
            themeColor: color
        });
    };

    if (!resumeInfo) return null;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm"
                    className="flex gap-2 ">
                    <LayoutGrid className='text-[#a80024]' /> Theme
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
                <div className="grid grid-cols-5 gap-3">
                    {colors.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => onColorSelect(item)}
                            className={`h-5 w-5 rounded-full cursor-pointer
                                hover:border-black border
                                ${selectedColor === item && 'border border-black'}
                            `}
                            style={{
                                background: item
                            }}
                        />
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default ThemeColor;