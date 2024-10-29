import React, { useEffect, useLayoutEffect, useState } from "react";
import "./index.css";
import { Rating } from "react-simple-star-rating";
import { Avatar, InputNumber } from "antd";
import TabsProduct from "../../component/product-description";
import SuggestProduct from "../../component/suggest-product";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { flowerId } = useParams();
  const token = JSON.parse(localStorage.getItem("token"));

  const [flower, setFlower] = useState({});
  const [quantity, setQuantity] = useState(1);

  const fetchFlower = async () => {
    const response = await axios.get(
      "https://localhost:7026/api/flower/flower-detail",
      {
        params: {
          flowerId,
        },
      }
    );
    setFlower(response.data);
  };

  const fetchAddCart = async (quantity) => {
    const addCartForm = new FormData();
    addCartForm.append("accessToken", token);
    addCartForm.append("FlowerID", flowerId);
    addCartForm.append("Quantity", quantity);

    const response = await axios.post(
      "https://localhost:7026/api/account/add-to-cart",
      addCartForm,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
  };

  useLayoutEffect(() => {
    fetchFlower();
  }, []);

  const imageList = ["pink", "yellow", "green", "red"];

  const shopInfo = [
    {
      key: 1,
      name: "Reviewers",
      number: 100,
    },
    {
      key: 2,
      name: "Products",
      number: "50",
    },
    {
      key: 3,
      name: "Since",
      number: "2023",
    },
  ];

  const handleQuantity = (quantity, type) => {
    if (type === "minus" && quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
    // setQuantity(e.target.value);
  };

  const handleAddCart = () => {};

  return (
    <div className="product-detail">
      <div className="detail">
        <div className="images">
          <div className="images_main">
            <img
              src="https://ih1.redbubble.net/image.3113464535.1401/flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg"
              alt=""
            />
          </div>
          <div className="images_list">
            {imageList.map((index) => {
              return (
                <div key={index} className="images_img">
                  <img
                    src="https://imgcdn.stablediffusionweb.com/2024/9/17/995b5d86-3442-40aa-a5fe-191218fe4151.jpg"
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="info-detail">
          <div className="title">{flower.flowerName}</div>
          <div className="rating">
            4.0 <Rating size={20} readonly initialValue={4} /> | 100 reviews
          </div>
          <div>Expire date: {flower.dateExpiration}</div>

          <div className="prices">
            <h1 className="new">${flower.price}</h1>
            <h4 className="prices_old">${flower.oldPrice}</h4>
            <h6 className="prices_sale">Sale {flower.discount}</h6>
          </div>
          {/* <div className="colors">
            {imageList.map((color, index) => {
              return (
                <div key={index} className="chosen-color">
                  <div className="color" style={{ backgroundColor: color }} />
                </div>
              );
            })}
          </div> */}
          <div className="quantity">
            <button
              disabled={quantity === 1}
              className="quantity_btn"
              onClick={() => handleQuantity(quantity, "minus")}
            >
              --
            </button>
            <input
              className="quantity_input"
              type="number"
              inputMode="numeric"
              maxLength={3}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button
              className="quantity_btn"
              onClick={() => handleQuantity(quantity, "plus")}
            >
              +
            </button>
            {flower.quantity} left
          </div>
          <div className="add-cart">
            <button
              className="cart-btn"
              onClick={() => fetchAddCart(flower.flowerId, quantity)}
            >
              Add to Cart
            </button>
            <button className="wish-btn">Add to Wishlist</button>
          </div>
          <div className="shop">
            <div className="avatar-chat">
              <div className="avatarr">
                <div className="avatar_outline">
                  <Avatar
                    size={50}
                    src="https://i.pinimg.com/236x/e4/92/f8/e492f831968281160a27deae08830e70.jpg"
                  />
                </div>
                <div className="avatar_name">
                  <h2>Frank Ocean</h2>
                  <div>
                    4.0 <Rating size={18} readonly initialValue={4} />
                  </div>
                </div>
              </div>
              <button className="chat">
                Chat <i className="bi bi-chat-left-text-fill"></i>
              </button>
            </div>
            <div className="shop_info">
              {shopInfo.map((i, index) => {
                if (i.key === 1) {
                  return (
                    <div
                      key={index}
                      className="shop_info-detail1 shop_info-detail"
                    >
                      <p>{i.name}</p>
                      <span>{i.number}</span>
                    </div>
                  );
                }
                return (
                  <div className="shop_info-detail">
                    <p>{i.name}</p>
                    <span>{i.number}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="description">
        <TabsProduct />
      </div>
      {/* <div className="suggest-product">
        <h1 className="suggest-product_title">Other Product</h1>
        <SuggestProduct />
      </div>
      <div className="suggest-product">
        <h1 className="suggest-product_title">Other Product</h1>
        <SuggestProduct />
      </div> */}
    </div>
  );
};

export default ProductDetail;
