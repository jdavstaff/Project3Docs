import "./Map.css"
import { useLoadScript, GoogleMap, StandaloneSearchBox, Marker } from "@react-google-maps/api";
import { useMemo, useState } from "react";

const lib = ['places'];
const containerStyle = {
  width: '100%',
  height: '30vh'
}

/**
 * Component used to load the map
 * @returns HTML for loading an embedded Google Map display
 */
export default function Mapper() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_KEY,
    libraries: lib
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}


/**
 * Component containing the implementations of the Google Map display
 * @returns HTML for an embedded Google Map display
 */
function Map() {
  const center = useMemo(() => ({lat: 30.622370, lng: -96.325851}), []);
  const [searchBox, setSearchBox] = useState(null);
  const [selected, setSelected] = useState(center);

  /**
   * Update function to be called when search box value is changed.
   * Changes the selected value to the search box input.
   */
  const onPlacesChanged = () => {
    //searchBox.getPlaces();
    //console.log(searchBox.getPlaces()[0]);
    setSelected(searchBox.getPlaces()[0].geometry.location.toJSON());
  };
  
  /**
   * Sets the search box on map load
   * @param {*} ref ??
   */
  const onLoad = ref => { setSearchBox(ref); };
  

  return (
    <>
    <div className="Wrapper">
      <div className="MapContainer">
        <GoogleMap
        zoom={16}
        center={selected}
        mapContainerStyle={containerStyle}>
            <StandaloneSearchBox
            onPlacesChanged={onPlacesChanged}
            onLoad={onLoad}>
            <input
              type="text"
              placeholder="Enter Customer Location"
              style={{
                boxSizing: 'border-box',
                border: `1px solid transparent`,
                width: `15hw`,
                height: `40px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                margin: 'center',
                textOverflow: `ellipses`,
                position: 'absolute',
                top: '40px',
                marginLeft: '50%'
              }}
            />
            </StandaloneSearchBox>
            selected && <Marker position={selected}/>
        </GoogleMap>
      </div>
    </div>
    </>  
  );
}
