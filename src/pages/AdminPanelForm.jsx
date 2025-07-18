import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AdminPanelForm.css';

export default function AdminPanelForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "", // Default to empty to enforce selection
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      alert("❌ Please select a role");
      return;
    }

    try {
      const res = await fetch("https://api.nakshatranamahacreations.in/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        if (result.role === formData.role) {
          alert("Login successful as " + result.role);
          localStorage.setItem("token", result.token); // Store token for authenticated requests
          navigate("/dashboard"); // Proceed to dashboard
        } else {
          alert("❌ You selected '" + formData.role + "', but your role is '" + result.role + "'");
        }
      } else {
        alert("❌ " + (result.error || "Invalid credentials"));
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("🚨 Server error. Try again later.");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

    const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    boxSizing: "border-box",
    transition: "border-color 0.3s",
  };

  return (
    <div className="container login-wrapper">
      <div className="row">
        {/* <img src="image.webp" alt="Admin Banner" className="col-md-6 styled-image" /> */}

        <div className="col-md-6 login-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <input
              className="inputBox"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              style={inputStyle}
            />

            <label htmlFor="password">Password</label>
            <input
              className="inputBox"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              style={inputStyle}
            />

            <label htmlFor="role">Select Role</label>
            <select
              className="inputBox"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">-- Choose Role --</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>

            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}