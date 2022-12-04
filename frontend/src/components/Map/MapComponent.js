import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import { useMemo } from "react";

export default function Mapper() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

const containerStyle = {
  width: '400px',
  height: '400px'
}

function Map() {

  const center = useMemo(() => ({lat: 10, lng: -40}), []);

  return (
      <GoogleMap
      zoom={10}
      center={center}
      mapContainerStyle={containerStyle}
    ></GoogleMap>
  );
}
