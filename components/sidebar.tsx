"use client";

import Link from "next/link";
import  Image  from 'next/image';
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard,File, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { FreeCounter } from "./free-counter";

const poppins =Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [{
    label:"Dashboard",
    icon:LayoutDashboard,
    href:"/dashboard",
    color:"text-sky-500",
},
{
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Resume Builder",
    icon: File,
    color: "text-red-700",
    href: "/resume",
},
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },];

  interface SideBarProps{
    apiLimitCount:number;
  }
const Sidebar=({apiLimitCount=0}:SideBarProps)=>{
    const pathname=usePathname();
    return (
        <div className="spaspace-y-4 py-4 flex flex-col h-full bg-[#a80024] text-white">
            <div className="px-3 py-2 flex-1">
            <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                <div className="relative w-6 h-6 mr-2 mt-1">
                    <Image fill className="animate-pulse" alt="Logo" src="/icon.svg" />
                </div>
                <h1 className={cn("text-2xl font-bold",poppins.className)}>
                AetherAI
                </h1>
            </Link>
            <div className="space-y-1">
                {
                    routes.map((route)=>(
                        <Link
                        href={route.href}
                        key={route.href}
                        className={cn(
                            "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                            pathname === route.href ? "bg-white/10  text-zinc-400" : "text-white"
                        )}>
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>

                    ))
                }
            </div>
            </div>
            <FreeCounter apiLimitCount={apiLimitCount}/>
        </div>
    );
}

export default Sidebar;