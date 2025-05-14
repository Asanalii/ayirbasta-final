import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  useLoadScript,
} from "@react-google-maps/api";

import "./_map.scss";

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDoCi31rZtCU2yZyDtYKskScWmw8i6Vld8",
  });
  if (!isLoaded) return <div>Loading ...</div>;
  return (
    <GoogleMap
      zoom={12}
      center={{ lat: 48.210033, lng: 16.363449 }}
      mapContainerClassName="map-container"
    ></GoogleMap>
  );
}

export default Map;
