import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat";
import "./App.css";
const socket = io.connect("://localhttphost:3003");

function Chats() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [ShowChats, setShowChats] = useState(false);

  const joinroom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChats(true)
    }
  };
  return (
    <div className="App">
      {!ShowChats ? (
        <div className="joinChatContainer">
          <h3>Join a Chat</h3>
          <input
            type="text"
            placeholder="Rachit..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="Room Id"
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          ></input>
          <button onClick={joinroom}>Join a Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default Chats;