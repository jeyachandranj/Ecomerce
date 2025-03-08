import React, { useEffect, useState } from "react";
import Navigation from "../Components/TopNavigation/Navigation";
import { useNavigate } from "react-router-dom";
import CartItems from "../Components/CartItems/CartItems";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const email = localStorage.getItem("email");
        const cleanedEmail = email ? email.replace(/@gmail\.com$/i, "") : "";
        if (!cleanedEmail) {
          setError("User not found. Please login again.");
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:5000/api/cart/${cleanedEmail}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
        });

        const data = await response.json();

        if (response.ok) {
          setCart(data);
          const initialTotal = data.reduce(
            (sum, item) => sum + (item.Price * (item.count || 1)),
            0
          );
          setTotal(initialTotal);
        } else {
          setError(data.message || "Failed to fetch cart items");
        }
      } catch (error) {
        setError("An error occurred while fetching the cart data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [navigate]);

  const updateTotalPrice = (title, newCount) => {
    // If count is 0, remove the item
    if (newCount === 0) {
      removeCartItem(title);
      return;
    }
    
    const updatedCart = cart.map((item) =>
      item.BookTitle === title
        ? { ...item, count: newCount, updatedPrice: item.Price * newCount }
        : item
    );
    setCart(updatedCart);
  
    const newTotal = updatedCart.reduce(
      (total, item) => total + (item.updatedPrice || item.Price * (item.count || 1)),
      0
    );
    setTotal(newTotal);
  };
  
  const removeCartItem = async (title) => {
    try {
      // Find the item to get its ID
      const itemToRemove = cart.find(item => item.BookTitle === title);
      
      if (!itemToRemove || !itemToRemove._id) {
        setError("Cannot remove item: Item ID not found");
        return;
      }
      
      const response = await fetch(`http://localhost:5000/api/cart/remove/${itemToRemove._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
      });

      if (response.ok) {
        // Remove the item from the local cart state
        const updatedCart = cart.filter(item => item.BookTitle !== title);
        setCart(updatedCart);
        
        // Update the total
        const newTotal = updatedCart.reduce(
          (total, item) => total + (item.updatedPrice || item.Price * (item.count || 1)),
          0
        );
        setTotal(newTotal);
        
        // Show success message
        setError(""); // Clear any previous errors
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to remove item from cart");
      }
    } catch (error) {
      setError("An error occurred while removing the item");
      console.error(error);
    }
  };
  
  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (total, item) => total + (item.updatedPrice || item.Price * (item.count || 1)),
      0
    );
    const discount = discountApplied ? subtotal * 0.5 : 0; // 50% discount if promo code applied
    return {
      subtotal,
      discount,
      delivery: 0.0
    };
  };

  const handlePromoCode = () => {
    if (promoCode.toUpperCase() === "NEWBOOK") {
      setDiscountApplied(true);
      setError("");
    } else {
      setDiscountApplied(false);
      setError("Invalid promo code");
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setError("Cannot checkout with empty cart");
      return;
    }

    const itemDetails = cart.map(item => ({
      BookTitle: item.BookTitle,
      Author: item.Author,
      Price: item.Price,
      BookImage: item.BookImage
    }));
  
    const { subtotal, discount, delivery } = calculateTotal();
    const finalAmount = subtotal - discount + delivery;
    
    localStorage.setItem("amt", finalAmount);
    navigate("/checkout", { state: itemDetails });
  };

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("book", cart[0]?.BookTitle || "");
    } else {
      // Clear cart data from localStorage if cart is empty
      localStorage.removeItem("cart");
      localStorage.removeItem("book");
    }
  }, [cart]);

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="flex justify-center items-center h-screen">
          <p>Loading cart data...</p>
        </div>
      </>
    );
  }

  const { subtotal, discount, delivery } = calculateTotal();
  const finalTotal = subtotal - discount + delivery;

  return (
    <>
      <Navigation />
      <section className="main mt-20">
        {error && (
          <div className="text-red-500 text-center p-4">
            {error}
          </div>
        )}
        <div className="cartContainer">
          <div className="cartProducts">
            <h3 className="font-poppins text-3xl mt-10">Cart Items</h3>
            <div style={{ marginBottom: "5vh" }}>
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <CartItems
                    key={index}
                    BookImage={item.BookImage}
                    BookTitle={item.BookTitle}
                    Author={item.Author}
                    Price={item.Price}
                    initialCount={item.count || 1}
                    onQuantityChange={updateTotalPrice}
                    onRemove={() => removeCartItem(item.BookTitle)}
                  />
                ))
              ) : (
                <p className="text-center p-4">Your cart is empty</p>
              )}
            </div>
          </div>

          <div className="cartTotal">
            <h4 className="promoTitle">Promo Code</h4>
            <div className="searchContainer p-5 flex items-center">
              <input 
                placeholder="Type here..." 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button 
                onClick={handlePromoCode}
                className="apply mb-1 border border-black"
              >
                Apply
              </button>
            </div>
            {discountApplied && (
              <div className="text-green-500 text-center mb-4">
                50% discount applied!
              </div>
            )}
            <div className="priceContainer">
              <div className="part">
                <h3 className="price">SubTotal</h3>
                <h3 className="price">Discount</h3>
                <h3 className="price">Delivery</h3>
                <h3 className="price" style={{ color: "black" }}>Total</h3>
              </div>
              <div className="part">
                <h3 className="price">₹{subtotal.toFixed(2)}</h3>
                <h3 className="price">₹{discount.toFixed(2)}</h3>
                <h3 className="price">₹{delivery.toFixed(2)}</h3>
                <h3 className="price" style={{ color: "black" }}>
                  ₹{finalTotal.toFixed(2)}
                </h3>
              </div>
            </div>

            <button 
              onClick={handleCheckout} 
              className="apply checkoutBtn"
              disabled={cart.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;