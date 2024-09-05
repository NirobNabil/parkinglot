import React, { useEffect, useState, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  useMap,
  Pin,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

// Define POI data
const locations = [
  { key: "shahjalalUniversity", location: { lat: 24.9128, lng: 91.8315 } },
  { key: "hazratShahJalalMazar", location: { lat: 24.8995, lng: 91.8697 } },
  { key: "hazratShahParanMazar", location: { lat: 24.8864, lng: 91.8796 } },
  { key: "ratargulSwampForest", location: { lat: 25.0026, lng: 91.951 } },
  { key: "jaflong", location: { lat: 25.1612, lng: 92.0174 } },
  { key: "bichanakandi", location: { lat: 25.1725, lng: 91.9121 } },
  { key: "lalakhal", location: { lat: 25.0902, lng: 92.0308 } },
  { key: "teaGardens", location: { lat: 24.891, lng: 91.867 } },
  { key: "tamabil", location: { lat: 25.181, lng: 92.0135 } },
  { key: "sripurWaterfall", location: { lat: 25.1797, lng: 91.9888 } },
  { key: "malnichharaTeaEstate", location: { lat: 24.9217, lng: 91.8784 } },
  { key: "dreamlandAmusementPark", location: { lat: 24.8838, lng: 91.8722 } },
  { key: "adventureWorld", location: { lat: 24.9063, lng: 91.839 } },
  { key: "osmaniMuseum", location: { lat: 24.8955, lng: 91.8707 } },
  { key: "aliAmjadClockTower", location: { lat: 24.8965, lng: 91.8702 } },
  { key: "pangthumaiWaterfall", location: { lat: 25.1286, lng: 91.9443 } },
  { key: "tilagorEcoPark", location: { lat: 24.9043, lng: 91.8897 } },
  { key: "madhabkundaWaterfall", location: { lat: 24.8047, lng: 91.868 } },
  { key: "hamhamWaterfall", location: { lat: 24.5448, lng: 91.6631 } },
  { key: "lawacharaNationalPark", location: { lat: 24.3209, lng: 91.8024 } },
];

// Main Map Component
const Map = () => (
  <APIProvider apiKey="api_key">
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 24.9048, lng: 91.86 }}
      mapId="DEMO_MAP_ID"
    >
      <PoiMarkers pois={locations} />
    </GoogleMap>
  </APIProvider>
);

// Marker Component
const PoiMarkers = ({ pois }) => {
  const map = useMap();
  const [markers, setMarkers] = useState({});
  const clusterer = useRef(null);

  useEffect(() => {
    if (map && !clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker, key) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  const handleClick = useCallback(
    (ev) => {
      if (!map || !ev.latLng) return;
      console.log("Marker clicked:", ev.latLng.toString());
      map.panTo(ev.latLng);
      map.setZoom(15);
    },
    [map]
  );

  return (
    <>
      {pois.map((poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          clickable={true}
          onClick={handleClick}
          ref={(marker) => setMarkerRef(marker, poi.key)}
        >
          <Pin background="#FBBC04" glyphColor="#000" borderColor="#000" />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default Map;
