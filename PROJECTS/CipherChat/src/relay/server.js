
/**
 * @fileOverview CipherChat Relay Server
 * 
 * This is a simple Socket.IO server that acts as a zero-trust relay for
 * end-to-end encrypted messages. It does not store or process keys.
 */
const { Server } = require("socket.io");
const http = require("http");

const PORT = 5000;
const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`[RELAY] Connected: ${socket.id}`);

  socket.on("join", (data) => {
    socket.join(data.room);
    console.log(`[RELAY] ${data.username} joined room: ${data.room}`);
    // Notify room that a new user joined and share public key
    io.to(data.room).emit("user_joined", {
      username: data.username,
      publicKey: data.publicKey
    });
  });

  socket.on("share_key", (data) => {
    // Proactively share key with peers who might already be in the room
    socket.to(data.room).emit("peer_key_share", {
      username: socket.id,
      publicKey: data.publicKey
    });
  });

  socket.on("send_message", (data) => {
    console.log(`[RELAY] Relaying encrypted payload from ${data.sender}`);
    // Relay the encrypted payload to all others in the room
    socket.to(data.room).emit("encrypted_message", {
      sender: data.sender,
      payload: data.payload
    });
  });

  socket.on("disconnect", () => {
    console.log(`[RELAY] Disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`-------------------------------------------`);
  console.log(`  CipherChat Relay Server V2.0 Active     `);
  console.log(`  Endpoint: http://localhost:${PORT}        `);
  console.log(`  Status: SECURE RELAY RUNNING            `);
  console.log(`-------------------------------------------`);
});
