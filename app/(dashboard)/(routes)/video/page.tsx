"use client";

import {   Video, VideoIcon } from "lucide-react";
import {Heading} from "@/components/heading";

const VideoPage = ()=>{
    
    return (
        <div className=" w-full h-screen ">
            <iframe
            src="https://videosummarizationusingphidata.streamlit.app/?embed=true"
            className="w-full h-full border-none"/>
        </div>
    );
}

export default VideoPage;