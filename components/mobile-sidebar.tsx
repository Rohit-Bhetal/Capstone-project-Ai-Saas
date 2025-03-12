"use client";
import { Button } from "./ui/button";
import {Menu} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "@/components/sidebar";
interface MobileSidebarInterface{
    apiLimitCount:number
}
const MobileSidebar =({apiLimitCount}:MobileSidebarInterface)=>{
    return(
        <Sheet>
            <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
            <Menu/>
        </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="p-4 bg-[#a80024]">
                <Sidebar apiLimitCount={apiLimitCount}/>
        </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar;