import React, { useEffect, useState } from "react";

const App = () => {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:8080");

    websocket.onopen = () => {
      console.log("WebSocket connected");
    };

    websocket.onmessage = (event) => {
      console.log("Message from server:", event.data);
      setChat((prevChat) => [...prevChat, event.data]);
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    websocket.onclose = () => {
      console.log("WebSocket closed");
    };

    setWs(websocket);

    return () => {
      console.log("Cleaning up WebSocket connection");
      websocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
      setMessage("");
    } else {
      console.error("WebSocket is not open");
    }
  };

  return (
    <div>
      <h1>WebSocket Chat</h1>
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          height: "200px",
          overflowY: "auto",
        }}
      >
        {chat.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default App;
