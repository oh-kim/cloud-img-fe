import { useEffect } from "react";

interface thumbNail {
  lat: number;
  lng: number;
  imagePath: string;
}

type thumbNailList = thumbNail[];

function useMarker(
  thumbNailList: thumbNailList,
  naverMap: naver.maps.Map | null
) {
  useEffect(() => {
    if (!naverMap && Array.isArray(thumbNailList)) return;
    thumbNailList.map((image) => {
      console.log("new marker mapping?");
      new naver.maps.Marker({
        position: new naver.maps.LatLng(image.lat, image.lng),
        map: naverMap as naver.maps.Map, // assertion? check
        icon: {
          content:
            `<img src="${import.meta.env.VITE_DEV_URL}${
              image.imagePath
            }" alt="" ` +
            `<img src="/3.jpg" alt=""` +
            `style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none; ` +
            `-webkit-user-select: none; position: absolute; width:50px; height:50px; left: 0px; top: 0px;">`,
          size: new naver.maps.Size(75, 75),
          anchor: new naver.maps.Point(11, 35),
        },
      });
    });
  }, [thumbNailList, naverMap]);
}

export default useMarker;
