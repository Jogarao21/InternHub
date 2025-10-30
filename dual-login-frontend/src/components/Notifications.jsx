import React, { useState } from "react";
import "./Notifications.css";
import {
  FaCheckCircle,
  FaClock,
  FaInfoCircle,
  FaExclamationTriangle,
  FaBell,
  FaEllipsisV,
  FaTrash,
  FaCheck
} from "react-icons/fa";

// Example notification data
const initialNotifications = [
  {
    id: 1,
    type: "success",
    icon: <FaCheckCircle />,
    title: "Internship Confirmed",
    message: "Your application at Google has been accepted. Congratulations on your new opportunity!",
    timestamp: "3 minutes ago",
    read: false
  },
  {
    id: 2,
    type: "pending",
    icon: <FaClock />,
    title: "Application Pending",
    message: "Your application at Amazon is being reviewed by the HR team.",
    timestamp: "25 minutes ago",
    read: false
  },
  {
    id: 3,
    type: "info",
    icon: <FaInfoCircle />,
    title: "New Message",
    message: "Flipkart sent you a message about your interview schedule.",
    timestamp: "2 hours ago",
    read: true
  },
  {
    id: 4,
    type: "warning",
    icon: <FaExclamationTriangle />,
    title: "Action Required",
    message: "Please complete your profile verification for Microsoft internship.",
    timestamp: "5 hours ago",
    read: false
  },
  {
    id: 5,
    type: "success",
    icon: <FaCheckCircle />,
    title: "Interview Scheduled",
    message: "Your interview with TCS has been scheduled for tomorrow at 10 AM.",
    timestamp: "1 day ago",
    read: true
  },
  {
    id: 6,
    type: "info",
    icon: <FaInfoCircle />,
    title: "Profile Viewed",
    message: "Accenture viewed your profile. They might be interested in your skills.",
    timestamp: "2 days ago",
    read: true
  }
];

// Color mapping for notification types
const typeStyles = {
  success: {
    iconColor: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.08)",
    borderColor: "#10b981"
  },
  pending: {
    iconColor: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.08)",
    borderColor: "#f59e0b"
  },
  info: {
    iconColor: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.08)",
    borderColor: "#3b82f6"
  },
  warning: {
    iconColor: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.08)",
    borderColor: "#ef4444"
  }
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeMenu, setActiveMenu] = useState(null);
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    setActiveMenu(null);
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    setActiveMenu(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
    return true;
  });

  return (
    <div className="notif-page-wrapper">
      <div className="notif-page-container">
        {/* Header Section */}
        <div className="notif-header-section">
          <div className="notif-header-content">
            <div className="notif-header-left">
              <div className="notif-icon-wrapper">
                <FaBell className="notif-main-icon" />
                {unreadCount > 0 && (
                  <span className="notif-header-badge">{unreadCount}</span>
                )}
              </div>
              <div className="notif-header-text">
                <h1 className="notif-page-title">Notifications</h1>
                <p className="notif-page-subtitle">
                  {unreadCount > 0 
                    ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                    : "All caught up! No new notifications"}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button 
                className="notif-mark-all-btn"
                onClick={handleMarkAllAsRead}
              >
                <FaCheck className="notif-check-icon" />
                Mark all as read
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="notif-filter-tabs">
            <button 
              className={`notif-filter-tab ${filter === "all" ? "notif-tab-active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All ({notifications.length})
            </button>
            <button 
              className={`notif-filter-tab ${filter === "unread" ? "notif-tab-active" : ""}`}
              onClick={() => setFilter("unread")}
            >
              Unread ({unreadCount})
            </button>
            <button 
              className={`notif-filter-tab ${filter === "read" ? "notif-tab-active" : ""}`}
              onClick={() => setFilter("read")}
            >
              Read ({notifications.length - unreadCount})
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="notif-list-container">
          {filteredNotifications.length === 0 ? (
            <div className="notif-empty-state">
              <FaBell className="notif-empty-icon" />
              <h3 className="notif-empty-title">No notifications found</h3>
              <p className="notif-empty-text">
                {filter === "unread" 
                  ? "You're all caught up! No unread notifications."
                  : "No read notifications to display."}
              </p>
            </div>
          ) : (
            filteredNotifications.map(({ id, type, icon, title, message, timestamp, read }) => (
              <div
                key={id}
                className={`notif-item-card ${read ? "notif-item-read" : "notif-item-unread"}`}
                style={{
                  borderLeftColor: typeStyles[type].borderColor
                }}
              >
                <div 
                  className="notif-item-icon-wrapper" 
                  style={{ 
                    backgroundColor: typeStyles[type].bgColor,
                    color: typeStyles[type].iconColor 
                  }}
                >
                  {icon}
                </div>
                
                <div className="notif-item-content-area">
                  <div className="notif-item-header">
                    <h3 className="notif-item-title">{title}</h3>
                    <div className="notif-item-actions">
                      {!read && <span className="notif-unread-dot"></span>}
                      <button 
                        className="notif-menu-btn"
                        onClick={() => toggleMenu(id)}
                      >
                        <FaEllipsisV />
                      </button>
                      
                      {activeMenu === id && (
                        <div className="notif-dropdown-menu">
                          {!read && (
                            <button 
                              className="notif-menu-item"
                              onClick={() => handleMarkAsRead(id)}
                            >
                              <FaCheck /> Mark as read
                            </button>
                          )}
                          <button 
                            className="notif-menu-item notif-menu-delete"
                            onClick={() => handleDelete(id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="notif-item-message">{message}</p>
                  <span className="notif-item-timestamp">{timestamp}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
