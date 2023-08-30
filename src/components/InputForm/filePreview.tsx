export default function FilePreview({
  selectedImages,
}: {
  selectedImages: File[];
}) {
  return (
    <ul className='h-full grid gap-2 lg:grid-flow-col lg:grid-rows-3'>
      {selectedImages.map((image) => {
        const imageURL = URL.createObjectURL(image);

        return (
          <li key={image.name} className='h-40'>
            <img
              src={imageURL}
              className='h-full object-cover rounded-md'
            ></img>
          </li>
        );
      })}
    </ul>
  );
}
