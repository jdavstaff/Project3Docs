import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import React, { Component } from "react";

const mapStyles = {
  width: 'auto',
  height: 'auto',
};

export class MapContainer extends Component{
    render(){ 
        return (
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 47.444, lng: -122.176}}
            />
        );
    }
}

export default GoogleApiWrapper({
  apiKey: key
})(MapContainer);