export const getLocation = () => {
  if (navigator.geolocation) {
    // GPS를 지원하면
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.info(`re:${position.coords.latitude} ${position.coords.longitude}`);
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
          resolve({
            latitude: 37.3595704,
            longitude: 127.105399,
          });
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    }).then((coords) => {
      console.log(`coords:${JSON.stringify(coords)}`);
      return coords;
    });
  }
  console.info("GPS를 지원하지 않습니다");
  return {
    latitude: 37.3595704,
    longitude: 127.105399,
  };
};
