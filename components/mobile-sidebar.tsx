"use client";
import { Button } from "./ui/button";
import {Menu} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "@/components/sidebar";
interface MobileSidebarInterface{
    apiLimitCount:number;
    isPro:boolean
}
const MobileSidebar =({apiLimitCount,isPro=false}:MobileSidebarInterface)=>{
    return(
        <Sheet>
            <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
            <Menu/>
        </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="p-4 bg-[#a80024]">
                <Sidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
        </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar;