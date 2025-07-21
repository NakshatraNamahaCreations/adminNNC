import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanelForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://api.nakshatranamahacreations.in/api/persons/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await res.json();

     if (res.ok) {
  const { person } = result;
  if (person.status) {
    localStorage.setItem("token", result.token || "dummy-token");
    localStorage.setItem("userRole", person.role); // ✅ Save role here
    navigate("/dashboard");
  } else {
    alert("❌ Account is inactive");
  }

      } else {
        alert("❌ " + (result.message || "Invalid credentials"));
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
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    }}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 50%", minWidth: "300px", padding: "20px" }}>
          <h2 style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#1a202c",
            marginBottom: "20px",
            textAlign: "center",
          }}>
            Login
          </h2>
          <form onSubmit={handleLogin} style={{ maxWidth: "400px", margin: "0 auto" }}>
            <label htmlFor="email" style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              color: "#2d3748",
              marginBottom: "8px",
            }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={inputStyle}
            />

            <label htmlFor="password" style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              color: "#2d3748",
              marginBottom: "8px",
            }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              style={inputStyle}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#3182ce",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "background-color 0.3s",
                ":hover": { backgroundColor: "#2b6cb0" },
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}