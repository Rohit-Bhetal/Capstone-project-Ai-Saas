"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/nextjs";

const font =Poppins({
    weight:"600",
    subsets:['latin']
});


export const LandingNavbar = () => {
    const { isSignedIn } = useAuth();
  
    return (
      <nav className="p-4 bg-transparent flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative h-8 w-8 mr-4">
            <Image fill src="/icon.svg" alt="Logo" />
          </div>
          <h1 className={cn("text-2xl font-bold text-[#a80024]", font.className)}>AetherAi</h1>
        </Link>
        <div className="flex items-center gap-x-2">
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            <Button variant="destructive" className="rounded-full bg-gradient-to-r from-[#a80024] to-[#F50202] text-white shadow-xl">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
    );
  };