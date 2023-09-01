import { memo } from "react";

const FilePreview = memo(({ selectedImages }: { selectedImages: File[] }) => {
  return (
    <ul className='h-full grid gap-2 lg:grid-flow-col lg:grid-rows-3'>
      {selectedImages.map((image) => {
        const imageURL = URL.createObjectURL(image);

        return (
          <li
            key={image.name}
            className='h-40 w-full flex justify-center items-center'
          >
            <img
              src={imageURL}
              className='h-full object-cover rounded-md'
            ></img>
          </li>
        );
      })}
    </ul>
  );
});

export default FilePreview;
