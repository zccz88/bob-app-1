import { useState, useEffect } from "react";

export const useGeocode = (long, lat) => {
  const { kakao } = window;
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.506502, 127.053617),
      level: 7,
    };

    const map = new window.kakao.maps.Map(container, options);

    const geocoder = new kakao.maps.services.Geocoder();
    let callback = (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        console.log("지역 명칭 : " + result[0].address_name);
        console.log("행정구역 코드 : " + result[0].code);
        setName1(result[0].address_name);
        setName2(result[0].code);
      }
    };

    geocoder.coord2RegionCode(long, lat, callback);
  }, []);
  return [name1, name2];
};
