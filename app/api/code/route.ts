import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

export async function POST(
    req:Request
){
    try {
        const body =await req.json();
        const {messages} =body;
        if(!genAI){
            return new NextResponse("Gemini API Key not configured", { status: 500 });
        }

        if (!messages || !Array.isArray(messages)) {
            return new NextResponse("Invalid or missing messages", { status: 400 });
          }
      
          const chat = model.startChat();
          let response;
      
          for (const message of messages) {
            if (message.role === "user") {
              response = await chat.sendMessage(message.parts.join(" "));
            }
          }
      
          if (!response) {
            return new NextResponse("No response generated", { status: 500 });
          }
      
          const responseText = response.response.text();
          return NextResponse.json({
            role: "model",
            parts: [responseText]
          });
      

    } catch (error) {
        console.log("[CONVERSATION_ERROR]",error);
        return  new NextResponse("Internal error",{
            status:500
        })
    }
}