import { useState } from "react";
import axios from "axios";

function ChatPage() {
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "patient",
      text: "Hello doctor, I have been feeling stomach pain.",
    },
  ]);

  const sendMessage = async () => {
    // prevent empty message
    if (!message.trim()) return;

    // store current message
    const currentMessage = message;

    // clear input immediately
    setMessage("");

    // doctor message
    const userMessage = {
      sender: "doctor",
      text: currentMessage,
    };

    // add doctor message
    setMessages((prev) => [...prev, userMessage]);

    // show loading
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5001/api/chats",
        {
          message: currentMessage,
        }
      );

      // AI patient reply
      const botMessage = {
        sender: "patient",
        text: res.data.reply,
      };

      // add patient reply
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.log(error);

      // error fallback message
      setMessages((prev) => [
        ...prev,
        {
          sender: "patient",
          text: "Sorry doctor, I cannot respond right now.",
        },
      ]);
    }

    // stop loading
    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-blue-500 text-white p-5 shadow">
        <h1 className="text-2xl font-bold">
          AI Patient Simulation
        </h1>

        <p>Patient: John Smith (Gastritis)</p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-5">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              msg.sender === "doctor"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[70%] ${
                msg.sender === "doctor"
                  ? "bg-blue-500 text-white"
                  : "bg-white border"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border px-4 py-2 rounded-lg">
              Patient is typing...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask patient about symptoms..."
          className="flex-1 border p-3 rounded-lg outline-none"
          
          // send on Enter key
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-6 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;