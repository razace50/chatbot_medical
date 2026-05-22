import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, User, Bot, Moon } from "lucide-react";

function ChatPage() {

  const { patientId } = useParams();

  const [patientName, setPatientName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [chat, setChat] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {

    const fetchPatient = async () => {
      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:5001/api/patients/${patientId}`,
          {
            headers: {
              authorization: token,
            },
          }
        );

        setPatientName(res.data.name);

        setChat([
          {
            sender: "patient",
            text: `Hello doctor, I am ${res.data.name}. I have been feeling unwell lately.`,
          },
        ]);

      } catch (error) {
        console.log(error);
      }
    };

    fetchPatient();

  }, [patientId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat, loading]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = {
      sender: "doctor",
      text: message,
    };

    setChat((prev) => [...prev, userMessage]);

    const currentMessage = message;

    setMessage("");
    setLoading(true);

    try {

      const token = localStorage.getItem("token");

const res = await axios.post(
  "http://localhost:5001/api/chats",
  {
    message: currentMessage,
    patientId,
  },
  {
    headers: {
      authorization: token,
    },
  }
);


      const aiReply = {
        sender: "patient",
        text: res.data.reply,
      };

      setChat((prev) => [...prev, aiReply]);

    } catch (error) {

      console.log(error);

      setChat((prev) => [
        ...prev,
        {
          sender: "patient",
          text: "Sorry doctor, I am unable to respond right now.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen bg-black flex flex-col text-white">

      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between shadow-lg">

        <div>
          <h1 className="text-2xl font-bold">
            Virtual Patient Simulation
          </h1>

          <p className="text-zinc-400 text-sm mt-1">
            Patient: {patientName}
          </p>
        </div>

        <div className="flex items-center gap-3">

          <div className="bg-green-900/40 text-green-400 px-3 py-1 rounded-full text-sm border border-green-800">
            Online
          </div>

          <div className="bg-zinc-800 p-2 rounded-full border border-zinc-700">
            <Moon size={18} className="text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 bg-gradient-to-b from-black to-zinc-950">

        {chat.map((msg, index) => (

          <div
            key={index}
            className={`flex ${
              msg.sender === "doctor"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`flex gap-3 max-w-3xl ${
                msg.sender === "doctor"
                  ? "flex-row-reverse"
                  : "flex-row"
              }`}
            >

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  msg.sender === "doctor"
                    ? "bg-blue-600"
                    : "bg-zinc-700"
                }`}
              >
                {
                  msg.sender === "doctor"
                    ? <User size={18} />
                    : <Bot size={18} />
                }
              </div>

              <div
                className={`px-5 py-3 rounded-2xl shadow-sm whitespace-pre-wrap ${
                  msg.sender === "doctor"
                    ? "bg-blue-600 text-white rounded-br-md"
                    : "bg-zinc-900 text-zinc-100 rounded-bl-md border border-zinc-800"
                }`}
              >

                <p className="text-sm font-semibold mb-1">
                  {
                    msg.sender === "doctor"
                      ? "Medical Student"
                      : patientName
                  }
                </p>

                <p className="text-[15px] leading-relaxed">
                  {msg.text}
                </p>
              </div>
            </div>
          </div>
        ))}

        {
          loading && (
            <div className="flex justify-start">

              <div className="flex gap-3 items-center">

                <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center">
                  <Bot size={18} />
                </div>

                <div className="bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-2xl shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <div className="bg-zinc-900 border-t border-zinc-800 p-4">

        <div className="max-w-5xl mx-auto flex items-end gap-3">

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder="Ask about symptoms, history, duration, pain location..."
            className="flex-1 resize-none bg-zinc-950 border border-zinc-700 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-zinc-500"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 text-white p-4 rounded-2xl transition"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
