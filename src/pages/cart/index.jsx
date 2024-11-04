import React, { useEffect, useState } from "react";
import "./index.scss";
import { Avatar, Radio } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets";
import axios from "axios";
import { toast } from "react-toastify";
import {
  deleteCartItem,
  getCartList,
  updateCartItem,
} from "../../services/cartService";

import { useCart } from "../../contexts/CartContext";
import CartShopItem from "../../components/cart-shop-item";

function Cart() {
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const { getCart, cartItems } = useCart();

  const cartLength = cartItems?.flatMap((item) => {
    return item.orderDetails;
  });

  const [sort, setSort] = useState(true);

  const [cart, setCart] = useState([]);

  const [radioOption, setRadioOption] = useState(null);

  const fetchCart = async () => {
    const response = await getCartList(token);
    console.log(response);

    setCart(response);
  };

  const fetchDeleteCartItem = async (cartItemId) => {
    await deleteCartItem(token, cartItemId);
    getCart();
    fetchCart(token);
  };

  const fetchUpdateCart = async (cartItemId, quantity) => {
    await updateCartItem(token, cartItemId, quantity);
    fetchCart(token);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateCart = (cartItemId, quantity) => {
    fetchUpdateCart(cartItemId, quantity);
  };

  const handleDeleteCart = (cartItemId) => {
    fetchDeleteCartItem(cartItemId);
  };

  console.log(radioOption, "radioOption");

  const totalPrice = 
   radioOption?.orderDetails?.reduce((accumulator, item) => {
    return accumulator + item.paidPrice;
  }, 0) || 0;

  const handleRadioOption = (item) => {
    setRadioOption(item);
  };

  const handleCheckout = (item) => {
    if (item && item !== null) {
      console.log(item);

      navigate("/checkout", { state: { order: item } });
    } else {
      toast.warning("Choose at least 1 from your cart to continue", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="cart-wrapper">
      <div className="cart">
        <div className="cart_header">
          <h1>Cart</h1>

          <span> {cartLength?.length || 0} items in your Cart</span>
        </div>
        <div className="cart-body">
          {cart?.length > 0 ? (
            cart.map((item, index) => {
              return (
                <CartItem
                  key={index}
                  item={item}
                  handleUpdateCart={handleUpdateCart}
                  handleDeleteCart={handleDeleteCart}
                  handleRadioOption={handleRadioOption}
                  fetchCart={fetchCart}
                />
              );
            })
          ) : (
            <div className="cart-body_empty">
              <img
                className="cart-body_img"
                src={assets.emptyCart}
                alt="emptyCart"
              />
              <h1>Empty Cart</h1>
            </div>
          )}
        </div>

        <div className="total">
          <div>
            <h3>Total</h3>
            <h3>${totalPrice}</h3>
          </div>
          {/* <Link to="/checkout"> */}
          <button
            style={
              cart?.length === 0
                ? {
                    backgroundColor: "grey",
                    opacity: 0.6,
                    userSelect: "none",
                  }
                : {}
            }
            disabled={cart?.length === 0}
            onClick={() => handleCheckout(radioOption)}
          >
            Check Out
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

const CartItem = ({
  item,
  handleUpdateCart,
  handleDeleteCart,
  handleRadioOption,
}) => {
  // console.log(item.orderDetails[0].orderDetailId);

  return (
    <div className="cart-item" style={{ width: "900px" }}>
      <div className="cart-item_heading">
        <div className="shop-info">
          <input
            className="radio-option"
            type="radio"
            // value={item.orderDetails[0].orderDetailId}
            name="radio-option"
            onChange={() => {
              handleRadioOption(item);
            }}
          />
          <Avatar size={60} src="https://i.redd.it/sxb95sif7ys81.png" />
          <div style={{ width: 100 }}>
            <h3>{item.seller.shopName}</h3>
          </div>
        </div>
      </div>
      <div className="cart-item_products">
        {item.orderDetails.map((i, index) => {
          return (
            <CartShopItem
              key={index}
              info={i}
              handleUpdateCart={handleUpdateCart}
              handleDeleteCart={handleDeleteCart}
            />
          );
        })}
      </div>
      {/* </Radio> */}
    </div>
  );
};

export default Cart;
