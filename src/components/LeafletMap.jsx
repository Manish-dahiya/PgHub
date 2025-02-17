// components/LeafletMap.js
"use client"
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Image from 'next/image';
import L from 'leaflet'; // Make sure to import L from Leaflet


const LeafletMap = ({ onLocationSelected, markers,properties }) => {
  const [userMarker, setUserMarker] = useState(null);

  // This hook handles map click events and updates the state
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setUserMarker([lat, lng]); // Set the user's marker location
        onLocationSelected({ latitude: lat, longitude: lng }); // Pass the location to parent component
      },
    });
    return null;
  };

  const [locations,setLocation]= useState([{latitude:1323,longitude:1323}])
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        setLocation((prev) => {
            const updatedLocations = [...prev, { latitude: lat, longitude: long }];
           
            return updatedLocations;
          });   
      });
      
  },[])

  //icon for marker
  const customIcon = L.icon({
    iconUrl: "/locationIcon.jpeg", // Your custom image URL
    iconSize: [32, 32], // Adjust size as needed
    iconAnchor: [16, 32], // Anchor the icon to the bottom center
    popupAnchor: [0, -32], // Position the popup relative to the icon
  });
  const mapCenter={lat:30.714241901356576,lan:76.74618446637054} ;//chandigarh

  return (
    <>
    <MapContainer
      center={[mapCenter.lat,mapCenter.lan]} // Set initial map center
      zoom={13}
      className='map-styles'
      style={{ height: '700px'   }}
    >
      {/* Tile layer for the map */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Handling map click events */}
      <MapClickHandler />

      {/* User marker */}
      {userMarker && (
        <Marker position={userMarker} icon={customIcon}
        eventHandlers={{
            mouseover: (e) => {
              e.target.openPopup(); // Open popup on hover
            },
            mouseout: (e) => {
              e.target.closePopup(); // Close popup when hover ends
            },
          }}
        >

          <Popup>Your selected location</Popup>
        </Marker>
      )}

      {/* Displaying any other markers passed from props */}
      {properties?.map((item, index) => (
        <Marker key={index} position={[item.location.latitude, item.location.longitude]} icon={customIcon}
        eventHandlers={{
            mouseover: (e) => {
              e.target.openPopup(); // Open popup on hover
            },
            mouseout: (e) => {
              e.target.closePopup(); // Close popup when hover ends
            },
          }}
        >
          <Popup>
            <h1 className='font-bold'>{item.propertyName}</h1>
            <p>{item.propertyDesc}</p>
          </Popup>
         
        </Marker>
      ))}
    </MapContainer>
    
    </>
  );
};

export default LeafletMap;