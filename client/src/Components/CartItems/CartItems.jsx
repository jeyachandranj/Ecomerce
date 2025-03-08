import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import './cart.css';

const CartItems = ({ BookImage, BookTitle, Author, Price, onQuantityChange, initialCount }) => {
  const [count, setCount] = useState(initialCount || 1);

  useEffect(() => {
    // Update count if initialCount prop changes
    setCount(initialCount || 1);
  }, [initialCount]);

  const handleCountChange = (newCount) => {
    // Ensure count doesn't go below 0
    if (newCount >= 0) {
      setCount(newCount);
      onQuantityChange(BookTitle, newCount); // Notify parent about the updated count
    }
  };

  const handleRemove = () => {
    // Call onQuantityChange with 0 to remove the item
    onQuantityChange(BookTitle, 0);
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
      
      <div className="removeCartItem">
        <button
          className="removeBtn"
          onClick={handleRemove}
          title="Remove from cart"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default CartItems;