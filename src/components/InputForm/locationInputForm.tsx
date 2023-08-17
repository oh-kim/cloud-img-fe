import { ChangeEvent, useState } from "react";
import SearchForm from "./searchForm";

type Props = {
  onNewCenter: (newCenter: naver.maps.Point) => void;
};

function LocationInputForm({ onNewCenter }: Props) {
  const [location, setLocation] = useState("");

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value;
    setLocation(result);
  };

  const onSearchSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    naver.maps.Service.geocode(
      {
        query: location,
      },
      (status, response) => {
        if (status === naver.maps.Service.Status.ERROR) {
          return alert("Something Wrong!");
        }

        if (response.v2.meta.totalCount === 0) {
          return alert(`검색 결과가 없음, ${response.v2.meta.totalCount}`);
        }
        const FIRST_ADDRESS = 0;
        const item = response.v2.addresses[FIRST_ADDRESS];
        const point = new naver.maps.Point(Number(item.x), Number(item.y));
        onNewCenter(point);
      }
    );
  };

  return (
    <div>
      <SearchForm
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
      />
    </div>
  );
}

export default LocationInputForm;
