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
      <label htmlFor='search'>
        <input id='search' onChange={handleSearchChange}></input>
        <input type='submit' value='검색'></input>
      </label>
    </form>
  );
}

export default SearchForm;
