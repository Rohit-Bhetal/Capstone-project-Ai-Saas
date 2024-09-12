// "use client";

// import * as z from 'zod';
// import {   ImageIcon } from "lucide-react";
// import {Heading} from "@/components/heading";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// import { formSchema } from './constants';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import { cn } from '@/lib/utils';
// import Markdown from 'react-markdown';
// import { Empty } from '@/components/empty';
// import { Loader } from '@/components/loader';
// import { UserAvatar } from '@/components/user-avatar';
// import { BotAvatar } from '@/components/bot-avatar';

// const ImagePage = ()=>{
//     const router=useRouter();
//     type MessageRole = "user" | "model";
//     interface GeminiMessage {
//         role: MessageRole;
//         parts: string[];
//       }
//     type GeminiMessageState = GeminiMessage[];
//     const [messages, setMessages] = useState<GeminiMessageState>([]);
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver:zodResolver(formSchema),
//         defaultValues:{
//             prompt:""
//         }
//     });

//     const isLoading= form.formState.isSubmitting;
//     const onSubmit = async(values:z.infer<typeof formSchema>)=>{
//         try {
//             const userMessage: GeminiMessage = {
//                 role: "user",
//                 parts: [values.prompt]
//               };
//               const newMessages = [...messages, userMessage];
        
//               const responses = await axios.post("/api/image", {
//                 messages: newMessages,
//               });
        
//               // Assuming the API returns a GeminiMessage
//               const aiMessage: GeminiMessage = responses;
        
//               setMessages((current) => [...current, userMessage, aiMessage]);
//               form.reset();

//         } catch (error:any) {
//             //TODO: Open Pro Model
//         } finally{
//             router.refresh();
//         }
//     }

//     return (
//         <div>
//             <Heading
//         title="Image Generation"
//         description="Our most advanced AI Image model."
//         icon={ImageIcon}
//         iconColor="text-pink-700"
//         bgColor="bg-pink-700"
//       />
//       <div className="px-4 lg:px-8">
//             <div>
//             <div>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
//             >
//               <FormField
//                 name="prompt"
//                 render={({ field }) => (
//                   <FormItem className="col-span-12 lg:col-span-6">
//                     <FormControl className="m-0 p-0">
//                       <Input
//                         {...field}
//                         placeholder="Start typing here..."
//                         className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
//                         disabled={isLoading}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 name="amount"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem className="col-span-12 lg:col-span-2">
//                     <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue defaultValue={field.value} />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {amountOptions.map((option) => (
//                           <SelectItem key={option.value} value={option.value}>
//                             {option.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 name="resolution"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem className="col-span-12 lg:col-span-2">
//                     <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue defaultValue={field.value} />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {resolutionOptions.map((option) => (
//                           <SelectItem key={option.value} value={option.value}>
//                             {option.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </FormItem>
//                 )}
//               />
//               <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
//                 Generate
//               </Button>
//             </form>
//           </Form>
//         </div>
//         <div className="space-y-4 mt-4">
//           {isLoading && (
//             <div className="p-20">
//               <Loader />
//             </div>
//           )}
//           {images.length === 0 && !isLoading && <Empty label="Start typing to generate images." />}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
//             {images.map((image, index) => (
//               <Card key={index} className="rounded-lg overflow-hidden">
//                 <div className="relative aspect-square">
//                   <Image src={image} fill alt="image" />
//                 </div>
//                 <CardFooter className="p-2">
//                   <Button onClick={() => window.open(image)} variant="secondary" className="w-full">
//                     <Download className="h-4 w-4" />
//                     Download
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//             </div>
//             <div className='space-y-4 mt-4'>
//             {isLoading && (
//             <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
//               <Loader />
//             </div>
//           )}
//           {messages.length === 0 && !isLoading && <Empty label="Start typing to have a conversation." />}
//                 <div className='flex flex-col gap-y-4'>
//                 {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={cn(
//                   "p-8 w-full flex items-start gap-x-8 rounded-lg",
//                   message.role === "user" ? "bg-white border border-[#a80024] text-[#a80024] font-bold" : "bg-muted"
//                 )}
//               >
//                 message.role === true ? <UserAvatar /> :   <BotAvatar />
//                 <p className="text-sm">
//                 <Markdown components={{
//             h1: ({node, ...props}) => <h1 className="text-2xl font-bold" {...props} />,
//             h2: ({node, ...props}) => <h2 className="text-xl font-semibold" {...props} />,
//             h3: ({node, ...props}) => <h3 className="text-lg font-medium" {...props} />,
//             strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
//             }}>
//                     {message.parts.join("\n")}
//                 </Markdown>
//                 </p>        
//               </div>
//             ))}                 
//                     </div>            
//             </div>
//       </div>
//         </div>
//     );

// export default ImagePage;