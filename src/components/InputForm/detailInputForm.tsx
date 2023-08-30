import { ChangeEvent } from "react";

type Props = {
  handleDetail: (e: ChangeEvent<HTMLInputElement>) => void;
};

function DetailInputForm({ handleDetail }: Props) {
  return (
    <div className='flex flex-col w-full gap-2'>
      <label htmlFor='title'>
        <span className='text-sm font-semibold mb-1'>Title</span>
        <input
          id='title'
          className='outline-none bg-slate-200 border-2 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500  w-full p-2'
          type='text'
          placeholder='Title'
          onChange={handleDetail}
          required
        ></input>
      </label>
      <label htmlFor='content'>
        <span className='text-sm font-semibold mb-1'>content</span>
        <input
          id='content'
          className='outline-none bg-slate-200 border-2 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full p-2'
          type='text'
          placeholder='content'
          onChange={handleDetail}
          required
        ></input>
      </label>
    </div>
  );
}

export default DetailInputForm;
