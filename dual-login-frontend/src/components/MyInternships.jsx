import React, { useState } from "react";
import {
  FaBriefcase,
  FaCheckCircle,
  FaSpinner,
  FaRegCalendarAlt,
  FaMoneyBillWave,
  FaCloudDownloadAlt,
  FaFileAlt,
  FaArrowRight,
  FaListUl,
  FaMapMarkerAlt,
  FaClock
} from "react-icons/fa";
import "./MyInternships.css";

const internships = [
  {
    title: "Python Development Internship",
    company: "Zdminds",
    location: "Remote",
    status: "In Progress",
    duration: "6 Months",
    stipend: "10,000 /mo",
    start: "01 Nov 2025",
    progress: 65,
    stages: ["Applied", "Selected", "In Progress", "Completed"],
    action: {
      offer: true,
      details: true,
      report: false
    }
  },
  {
    title: "Data Science Intern",
    company: "Everything About AI",
    location: "Bangalore",
    status: "Completed",
    duration: "4 Months",
    stipend: "15,000 /mo",
    start: "15 Jun 2025",
    progress: 100,
    stages: ["Applied", "Selected", "In Progress", "Completed"],
    action: {
      offer: true,
      details: true,
      report: true
    }
  },
  {
    title: "Web Development",
    company: "Microsoft",
    location: "Hyderabad",
    status: "Applied",
    duration: "3 Months",
    stipend: "8,000 /mo",
    start: "10 Dec 2025",
    progress: 10,
    stages: ["Applied", "Selected", "In Progress", "Completed"],
    action: {
      offer: false,
      details: true,
      report: false
    }
  }
];

const statusBadge = (status) => {
  const statusMap = {
    "Applied": { color: "#3b82f6", bg: "#eff6ff", icon: <FaListUl /> },
    "Selected": { color: "#7c3aed", bg: "#f5f3ff", icon: <FaCheckCircle /> },
    "In Progress": { color: "#f59e0b", bg: "#fffbeb", icon: <FaSpinner className="spin" /> },
    "Completed": { color: "#10b981", bg: "#ecfdf5", icon: <FaCheckCircle /> }
  };
  const info = statusMap[status] || statusMap["Applied"];
  return (
    <span
      className="internship-badge"
      style={{ color: info.color, background: info.bg }}
    >
      {info.icon} {status}
    </span>
  );
};

const MyInternships = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const total = internships.length;
  const completed = internships.filter(i => i.status === "Completed").length;
  const inProgress = internships.filter(i => i.status === "In Progress").length;

  return (
    <div className="myinternships-container">
      <div className="myinternships-wrapper">
        {/* Header */}
        <div className="myinternships-header">
          <h1 className="main-title">My Internships</h1>
          <p className="main-subtitle">Track and manage your internship journey</p>
        </div>

        {/* Summary Cards */}
        <div className="myinternships-summary-grid">
          <div className="summary-card total-card">
            <div className="summary-content">
              <div className="summary-text">
                <span className="summary-label">Total Applied</span>
                <h3 className="summary-number">{total}</h3>
              </div>
              <div className="summary-icon-wrapper blue-icon">
                <FaBriefcase className="summary-icon" />
              </div>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill blue-fill" style={{ width: '100%' }}></div>
            </div>
          </div>

          <div className="summary-card progress-card">
            <div className="summary-content">
              <div className="summary-text">
                <span className="summary-label">Ongoing</span>
                <h3 className="summary-number">{inProgress}</h3>
              </div>
              <div className="summary-icon-wrapper amber-icon">
                <FaSpinner className="summary-icon spin" />
              </div>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill amber-fill" style={{ width: `${(inProgress/total)*100}%` }}></div>
            </div>
          </div>

          <div className="summary-card done-card">
            <div className="summary-content">
              <div className="summary-text">
                <span className="summary-label">Completed</span>
                <h3 className="summary-number">{completed}</h3>
              </div>
              <div className="summary-icon-wrapper green-icon">
                <FaCheckCircle className="summary-icon" />
              </div>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill green-fill" style={{ width: `${(completed/total)*100}%` }}></div>
            </div>
          </div>
        </div>

        {/* Internships Grid */}
        <div className="myinternships-list">
          {internships.map((internship, idx) => (
            <div
              key={idx}
              className={`myinternships-card ${hoveredCard === idx ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Header */}
              <div className="card-header">
                <div className="card-header-content">
                  <h3 className="internship-title">{internship.title}</h3>
                  <div className="company-info">
                    <FaBriefcase className="company-icon" />
                    <span className="company-name">{internship.company}</span>
                  </div>
                  <div className="location-info">
                    <FaMapMarkerAlt className="location-icon" />
                    <span className="location-text">{internship.location}</span>
                  </div>
                </div>
                <div className="status-badge-wrapper">
                  {statusBadge(internship.status)}
                </div>
              </div>

              {/* Card Body */}
              <div className="card-body">
                {/* Meta Information */}
                <div className="meta-grid">
                  <div className="meta-item">
                    <FaRegCalendarAlt className="meta-icon" />
                    <div className="meta-text">
                      <span className="meta-label">Start Date</span>
                      <span className="meta-value">{internship.start}</span>
                    </div>
                  </div>
                  <div className="meta-item">
                    <FaClock className="meta-icon" />
                    <div className="meta-text">
                      <span className="meta-label">Duration</span>
                      <span className="meta-value">{internship.duration}</span>
                    </div>
                  </div>
                  <div className="meta-item">
                    <FaMoneyBillWave className="meta-icon" />
                    <div className="meta-text">
                      <span className="meta-label">Stipend</span>
                      <span className="meta-value">₹{internship.stipend}</span>
                    </div>
                  </div>
                </div>

                {/* Progress Timeline */}
                <div className="progress-timeline">
                  {internship.stages.map((stage, si) => {
                    const stageProgress = (si * 100) / (internship.stages.length - 1);
                    const isActive = stageProgress <= internship.progress;
                    const isConnected = si < internship.stages.length - 1;
                    const isLineActive = stageProgress < internship.progress;

                    return (
                      <div key={si} className="timeline-step">
                        <div className={`timeline-dot ${isActive ? 'active' : ''}`}>
                          {isActive && <div className="timeline-dot-inner"></div>}
                        </div>
                        <span className={`timeline-label ${isActive ? 'active' : ''}`}>
                          {stage}
                        </span>
                        {isConnected && (
                          <div className={`timeline-line ${isLineActive ? 'active' : ''}`}></div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="card-actions">
                  <button className="action-btn details-btn">
                    <FaArrowRight className="btn-icon" />
                    <span>View Details</span>
                  </button>
                  {internship.action.offer && (
                    <button className="action-btn download-btn">
                      <FaCloudDownloadAlt className="btn-icon" />
                      <span>Offer Letter</span>
                    </button>
                  )}
                  {internship.action.report && (
                    <button className="action-btn report-btn">
                      <FaFileAlt className="btn-icon" />
                      <span>Submit Report</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyInternships;