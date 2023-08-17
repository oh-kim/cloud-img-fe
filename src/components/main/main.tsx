import { useEffect, useRef } from "react";
import InputForm from "../InputForm";
import MapContainer from "../map/mapContainer";

type NaverMapType = naver.maps.Map;
type MapPointType = naver.maps.Point;

function Main() {
  const ref = useRef(null);
  const naverMapRef = useRef<NaverMapType | null>(null);
  const { naver } = window;

  // map init
  useEffect(() => {
    if (!naver) {
      console.log("naver not loaded");
      return;
    }

    if (!ref.current) {
      console.log("map div not rendered");
      return;
    }

    const center = new naver.maps.LatLng(37.3595704, 127.105399);
    naverMapRef.current = new naver.maps.Map(ref.current, {
      center: center,
      zoom: 14,
    });
  }, []);

  const handleNewCenter = (newCenter: MapPointType) => {
    if (!naverMapRef.current) return;
    naverMapRef.current.setCenter(newCenter);
  };

  return (
    <>
      <MapContainer ref={ref} />
      <InputForm handleNewCenter={handleNewCenter}></InputForm>
    </>
  );
}

export default Main;
