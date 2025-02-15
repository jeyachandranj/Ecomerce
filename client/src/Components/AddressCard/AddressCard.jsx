import React from "react";
import './address.css';

const AddressCard = ({ address, changeAddress }) => {
  if (!address) {
    return <p className="noAddress">No Address Available</p>;
  }

  return (
    <div className="addressContainer">
      <h3 className="addressTitle">
        {address.firstName && address.lastName
          ? `${address.firstName} ${address.lastName}`
          : "No Address"}
      </h3>
      <p className="addressName">{address.streetAddress || "Street Address not provided"}</p>
      <p className="addressDesc">
        {address.landmark && address.pincode
          ? `${address.landmark}, ${address.pincode}`
          : "Landmark or Pincode not provided"}
      </p>
      <button className="changeBtn" onClick={changeAddress}>Change</button>
    </div>
  );
};

export default AddressCard;
