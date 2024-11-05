import { Avatar } from "antd";
import React, { useState, useCallback } from "react";
import "./index1.css";
import { useCart } from "../../context/CartContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

function ProductCard({ flower }) {
  const token = JSON.parse(localStorage.getItem("token"));
  const [isFavor, setIsFavor] = useState(false);
  const { getCart } = useCart();

  const fetchAddCart = async (quantity) => {
    const addCartForm = new FormData();
    addCartForm.append("accessToken", token);
    addCartForm.append("FlowerID", flower.flowerId);
    addCartForm.append("Quantity", quantity);

    try {
      const response = await axios.post(
        "https://localhost:7026/api/account/add-to-cart",
        addCartForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.statusCode === 201) {
        getCart();
        toast.success("Your flower is added!", {
          position: "top-right",
        });
      } else {
        toast.error("Add flower failed!", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("An error occurred while adding the flower!", {
        position: "top-right",
      });
      console.error(error);
    }
  };

  const handleAddToCart = useCallback((e) => {
    e.stopPropagation();
    fetchAddCart(1);
  }, [flower.flowerId]);

  const tags = flower.tagNames.split(",");

  return (
    <div className="product-cards">
      <Link
        style={{ textDecoration: "none", color: "#222222" }}
        to={`/product/${flower.flowerId}`}
      >
        <div className="product-img">
          <img
            src="https://plantsvszombies.wiki.gg/images/3/3e/Sunflower-Almanac.png?20200522063110"
            alt={`Image of ${flower.flowerName}`}
          />
          <Avatar
            size={50}
            className="avatar"
            src="https://i.redd.it/sxb95sif7ys81.png"
          />
        </div>

        <div className="tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>

        <div className="info">
          <span className="info_name">{flower.flowerName}</span>
          <div>
            <Rating size={15} readonly initialValue={4} /> (100)
          </div>

          <div className="price">
            <h4>${flower.price}</h4>
            <span className="price_old">${flower.oldPrice}</span>
          </div>
        </div>
      </Link>

      <div
        className="favorite"
        onClick={() => setIsFavor(!isFavor)}
        style={{
          color: isFavor ? "red" : "#9f9f9f",
        }}
      >
        <i className="fa fa-heart"></i>
      </div>

      <div className="add-cart-icon" onClick={handleAddToCart}>
        <i className="bi bi-plus-lg"></i>
      </div>
      
    </div>
  );
}

export default ProductCard;
