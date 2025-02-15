import React from "react";
import ProductImage from "../assets/productimage.png";
import Cart from "../assets/cart.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import Navigation from "../Components/TopNavigation/Navigation";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(1);

  const { BookTitle, Author, Price, BookImage } = location.state || {};

  return (
    <>
      <Navigation />
      <section className="main mt-20">
        <div className="Product bg-zinc-50 border border-gray-300">
          <section className="ProductContainer">
            <div className="productImageContainer">
              <img src={BookImage} className="mainImage" />
            </div>
          </section>
          <div className="ProductDetails">
            <div>
              <h5 className="font-poppins text-5xl mt-5">{BookTitle}</h5>
              <h5 className="font-poppins mt-2">Author : {Author}</h5>
              <h3 className="mt-7   text-2xl">₹{Price}</h3>
              <h3 className="mt-1 text-blue-900">
                Rating 4.5
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-500 text-sm ml-1"
                />
              </h3>
              <div className="mt-10 min-h-20">
                <h3>Description:</h3>
              </div>

              <h1 className="text-xl">Quantity: </h1>
              <div className="flex space-x-3 mt-2">
                <button
                  className="qtyMinusBtn bg-white"
                  onClick={() => setCount(count > 0 ? count - 1 : 0)}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>

                <h3>{count}</h3>

                <button
                  className="qtyBtn bg-white"
                  onClick={() => setCount(count + 1)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div className="prodBuyContainer mt-2">
                <buttton
                  className="Signup buy bg-blue-900 text-white text-xl font-semibold px-6 py-3 rounded-md"
                  onClick={() => {                  
                    navigate("/checkout", {
                      state: {
                        BookTitle,
                        Author,
                        Price,
                        BookImage,
                        Quantity: count,
                      },
                    });
                  }}
                  
                >
                  Buy Now
                </buttton>
                <button className="p-1 w-12 rounded-md flex justify-center items-center Login cartbtn ml-5 border border-gray-500">
                  <img src={Cart} className="w-8 p-1" alt="Cart" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;
