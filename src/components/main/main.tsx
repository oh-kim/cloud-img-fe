import { useEffect, useRef, useState } from "react";
import InputForm from "../InputForm";
import MapContainer from "../map/mapContainer";
import debounce from "../../utils/debounce";
import useMarker from "../../hooks/useMarker";
import { MapInfo, imageFile } from "../../types";

function Main() {
  const ref = useRef(null);
  const NaverMap = useRef<naver.maps.Map | null>(null);
  const [mapInfo, setMapInfo] = useState<MapInfo | null>(null);
  const [imageFileList, setImageFileList] = useState<imageFile[]>([]);
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

    handleMapInfo();

    return () => {
      naver.maps.Event.removeListener(zoomChangedListener);
      naver.maps.Event.removeListener(centerChangedListener);
    };
  }, []);

  // 지도에 보여지는 썸네일 리스트 불러오기 (mapInfo)
  useEffect(() => {
    if (!mapInfo) return;
    function mapInfoToSearchParams(mapInfo: MapInfo): URLSearchParams {
      const params = new URLSearchParams();

      const {
        center: { centerLng, centerLat },
        max: { maxLng, maxLat },
      } = mapInfo;

      params.append("lng", centerLng.toString());
      params.append("lat", centerLat.toString());

      params.append("maxLng", maxLng.toString());
      params.append("maxLat", maxLat.toString());
      return params;
    }

    const query = mapInfoToSearchParams(mapInfo).toString();

    // /api/board/boards
    const nodeURL = `${import.meta.env.VITE_DEV_URL}/thumbnail?${query}`;
    fetch(nodeURL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data: imageFile[]) => {
        console.log(data);
        setImageFileList((image) => [...image, ...data]);
      })
      .catch((error) => console.log(error));
  }, [mapInfo]);

  // 마커 찍기
  useMarker(imageFileList, NaverMap.current);

  const handleNewCenter = (newCenter: naver.maps.Point) => {
    if (!NaverMap.current) return;
    NaverMap.current.setCenter(newCenter);
  };

  const handleMapInfo = () => {
    console.log("handle Map Information");
    if (!NaverMap.current) return;

    const { x: centerLng, y: centerLat } = NaverMap.current.getCenter();
    const { x: maxLng, y: maxLat } = NaverMap.current.getBounds().getMax();
    setMapInfo(() => ({
      center: { centerLng, centerLat },
      max: { maxLng, maxLat },
    }));
  };

  return (
    <>
      <MapContainer ref={ref} />
      <InputForm
        mapInfo={mapInfo}
        handleNewCenter={handleNewCenter}
      ></InputForm>
    </>
  );
}

export default Main;
