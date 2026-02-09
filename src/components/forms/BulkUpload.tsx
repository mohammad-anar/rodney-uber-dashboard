/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Papa from "papaparse";
import { useRef, useState } from "react";

const REQUIRED_FIELDS = [
  "code",
  "source",
  "discount_type",
  "discount_value",
  "expiry_date",
  "usage_limit",
];

interface CSVRecord {
  [key: string]: string;
}

interface FieldMapping {
  [requiredField: string]: string | null;
}

export default function BulkUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [csvData, setCSVData] = useState<CSVRecord[]>([]);
  const [csvHeaders, setCSVHeaders] = useState<string[]>([]);
  const [showMappingDialog, setShowMappingDialog] = useState(false);
  const [fieldMapping, setFieldMapping] = useState<FieldMapping>(
    REQUIRED_FIELDS.reduce((acc, field) => ({ ...acc, [field]: null }), {}),
  );
  const [uploadedFileName, setUploadedFileName] = useState<string>("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        const headers = results.meta.fields || [];
        const data = results.data as CSVRecord[];

        setCSVHeaders(headers);
        setCSVData(data);

        // Auto-map headers that match required fields
        const autoMapping: FieldMapping = REQUIRED_FIELDS.reduce(
          (acc, field) => {
            const matchedHeader = headers.find(
              (h: any) => h.toLowerCase() === field.toLowerCase(),
            );
            return { ...acc, [field]: matchedHeader || null };
          },
          {},
        );
        setFieldMapping(autoMapping);
        setShowMappingDialog(true);
      },
      error: (error: any) => {
        console.error("CSV parsing error:", error);
        alert("Error parsing CSV file");
      },
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-gray-100");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("bg-gray-100");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-gray-100");
    const files = e.dataTransfer.files;
    if (files.length) {
      const input = fileInputRef.current;
      if (input) {
        input.files = files;
        handleFileSelect({ target: input } as any);
      }
    }
  };

  const handleMappingChange = (
    requiredField: string,
    mappedField: string | null,
  ) => {
    setFieldMapping((prev) => ({
      ...prev,
      [requiredField]: mappedField,
    }));
  };

  const handleUpload = () => {
    // Validate that all required fields are mapped
    const unmappedFields = REQUIRED_FIELDS.filter(
      (field) => !fieldMapping[field],
    );
    if (unmappedFields.length > 0) {
      alert(`Please map all required fields: ${unmappedFields.join(", ")}`);
      return;
    }

    // Transform data based on mapping
    const transformedData = csvData.map((row) => {
      const transformedRow: CSVRecord = {};
      Object.entries(fieldMapping).forEach(([requiredField, mappedField]) => {
        if (mappedField) {
          transformedRow[requiredField] = row[mappedField];
        }
      });
      return transformedRow;
    });

    console.log("Uploading transformed data:", transformedData);
    alert(`Successfully processed ${transformedData.length} records`);

    // Reset state
    setCSVData([]);
    setCSVHeaders([]);
    setFieldMapping(
      REQUIRED_FIELDS.reduce((acc, field) => ({ ...acc, [field]: null }), {}),
    );
    setUploadedFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setShowMappingDialog(false);
  };

  return (
    <>
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Bulk Upload Promo Codes
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Upload multiple promo codes using CSV file format
          </p>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center transition-colors"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <p className="text-gray-700 font-medium">Drop your CSV file here</p>
            <p className="text-sm text-gray-500 mt-1">or click to browse</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Choose File Button */}
        <div className="mt-6 flex justify-center">
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-primary hover:bg-yellow-600 text-white rounded-lg"
          >
            Choose File
          </Button>
        </div>

        {/* CSV Format Requirements */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-blue-900 mb-3">
            CSV Format Requirements:
          </p>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>
              <strong>Headers:</strong> code, source, discount_type,
              discount_value, expiry_date, usage_limit
            </li>
            <li>
              <strong>Source:</strong> uber, lyft
            </li>
            <li>
              <strong>Discount Type:</strong> percentage, fixed
            </li>
            <li>
              <strong>Date Format:</strong> YYYY-MM-DD
            </li>
          </ul>
        </div>
      </Card>

      {/* Field Mapping Dialog */}
      <Dialog open={showMappingDialog} onOpenChange={setShowMappingDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Map CSV Columns</DialogTitle>
            <DialogDescription>
              Match your CSV columns to the required fields. File:{" "}
              {uploadedFileName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {REQUIRED_FIELDS.map((requiredField) => (
              <div key={requiredField}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {requiredField.replace(/_/g, " ")}
                </label>
                <Select
                  value={fieldMapping[requiredField] || ""}
                  onValueChange={(value) =>
                    handleMappingChange(requiredField, value || null)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select column" />
                  </SelectTrigger>
                  <SelectContent>
                    {csvHeaders.map((header) => (
                      <SelectItem key={header} value={header}>
                        {header}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              onClick={() => setShowMappingDialog(false)}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              className="flex-1 bg-primary hover:bg-yellow-600 text-white"
            >
              Upload
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
