import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../../assets/logo.jpg';
import {
  faBagShopping,
  faSliders,
  faUser,
  faRightFromBracket,
  faArrowUp,
  faArrowDown
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../SearchBar/SearchBar";

const Navigation = ({ OnSearch, onSort }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(false);
  const [name, setName] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Only check localStorage if we haven't explicitly logged out
    const checkAuth = () => {
      const storedUser = localStorage.getItem("loggedIn");
      const storedName = localStorage.getItem("email");
      
      if (storedUser && storedName) {
        setUser(JSON.parse(storedUser));
        setName(storedName);
      } else {
        setUser(false);
        setName(null);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    // Clear all auth-related localStorage items
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("uid");
    localStorage.removeItem("photoURL");
    
    // Update component state
    setUser(false);
    setName(null);
    
    // Navigate to login page
    navigate("/");
  };

  const handleSort = (order) => {
    setSortOrder(order);
    onSort?.(order);
    setShowSortMenu(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const ProfileImg = localStorage.getItem("photoURL");

  return (
    <section
      className={`fixed top-0 left-0 h-20 w-full border-b border-gray-200 bg-white z-10 transition-all duration-300 ${
        isScrolled
          ? "bg-white bg-opacity-70 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      } flex items-center justify-between p-5`}
    >
      <div className="flex items-center space-x-4 w-full">
        <Link to={user ? "/home" : "/"} className="flex justify-center items-center">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <h1 className="text-2xl mr-5 text-blue-900 font-semibold font-poppins">
            Sri Pon Arachalaiamman
          </h1>
        </Link>

        {user && <SearchBar onSearch={OnSearch} style={{width:"300px"}}/>}

        {user && (
          <>
            <div className="relative">
              <div 
                className="bg-gray-100 border-gray-400 py-3 ml-[200px] px-4 rounded-full cursor-pointer"
                style={{marginLeft: "-50px"}}
                onClick={() => setShowSortMenu(!showSortMenu)}
              >
                <FontAwesomeIcon 
                  icon={faSliders} 
                  className="text-xl text-blue-900" 
                />
              </div>

              {showSortMenu && (
                <div className="absolute top-14 right-0 bg-white shadow-lg rounded-lg p-2 w-40">
                  <button
                    onClick={() => handleSort('asc')}
                    className="flex items-center space-x-2 w-full px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    <FontAwesomeIcon icon={faArrowUp} />
                    <span>Sort A-Z</span>
                  </button>
                  <button
                    onClick={() => handleSort('desc')}
                    className="flex items-center space-x-2 w-full px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    <FontAwesomeIcon icon={faArrowDown} />
                    <span>Sort Z-A</span>
                  </button>
                </div>
              )}
            </div>

            <Link to="/addtocart">
              <div className="bg-gray-100 border-gray-400 py-3 px-4 rounded-full">
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="text-xl text-blue-900"
                />
              </div>
            </Link>
          </>
        )}

        <div className="w-[30vw] flex justify-end">
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 border-gray-400 rounded-full">
                  {ProfileImg ? (
                    <img
                      src={ProfileImg}
                      alt="User Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} className="text-xl text-blue-900" />
                  )}
                </div>

                <h3 className="text-2xl text-blue-800 font-poppins">
                  Hi, {name.split('@')[0]}
                </h3>

                <div
                  onClick={handleLogout}
                  className="bg-gray-100 border-gray-400 py-3 px-4 rounded-full cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="text-xl text-blue-900"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/">
                  <button className="px-7 py-2 rounded-md border border-blue-900">
                    Login
                  </button>
                </Link>

                <Link to="/signuppage">
                  <button className="px-6 py-2 bg-blue-800 rounded-md text-white">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navigation;