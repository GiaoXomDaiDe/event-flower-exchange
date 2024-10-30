import React, { useEffect, useState } from "react";
import "./index.scss";
import { Avatar, Radio } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets";
import axios from "axios";
import { toast } from "react-toastify";

function Cart() {
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [radioOption, setRadioOption] = useState(null);

  const fetchCart = async () => {
    const response = await axios.get(
      `https://localhost:7026/api/account/list-cart-items`,
      {
        params: {
          accessToken: token,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCart(response.data);
  };

  const fetchDeleteCartItem = async (cartItemId) => {
    const response = await axios.delete(
      `https://localhost:7026/api/account/delete-cart-item`,
      {
        params: {
          cartItemId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchCart();
  };

  const fetchUpdateCart = async (cartItemId, quantity) => {
    const response = await axios.post(
      `https://localhost:7026/api/account/update-cart-item`,
      {},
      {
        params: {
          cartItemId,
          quantity,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data, "updateCart");
    if (response.data.statusCode === 201) {
      toast.success("Update cart successfully", {
        position: "top-right",
        autoClose: 1500,
      });
    } else {
      toast.warning(response.data.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }

    fetchCart();
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

  const totalPrice = cart.reduce((accumulator, item) => {
    return accumulator + item.paidPrice;
  }, 0);

  const handleRadioOption = (item) => {
    setRadioOption(item);
  };

  const handleCheckout = (item) => {
    if (item && item !== null) {
      console.log(radioOption);

      navigate("/checkout", { order: item });
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

          <span> {cart.length} items in your Cart</span>
        </div>
        <div className="cart-body">
          {cart.length > 0 ? (
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
              cart.length === 0
                ? {
                    backgroundColor: "grey",
                    opacity: 0.6,
                    userSelect: "none",
                  }
                : {}
            }
            disabled={cart.length === 0}
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
  fetchCart,
  handleUpdateCart,
  handleDeleteCart,
  handleRadioOption,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const onChangeQuantity = (e) => {
    const inputValue = Number(e.target.value);
    if (inputValue < 1) {
      setQuantity(1);
      return;
    }
    console.log(inputValue, "inputValue");

    let value = inputValue - item.quantity;
    console.log(value, "value");
    handleUpdateCart(item.flowerId, value);
  };

  console.log(quantity);

  // console.log(item);

  return (
    <div className="cart-item" style={{ width: "900px" }}>
      <div className="cart-item_heading">
        <div className="shop-info">
          <input
            className="radio-option"
            type="radio"
            value={item.flowerId}
            name="radio-option"
            onChange={() => {
              handleRadioOption(item);
            }}
          />
          <Avatar size={60} src="https://i.redd.it/sxb95sif7ys81.png" />
          <div style={{ width: 100 }}>
            <h3>shop name</h3>
            {/* <p>Title</p> */}
          </div>
        </div>

        {/* <button>Select All</button> */}
      </div>
      <div className="cart-item_products">
        <div className="item">
          <img
            src="https://plantsvszombies.wiki.gg/images/3/3e/Sunflower-Almanac.png?20200522063110"
            alt=""
          />
          <h3>Product Name</h3>

          <p>
            ${item.paidPrice}
            <del>${500}</del>
          </p>
          <div className="quantity">
            <button
              disabled={quantity === 1}
              onClick={() => {
                handleUpdateCart(item.flowerId, -1);
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
                console.log(e);
              }}
            />
            <button
              onClick={() => {
                handleUpdateCart(item.flowerId, 1);
                setQuantity(quantity + 1);
              }}
            >
              +
            </button>
          </div>

          <span>${item.paidPrice}</span>

          <button
            onClick={() => {
              handleDeleteCart(item.orderDetailId);
            }}
          >
            <DeleteOutlined />
          </button>
        </div>
      </div>{" "}
      {/* </Radio> */}
    </div>
  );
};

export default Cart;
