"use client";

import {   Video, VideoIcon } from "lucide-react";
import {Heading} from "@/components/heading";

const VideoPage = ()=>{
    
    return (
        <div>
            <Heading
        title="Video"
        description="Our most advanced AI Video model."
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="transparent"
      />
      <div className="px-4 lg:px-8">
            <div className='flex w-full flex-col  justify-center items-center'>
                <Video className="size-32 mt-32 text-orange-700"/>
                <h2 className='mt-10 text-4xl font-bold'>Sorry for inconvenience</h2>
                <p className='text-xs text-slate-500'>Video Model are very high demanding CPU and GPU work.We will be adding it in future Soon!</p>
            </div>
        </div>
        </div>
    );
}

export default VideoPage;