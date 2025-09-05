import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Input from "../common/Input";
import createSocketConnection from "../utils/socket";
import { useSelector } from "react-redux";
import { axiosApi } from "../providers/axiosInstances";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState(null);

  useEffect(() => {
    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      targetUserId,
      userId,
    });

    socket.on("newMessageReceived", ({ messageData }) => {
      console.log("Message received:", messageData);

      if (!messageData?.text || !messageData?.sender) {
        console.error("Missing required fields in message data:", messageData);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: messageData?.text,
          firstName: messageData?.sender?.firstName,
          lastName: messageData?.sender?.lastName,
          timestamp: new Date(messageData?.timestamp),
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [targetUserId, userId, user?.firstName, user?.lastName]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!targetUserId) return;

      try {
        setIsLoadingProfile(true);
        setProfileError(null);
        const response = await axiosApi.get(`/profile/${targetUserId}`);
        setUserProfile(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setProfileError("Failed to load user profile");
        setUserProfile(null);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, [targetUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !socketRef.current || newMessage.length > 1000)
      return;

    const messageText = newMessage.trim();

    setNewMessage("");

    socketRef.current.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId: userId,
      targetUserId: targetUserId,
      text: messageText,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return messageTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return messageTime.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const formatSenderName = (firstName, lastName) => {
    return `${firstName} ${lastName}`.trim();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-4xl flex items-center justify-center shadow-md">
            <img
              src={userProfile?.photoUrl}
              alt="User Profile"
              className="w-full h-full object-cover rounded-4xl"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">
              {userProfile?.firstName + " " + userProfile?.lastName || "User"}
            </h1>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-gradient-to-b from-gray-50 to-gray-100">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">Start a conversation</p>
              <p className="text-gray-400 text-sm">
                Send a message to begin chatting
              </p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => {
            const isOwnMessage = message.firstName === user?.firstName;
            const showSenderName =
              !isOwnMessage &&
              (index === 0 ||
                messages[index - 1].firstName !== message.firstName);

            return (
              <div
                key={message.id}
                className={`flex ${
                  isOwnMessage ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md ${
                    isOwnMessage ? "ml-12" : "mr-12"
                  }`}
                >
                  {showSenderName && (
                    <div className="flex items-center space-x-2 mb-1 px-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">
                          {message.firstName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {formatSenderName(message.firstName, message.lastName)}
                      </span>
                    </div>
                  )}
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm ${
                      isOwnMessage
                        ? "bg-blue-500 text-white rounded-br-md"
                        : "bg-white text-gray-900 rounded-bl-md border border-gray-200"
                    }`}
                  >
                    <p className="text-sm leading-relaxed break-words">
                      {message.text}
                    </p>
                    <div
                      className={`flex items-center justify-end mt-2 space-x-1 ${
                        isOwnMessage ? "text-blue-100" : "text-gray-400"
                      }`}
                    >
                      <span className="text-xs">
                        {formatTime(message.timestamp)}
                      </span>
                      {isOwnMessage &&
                        (message.isSending ? (
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs">Sending...</span>
                          </div>
                        ) : (
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <div className="relative">
              <Input
                type="text"
                name="message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={handleKeyPress}
                className="rounded-full pr-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full p-3 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none"
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
        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
          <span>Press Enter to send</span>
          <span className={newMessage.length > 900 ? "text-red-500" : ""}>
            {newMessage.length}/1000
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chat;
