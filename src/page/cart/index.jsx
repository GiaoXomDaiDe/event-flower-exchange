import React from "react";
import "./index.scss";
import { Avatar } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function Cart() {
  return (
    <div className="cart-wrapper">
      <div className="cart">
        <div className="cart_header">
          <h3>Cart</h3>

          <span> 9 items in your Cart</span>
        </div>
        <CartItem />
        <CartItem />

        <div className="total">
          <div>
            <h3>Total</h3>
            <h3>500.000VND</h3>
          </div>

          <button>Check Out</button>
        </div>
      </div>
    </div>
  );
}

const CartItem = () => {
  return (
    <div className="cart-item">
      <div className="cart-item_heading">
        <div className="shop-info">
          <Avatar size={60} src="https://i.redd.it/sxb95sif7ys81.png" />
          <div>
            <h3>shop name</h3>
            <p>Title</p>
          </div>
        </div>

        <button>Select All </button>
      </div>
      <div className="cart-item_products">
        <div className="item">
          <img
            src="https://plantsvszombies.wiki.gg/images/3/3e/Sunflower-Almanac.png?20200522063110"
            alt=""
          />
          <h3>cak cak cak</h3>

          <p>
            100.000VND
            <del>200.000VND</del>
          </p>
          <button>-</button>
          <p>10</p>
          <button>+</button>
          <p>100.000VND</p>

          <DeleteOutlined />
        </div>
      </div>
    </div>
  );
};

export default Cart;
