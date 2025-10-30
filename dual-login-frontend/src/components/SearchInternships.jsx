import React, { useState, useMemo } from "react";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaClock,
  FaMoneyBillWave,
  FaTimesCircle,
  FaArrowLeft
} from "react-icons/fa";
import InternshipApplicationForm from "./InternshipApplicationForm";
import "./SearchInternships.css";

const LOCATIONS = ["Bangalore", "Hyderabad", "Mumbai", "Chennai", "Remote", "Delhi"];
const SKILLS_SUGGESTIONS = ["Python", "Java", "React", "Node.js", "Data Science", "AI", "Marketing", "Figma", "Communication Skills"];

const INTERNSHIPS = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Zdminds",
    activelyHiring: true,
    location: "Bangalore",
    stipend: "₹10,000 / mo",
    duration: "6 months",
    description: "Work with modern frontend libraries and improve user experience.",
    skills: ["React", "JavaScript", "CSS"],
    postedDate: "2 days ago",
    perks: "Job offer up to ₹6 LPA post internship"
  },
  {
    id: 2,
    title: "Data Scientist Intern",
    company: "Everything About AI",
    activelyHiring: true,
    location: "Remote",
    stipend: "₹15,000 / mo",
    duration: "4 months",
    description: "Analyze data and develop predictive models using Python.",
    skills: ["Python", "Machine Learning", "Data Visualization"],
    postedDate: "5 days ago",
    perks: "Certificate on completion and recommendation letter"
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    company: "Flipkart",
    activelyHiring: false,
    location: "Mumbai",
    stipend: "₹12,000 / mo",
    duration: "5 months",
    description: "Design engaging interfaces with Figma and Adobe XD.",
    skills: ["UI/UX", "Figma", "Prototyping"],
    postedDate: "1 week ago",
    perks: "Hands-on experience with a leading e-commerce platform"
  },
  {
    id: 4,
    title: "Backend Developer Intern",
    company: "Microsoft",
    activelyHiring: true,
    location: "Hyderabad",
    stipend: "₹13,000 / mo",
    duration: "3 months",
    description: "Develop scalable backend APIs using Node.js.",
    skills: ["Node.js", "Express", "MongoDB"],
    postedDate: "3 days ago",
    perks: "Networking and technical interview preparation"
  },
  {
    id: 5,
    title: "Marketing Intern",
    company: "TechSolutions",
    activelyHiring: false,
    location: "Chennai",
    stipend: "₹8,000 / mo",
    duration: "3 months",
    description: "Support marketing campaigns and content strategy.",
    skills: ["Marketing", "Social Media", "SEO"],
    postedDate: "4 days ago",
    perks: "Chance to participate in webinars"
  },
  {
    id: 6,
    title: "Full Stack Developer Intern",
    company: "Innovatech",
    activelyHiring: true,
    location: "Mumbai",
    stipend: "₹18,000 / mo",
    duration: "6 months",
    description: "Build full stack web applications with modern tools.",
    skills: ["Node.js", "React", "MongoDB"],
    postedDate: "6 days ago",
    perks: "Certificate and mentor support"
  },
  {
    id: 7,
    title: "Data Analyst Intern",
    company: "DataVision",
    activelyHiring: true,
    location: "Remote",
    stipend: "₹14,000 / mo",
    duration: "4 months",
    description: "Handle large datasets to derive insightful reports.",
    skills: ["Data Analysis", "Excel", "SQL"],
    postedDate: "3 days ago",
    perks: "Hands-on project experience"
  },
  {
    id: 8,
    title: "Graphic Designer Intern",
    company: "CreativeHub",
    activelyHiring: false,
    location: "Bangalore",
    stipend: "₹9,000 / mo",
    duration: "3 months",
    description: "Create visual content for digital campaigns.",
    skills: ["Photoshop", "Illustrator", "Creativity"],
    postedDate: "1 week ago",
    perks: "Portfolio development support"
  }
];

const SearchInternships = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [keyword, setKeyword] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);

  const filteredInternships = useMemo(() => {
    return INTERNSHIPS.filter((intn) => {
      const matchesLocation = selectedLocation === "" || intn.location === selectedLocation;
      const lowerKeyword = keyword.toLowerCase();
      const matchesKeyword =
        keyword === "" ||
        intn.title.toLowerCase().includes(lowerKeyword) ||
        intn.company.toLowerCase().includes(lowerKeyword) ||
        intn.skills.some((skill) => skill.toLowerCase().includes(lowerKeyword));
      return matchesLocation && matchesKeyword;
    });
  }, [selectedLocation, keyword]);

  const filteredSuggestions = useMemo(() => {
    const lowerKeyword = keyword.toLowerCase();
    return SKILLS_SUGGESTIONS.filter(s => s.toLowerCase().startsWith(lowerKeyword)).slice(0, 5);
  }, [keyword]);

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSuggestionIndex((prev) => Math.min(prev + 1, filteredSuggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSuggestionIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && suggestionIndex >= 0) {
      e.preventDefault();
      setKeyword(filteredSuggestions[suggestionIndex]);
      setShowSuggestions(false);
      setSuggestionIndex(-1);
    }
  };

  const resetFilters = () => {
    setSelectedLocation("");
    setKeyword("");
    setShowSuggestions(false);
    setSuggestionIndex(-1);
  };

  // When showing the form, display it instead of internship list
  if (showApplyForm && selectedInternship) {
    return (
      <div className="searchinternships-page">
        <button 
          className="back-to-list-btn" 
          onClick={() => {
            setShowApplyForm(false);
            setSelectedInternship(null);
          }}
        >
          <FaArrowLeft /> 
        </button>
        <InternshipApplicationForm 
          internship={selectedInternship} 
          onClose={() => {
            setShowApplyForm(false);
            setSelectedInternship(null);
          }} 
        />
      </div>
    );
  }

  return (
    <div className="searchinternships-page">
      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-item">
          <label htmlFor="location-dropdown">Internships by Location</label>
          <select
            id="location-dropdown"
            value={selectedLocation}
            onChange={e => setSelectedLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {LOCATIONS.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <FaMapMarkerAlt className="filter-icon" />
        </div>

        <div className="filter-item autocomplete-wrapper">
          <label htmlFor="keyword-input">Keywords</label>
          <input
            id="keyword-input"
            type="text"
            placeholder="Search skills, roles, technologies..."
            value={keyword}
            onChange={e => {
              setKeyword(e.target.value);
              setShowSuggestions(true);
              setSuggestionIndex(-1);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          <FaSearch className="filter-icon" />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <ul className="autocomplete-list">
              {filteredSuggestions.map((s, i) => (
                <li
                  key={s}
                  className={i === suggestionIndex ? "selected" : ""}
                  onMouseDown={() => {
                    setKeyword(s);
                    setShowSuggestions(false);
                    setSuggestionIndex(-1);
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button className="btn-search" onClick={() => setShowSuggestions(false)}>
          <FaSearch /> Search
        </button>

        <button className="btn-reset" onClick={resetFilters}>
          Clear Filters <FaTimesCircle />
        </button>
      </div>

      {/* Heading */}
      <div className="search-header">
        <h2>{filteredInternships.length} Total Internships</h2>
        <p>Latest Summer Internships in India</p>
      </div>

      {/* Internship Cards Grid */}
      <div className="internships-grid">
        {filteredInternships.length === 0 ? (
          <div className="no-results">No internships found matching your criteria.</div>
        ) : (
          filteredInternships.map(i => (
            <article key={i.id} className="internship-card">
              <header className="card-header no-logo">
                <div className="card-header-text full-width">
                  <h3 title={i.title}>{i.title}</h3>
                  <span className="company-name">{i.company}</span>
                  {i.activelyHiring && <span className="badge blue">Actively Hiring</span>}
                </div>
              </header>

              <p className="internship-desc">{i.description || "Apply now to advance your career."}</p>

              <section className="card-info-row">
                <span><FaMapMarkerAlt /> {i.location}</span>
                <span><FaMoneyBillWave /> {i.stipend}</span>
                <span><FaClock /> {i.duration}</span>
              </section>

              <section className="skills-tags">
                {i.skills && i.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
                {i.tags && i.tags.map((tag, idx) => (
                  <span key={idx} className="skill-tag pastel">{tag}</span>
                ))}
              </section>

              <footer className="card-footer">
                <small>Posted: {i.postedDate || "Recently"}</small>
                <span className="perks">
                  {i.perks || "Great job opportunities after internship"}
                </span>
              </footer>

              <div className="card-buttons">
                <button className="btn-apply" onClick={() => {
                  setSelectedInternship(i);
                  setShowApplyForm(true);
                }}>Apply Now</button>
                <button className="btn-details">View Details</button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchInternships;
