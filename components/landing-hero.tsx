"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";

import { Button } from "./ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="text-[#a80024] font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best AI Tool Platform</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#a80024] to-[#F50202]">
          <TypewriterComponent
            options={{
              strings: ["Chatbot.", "Photo Generation.", "Music Generation.", "Code Generation.", "Video Summarization Generation.","Ai Agent's."],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-black">Use the power of Ai in to bring your dreams into reality.</div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="default" className="md:textlg p-4 md:p-6 rounded-full font-semibold ">
            Start Generating For Free
          </Button>
        </Link>
      </div>
      <div className="text-[#a80024] text-xs md:text-sm font-normal">No credit card required. Cancel anytime.</div>
    </div>
  );
};