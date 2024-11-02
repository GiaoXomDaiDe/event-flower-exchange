import { useEffect } from "react";
import "./index.scss";
import { toast } from "react-toastify";
import logo from "./../../assets/Espoir.png";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Badge, Button, ConfigProvider, Dropdown } from "antd";
import HeadlessTippy from "@tippyjs/react/headless";
import { Input } from "antd";
import Wrapper from "../wrapper";
import { useCart } from "../../context/CartContext";

const { Search } = Input;

function Header() {
  const navigate = useNavigate();

  const { cartItems, getCart } = useCart();

  const dropdownItems = [
    {
      key: "1",
      label: <Link to="/profile">My Profile</Link>,
    },
    {
      key: "2",
      label: <Link to="/seller">Become seller</Link>,
    },
    {
      key: "3",
      label: (
        <Link
          onClick={() => {
            localStorage.removeItem("token");
          }}
          to="/login"
        >
          Logout
        </Link>
      ),
    },
  ];

  useEffect(() => {
    getCart();
  }, []); 

  const token = JSON.parse(localStorage.getItem("token"));

  const onSearch = (value) => {
    navigate("/search", { state: { search: value } });
  };

  return (
    <div className="header">
      <div className="header_col">
        <Link to="/">Flowers</Link>
        <Link to="/">Our Story</Link>
      </div>
      <div className="header_logo">
        <img src={logo} alt="Espoir Logo" />
      </div>
      <div className="header_col">
        <HeadlessTippy
          trigger="click"
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
                </ConfigProvider>
              </Wrapper>
            </div>
          )}
        >
          <i className="bi bi-search"></i>
        </HeadlessTippy>

        <button
          className="cart_button"
          disabled={!token}
          onClick={() => navigate("/cart")}
        >
          <Badge count={cartItems?.length}>
            <i className="bi bi-cart3"></i>
          </Badge>
        </button>

        {token ? (
          <>
            <Dropdown
              menu={{ items: dropdownItems }}
              placement="bottomRight"
              arrow
            >
              <Button>Welcome back!</Button>
            </Dropdown>
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
          <Link to="/login">
            <button className="login_button">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
