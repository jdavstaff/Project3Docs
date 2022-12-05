import "./Map.css"
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
  width: '100%',
  height: '50vh',
  border: '10px'
}

function Map() {

  const center = useMemo(() => ({lat: 10, lng: -40}), []);

  return (
    <div className="Wrapper">
      <div className="MapContainer">
        <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={containerStyle}>
        </GoogleMap>
      </div>
    </div>  
  );
}
