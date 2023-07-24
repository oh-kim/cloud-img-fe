import { ChangeEvent } from "react";

type Props = {
  handleInputFiles(e: ChangeEvent<HTMLInputElement>): void;
};

export default function FileInputForm({ handleInputFiles }: Props) {
  return (
    <form className='w-full h-32 flex justify-center'>
      <label
        htmlFor='input-file'
        className='border-2 border-dashed rounded-lg w-full py-14 flex justify-center items-center gap-2 text-slate-600 font-semibold cursor-pointer 
        hover:ring-4 hover:ring-blue-500 hover:ring-offset-2'
      >
        <span> + </span>
        <span>파일 업로드</span>
      </label>
      <input
        type='file'
        id='input-file'
        multiple
        accept='image/*'
        className='hidden'
        onChange={handleInputFiles}
      ></input>
    </form>
  );
}
