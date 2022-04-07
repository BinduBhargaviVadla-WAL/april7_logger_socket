import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const API_ENDPOINT = "http://localhost:3001";
function SocketDemo() {
  const [response, setResponse] = useState("");
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(socketIOClient(API_ENDPOINT));
    const destructFunction = () => {
      console.log(socket);
      if (socket) {
        socket.disconnect();
      }
      alert("component removed");
    };
    return destructFunction;
  }, []);
  useEffect(() => {
    connectSocketConnection(socket);
  }, [socket]);
  const connectSocketConnection = (socket) => {
    console.log("socket");
    if (socket != null) {
      socket.on("GetTime", (data) => {
        setResponse(data);
      });
    } else {
      console.log("null");
    }
  };
  const socketConnect = () => {
    setSocket(socketIOClient(API_ENDPOINT));
  };
  const socketDisconnect = () => {
    socket.disconnect();
  };
  return (
    <div>
      <h1>Socket </h1>
      <div className='div'>
        <button onClick={socketConnect}> Connect </button>
        <button onClick={socketDisconnect} className='disconnect-btn'>
          Disconnect
        </button>
        <div className='div-time'>
          Time: <time dateTime={response}> {response}</time>
        </div>
      </div>
    </div>
  );
}
export default SocketDemo;
