import { ChangeEvent } from "react";

type Props = {
  selectedImages: File[];
  handleInputFiles(e: ChangeEvent<HTMLInputElement>): void;
  handleSubmitFiles(e: ChangeEvent<HTMLFormElement>): void;
};

export default function FileInputForm({
  selectedImages,
  handleInputFiles,
  handleSubmitFiles,
}: Props) {
  const imagesCount = selectedImages.length;

  return (
    <form
      className='w-full mb-2 flex justify-center flex-wrap gap-2'
      onSubmit={handleSubmitFiles}
    >
      <div className='w-full flex gap-2'>
        <label
          htmlFor='input-file'
          className='border-2 border-dashed rounded-lg w-full  py-8 flex justify-center items-center gap-2 text-slate-600 font-semibold cursor-pointer 
        hover:ring-4 hover:ring-blue-500 hover:bg-blue-400'
        >
          <span> + </span>
          <span>파일 업로드</span>
          <input
            type='file'
            id='input-file'
            multiple
            accept='image/*'
            className='hidden'
            onChange={handleInputFiles}
          ></input>
        </label>
        {imagesCount > 0 && (
          <label
            htmlFor='file-send'
            className='border-2 border-dashed rounded-lg w-full py-8 flex justify-center items-center gap-2 text-slate-600 font-semibold cursor-pointer 
        hover:ring-4 hover:ring-blue-500 hover:bg-blue-400'
          >
            <input type='submit' id='file-send' value='저장하기'></input>
          </label>
        )}
      </div>
    </form>
  );
}
