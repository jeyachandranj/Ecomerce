import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if user is already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const validatePassword = () => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (password !== confirmPassword) {
      return "Passwords don't match";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const passwordError = validatePassword();
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const response = await fetch("https://ecomerce-4s0t.onrender.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      // Store the token in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      alert(data.message);
      // Navigate directly to /home instead of /
      navigate("/");
    } catch (err) {
      setError("Connection error. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && (
          <div className="mb-4 text-red-500 text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              type="submit"
              className="w-60 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
          <div className="flex mt-5 space-x-3 justify-center">
            <span>Already have an account?</span>
            <Link className="text-blue-600 hover:text-blue-800" to="/">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;