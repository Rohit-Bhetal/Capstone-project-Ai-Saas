"use client";

import {  AudioWaveform, MessageSquare, Music } from "lucide-react";
import {Heading} from "@/components/heading";

const MusicPage = ()=>{
    
    return (
        <div>
            <Heading
        title="Music"
        description="Our most advanced AI Music model."
        icon={Music}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
            <div className='flex w-full flex-col  justify-center items-center'>
                <AudioWaveform className="size-32 mt-32 text-violet-500"/>
                <h2 className='mt-10 text-4xl font-bold'>Sorry for inconvenience</h2>
                <p className='text-xs text-slate-500'>Music Model are very high demanding CPU and GPU work.We will be adding it in future</p>
            </div>
        </div>
        </div>
    );
}

export default MusicPage;