import "../../styles/master.scss";
import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import { useMemo } from "react";

export default function Mapper() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {

  const center = useMemo(() => ({lat: 10, lng: -40}), []);

  return (
    <div style={{ height: '100px', width: '100%' }}>
      <GoogleMap
      zoom={10}
      center={center}
      mapContainerClassName={"map-container"}
    ></GoogleMap>
    </div>
  );
}
