import React from "react";
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
const { Search } = Input;

function Header() {
  const navigate = useNavigate();
  const cart = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);
  // const user = JSON.parse(localStorage.getItem('token'));

  const onSearch = (value, e, info) => {
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
        <Link to="/cart">
          <Badge count={cart.length}>
            <i className="bi bi-cart3"></i>
          </Badge>
        </Link>
        {/* <Link to={"/login"}>
          <button className="header_col">Login</button>
        </Link> */}
        {user ? (
          <>
            Welcome back! {user.fullname}{" "}
            <button
              onClick={() => {
                dispatch(logout());
              }}
              className="header_col"
            >
              Log Out
            </button>
          </>
        ) : (
          <Link to={"/login"}>
            <button className="header_col">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
