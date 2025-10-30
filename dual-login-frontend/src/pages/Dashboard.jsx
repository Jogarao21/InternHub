import React, { useState, useEffect, useRef } from "react";
import Notifications from "../components/Notifications";
import MyApplications from "../components/MyApplications";
import MyInternships from "../components/MyInternships";
import SearchInternships from "../components/SearchInternships";
import "./Dashboard.css";
import {
  FaBriefcase,
  FaCheckCircle,
  FaSpinner,
  FaBell,
  FaBars,
  FaTimes,
  FaClipboardList,
  FaEnvelope,
  FaUser,
  FaTachometerAlt,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt
} from "react-icons/fa";

const sidebarItems = [
  { key: "SearchInternships", icon: <FaSearch />, label: "Search Internships" },
  { key: "Dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
  { key: "Applications", icon: <FaClipboardList />, label: "Applications" }
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [userEmail, setUserEmail] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Get user email from localStorage
    const email = localStorage.getItem("userEmail") || "user@example.com";
    setUserEmail(email);
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getInitial = (email) => {
    if (!email) return "U";
    return email.charAt(0).toUpperCase();
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleNotificationClick = () => {
    setShowNotifications(true);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  // ---- Main render ----
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""} ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <h2 className="logo">InternHub</h2>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div className="collapse-btn" onClick={toggleCollapse}>
              {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </div>
            <FaTimes className="close-btn" onClick={toggleSidebar} />
          </div>
        </div>
        <nav>
          <ul>
            {sidebarItems.map((item) => (
              <li
                key={item.key}
                className={selectedMenu === item.key && !showNotifications ? "active" : ""}
                onClick={() => {
                  setSelectedMenu(item.key);
                  setShowNotifications(false);
                }}
              >
                <span className="nav-icon">{item.icon}</span>
                {!sidebarCollapsed && <span>{item.label}</span>}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Main Content */}
      <div className="main">
        {/* Show ONLY Notifications page */}
        {showNotifications ? (
          <div className="notifications-page-wrapper">
            <div className="notifications-topbar">
              <button className="notifications-back-btn" onClick={handleCloseNotifications}>
                &larr; Back
              </button>
              <span className="notifications-title">Notifications</span>
            </div>
            <Notifications />
          </div>
        ) : (
          <>
            {/* Show dashboard content */}
            {selectedMenu === "Dashboard" && (
              <>
                {/* Topbar */}
                <header className="topbar">
                  <div className="topbar-left">
                    <FaBars className="menu-icon" onClick={toggleSidebar} />
                    <input type="text" placeholder="Search internships, companies..." className="search" />
                  </div>
                  <div className="topbar-icons">
                    <div
                      className="notification-wrapper"
                      onClick={handleNotificationClick}
                      style={{ cursor: "pointer" }}
                    >
                      <FaBell className="icon" />
                      <span className="badge">3</span>
                    </div>
                    <div className="profile-wrapper" onClick={toggleProfileDropdown} ref={dropdownRef}>
                      <div className="profile-avatar">
                        {getInitial(userEmail)}
                      </div>
                      
                      
                      {/* Profile Dropdown */}
                      {showProfileDropdown && (
                        <div className="profile-dropdown">
                          <div className="dropdown-header">
                            <div className="dropdown-avatar">
                              {getInitial(userEmail)}
                            </div>
                            <div className="dropdown-email">{userEmail}</div>
                          </div>
                          <div className="dropdown-divider"></div>
                          <button className="dropdown-item logout-btn" onClick={handleLogout}>
                            <FaSignOutAlt className="dropdown-icon" />
                            <span>Logout</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </header>

                {/* Welcome Section */}
                <section className="welcome-section">
                  <div className="welcome-text">
                    <h1>
                      Welcome Tech<span className="bee-container">Bee
                        <svg className="bee-icon" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                          {/* Bee SVG content */}
                          <ellipse cx="500" cy="600" rx="120" ry="180" fill="#2C2C2C" />
                          <ellipse cx="500" cy="420" rx="100" ry="140" fill="#2C2C2C" />
                          <ellipse cx="500" cy="280" rx="80" ry="100" fill="#2C2C2C" />
                          <ellipse cx="500" cy="520" rx="115" ry="40" fill="#FFD700" />
                          <ellipse cx="500" cy="620" rx="118" ry="40" fill="#FFD700" />
                          <ellipse cx="500" cy="380" rx="95" ry="35" fill="#FFD700" />
                          <path d="M 400 350 Q 200 300 150 400 Q 120 480 200 520 Q 280 540 380 480 Z" fill="#E8E8E8" opacity="0.9" />
                          <path d="M 350 420 Q 220 400 200 450 Q 190 480 240 500 Q 290 510 340 470 Z" fill="#F5F5F5" opacity="0.8" />
                          <path d="M 600 350 Q 800 300 850 400 Q 880 480 800 520 Q 720 540 620 480 Z" fill="#E8E8E8" opacity="0.9" />
                          <path d="M 650 420 Q 780 400 800 450 Q 810 480 760 500 Q 710 510 660 470 Z" fill="#F5F5F5" opacity="0.8" />
                          <path d="M 400 350 Q 300 380 200 420" stroke="#CCCCCC" strokeWidth="3" fill="none" />
                          <path d="M 380 400 Q 300 420 220 460" stroke="#CCCCCC" strokeWidth="3" fill="none" />
                          <path d="M 600 350 Q 700 380 800 420" stroke="#CCCCCC" strokeWidth="3" fill="none" />
                          <path d="M 620 400 Q 700 420 780 460" stroke="#CCCCCC" strokeWidth="3" fill="none" />
                          <path d="M 440 450 Q 400 500 380 580" stroke="#2C2C2C" strokeWidth="15" fill="none" strokeLinecap="round" />
                          <path d="M 420 550 Q 380 600 350 680" stroke="#2C2C2C" strokeWidth="15" fill="none" strokeLinecap="round" />
                          <path d="M 440 650 Q 400 710 380 790" stroke="#2C2C2C" strokeWidth="15" fill="none" strokeLinecap="round" />
                          <path d="M 560 450 Q 600 500 620 580" stroke="#2C2C2C" strokeWidth="15" fill="none" strokeLinecap="round" />
                          <path d="M 580 550 Q 620 600 650 680" stroke="#2C2C2C" strokeWidth="15" fill="none" strokeLinecap="round" />
                          <path d="M 560 650 Q 600 710 620 790" stroke="#2C2C2C" strokeWidth="15" fill="none" strokeLinecap="round" />
                          <path d="M 470 250 Q 450 180 420 120" stroke="#2C2C2C" strokeWidth="12" fill="none" strokeLinecap="round" />
                          <path d="M 530 250 Q 550 180 580 120" stroke="#2C2C2C" strokeWidth="12" fill="none" strokeLinecap="round" />
                          <circle cx="420" cy="120" r="18" fill="#2C2C2C" />
                          <circle cx="580" cy="120" r="18" fill="#2C2C2C" />
                        </svg>
                      </span>
                    </h1>
                    <p>Here's what's happening with your internships today</p>
                  </div>
                </section>

                {/* Stats Section */}
                <section className="stats">
                  <div className="card card-blue">
                    <div className="card-content">
                      <div className="card-icon-wrapper blue">
                        <FaBriefcase className="card-icon" />
                      </div>
                      <div className="card-info">
                        <h3>12</h3>
                        <p>Total Applied</p>
                      </div>
                    </div>
                    <div className="card-trend">+2 this week</div>
                  </div>
                  <div className="card card-orange">
                    <div className="card-content">
                      <div className="card-icon-wrapper orange">
                        <FaSpinner className="card-icon" />
                      </div>
                      <div className="card-info">
                        <h3>4</h3>
                        <p>Ongoing</p>
                      </div>
                    </div>
                    <div className="card-trend">Active now</div>
                  </div>
                  <div className="card card-green">
                    <div className="card-content">
                      <div className="card-icon-wrapper green">
                        <FaCheckCircle className="card-icon" />
                      </div>
                      <div className="card-info">
                        <h3>8</h3>
                        <p>Completed</p>
                      </div>
                    </div>
                    <div className="card-trend">+3 this month</div>
                  </div>
                </section>

                {/* Internship Table */}
<section className="internships">
  <div className="section-header">
    <h2>Recent Internships</h2>
    <button className="view-all-btn">View All</button>
  </div>
  <div className="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>Role</th>
          <th>Location</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="Company">
            <div className="company-cell">
              <div className="company-logo">G</div>
              <span className="company-name">Google</span>
            </div>
          </td>
          <td data-label="Role" className="role-cell">Frontend Developer</td>
          <td data-label="Location" className="location-cell">Bangalore</td>
          <td data-label="Status">
            <span className="status ongoing">Ongoing</span>
          </td>
          <td data-label="Action">
            <button className="action-btn">View Details</button>
          </td>
        </tr>
        <tr>
          <td data-label="Company">
            <div className="company-cell">
              <div className="company-logo">M</div>
              <span className="company-name">Microsoft</span>
            </div>
          </td>
          <td data-label="Role" className="role-cell">Data Analyst</td>
          <td data-label="Location" className="location-cell">Hyderabad</td>
          <td data-label="Status">
            <span className="status completed">Completed</span>
          </td>
          <td data-label="Action">
            <button className="action-btn">View Details</button>
          </td>
        </tr>
        <tr>
          <td data-label="Company">
            <div className="company-cell">
              <div className="company-logo">T</div>
              <span className="company-name">TCS</span>
            </div>
          </td>
          <td data-label="Role" className="role-cell">React Intern</td>
          <td data-label="Location" className="location-cell">Remote</td>
          <td data-label="Status">
            <span className="status applied">Applied</span>
          </td>
          <td data-label="Action">
            <button className="action-btn">View Details</button>
          </td>
        </tr>
        <tr>
          <td data-label="Company">
            <div className="company-cell">
              <div className="company-logo">A</div>
              <span className="company-name">Amazon</span>
            </div>
          </td>
          <td data-label="Role" className="role-cell">Backend Developer</td>
          <td data-label="Location" className="location-cell">Mumbai</td>
          <td data-label="Status">
            <span className="status ongoing">Ongoing</span>
          </td>
          <td data-label="Action">
            <button className="action-btn">View Details</button>
          </td>
        </tr>
        <tr>
          <td data-label="Company">
            <div className="company-cell">
              <div className="company-logo">F</div>
              <span className="company-name">Flipkart</span>
            </div>
          </td>
          <td data-label="Role" className="role-cell">UI/UX Designer</td>
          <td data-label="Location" className="location-cell">Bangalore</td>
          <td data-label="Status">
            <span className="status applied">Applied</span>
          </td>
          <td data-label="Action">
            <button className="action-btn">View Details</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
              </>
            )} 

            {/* Show My Applications Table when "My Internships" is active */}
            {selectedMenu === "Applications" && <MyApplications />}
            {selectedMenu === "MyInternships" && <MyInternships />}
            {selectedMenu === "SearchInternships" && <SearchInternships />}

          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;