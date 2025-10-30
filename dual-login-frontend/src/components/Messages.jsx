import React, { useState, useRef, useEffect } from "react";
import {
  FaSearch,
  FaPaperclip,
  FaRegSmile,
  FaPaperPlane,
  FaCircle
} from "react-icons/fa";
import "./Messages.css";

const chats = [
  {
    id: 1,
    company: "Zdminds",
    logo: "Z",
    internship: "Python Development Internship",
    lastMessage: "Let us know your available time slot.",
    unread: 2,
    online: true,
    messages: [
      { from: "recruiter", text: "Hi, congratulations on your selection!", time: "09:12 AM" },
      { from: "user", text: "Thank you! Looking forward to it.", time: "09:14 AM" },
      { from: "recruiter", text: "Let us know your available time slot.", time: "09:16 AM" }
    ]
  },
  {
    id: 2,
    company: "Everything About AI",
    logo: "E",
    internship: "Data Science Intern",
    lastMessage: "See you at the onboarding tomorrow.",
    unread: 0,
    online: false,
    messages: [
      { from: "user", text: "Is the onboarding offline or remote?", time: "07:41 AM" },
      { from: "recruiter", text: "Remote, link will be shared!", time: "07:45 AM" },
      { from: "recruiter", text: "See you at the onboarding tomorrow.", time: "07:45 AM" }
    ]
  },
  {
    id: 3,
    company: "Flipkart",
    logo: "F",
    internship: "Frontend Developer Intern",
    lastMessage: "Can you send your portfolio link?",
    unread: 0,
    online: false,
    messages: [
      { from: "recruiter", text: "Can you send your portfolio link?", time: "Yesterday" }
    ]
  }
];

const Messages = () => {
  const [query, setQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [input, setInput] = useState("");
  const [userTyping, setUserTyping] = useState(false);
  const [recruiterTyping, setRecruiterTyping] = useState(false);

  const typingTimeout = useRef(null);
  const recruiterTimeout = useRef(null);

  // When user types, remove recruiter indicator and set user indicator
  const handleInputChange = (e) => {
    setInput(e.target.value);
    setUserTyping(true);
    setRecruiterTyping(false);

    // If the user pauses typing for 3 seconds, show recruiter typing indicator
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      setUserTyping(false);
      setRecruiterTyping(true);

      // Recruiter types for 2 seconds then stops
      clearTimeout(recruiterTimeout.current);
      recruiterTimeout.current = setTimeout(() => {
        setRecruiterTyping(false);
      }, 2000);
    }, 2500);
  };

  // On send, clear all indicators
  const handleSend = () => {
    if (!input.trim()) return;
    setSelectedChat(prev => ({
      ...prev,
      messages: [...prev.messages, { from: "user", text: input, time: "Now" }]
    }));
    setInput("");
    setUserTyping(false);
    setRecruiterTyping(false);

    clearTimeout(typingTimeout.current);
    clearTimeout(recruiterTimeout.current);
  };

  // When changing chats, remove typing indicators
  useEffect(() => {
    setUserTyping(false);
    setRecruiterTyping(false);
    setInput("");
    clearTimeout(typingTimeout.current);
    clearTimeout(recruiterTimeout.current);
  }, [selectedChat.id]);

  const filteredChats = chats.filter(
    c =>
      c.company.toLowerCase().includes(query.toLowerCase()) ||
      c.internship.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="messages-main-wrapper">
      {/* Sidebar */}
      <aside className="messages-sidebar">
        <div className="messages-searchbar">
          <FaSearch />
          <input
            type="text"
            placeholder="Search chats…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <nav className="messages-chats-list">
          {filteredChats.length === 0 && (
            <div className="messages-no-chats">No chats found.</div>
          )}
          {filteredChats.map(chat => (
            <div
              key={chat.id}
              className={`messages-chat-item${chat.id === selectedChat.id ? " active" : ""}`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className={`messages-company-logo${chat.online ? " online" : ""}`}>
                {chat.logo}
              </div>
              <div className="messages-chat-meta">
                <div className="messages-company-row">
                  <span className="messages-company-name">{chat.company}</span>
                  {chat.unread > 0 && (
                    <span className="messages-unread-badge">{chat.unread}</span>
                  )}
                </div>
                <div className="messages-internship">{chat.internship}</div>
                <div className="messages-last-message">{chat.lastMessage}</div>
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Chat Area */}
      <section className="messages-chat-area">
        {/* Chat header */}
        <div className="messages-chat-header">
          <div className={`messages-company-logo big${selectedChat.online ? " online" : ""}`}>
            {selectedChat.logo}
          </div>
          <div>
            <div className="messages-header-row">
              <span className="messages-company-name">{selectedChat.company}</span>
              <span className={`messages-status-badge ${selectedChat.online ? "online" : "offline"}`}>
                <FaCircle />
                {selectedChat.online ? "Online" : "Offline"}
              </span>
            </div>
            <div className="messages-internship">{selectedChat.internship}</div>
          </div>
        </div>
        {/* Messages */}
        <div className="messages-chat-body">
          {selectedChat.messages.map((msg, i) => (
            <div
              key={i}
              className={`message-bubble ${msg.from === "user" ? "sent" : "received"}`}
            >
              <span className="message-text">{msg.text}</span>
              <span className="message-time">{msg.time}</span>
            </div>
          ))}
          {recruiterTyping && (
            <div className="message-bubble received typing-dot">
              <span className="typing-indicator">
                <span />
                <span />
                <span />
              </span>
              <span className="message-time">Recruiter is typing…</span>
            </div>
          )}
        </div>
        {/* Chat Input */}
        <div className="messages-chat-inputbar">
          <button className="chat-attach-btn" tabIndex={-1}><FaPaperclip /></button>
          <input
            type="text"
            placeholder="Type your message…"
            value={input}
            onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button className="chat-emoji-btn" tabIndex={-1}><FaRegSmile /></button>
          <button className="chat-send-btn" onClick={handleSend} tabIndex={0}><FaPaperPlane /></button>
        </div>
      </section>
    </div>
  );
};

export default Messages;
