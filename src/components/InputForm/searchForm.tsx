import { ChangeEvent } from "react";
type ChangeEventElement<T> = (event: ChangeEvent<T>) => void;

type Props = {
  onSearchChange: ChangeEventElement<HTMLInputElement>;
  onSearchSubmit: ChangeEventElement<HTMLFormElement>;
};

function SearchForm({ onSearchChange, onSearchSubmit }: Props) {
  const handleSearchChange = onSearchChange;

  const handleSearchSubmit = onSearchSubmit;

  return (
    <form onSubmit={handleSearchSubmit}>
      <label
        htmlFor='search'
        className='flex items-center justify-between bg-slate-200 rounded-lg  focus:ring-2 focus:ring-blue-500 focus:border:blue-500'
      >
        <input
          id='search'
          onChange={handleSearchChange}
          placeholder='검색'
          className='bg-slate-200 ml-2 w-full outline-none rounded-lg'
        ></input>
        <input
          type='submit'
          value='🔎'
          className='p-2 bg-slate-200 rounded-lg'
        ></input>
      </label>
    </form>
  );
}

export default SearchForm;
