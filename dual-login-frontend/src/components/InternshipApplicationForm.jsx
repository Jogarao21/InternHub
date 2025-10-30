import React, { useRef, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCity,
  FaVenusMars,
  FaGlobe,
  FaUniversity,
  FaBook,
  FaCalendarAlt,
  FaSuitcase,
  FaFileAlt,
  FaCloudUploadAlt,
  FaList,
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft
} from "react-icons/fa";
import "./InternshipApplicationForm.css";

const AREAS = ["IT", "Software Development", "Web Development", "AI/ML", "Data Science"];
const MODES = ["In-office", "WFH"];
const CITIES = ["Bangalore", "Hyderabad", "Mumbai"];
const PREFS = ["Internship", "Job"];
const GENDERS = ["Male", "Female", "Other"];
const TYPES = ["College Student", "Fresher", "Working Professional"];

const InternshipApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);
  const fileInputRef = useRef();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    gender: "",
    languages: "",
    applicantType: "",
    collegeName: "",
    course: "",
    experience: "",
    startYear: "",
    endYear: "",
    areaOfInterest: "",
    preference: "",
    workMode: "",
    preferredCity: "",
    availability: ""
  });

  const totalSteps = 6;
  const progressPercent = (currentStep / totalSteps) * 100;

  // Validation function for each step
  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          formData.fullName &&
          formData.email &&
          formData.phone &&
          formData.city &&
          formData.gender &&
          formData.languages
        );
      case 2:
        return (
          formData.applicantType &&
          formData.collegeName &&
          formData.course &&
          formData.experience &&
          formData.startYear &&
          formData.endYear
        );
      case 3:
        return (
          formData.areaOfInterest &&
          formData.preference &&
          formData.workMode &&
          formData.preferredCity
        );
      case 4:
        return true; // Resume is optional
      case 5:
        return formData.availability;
      case 6:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setShowError(false);
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setShowError(true);
    }
  };

  const handleBack = () => {
    setShowError(false);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="appform-success">
        <FaCheckCircle className="success-icon" />
        <h2>Application Sent Successfully!</h2>
        <p>Thank you for applying. We will get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="appform-page">
      <div className="appform-card">
        {/* Progress Bar */}
        <div className="appform-progressbar">
          <span className="appform-progress-text">Step {currentStep} of {totalSteps}</span>
          <div className="appform-progress-track">
            <div className="appform-progress" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <h2 className="appform-heading">Internship Application</h2>

        {/* Error Message */}
        {showError && (
          <div className="error-message">
            <span>Please fill in all required fields before proceeding.</span>
          </div>
        )}

        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <section className="appform-section step-content">
            <h3 className="appform-section-title">Personal Information</h3>
            <div className="appform-fields-grid">
              <label>
                <FaUser />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </label>
              <label>
                <FaEnvelope />
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </label>
              <label>
                <FaPhone />
                <input 
                  type="tel" 
                  placeholder="Contact Number" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </label>
              <label>
                <FaCity />
                <input 
                  type="text" 
                  placeholder="Current City" 
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </label>
              <label>
                <FaVenusMars />
                <select 
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="">Gender</option>
                  {GENDERS.map(g => (<option key={g} value={g}>{g}</option>))}
                </select>
              </label>
              <label>
                <FaGlobe />
                <input 
                  type="text" 
                  placeholder="Languages Known" 
                  value={formData.languages}
                  onChange={(e) => setFormData({...formData, languages: e.target.value})}
                />
              </label>
            </div>
          </section>
        )}

        {/* Step 2: Academic & Experience */}
        {currentStep === 2 && (
          <section className="appform-section step-content">
            <h3 className="appform-section-title">Academic & Experience Details</h3>
            <div className="appform-fields-grid">
              <label>
                <FaList />
                <select 
                  value={formData.applicantType}
                  onChange={(e) => setFormData({...formData, applicantType: e.target.value})}
                >
                  <option value="">Applicant Type</option>
                  {TYPES.map(t => (<option key={t} value={t}>{t}</option>))}
                </select>
              </label>
              <label>
                <FaUniversity />
                <input 
                  type="text" 
                  placeholder="College Name" 
                  value={formData.collegeName}
                  onChange={(e) => setFormData({...formData, collegeName: e.target.value})}
                />
              </label>
              <label>
                <FaBook />
                <input 
                  type="text" 
                  placeholder="Course / Stream" 
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                />
              </label>
              <label>
                <FaSuitcase />
                <input 
                  type="number" 
                  placeholder="Years of Experience" 
                  min={0} 
                  max={45} 
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                />
              </label>
              <label>
                <FaCalendarAlt />
                <input 
                  type="number" 
                  placeholder="Start Year" 
                  min={2000} 
                  max={2025} 
                  value={formData.startYear}
                  onChange={(e) => setFormData({...formData, startYear: e.target.value})}
                />
              </label>
              <label>
                <FaCalendarAlt />
                <input 
                  type="number" 
                  placeholder="End Year" 
                  min={2000} 
                  max={2030} 
                  value={formData.endYear}
                  onChange={(e) => setFormData({...formData, endYear: e.target.value})}
                />
              </label>
            </div>
          </section>
        )}

        {/* Step 3: Preferences */}
        {currentStep === 3 && (
          <section className="appform-section step-content">
            <h3 className="appform-section-title">Preferences</h3>
            <div className="appform-fields-grid">
              <label>
                <FaCheckCircle />
                <select 
                  value={formData.areaOfInterest}
                  onChange={(e) => setFormData({...formData, areaOfInterest: e.target.value})}
                >
                  <option value="">Area of Interest</option>
                  {AREAS.map(a => (<option key={a} value={a}>{a}</option>))}
                </select>
              </label>
              <label>
                <FaCheckCircle />
                <select 
                  value={formData.preference}
                  onChange={(e) => setFormData({...formData, preference: e.target.value})}
                >
                  <option value="">Internship / Job</option>
                  {PREFS.map(p => (<option key={p} value={p}>{p}</option>))}
                </select>
              </label>
              <label>
                <FaCheckCircle />
                <select 
                  value={formData.workMode}
                  onChange={(e) => setFormData({...formData, workMode: e.target.value})}
                >
                  <option value="">Work Mode</option>
                  {MODES.map(m => (<option key={m} value={m}>{m}</option>))}
                </select>
              </label>
              <label>
                <FaCity />
                <select 
                  value={formData.preferredCity}
                  onChange={(e) => setFormData({...formData, preferredCity: e.target.value})}
                >
                  <option value="">Preferred City</option>
                  {CITIES.map(c => (<option key={c} value={c}>{c}</option>))}
                </select>
              </label>
            </div>
          </section>
        )}

        {/* Step 4: Resume */}
        {currentStep === 4 && (
          <section className="appform-section step-content">
            <h3 className="appform-section-title">Resume Section</h3>
            <div className="resume-group">
              <div className="resume-upload">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept=".pdf,.doc,.docx"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="btn-upload"
                >
                  <FaCloudUploadAlt /> Upload Resume
                </button>
                <button type="button" className="btn-create">
                  <FaFileAlt /> Create New Resume
                </button>
              </div>
              <div className="resume-preview">
                <FaFileAlt className="preview-icon" />
                <span>Your Internship Resume</span>
              </div>
            </div>
          </section>
        )}

        {/* Step 5: Availability */}
        {currentStep === 5 && (
          <section className="appform-section step-content">
            <h3 className="appform-section-title">Availability</h3>
            <div className="availability-group">
              <label>
                <input 
                  type="radio" 
                  name="availability" 
                  value="immediately"
                  onChange={(e) => setFormData({...formData, availability: e.target.value})}
                />
                Immediately
              </label>
              <label>
                <input 
                  type="radio" 
                  name="availability" 
                  value="other"
                  onChange={(e) => setFormData({...formData, availability: e.target.value})}
                />
                Other (specify)
              </label>
              <input type="file" className="availability-upload" accept=".pdf,.doc,.docx" />
            </div>
          </section>
        )}

        {/* Step 6: Review & Submit */}
        {currentStep === 6 && (
          <section className="appform-section step-content">
            <h3 className="appform-section-title">Review Your Application</h3>
            <div className="review-summary">
              <p><strong>Name:</strong> {formData.fullName}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>City:</strong> {formData.city}</p>
              <p><strong>College:</strong> {formData.collegeName}</p>
              <p><strong>Course:</strong> {formData.course}</p>
              <p><strong>Area of Interest:</strong> {formData.areaOfInterest}</p>
              <p><strong>Preference:</strong> {formData.preference}</p>
            </div>
          </section>
        )}

        {/* Navigation Buttons */}
        <div className="appform-navigation">
          {currentStep > 1 && (
            <button type="button" className="btn-back" onClick={handleBack}>
              <FaArrowLeft /> Back
            </button>
          )}
          {currentStep < totalSteps ? (
            <button 
              type="button" 
              className="btn-next" 
              onClick={handleNext}
            >
              Next <FaArrowRight />
            </button>
          ) : (
            <button type="button" className="btn-submit" onClick={handleSubmit}>
              <FaCheckCircle /> Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternshipApplicationForm;
