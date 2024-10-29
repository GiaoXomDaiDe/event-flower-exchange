import { Avatar, Rate } from "antd";
import React, { useState } from "react";
import "./index1.css";
import { useDispatch } from "react-redux";
import { add } from "../../redux/features/cartSlice";
import { Rating } from "react-simple-star-rating";

function ProductCard({ flower }) {
  const [isFavor, setIsFavor] = useState(false);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(add(flower));
  };

  const tags = flower.tagNames.split(",");

  return (
    <div className="product-cards">
      <div className="product-img">
        <img
          src="https://plantsvszombies.wiki.gg/images/3/3e/Sunflower-Almanac.png?20200522063110"
          alt=""
        />

        <Avatar
          size={50}
          className="avatar"
          src="https://i.redd.it/sxb95sif7ys81.png"
        />
      </div>

      <div className="tags">
        {
          tags.map((tag) => {
            return <span className="tag">{tag}</span>
          })
        }
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

      {/* <div className="info">
        <h3>{flower.FlowerName}</h3>
        <Rating size={14} readonly initialValue={4} /> (100)
        <div className="price">
          <h2>{flower.Price}</h2>  
        </div>
      </div> */}

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
