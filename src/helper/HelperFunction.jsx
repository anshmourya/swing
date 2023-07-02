import axios from "axios";
//gettting the addred in form of string. using promise and pass it as a parameter to resolve it. cuz getcurrentPostion return th promises to resolve we have to pass it as paramenter.
export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => onsuccess(position, resolve),
        reject
      );
    } else {
      reject(new Error("Geolocation is not supported"));
    }
  });
};
//if get location acces , run this function to get location
const onsuccess = async (position, resolve) => {
  try {
    const { latitude, longitude } = position.coords;

    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&location_type=ROOFTOP&result_type=street_address&key=AIzaSyDtnlW-a6IHfxV8ftc_hLoL7WiHvHbWVAA`
    );

    const result = res.data.results[0];
    resolve(result);
  } catch (error) {
    throw new Error(error);
  }
};
