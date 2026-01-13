'use client';
import { useState } from 'react';
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from '@/registry/ui-layouts/file-upload';

export default function Demo() {
  const [files, setFiles] = useState<File[] | null>(null);

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <FileUploader
        value={files}
        onValueChange={setFiles}
        dropzoneOptions={{
          accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'] },
          maxFiles: 4,
          maxSize: 4 * 1024 * 1024,
          multiple: true,
        }}
        className="relative bg-background rounded-lg p-2"
      >
        <FileInput className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="font-medium text-sm">Click or drag files here</p>
            <p className="text-xs">PNG, JPG, GIF, WEBP up to 4MB</p>
          </div>
        </FileInput>
        {files && files.length > 0 && (
          <FileUploaderContent>
            {files.map((file, index) => (
              <FileUploaderItem key={index} index={index}>
                <span className="text-xs truncate">{file.name}</span>
              </FileUploaderItem>
            ))}
          </FileUploaderContent>
        )}
      </FileUploader>
    </div>
  );
}
