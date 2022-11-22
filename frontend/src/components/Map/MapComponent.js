import { useLoadScript, GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: '400px',
  height: '400px'
};

export default function Mapper() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 10, lng: -40 }}
      mapContainerStyle={containerStyle}
      mapContainerClassName="class_map" // use for sass...
    ></GoogleMap>
  );
}
