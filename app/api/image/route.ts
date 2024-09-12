
import { NextResponse } from "next/server";


export async function POST(
    req:Request
){
    try {
        const body =await req.json();
        const {messages} =body;


        if (!messages || !Array.isArray(messages)) {
            return new NextResponse("Invalid or missing messages", { status: 400 });
          }
          const response = await fetch('https://api.aimlapi.com/images/generations', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "prompt": messages
            }),
        });
        if (!response) {
          return new NextResponse("No response generated", { status: 500 });
        }
        return  NextResponse.json({
          role: "model",
          parts: [response.url]
        });;
         
      
          
      

    } catch (error) {
        console.log("[CONVERSATION_ERROR]",error);
        return  new NextResponse("Internal error",{
            status:500
        })
    }
}