import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
const socket = io("https://location-app-backend-phi.vercel.app");

function App() {
  const [myLocation, setMyLocation] = useState(null);
  const [otherLocation, setOtherLocation] = useState(null);
  const [address, setAddress] = useState('');
 

  useEffect(() => {
    // Get location and send every 5 seconds
    const interval = setInterval(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setMyLocation(coords);
          socket.emit('send-location', coords);
          getAddress(coords.lat, coords.lng);
        });
      }
    }, 5000);

    // Listen for other location
    socket.on('receive-location', (data) => {
      setOtherLocation(data);
    });

    return () => clearInterval(interval);
  }, []);


   const getAddress = async (lat, lng) => {
    try {
      const apiKey = "cca231bee05d40bba4464e9d62677c5b"; // 🔑 Replace with your key
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`
      );
      const result = response.data.results[0];
      if (result) {
        setAddress(result.formatted);
      }
    } catch (error) {
      console.error("Error getting address:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Live Location Sharing (Bus Tracking)</h2>
      <p><strong>Your Location:</strong> {myLocation ? `${myLocation.lat}, ${myLocation.lng}` : 'Fetching...'}</p>
    <p><strong>Address:</strong> {address}</p>
    </div>
  );
}

export default App;
