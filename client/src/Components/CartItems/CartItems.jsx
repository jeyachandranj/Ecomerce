import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import './cart.css';

const CartItems = ({ BookImage, BookTitle, Author, Price, onQuantityChange, initialCount }) => {
  const [count, setCount] = useState(initialCount || 1);

  const handleCountChange = (newCount) => {
    // Ensure count doesn't go below 0
    if (newCount >= 0) {
      setCount(newCount);
      onQuantityChange(BookTitle, newCount); // Notify parent about the updated count
    }
  };

  return (
    <div className="cartProdContainer bg-gray-100">
      <div className="cartImageContainer">
        <img src={BookImage} alt="" className="object-fit" />
      </div>

      <div className="cartProdName">
        <h3>{BookTitle}</h3>
        <p>{Author}</p>
      </div>

      <div className="cartQtyController">
        <button
          className="qtyMinusBtn"
          onClick={() => handleCountChange(count - 1)}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>

        <h3>{count}</h3>

        <button
          className="qtyBtn"
          onClick={() => handleCountChange(count + 1)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <div className="cartProdPrice">
        <h3>₹{(Price * count).toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default CartItems;
