import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Input from "../common/Input";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! How's it going?",
      sender: "them",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: 2,
      text: "I'm doing great! Just working on some new projects.",
      sender: "me",
      timestamp: new Date(Date.now() - 30000),
    },
    {
      id: 3,
      text: "That sounds interesting! What kind of projects?",
      sender: "them",
      timestamp: new Date(Date.now() - 15000),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: "me",
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage("");

      // Simulate response after 1-2 seconds
      setTimeout(() => {
        const responses = [
          "That's cool!",
          "Interesting point!",
          "I see what you mean.",
          "Thanks for sharing!",
          "What do you think about that?",
        ];
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];
        const responseMessage = {
          id: Date.now() + 1,
          text: randomResponse,
          sender: "them",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, responseMessage]);
      }, 1000 + Math.random() * 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {targetUserId ? targetUserId.charAt(0).toUpperCase() : "U"}
            </span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              {targetUserId || "User"}
            </h1>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === "me"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white text-gray-900 rounded-bl-none shadow-sm border border-gray-200"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === "me" ? "text-blue-100" : "text-gray-400"
                }`}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <Input
              type="text"
              name="message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={handleKeyPress}
              className="rounded-full"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full p-3 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
