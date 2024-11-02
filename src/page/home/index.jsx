import React, { useEffect, useState } from "react";
import "./index.scss";
import Benefits from "../../component/benefits";
import SectionTitle from "../../component/section-title";
import ProductCard from "../../component/product-card";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [searchResult, setSearchResult] = useState([]);

  const fetchFlower = async () => {
    const response = await axios.get(
      "https://localhost:7026/api/flower/list-flowers",
      {
        params: {
          pageIndex: 1,
          pageSize: 5,
          sortBy: "FlowerName",
          sortDesc: true,
          search: "a",
        },
      }
    );
    setSearchResult(response.data.data);
    console.log(searchResult);
  };

  console.log(searchResult);

  useEffect(() => {
    fetchFlower();
  }, []);

  console.log(searchResult);

  return (
    <div className="home">
      <img
        src="https://flowershop.com.vn/wp-content/uploads/2023/08/Pink-Abstract-Watercolor-Flower-Wedding-Banner-3-scaled.jpg"
        alt=""
      />

      <Benefits />

      <SectionTitle title="HOA 20/10">
        <div className="product-list">
          {searchResult.map((flower, index) => (
            <ProductCard key={index} flower={flower} />
          ))}
        </div>
      </SectionTitle>

      <SectionTitle title="HOA 20/10">
        <div className="product-list">
          {searchResult.map((flower, index) => (
            <ProductCard key={index} flower={flower} />
          ))}
        </div>
      </SectionTitle>

      <SectionTitle title="HOA 20/10">
        <div className="product-list">
          {searchResult.map((flower, index) => (
            <ProductCard key={index} flower={flower} />
          ))}
        </div>
      </SectionTitle>
    </div>
  );
}

export default Home;
