import { useState, ChangeEvent, useCallback } from "react";
import FileInputForm from "./fileInputForm";
import FilePreview from "./filePreview";
import LocationInputForm from "./locationInputForm";
import DetailInputForm from "./detailInputForm";
import { MapInfo } from "../../types";

interface Props {
  mapInfo: MapInfo | null;
  handleNewCenter: (newCenter: naver.maps.Point) => void;
}

export default function InputForm({ mapInfo, handleNewCenter }: Props) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [detail, setDetail] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });

  const onNewCenter = handleNewCenter;

  const handleInputFiles = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const imageFiles: File[] = [];

    if (files && files.length > 0) {
      const fileListArray: File[] = Array.from(files);
      fileListArray.map((file) => {
        if (file.type.startsWith("image/")) {
          imageFiles.push(file);
        }
      });
    }

    setSelectedImages((prev) => [...prev, ...imageFiles]);
  }, []);

  const handleSubmitFiles = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    selectedImages.forEach((image) => {
      formData.append("file", image);
    });

    const boardDTO = new Blob(
      [
        JSON.stringify({
          title: detail.title,
          content: detail.content,
          maxLat: mapInfo?.max.maxLat,
          maxLng: mapInfo?.max.maxLng,
          lat: mapInfo?.center.centerLat,
          lng: mapInfo?.center.centerLng,
        }),
      ],
      { type: "application/json" }
    );

    formData.append("boardDto", boardDTO);

    // /api/board/boards
    const nodeURL = `${import.meta.env.VITE_DEV_URL}/photos/upload`;
    fetch(nodeURL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const handleDetail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.id === "title") {
      const title = e.currentTarget.value;
      setDetail((detail) => ({ ...detail, title }));
    } else {
      const content = e.currentTarget.value;
      setDetail((detail) => ({ ...detail, content }));
    }
  };

  return (
    <div className='h-full flex flex-col p-2 gap-2'>
      <LocationInputForm onNewCenter={onNewCenter} />
      <FileInputForm
        handleInputFiles={handleInputFiles}
        handleSubmitFiles={handleSubmitFiles}
        selectedImages={selectedImages}
      />
      {selectedImages.length > 0 && (
        <DetailInputForm handleDetail={handleDetail} />
      )}
      <FilePreview selectedImages={selectedImages} />
    </div>
  );
}
