import React from "react";
import ProductCard from "../product-card";
import "./index.css";

const SuggestProduct = () => {
  const productList = [1, 2, 3, 4, 5];
  return (
    <div className="suggest">
      {productList.map((p) => {
        return <ProductCard />
      })}
    </div>
  );
};

export default SuggestProduct;
