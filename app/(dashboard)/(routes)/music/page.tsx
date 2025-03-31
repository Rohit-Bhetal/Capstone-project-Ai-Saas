"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Music } from "lucide-react";

import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";

const formSchema = z.object({
  prompt: z.string().min(1, { message: "Music prompt is required" }),
});

const MusicGenerationPage = () => {
  const [generatedMusic, setGeneratedMusic] = useState<{
    url: string;
    prompt: string;
  }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      // Stop any currently playing audio
      if (audioPlayer) {
        audioPlayer.pause();
      }

      // Call your API to generate music
      const response = await fetch("http://3.108.217.4:8000/generate-music", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: values.prompt,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate music");
      }

      const result = await response.json();

      // Assuming the API returns an object with the audio URL
      if (result.audioUrl) {
        setGeneratedMusic((current) => [
          ...current,
          {
            url: result.audioUrl,
            prompt: values.prompt,
          },
        ]);

        form.reset();
      } else {
        throw new Error("No audio generated");
      }
    } catch (error) {
      console.error("Error generating music:", error);
      toast.error("Failed to generate music");
    } finally {
      setIsLoading(false);
    }
  };

  const playMusic = (audioUrl: string) => {
    // Stop any currently playing audio
    if (audioPlayer) {
      audioPlayer.pause();
    }

    const newAudioPlayer = new Audio(audioUrl);
    newAudioPlayer.play();
    setAudioPlayer(newAudioPlayer);
  };

  const downloadMusic = (audioUrl: string, prompt: string) => {
    try {
      const link = document.createElement("a");
      link.href = audioUrl;
      link.download = `${prompt.slice(0, 30)}.wav`; // Assuming it's a WAV file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading music:", error);
      toast.error("Failed to download music");
    }
  };

  return (
    <div>
      <Heading
        title="Music Generation"
        description="Generate unique audio clips with Riffusion AI"
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-8">
                  <FormControl className="m-0 p-0">
                    <Input
                      {...field}
                      placeholder="Enter a music description (e.g., jazz piano, lo-fi beats)"
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      autoComplete="off"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              className="col-span-12 lg:col-span-2 w-full bg-emerald-500 hover:bg-emerald-600"
              disabled={isLoading}
            >
              Generate
            </Button>
          </form>
        </Form>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {generatedMusic.length === 0 && !isLoading && (
            <Empty label="No music generated yet." />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatedMusic.map((music, index) => (
              <Card key={index} className="rounded-lg overflow-hidden">
                <CardContent className="p-4 relative group">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm font-medium line-clamp-2">
                      {music.prompt}
                    </p>
                    {/* If you have a duration response in the API, use it here */}
                    {/* <p className="text-xs text-muted-foreground">Duration: {music.duration} seconds</p> */}
                    <div className="flex space-x-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full"
                        onClick={() => playMusic(music.url)}
                      >
                        Play
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => downloadMusic(music.url, music.prompt)}
                      >
                        Download
                      </Button>
                    </div>
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

export default MusicGenerationPage;
