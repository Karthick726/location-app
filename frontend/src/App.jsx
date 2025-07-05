import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:5000");

function App() {
  const [myLocation, setMyLocation] = useState(null);
  const [otherLocation, setOtherLocation] = useState(null);

 

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
        });
      }
    }, 5000);

    // Listen for other location
    socket.on('receive-location', (data) => {
      setOtherLocation(data);
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Live Location Sharing (Bus Tracking)</h2>
      <p><strong>Your Location:</strong> {myLocation ? `${myLocation.lat}, ${myLocation.lng}` : 'Fetching...'}</p>
      <p><strong>Other User:</strong> {otherLocation ? `${otherLocation.lat}, ${otherLocation.lng}` : 'Waiting for data...'}</p>
    </div>
  );
}

export default App;
