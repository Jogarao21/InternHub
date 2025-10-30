import React, { useState } from "react";
import axios from "axios";
import "./LandingPage.css";

function LandingPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendOTP = async () => {
    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/send-otp/", {
        email,
        user_type: "student",
      });
      setMessage(res.data.message);
      setIsOtpSent(true);
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp) {
      setMessage("Please enter the OTP");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/verify-otp/", {
        email,
        otp,
      });
      setMessage(res.data.message);

      if (res.data.message.includes("success")) {
        localStorage.setItem("userEmail", email);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Invalid OTP, try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="landing-container">
      <div className="login-box">
        <div className="login-header">
          <h2 className="login-title">
            {isOtpSent ? "Verify OTP" : "Login"}
          </h2>
          <p className="login-description">
            {isOtpSent
              ? "Enter the OTP sent to your email"
              : "Enter your email to receive OTP"}
          </p>
        </div>

        {!isOtpSent && (
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}

        {isOtpSent && (
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter OTP"
              className="login-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}

        <button
          className="login-btn"
          onClick={isOtpSent ? verifyOTP : sendOTP}
          disabled={isLoading}
        >
          {isLoading
            ? "Processing..."
            : isOtpSent
            ? "Verify OTP"
            : "Send OTP"}
        </button>

        {message && (
          <div
            className={`login-msg ${
              message.toLowerCase().includes("wrong") ||
              message.toLowerCase().includes("invalid")
                ? "error"
                : "success"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
