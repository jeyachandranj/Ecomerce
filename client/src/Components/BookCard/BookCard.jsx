import React from "react";
import { Link } from "react-router-dom";
import bookimg from "../../assets/bookcover.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

const BookCard = ({
  BookImage,
  BookTitle,
  Author,
  Price,
  PublishedDate,
  Pages,
  Rating = 0
}) => {
  const bookData = {
    BookTitle,
    Author,
    Price,
    BookImage,
    PublishedDate,
    Pages,
    Rating
  };

  const addToCart = async () => {
    if (!BookTitle || !Author || !Price || !BookImage) {
      alert("Please fill in all the required fields");
      return;
    }

    const email = localStorage.getItem("email");
    const cleanedEmail = email ? email.replace(/@gmail\.com$/i, "") : "";    const cartItemData = {
      BookTitle,
      Author,
      Price,
      BookImage,
      name:cleanedEmail,
    };

    try {
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItemData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Item added to cart successfully");
      } else {
        alert(data.message || "Failed to add item to cart");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding to cart");
    }
  };

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white border p-6 transition-shadow duration-300 ease-in-out hover:shadow-xl">
      <img
        className="w-full h-64 object-cover rounded-lg"
        src={BookImage || bookimg}
        alt={BookTitle}
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2 truncate">{BookTitle}</h2>
        <p className="text-gray-600 mb-2 italic">by {Author}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold text-gray-800">₹{Price}</span>
          <Link to="/bookdetails" state={bookData}>
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ${
                    index < Rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                </svg>
              ))}
            </div>
          </Link>
        </div>

        <button
          onClick={addToCart}
          className="flex items-center justify-center w-full mt-4 p-2 rounded-lg bg-blue-800 text-white hover:bg-blue-700 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faShoppingBag} className="text-white w-5 h-5" />
          <span className="ml-2">Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default BookCard;