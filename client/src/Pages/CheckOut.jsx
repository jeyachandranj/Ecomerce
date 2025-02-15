import React, { useState } from "react";
import AddressCard from "../Components/AddressCard/AddressCard";
import Navigation from "../Components/TopNavigation/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faAdd,
  faBuildingColumns,
} from "@fortawesome/free-solid-svg-icons";
import googlepay from "../assets/google-pay.png";
import { useLocation, useNavigate } from "react-router-dom";
import PopupCard from "../Components/PopupCard/PopupCard";

const CheckOut = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { BookTitle, Author, Price, BookImage, Quantity } = location.state || {};

  const [address, setAddress] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isCodeApplied, setIsCodeApplied] = useState(false);

  const amt = localStorage.getItem("amt");
  const subtotal = parseFloat(amt) || 0;
  const deliveryFee = 20.44;

  const handlePromoCode = () => {
    if (promoCode === "NEWBOOK" && !isCodeApplied) {
      setDiscount(subtotal * 0.5);
      setIsCodeApplied(true);
    } else if (isCodeApplied) {
      alert("Promo code already applied!");
    } else {
      alert("Invalid promo code!");
    }
  };

  const total = subtotal - discount + deliveryFee;

  return (
    <>
      <Navigation />
      <section className="main mt-20">
        <div className={`checkoutContainer rounded-md flex justify-center ${isPopupOpen ? "blur-sm" : ""}`}>
          <section className="checkoutAddressContainer">
            <h3 className="checkTitle">Checkout</h3>

            {address ? (
              <>
                <h2 className="font-bold text-xl text-gray-800">Address</h2>
                <AddressCard
                  address={address}
                  changeAddress={() => setIsPopupOpen(true)}
                />
              </>
            ) : (
              <div className="h-32 mt-6">
                <h1>Add Address</h1>
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="m-5 flex flex-col justify-center items-center border border-gray-300 text-center h-20 w-[25vh] rounded-[5px]"
                >
                  <FontAwesomeIcon icon={faAdd} className="addIcon" />
                  <p>Click To Add</p>
                </button>
              </div>
            )}

            <h3 className="font-bold text-xl text-gray-800 mt-6">Payment Method</h3>

            <div className="paymentContainer">
              <div
                className={`paymentCard ${selectedMethod === "card" ? "selected" : ""}`}
                onClick={() => setSelectedMethod("card")}
              >
                <FontAwesomeIcon icon={faCreditCard} className="paymentIcon" />
                <h4 className="iconInfo">Card</h4>
              </div>

              <div
                className={`paymentCard ${selectedMethod === "googlepay" ? "selected" : ""}`}
                onClick={() => setSelectedMethod("googlepay")}
              >
                <img src={googlepay} alt="Google Pay" className="gpayIcon" />
                <h4 className="gpayInfo">Google Pay</h4>
              </div>

              <div
                className={`paymentCard ${selectedMethod === "bank" ? "selected" : ""}`}
                onClick={() => setSelectedMethod("bank")}
              >
                <FontAwesomeIcon icon={faBuildingColumns} className="paymentIcon" />
                <h4 className="iconInfo">Bank</h4>
              </div>
            </div>
          </section>

          <div className="orderSummary" style={{ height: "380px" }}>
            <div className="mt-5 border p-2 w-[40vh] outline-none rounded-md flex justify-between">
              <input
                type="text"
                placeholder="Promo Code"
                className="outline-none"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              />
              <button 
                className="bg-blue-800 text-white px-2 py-1 rounded-md"
                onClick={handlePromoCode}
              >
                Redeem
              </button>
            </div>

            <h3 className="orderTitle">Order Summary</h3>
            <div className="priceContainer">
              <div className="part">
                <h3 className="price">SubTotal</h3>
                <h3 className="price">Quantity</h3>
                <h3 className="price">Discount</h3>
                <h3 className="price">Delivery</h3>
                <h3 className="price font-bold">Total</h3>
              </div>
              <div className="part">
                <h3 className="price">₹{subtotal.toFixed(2)}</h3>
                <h3 className="price">{Quantity || 0}</h3>
                <h3 className="price text-green-600">-₹{discount.toFixed(2)}</h3>
                <h3 className="price">₹{deliveryFee}</h3>
                <h3 className="price font-bold">₹{total.toFixed(2)}</h3>
              </div>
            </div>
            
            <button
              className="makePayment mt-10 w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-700"
              onClick={() =>
                navigate("/pay", {
                  state: {
                    BookTitle,
                    Author,
                    totalAmount: total,
                    BookImage,
                    address,
                    Quantity,
                  },
                })
              }
            >
              Make Payment
            </button>
          </div>
        </div>

        {isPopupOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-10"
              onClick={() => setIsPopupOpen(false)}
            />
            <div className="fixed top-1/2 left-[45%] transform -translate-x-1/2 -translate-y-1/2 w-[60vh] z-20">
              <PopupCard 
                cancel={() => setIsPopupOpen(false)} 
                onSave={setAddress} 
              />
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default CheckOut;