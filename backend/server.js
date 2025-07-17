require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");

// initialize express app
const app = express();

// http server for socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT"],
  },
});

// middlewares
app.use(cors());
app.use(express.json());

// mongo DB connection
try {
  connectDB();
} catch (error) {
  console.error("Database connection failed:", error.message);
}

// attach socket.io to the express app
app.set("io", io);

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));

// port configuration
const PORT = process.env.PORT || 5000;

// websocket connection
io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
  console.log("Total connected clients:", io.engine.clientsCount);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}.See at http://localhost:${PORT}`
  );
});
