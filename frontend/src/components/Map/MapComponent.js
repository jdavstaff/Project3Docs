import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import { useMemo } from "react";

const containerStyle = {
  width: 'auto',
  height: '500px',
  margin: '10px',
  padding: '10px'
};

export default function Mapper() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
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
