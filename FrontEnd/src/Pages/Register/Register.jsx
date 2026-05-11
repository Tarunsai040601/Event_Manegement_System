import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8015/api/register",
        form
      );

      Swal.fire({
        icon: "success",
        title: "Registered Successfully 🎉",
        text: "Redirecting to login...",
        confirmButtonColor: "#6a11cb",
      }).then(() => {
        navigate("/login");   // 🔥 AUTO REDIRECT
      });

      setForm({ name: "", email: "", password: "", role: "customer" });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error.response?.data?.message || "Something went wrong",
        confirmButtonColor: "#ff4d4d",
      });
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account 🚀</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="eye-icon"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <select name="role" value={form.role} onChange={handleChange}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="organizer">Organizer</option>
          </select>

          <button type="submit">Register</button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} style={{ color: "blue", cursor: "pointer" }}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;