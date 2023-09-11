import { useEffect, useRef, useState } from "react";
import InputForm from "../InputForm";
import MapContainer from "../map/mapContainer";
import debounce from "../../utils/debounce";

type NaverMapType = naver.maps.Map;
type MapPointType = naver.maps.Point;
type CenterPoint = {
  x: number;
  y: number;
};

interface MapInfo {
  center: { centerLng: number; centerLat: number };
  max: { maxLng: number; maxLat: number };
}

function Main() {
  const ref = useRef(null);
  const NaverMap = useRef<NaverMapType | null>(null);
  const [mapInfo, setMapInfo] = useState<MapInfo | null>(null);
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
    NaverMap.current = new naver.maps.Map(ref.current, {
      center: center,
      zoom: 14,
    });
    const zoomChangedListener = naver.maps.Event.addListener(
      NaverMap.current,
      "zoom_changed",
      debounce(() => {
        console.log("zoom changed?");
        handleMapInfo();
      }, 800)
    );

    const centerChangedListener = naver.maps.Event.addListener(
      NaverMap.current,
      "center_changed",
      debounce(() => {
        console.log("center changed");
        handleMapInfo();
      }, 800)
    );

    return () => {
      naver.maps.Event.removeListener(zoomChangedListener);
      naver.maps.Event.removeListener(centerChangedListener);
    };
  }, []);

  useEffect(() => {
    console.log(mapInfo, "map info useEffect ");
    if (!mapInfo) return;
    function mapInfoToSearchParams(mapInfo: MapInfo): URLSearchParams {
      const params = new URLSearchParams();

      // Add the center values
      params.append("centerLng", mapInfo.center.centerLng.toString());
      params.append("centerLat", mapInfo.center.centerLat.toString());

      // Add the max values
      params.append("maxLng", mapInfo.max.maxLng.toString());
      params.append("maxLat", mapInfo.max.maxLat.toString());

      return params;
    }

    const query = mapInfoToSearchParams(mapInfo).toString();
    const URL = `http://localhost:3000/api/board/boars?` + query;
    console.log(URL);
    fetch(URL, {
      method: "GET",
      // body: JSON.stringify(mapInfo),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, [mapInfo]);

  const handleNewCenter = (newCenter: MapPointType) => {
    if (!NaverMap.current) return;
    NaverMap.current.setCenter(newCenter);
  };

  const handleMapInfo = () => {
    console.log("handle Map Information");
    if (!NaverMap.current) return;

    const { x: centerLng, y: centerLat }: CenterPoint =
      NaverMap.current.getCenter();
    const { x: maxLng, y: maxLat } = NaverMap.current.getBounds().getMax();
    setMapInfo(() => ({
      center: { centerLng, centerLat },
      max: { maxLng, maxLat },
    }));
  };

  return (
    <>
      <MapContainer ref={ref} />
      {/* <button onClick={() => console.log(mapInfo)}>정보 확인하기</button> */}
      <InputForm handleNewCenter={handleNewCenter}></InputForm>
    </>
  );
}

export default Main;
