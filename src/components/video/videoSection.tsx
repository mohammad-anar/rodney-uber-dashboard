/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
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
import {
  useCreateVideoMutation,
  useGetVideoQuery,
  useUpdateVideoMutation,
} from "@/redux/service/video/video";
import { toast } from "sonner";

export function VideoSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [updateVideo, { isLoading: updateLoading }] = useUpdateVideoMutation();
  const [createVideo, { isLoading: createLoading }] = useCreateVideoMutation();

  const { data, isLoading } = useGetVideoQuery(
    {},
    {
      selectFromResult: ({ data, isLoading }) => ({
        data: data?.data?.[0] || null,
        isLoading,
      }),
    },
  );

  const handleSaveVideo = async (updatedData: any) => {
    try {
      const payload = {
        title: updatedData.title,
        description: updatedData.description,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));

      if (updatedData.thumbnail) {
        formData.append("image", updatedData.thumbnail);
      }

      if (updatedData.url) {
        formData.append("media", updatedData.url);
      }

      if (data?._id) {
        toast.promise(
          updateVideo({ id: data._id, payload: formData }).unwrap(),
          {
            loading: "Video Updating...",
            success: "Video updated successfully",
            error: (err) => err?.data?.message || err.message,
          },
        );
      } else {
        toast.promise(createVideo({ payload: formData }).unwrap(), {
          loading: "Video Creating...",
          success: "Video created successfully",
          error: (err) => err?.data?.message || err.message,
        });
      }
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
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
                src={data?.url}
                poster={data?.thumbnail}
                controls
                className="w-full h-full object-cover"
              />
            </div>

            {/* Video Info */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">
                {data?.title || "No Featured Video"}
              </h3>
              <p className="text-muted-foreground">
                {data?.description || "Upload a video to display it here."}
              </p>
              <Button
                onClick={() => setIsEditing(true)}
                className="mt-3 sm:mt-8 px-4 py-2 !bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                {data?._id ? "Edit Video" : "Add Video"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <MyModal
        open={isEditing}
        onOpenChange={(val: boolean) => setIsEditing(false)}
      >
        <VideoEditForm
          initialData={
            data || {
              url: "",
              thumbnail: "",
              title: "",
              description: "",
            }
          }
          onSave={handleSaveVideo}
          onCancel={() => setIsEditing(false)}
        />
      </MyModal>
    </div>
  );
}
