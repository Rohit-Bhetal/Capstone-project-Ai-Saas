"use client";

import { useEffect } from "react";
import {Crisp} from "crisp-sdk-web";

export const CrispChat = ()=>{

    useEffect(()=>{
        Crisp.configure("41b324ce-a29a-49b0-81f7-958afff684b9")
    },[])

    return null;
}