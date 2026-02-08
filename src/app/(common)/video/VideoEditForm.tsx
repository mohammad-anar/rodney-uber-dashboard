/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";

const videoFormSchema = z.object({
  videoFile: z.instanceof(File, { message: "Video file is required" }),
  thumbnailFile: z.instanceof(File, { message: "Thumbnail file is required" }),
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
});

type VideoFormValues = z.infer<typeof videoFormSchema | any>;

interface VideoEditFormProps {
  initialData: {
    videoUrl: string;
    thumbnailUrl: string;
    title: string;
    description: string;
  };
  onSave: (data: Partial<VideoFormValues>) => void;
  onCancel: () => void;
}

export function VideoEditForm({
  initialData,
  onSave,
  onCancel,
}: VideoEditFormProps) {
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      videoFile: undefined,
      thumbnailFile: undefined,
      title: initialData.title,
      description: initialData.description,
    },
  });

  const onSubmit = (data: VideoFormValues) => {
    onSave(data);
  };

  const handleVideoFileChange = (file: File) => {
    if (file && file.type.startsWith("video/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("videoFile", file);
    } else {
      form.setError("videoFile", {
        message: "Please select a valid video file",
      });
    }
  };

  const handleThumbnailFileChange = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("thumbnailFile", file);
    } else {
      form.setError("thumbnailFile", {
        message: "Please select a valid image file",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleVideoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleVideoFileChange(files[0]);
    }
  };

  const handleThumbnailDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleThumbnailFileChange(files[0]);
    }
  };

  const removeVideoPreview = () => {
    setVideoPreview("");
    form.setValue("videoFile", null);
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const removeThumbnailPreview = () => {
    setThumbnailPreview("");
    form.setValue("thumbnailFile", null);
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Video File Upload */}
        <FormField
          control={form.control}
          name="videoFile"
          render={() => (
            <FormItem>
              <FormLabel>Video File</FormLabel>
              <FormControl>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleVideoDrop}
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 transition-colors hover:border-muted-foreground/50 cursor-pointer"
                >
                  {videoPreview ? (
                    <div className="space-y-4">
                      <video
                        src={videoPreview}
                        controls
                        className="w-full max-h-48 rounded bg-black"
                      />
                      <button
                        type="button"
                        onClick={removeVideoPreview}
                        className="flex items-center gap-2 text-sm text-destructive hover:text-destructive/80"
                      >
                        <X className="w-4 h-4" />
                        Remove video
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => videoInputRef.current?.click()}
                      className="flex flex-col items-center justify-center gap-2"
                    >
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <div className="text-center">
                        <p className="font-semibold">
                          Drag and drop your video here
                        </p>
                        <p className="text-sm text-muted-foreground">
                          or click to select a file
                        </p>
                      </div>
                    </div>
                  )}
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleVideoFileChange(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Select a video file (MP4, WebM, etc.)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Thumbnail File Upload */}
        <FormField
          control={form.control}
          name="thumbnailFile"
          render={() => (
            <FormItem>
              <FormLabel>Thumbnail Image</FormLabel>
              <FormControl>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleThumbnailDrop}
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 transition-colors hover:border-muted-foreground/50 cursor-pointer"
                >
                  {thumbnailPreview ? (
                    <div className="space-y-4">
                      <Image
                        width={300}
                        height={300}
                        src={thumbnailPreview || "/placeholder.svg"}
                        alt="Thumbnail preview"
                        className="w-full max-h-48 rounded object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeThumbnailPreview}
                        className="flex items-center gap-2 text-sm text-destructive hover:text-destructive/80"
                      >
                        <X className="w-4 h-4" />
                        Remove thumbnail
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => thumbnailInputRef.current?.click()}
                      className="flex flex-col items-center justify-center gap-2"
                    >
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <div className="text-center">
                        <p className="font-semibold">
                          Drag and drop your thumbnail here
                        </p>
                        <p className="text-sm text-muted-foreground">
                          or click to select a file
                        </p>
                      </div>
                    </div>
                  )}
                  <input
                    ref={thumbnailInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleThumbnailFileChange(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Select an image file (JPG, PNG, WebP, etc.)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter video title"
                  {...field}
                  className="focus:ring-2"
                />
              </FormControl>
              <FormDescription>The main title of the video</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter video description"
                  className="min-h-24 resize-none focus:ring-2"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A detailed description of the video
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
