// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const app = express();
// const userRoutes=require("./Routes/userRoutes")

// app.use(cookieParser());
// app.use(express.json());
// const corsOptions = {
//   origin: ["http://localhost:5173", "http://localhost:3000"],

//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// };
// app.use(cors(corsOptions));
// app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.use("/user",userRoutes);

// const PORT = 8000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend
    methods: ["GET", "POST"]
  }
});

// Listen for connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for location updates
  socket.on('send-location', (data) => {
    console.log('Location received:', data);
    // Broadcast to all clients
    socket.broadcast.emit('receive-location', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

