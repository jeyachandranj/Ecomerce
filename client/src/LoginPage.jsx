import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Pages/firebase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    // Check authentication state on component mount
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        handleAuthSuccess(currentUser);
      } else {
        clearAuthData();
      }
    });

    // Check if user is already logged in
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("loggedIn");
      const storedEmail = localStorage.getItem("email");
      
      if (isLoggedIn === "true" && storedEmail) {
        navigate('/home');
      }
    };

    checkAuth();
    return () => unsubscribe();
  }, [navigate]);

  const handleAuthSuccess = (user) => {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("email", user.email);
    localStorage.setItem("name", user.displayName || email.split('@')[0]);
    localStorage.setItem("uid", user.uid);
    if (user.photoURL) {
      localStorage.setItem("photoURL", user.photoURL);
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("uid");
    localStorage.removeItem("photoURL");
    setUser(null);
  };

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, provider);
      handleAuthSuccess(result.user);
      navigate('/home');
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError(error.message);
      clearAuthData();
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleEmailPasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("https://ecomerce-4s0t.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Set auth data for email/password login
      handleAuthSuccess({ email, displayName: email.split('@')[0] });
      navigate('/home');
    } catch (err) {
      setError("Connection error. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        
        <form onSubmit={handleEmailPasswordSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <button
              type="submit"
              className="w-60 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            
            <p className="text-gray-600 my-4">or</p>
            
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className="w-60 flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
              <span>{isSigningIn ? "Signing in..." : "Sign in with Google"}</span>
            </button>
            
            <div className="flex mt-5 space-x-3">
              <span>Don't have an account?</span>
              <Link className="text-blue-600 hover:text-blue-800" to="/signuppage">
                Create Account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;