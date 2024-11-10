import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

const CartShopItem = ({ info, handleUpdateCart, handleDeleteCart }) => {
  const flower = info.flower;
  const [quantity, setQuantity] = useState(info.quantity);

  useEffect(() => {
    setQuantity(info.quantity);
  }, [info.quantity]);

  const onChangeQuantity = (e) => {
    const inputValue = Number(e.target.value);
    if (inputValue < 1) {
      setQuantity(1);
      return;
    }
    console.log(inputValue, "inputValue");

    let value = inputValue - info.quantity;
    console.log(value, "value");
    handleUpdateCart(info.orderDetailId, value);
  };

  return (
    <div className="item">
      <img
        src={flower.attachment}
        alt=""
      />
      <h3 className="cart-item_name">{flower.flowerName}</h3>

      <p>
        ${flower.price}
        <del>${flower.oldPrice}</del>
      </p>
      <div className="quantity">
        <button
          disabled={quantity === 1}
          onClick={() => {
            handleUpdateCart(info.orderDetailId, -1);
            setQuantity(quantity - 1);
          }}
        >
          --
        </button>
        <input
          type="number"
          inputMode="numeric"
          value={quantity}
          onChange={(e) => {
            onChangeQuantity(e);
            // console.log(e);
          }}
        />
        <button
          onClick={() => {
            handleUpdateCart(info.orderDetailId, 1);
            setQuantity(quantity + 1);
          }}
        >
          +
        </button>
      </div>

      <span>${info.paidPrice}</span>

      <button
        onClick={() => {
          handleDeleteCart(info.orderDetailId);
        }}
      >
        <DeleteOutlined />
      </button>
    </div>
  );
};

export default CartShopItem;
