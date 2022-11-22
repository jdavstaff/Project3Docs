import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import { useMemo } from "react";

const containerStyle = {
  width: '500px',
  height: '500px',
};

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
    <div>
      <GoogleMap
      zoom={10}
      center={center}
      mapContainerStyle={containerStyle}
    ></GoogleMap>
    </div>
  );
}
