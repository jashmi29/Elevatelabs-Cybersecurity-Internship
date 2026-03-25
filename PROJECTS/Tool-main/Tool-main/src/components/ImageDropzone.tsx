
"use client";

import React, { useState, useCallback } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ImageDropzoneProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

export function ImageDropzone({ onFileSelect, selectedFile }: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === 'image/png' || file.type === 'image/bmp')) {
      onFileSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, [onFileSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const clear = () => {
    onFileSelect(null);
    setPreview(null);
  };

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative group cursor-pointer border-2 border-dashed rounded-xl transition-all duration-300 min-h-[220px] flex flex-col items-center justify-center p-6",
          isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border hover:border-primary/50 hover:bg-muted/30",
          selectedFile ? "border-solid border-primary/20 bg-muted/20" : ""
        )}
      >
        {preview ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img src={preview} alt="Preview" className="max-h-48 rounded-lg shadow-xl object-contain" />
            <Button
              size="icon"
              variant="destructive"
              className="absolute -top-2 -right-2 rounded-full h-6 w-6 shadow-lg"
              onClick={(e) => { e.stopPropagation(); clear(); }}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-4 rounded-full bg-primary/10 p-4 transition-transform group-hover:scale-110">
              <UploadCloud className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">Drag and drop your image</p>
              <p className="text-xs text-muted-foreground mt-1">PNG or BMP only for lossless quality</p>
            </div>
            <input
              type="file"
              accept=".png,.bmp"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleChange}
            />
          </>
        )}
      </div>
      {selectedFile && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded-md border border-border/40">
          <ImageIcon className="h-3 w-3" />
          <span className="truncate flex-1">{selectedFile.name}</span>
          <span>({(selectedFile.size / 1024).toFixed(1)} KB)</span>
        </div>
      )}
    </div>
  );
}
