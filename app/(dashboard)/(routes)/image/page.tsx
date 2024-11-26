"use client";


import { Download, ImageIcon } from "lucide-react";
import { Heading } from "@/components/heading";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  prompt: z.string().min(1, { message: "Image prompt is required" }),
});

const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<Array<{ url: string, prompt: string }>>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const encodedPrompt = encodeURIComponent(values.prompt);
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512`;
      
      setImages((current) => [...current, { 
        url: imageUrl,
        prompt: values.prompt 
      }]);
      
      form.reset();
    } catch (error: any) {
      console.error("Error generating image:", error);
    } finally {
      router.refresh();
    }
  };

  const downloadImage = async (imageUrl: string, prompt: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${prompt.slice(0, 30)}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Turn your text into images."
        icon={ImageIcon}
        iconColor="text-pink-500"
        bgColor="bg-pink-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        {...field}
                        placeholder="A serene lake surrounded by mountains at sunset..."
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        autoComplete="off"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full bg-pink-500 hover:bg-pink-600"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty label="No images generated yet." />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <Card key={index} className="rounded-lg overflow-hidden">
                <CardContent className="p-0 relative group">
                  <img
                    src={image.url}
                    alt={image.prompt}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-sm mb-2 line-clamp-2">{image.prompt}</p>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full"
                      onClick={() => downloadImage(image.url, image.prompt)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;