import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8015/api/login",
        form
      );

      // store token + role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      Swal.fire({
        icon: "success",
        title: "Login Successful 🎉",
        text: res.data.message,
        confirmButtonColor: "#2563eb",
      });

      console.log(res.data);

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed ❌",
        text: error.response?.data?.message || "Something went wrong",
        confirmButtonColor: "#ff4d4d",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* password with eye icon */}
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
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="register-text">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;