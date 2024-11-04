import React from "react";
import "./index.css";

const CheckoutItem = ({ item }) => {

  
  return (
    <div className="checkout-item">
      <div className="checkout-item_img">
        <img
          src="https://colesclassroom.com/wp-content/uploads/2020/04/yellow-sunflower-macro-photographyt-46216.jpg"
          alt=""
        />
      </div>
      <div className="checkout-item_item">
        <h4>{item.flower.flowerName}</h4>
        <div className="checkout-item_infos">
          <div className="checkout-item_info">
            <span>Quantity: x{item.quantity}</span>
            <p>Price: ${item.flower.price}</p>
          </div>
          <h2>${item.paidPrice}</h2>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
