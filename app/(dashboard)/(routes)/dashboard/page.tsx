"use client";

import { useRouter } from "next/navigation";
import {
	ArrowRight,
	Code,
	ImageIcon,
	MessageSquare,
	Music,
	VideoIcon,
	File,
	Microscope,
	BriefcaseMedical

} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const tools = [
	{
		label: "Conversation",
		icon: MessageSquare,
		color: "text-violet-500",
		bgColor: "bg-violet-500/10",
		href: "/conversation",
	},
	{
		label: "Music Generation",
		icon: Music,
		color: "text-emerald-500",
		bgColor: "bg-emerald-500/10",
		href: "/music",
	},
	{
		label: "Image Generation",
		icon: ImageIcon,
		color: "text-pink-700",
		bgColor: "bg-pink-700/10",
		href: "/image",
	},
	{
		label: "Video Summarization",
		icon: VideoIcon,
		color: "text-orange-700",
		bgColor: "bg-orange-700/10",
		isFree:"True",
		href: "/video",
	},
	{
		label: "Code Generation",
		icon: Code,
		color: "text-green-700",
		bgColor: "bg-green-700/10",
		href: "/code",
	},
	
	{
		label: "Health Ai Agent",
		icon: BriefcaseMedical,
		color: "text-pink-700",
		href: "/health",
		isFree:"True"
	},
	  {
		label: "Research Helper Agentic Ai",
		icon: Microscope ,
		color: "text-blue-700",
		href: "/research",
		isFree:"True"
	},
];

const DashboardPage = ()=>{
    const router = useRouter();

	return (
		<div>
			<div className="mb-8 space-y-4">
				<h2 className="text-2xl md:text-4xl font-bold text-center text-[#a80024]">
					Bring Your Ai tools in One
				</h2>
				<p className="text-muted-foreground font-light text-sm md:text-base text-center  pl-4 pr-4">
					AetherAi is a platform that allows you to generate music, videos and other Custom Ai Model using the Power of Ai.
				</p>
			</div>
			<div className="px-4 md:px-20 lg:px-32 space-y-4">
				{tools.map((tool) => (
					<Card
						onClick={() => router.push(tool.href)}
						key={tool.href}
						className={
							"p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer "
						}
					>
						<div className="flex items-center gap-x-4">
							<div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
								<tool.icon className={cn("w-8 h-8", tool.color)} />
							</div>
							<div className="font-semibold">{tool.label}</div>
							{tool.isFree?<div className="rounded-xl font-bold animate h-8 x-10 border px-4 py-2 text-center pt-1 pr-1">Free🔥</div>:<></>}
						</div>
						<ArrowRight className="w-5 h-5 text-[#a80024]" />
					</Card>
				))}
			</div>
		</div>
	);
}
export default DashboardPage;