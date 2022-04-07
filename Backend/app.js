const express = require("express");
const http = require("http");
var logger = require("morgan");
const socketIo = require("socket.io");
const port = 3001;
const app = express();
//dev prints in color logs.
app.use(logger("dev"));
//covers all info
app.use(logger("combined"));
//tiny mssg
app.use(logger("tiny"));
app.use(logger("short"));
//with time it prints generally
app.use(logger("common"));

app.get("/", function (req, res) {
  res.send("hello, world!");
});

const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`));

const io = socketIo(server, { cors: { origin: "*" } });
let interval;
io.on("connection", (socket) => {
  console.log("New socket client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});
const getApiAndEmit = (socket) => {
  const response = new Date().toLocaleTimeString();
  //Emitting a new message. will be consumed
  socket.emit("GetTime", response);
};
