"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Upload, X } from "lucide-react";
import Image from "next/image";

const videoFormSchema = z.object({
  url: z.instanceof(File).optional(),
  thumbnail: z.instanceof(File).optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type VideoFormValues = z.infer<typeof videoFormSchema>;

interface VideoEditFormProps {
  initialData: {
    url: string;
    thumbnail: string;
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
  const [videoPreview, setVideoPreview] = useState<string>(
    initialData.url || "",
  );
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(
    initialData.thumbnail || "",
  );

  console.log({ thumbnailPreview });

  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      url: undefined,
      thumbnail: undefined,
      title: initialData.title,
      description: initialData.description,
    },
  });

  const onSubmit = (data: VideoFormValues) => {
    console.log("Form Values:", data);
    onSave(data);
  };

  // ================= VIDEO =================

  const handleVideoFileChange = (file: File) => {
    if (file.type.startsWith("video/")) {
      const reader = new FileReader();
      reader.onload = () => setVideoPreview(reader.result as string);
      reader.readAsDataURL(file);

      form.setValue("url", file);
      form.trigger("url");
    } else {
      form.setError("url", {
        message: "Please select a valid video file",
      });
    }
  };

  const removeVideoPreview = () => {
    setVideoPreview("");
    form.setValue("url", undefined);
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  // ================= THUMBNAIL =================

  const handleThumbnailFileChange = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setThumbnailPreview(reader.result as string);
      reader.readAsDataURL(file);

      form.setValue("thumbnail", file);
      form.trigger("thumbnail");
    } else {
      form.setError("thumbnail", {
        message: "Please select a valid image file",
      });
    }
  };

  const removeThumbnailPreview = () => {
    setThumbnailPreview("");
    form.setValue("thumbnail", undefined);
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* ================= VIDEO UPLOAD ================= */}
        <FormField
          control={form.control}
          name="url"
          render={() => (
            <FormItem>
              <FormLabel>Video</FormLabel>
              <FormControl>
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files.length > 0) {
                      handleVideoFileChange(e.dataTransfer.files[0]);
                    }
                  }}
                  onClick={() => videoInputRef.current?.click()}
                  className="border-2 border-dashed rounded-lg p-8 cursor-pointer"
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
                        className="flex items-center gap-2 text-sm text-destructive"
                      >
                        <X className="w-4 h-4" /> Remove video
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <p>Drag & drop or click to upload video</p>
                    </div>
                  )}

                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) =>
                      e.target.files && handleVideoFileChange(e.target.files[0])
                    }
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ================= THUMBNAIL ================= */}
        <FormField
          control={form.control}
          name="thumbnail"
          render={() => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files.length > 0) {
                      handleThumbnailFileChange(e.dataTransfer.files[0]);
                    }
                  }}
                  onClick={() => thumbnailInputRef.current?.click()}
                  className="border-2 border-dashed rounded-lg p-8 cursor-pointer"
                >
                  {thumbnailPreview ? (
                    <div className="space-y-4">
                      <img
                        src={thumbnailPreview}
                        width={300}
                        height={300}
                        alt="Thumbnail preview"
                        className="w-full max-h-48 rounded object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeThumbnailPreview}
                        className="flex items-center gap-2 text-sm text-destructive"
                      >
                        <X className="w-4 h-4" /> Remove thumbnail
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <p>Drag & drop or click to upload thumbnail</p>
                    </div>
                  )}

                  <input
                    ref={thumbnailInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      e.target.files &&
                      handleThumbnailFileChange(e.target.files[0])
                    }
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ================= TITLE ================= */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter video title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ================= DESCRIPTION ================= */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="min-h-24 resize-none"
                  placeholder="Enter video description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ================= ACTIONS ================= */}
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}
