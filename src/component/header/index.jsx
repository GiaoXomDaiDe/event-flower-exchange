import React, { useEffect, useState } from "react";
import "./index.scss";
import logo from "./../../assets/Espoir.png";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Badge, ConfigProvider } from "antd";
import { useSelector } from "react-redux";
import HeadlessTippy from "@tippyjs/react/headless";
import Tippy from "@tippyjs/react/";
import "tippy.js/dist/tippy.css";
import Wrapper from "../wrapper";
import { Input } from "antd";
import SearchItem from "../search-item";
import axios from "axios";
import { useCart } from "../../context/CartContext";
const { Search } = Input;

function Header() {
  const navigate = useNavigate();
  const cart = useSelector((store) => store.cart);

  const { cartItems } = useCart();
  console.log(cartItems);

  const token = JSON.parse(localStorage.getItem("token"));

  const onSearch = (value, _e, info) => {
    navigate("/search", { state: { search: value } });
  };

  return (
    <div className="header">
      <div className="header_col">
        <Link to="/">Menu</Link>
        <Link to="/">Flowers</Link>
        <Link to="/">Our Story</Link>
      </div>
      <div className="header_logo">
        {/* <h1>Espoir</h1> */}
        <img src={logo} alt="" />
      </div>
      <div className="header_col">
        <HeadlessTippy
          interactive
          placement="bottom"
          render={(attrs) => (
            <div className="box" tabIndex="-1" {...attrs}>
              <Wrapper>
                <ConfigProvider
                  theme={{
                    components: {
                      Input: {
                        activeBorderColor: "#FD6882",
                        hoverBorderColor: "#FD6882",
                      },
                      Button: {
                        defaultActiveBorderColor: "red",
                        defaultHoverColor: "red",
                        defaultHoverBorderColor: "#FD6882",
                        defaultHoverBg: "#fff",
                      },
                    },
                  }}
                >
                  <Search
                    placeholder="Search here..."
                    allowClear
                    size="large"
                    onSearch={onSearch}
                  />
                  {/* <div className="search-result">
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                  </div> */}
                </ConfigProvider>
              </Wrapper>
            </div>
          )}
        >
          <i className="bi bi-search"></i>
        </HeadlessTippy>
        {/* <Tippy content="Chat">
          <i className="bi bi-chat"></i>
        </Tippy> */}
        {/* <i className="bi bi-bell"></i> */}
        <button
          className="cart_button"
          disabled={!token}
          onClick={() => navigate("/cart")}
        >
          <Badge count={cartItems.length}>
            <i className="bi bi-cart3"></i>
          </Badge>
        </button>
        {token ? (
          <>
            Welcome back!
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
              className="login_button"
            >
              Log Out
            </button>
          </>
        ) : (
          <Link to={"/login"}>
            <button className="login_button">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
