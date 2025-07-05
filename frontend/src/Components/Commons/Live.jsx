import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');

const LiveMap = () => {
  const [myLocation, setMyLocation] = useState(null);
  const [otherLocations, setOtherLocations] = useState([]);

  useEffect(() => {
    // Send location every 5 seconds
    const interval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setMyLocation(coords);
          socket.emit('locationUpdate', coords);
        });
      }
    }, 5000);

    // Receive others' location
    socket.on('locationUpdate', (coords) => {
      setOtherLocations((prev) => [...prev, coords]);
    });

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, []);


  console.log(otherLocations)

  return (
    <div>
      <h2>Live Location</h2>
      <p>My Location: {myLocation && `${myLocation.lat}, ${myLocation.lng}`}</p>
      <ul>
        {otherLocations.map((loc, idx) => (
          <li key={idx}>Other: {loc.lat}, {loc.lng}</li>
        ))}
      </ul>
    </div>
  );
};

export default LiveMap;
