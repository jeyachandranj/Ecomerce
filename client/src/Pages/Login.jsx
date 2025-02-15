import React, { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setError(null);
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user details in localStorage with proper JSON formatting
      localStorage.setItem("loggedIn", JSON.stringify(true));
      localStorage.setItem("email", user.email);
      localStorage.setItem("name", user.displayName);
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("photoURL", user.photoURL);

      setUser(user);
      navigate('/home'); // Use navigate instead of window.location
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError(error.message);
      // Clear any partial data that might have been set
      localStorage.clear();
    } finally {
      setIsSigningIn(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Clear all auth-related items
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("uid");
      localStorage.removeItem("photoURL");
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
      setError("Failed to log out. Please try again.");
    }
  };

  // Check auth state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Only set localStorage if user is actually authenticated
        localStorage.setItem("loggedIn", JSON.stringify(true));
        localStorage.setItem("email", currentUser.email);
        localStorage.setItem("name", currentUser.displayName);
        localStorage.setItem("uid", currentUser.uid);
        if (currentUser.photoURL) {
          localStorage.setItem("photoURL", currentUser.photoURL);
        }
        setUser(currentUser);
      } else {
        // Clear everything if not authenticated
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("uid");
        localStorage.removeItem("photoURL");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Prevent logged-in users from accessing login page
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn === JSON.stringify(true)) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className="gradient">
      <div className="main-content">
        <div className="absolute"></div>
        
        {!user && (
          <div className="relative p-6 rounded-lg">
            <div className="absolute inset-0"></div>
            
            <button
              style={{ color: "black" }}
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className="googlebutton mt-4 rounded-pill relative z-10"
            >
              {isSigningIn ? "Signing in..." : <b>Sign in with Google</b>}
            </button>
            
            {error && (
              <p className="error-text relative z-10 mt-4 text-red-600">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;