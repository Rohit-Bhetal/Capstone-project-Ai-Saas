'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProModel } from "@/hooks/use-pro-modal";
import { Badge } from "@/components/ui/badge";
import { Check, Code, File, ImageIcon, MessageSquare, Music, VideoIcon, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
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
		label: "Video Generation",
		icon: VideoIcon,
		color: "text-orange-700",
		bgColor: "bg-orange-700/10",
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
		label: "Resume Builder",
		icon: File,
		color: "text-red-700",
		bgColor: "bg-red-700/10",
		href: "/resume",
	},
];
export const ProModal =()=>{
    const proModal = useProModel();
	const [loading,setLoading]= useState(false);

	const onSubscribe = async()=>{
		try {
			setLoading(true);
			const response = axios.get('/api/stripe');
			window.location.href=(await response).data.url;
			
		} catch (error) {
			console.log(error,"STRIPE_CLIENT_ERROR")
			toast.error("Something went wrong.")
		}finally{
			setLoading(false);
		}
	}

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center">
                            Upgrade to Premium
                                <Badge className="uppercase text-sm py-1" variant={"supreme"}>
                                    pro
                                </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        {tools.map((tool)=>(
                            <Card key={tool.label} className="p-3 border-black/5 flex items-center justify-between">
                                <div className="flex items-center  gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md",tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6",tool.color)}/>
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check/>
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button size="lg"
						disabled={loading}
					    onClick={onSubscribe}
                        variant="supreme"
                        className="w-full">
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}