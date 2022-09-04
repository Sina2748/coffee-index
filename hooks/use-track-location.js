import { useState } from "react";

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [latLong, setLatLong] = useState("");
  const [inFindingLocation, setIsFindingLocation] = useState(false);


  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    setLatLong(`${latitude},${longitude}`);
    setLocationErrorMsg("");
    setIsFindingLocation(false);
  };

  const error = () => {
    setLocationErrorMsg("Unable to retrieve your location");
    setIsFindingLocation(false);
  };

  const handleTrackLocation = () => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
      
    } else {
      // status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    latLong,
    handleTrackLocation,
    locationErrorMsg,
    inFindingLocation,
  };
};

export default useTrackLocation;