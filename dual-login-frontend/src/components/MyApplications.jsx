import React from "react";
import {
  FaExternalLinkAlt,
  FaRocket,
  FaRegFileAlt,
  FaInfoCircle
} from "react-icons/fa";
import "./MyApplications.css";

const applications = [
  {
    company: "Zdminds",
    profile: "Python Development Internship",
    profileLink: "#",
    appliedOn: "26 Oct' 25",
    applicants: 1551,
    status: "Applied",
    reviewStatus: "Missing skill",
    missingSkillInfo: "You do not have one or more required skills",
    boost: true
  },
  {
    company: "Everything About AI",
    profile: "Python Development Internship",
    profileLink: "#",
    appliedOn: "26 Oct' 25",
    applicants: 1277,
    status: "Applied",
    reviewStatus: "Missing skill",
    missingSkillInfo: "You do not have one or more required skills",
    boost: true
  }
];

const MyApplications = () => (
  <div className="applications-section">
    <div className="applications-card">
      <h2 className="applications-title">My applications</h2>
      <div className="applications-table-wrapper">
        <table className="applications-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Profile</th>
              <th>Applied on</th>
              <th>Number of Applicants</th>
              <th>Application Status</th>
              <th>Review Application</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, i) => (
              <tr key={i}>
                <td>
                  <span className="applications-company">{app.company}</span>
                </td>
                <td>
                  <div className="applications-profile">
                    <span>{app.profile}</span>
                    <a
                      href={app.profileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="applications-profile-link"
                      title="View internship details"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                </td>
                <td>
                  <span className="applications-date">{app.appliedOn}</span>
                </td>
                <td>
                  <span className="applications-applicants">{app.applicants}</span>
                </td>
                <td>
                  <span className="applications-status-badge applications-status-applied">
                    {app.status}
                  </span>
                  {app.boost && (
                    <button className="applications-boost-btn" tabIndex={-1}>
                      <FaRocket className="applications-boost-icon" />
                      Boost application
                    </button>
                  )}
                </td>
                <td>
                  <div className="applications-review">
                    <FaRegFileAlt className="applications-review-doc" />
                    <span className="applications-review-status">
                      {app.reviewStatus}
                      <span className="applications-review-info" title={app.missingSkillInfo}>
                        <FaInfoCircle />
                      </span>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default MyApplications;
