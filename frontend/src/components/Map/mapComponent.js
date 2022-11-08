import React, { Component, useMemo } from "react";
import { useLoadScript, GoogleMap } from "@react-google-maps/api";

export function Mapper(){
	const {isLoaded} = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_KEY,
	})

	if (!isLoaded) return <div>Loading...</div>;
	return <Map />;
}

function Map(){
	return <GoogleMap 
					zoom={10}
					center = {{lat:10, lng: -40}}
					mapContainerClassName="class_map" // use for sass...
					>
					
					</GoogleMap>
}