"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VideoEditForm } from "./VideoEditForm";
import { Button } from "@/components/ui/button";
import { MyModal } from "@/components/shared/MyModal";

interface VideoData {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
}

const defaultVideo: VideoData = {
  id: "1",
  videoUrl:
    "https://commondatastorage.googleapis.com/gtv-videos-library/sample/big_buck_bunny.mp4",
  thumbnailUrl:
    "https://peach.blender.org/wp-content/uploads/image-galleries/big-buck-bunny_thumb.jpg?x11217",
  title: "Big Buck Bunny",
  description:
    "A large-scale open movie project, created to provide a platform for new digital artists.",
};

export function VideoSection() {
  const [videoData, setVideoData] = useState<VideoData>(defaultVideo);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveVideo = (updatedData: Partial<VideoData>) => {
    setVideoData((prev) => ({
      ...prev,
      ...updatedData,
    }));
    setIsEditing(false);
  };

  return (
    <div className="w-full">
      <div className="space-y-6 ">
        {/* Video Display Section */}
        <Card className="shadow-none border-0">
          <CardHeader>
            <CardTitle className="sr-only">Featured Video</CardTitle>
            <CardDescription className="sr-only">
              Current video content
            </CardDescription>
          </CardHeader>
          <CardContent className=" grid grid-cols-1 xl:grid-cols-2 gap-8 ">
            {/* Video Player */}
            <div className="w-full aspect-video max-w-2xl bg-black rounded-lg overflow-hidden">
              <video
                src={videoData.videoUrl}
                poster={videoData.thumbnailUrl}
                controls
                className="w-full h-full object-cover"
              />
            </div>

            {/* Video Info */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">{videoData.title}</h3>
              <p className="text-muted-foreground">{videoData.description}</p>
              <Button
                onClick={() => setIsEditing(true)}
                className="mt-3 sm:mt-8 px-4 py-2 !bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Edit Video
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <MyModal
        open={isEditing}
        onOpenChange={(val: boolean) => setIsEditing(val)}
      >
        <VideoEditForm
          initialData={videoData}
          onSave={handleSaveVideo}
          onCancel={() => setIsEditing(false)}
        />
      </MyModal>
    </div>
  );
}
