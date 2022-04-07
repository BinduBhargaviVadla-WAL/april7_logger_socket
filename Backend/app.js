const express = require("express");
const http = require("http");
var logger = require("morgan");
const socketIo = require("socket.io");
const port = 3001;
const app = express();
//dev prints in color logs.
app.use(logger("this is dev logger"));
app.use(logger("dev"));

//covers all info
app.use(logger("this is combined logger"));
app.use(logger("combined"));

//tiny mssg
app.use(logger("this is tiny logger"));
app.use(logger("tiny"));

app.use(logger("this is short logger"));
app.use(logger("short"));

//with time it prints generally
app.use(logger("this is common logger"));
app.use(logger("common"));

app.use(
  logger(
    "My Logger\nstatus-:status\nmethod-:method\nurl-:url\ncontent-length-:res[content-length]\ntime-:response-time ms"
  )
);

app.get("/", function (req, res) {
  res.send("hello, This is morgan logger Example");
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
