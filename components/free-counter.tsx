'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModel } from "@/hooks/use-pro-modal";



export default function FreeCounter({
    apiLimitCount = 0,
    isPro = false
  }: {
    apiLimitCount: number;
    isPro: boolean;
  }){
    const [mounted,setMounted] = useState(false);
    const proModal = useProModel();
    useEffect(()=>{
        setMounted(true);
    },[]);
    if(!mounted){
        return null;
    }
    if (isPro) return null;
    return (
        <div className="px-3">
            <Card className='bg-white/10 border-0 '>
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>
                            {apiLimitCount}/{MAX_FREE_COUNTS} Free Generations
                        </p>
                        <Progress className="h-3 bg-gradient-to-r from  bg-indigo-500 via-pink-600 to-red-900" value={apiLimitCount/MAX_FREE_COUNTS*100}/>
                    </div>
                    <Button onClick={proModal.onOpen} className="w-full" variant={"supreme"}>
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white"/>

                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}