import { useState, ChangeEvent } from "react";
import FileInputForm from "./fileInputForm";
import FilePreview from "./filePreview";

export default function InputForm() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleInputFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const imageFiles: File[] = [];

    //
    if (files && files.length > 0) {
      const fileListArray: File[] = Array.from(files);
      fileListArray.map((file) => {
        if (file.type.startsWith("image/")) {
          imageFiles.push(file);
        }
      });
    }

    setSelectedImages((prev) => [...prev, ...imageFiles]);
  };

  return (
    <div className='h-full flex flex-col p-2 gap-2'>
      <FileInputForm handleInputFiles={handleInputFiles}></FileInputForm>
      <FilePreview selectedImages={selectedImages}></FilePreview>
    </div>
  );
}
