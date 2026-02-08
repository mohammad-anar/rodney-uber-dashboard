"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema
const animalFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Description is required"),
  image: z.instanceof(File).nullable(),
});

type AnimalFormValues = z.infer<typeof animalFormSchema>;

export function EditProfileForm({}) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<AnimalFormValues>({
    resolver: zodResolver(animalFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      image: null,
    },
  });

  // Handle image file changes
  const handleImageChange = (file: File | null) => {
    if (file) {
      setValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle drag and drop
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleImageChange(files[0]);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleImageChange(files[0]);
    }
  };

  // Handle form submission
  const handleFormSubmit = async (data: AnimalFormValues) => {
    console.log(data);
    reset();
    setPreview(null);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Name */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Name</Label>
        <Input
          {...register("name")}
          placeholder="Enter Banner title"
          className="py-5 border-2 border-border"
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Phone</Label>
        <Input
          {...register("phone")}
          placeholder="Enter Banner description"
          className="py-5 border-2 border-border"
        />
        {errors.phone && (
          <p className="text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* Image Upload with Drag and Drop */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 block">Image</Label>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative flex h-40 border bg-gray-300 cursor-pointer flex-col items-center justify-center rounded-lg transition-colors ${
            dragActive
              ? "bg-my-green text-white"
              : preview
                ? "bg-my-green text-white"
                : "bg-my-green text-white hover:bg-green-300"
          }`}
        >
          {preview ? (
            <Image
              src={preview || "/placeholder.svg"}
              width={500}
              height={300}
              alt="Preview"
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 ">
              <Upload className="size-8" />
              <span className="text-sm font-medium">Select File</span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
        {errors.image && (
          <p className="text-xs text-red-500">{errors.image.message}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className="">
        <Button
          type="submit"
          className="flex-1 bg-primary text-white hover:bg-primary/80 cursor-pointer"
        >
          {"Save"}
        </Button>
      </div>
    </form>
  );
}
