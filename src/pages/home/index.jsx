import React, { useEffect, useState } from "react";
import "./index.scss";
import Benefits from "../../components/benefits";
import SectionTitle from "../../components/section-title";
import ProductCard from "../../components/product-card";
import axios from "axios";
import { Link } from "react-router-dom";
import { LoginOutlined } from "@ant-design/icons";
import EventCate from "../../components/event-cate";

function Home() {
  const [searchResult, setSearchResult] = useState([]);

  const fetchFlower = async () => {
    const response = await axios.get(
      "https://localhost:7026/api/flower/list-flowers",
      {
        params: {
          pageIndex: 1,
          pageSize: 4,
          sortBy: "FlowerName",
          sortDesc: true,
          search: "a",
        },
      }
    );
    setSearchResult(response.data.data);
  };

  useEffect(() => {
    fetchFlower();
  }, []);

  return (
    <div className="home">
      <img
        src="https://flowershop.com.vn/wp-content/uploads/2023/08/Pink-Abstract-Watercolor-Flower-Wedding-Banner-3-scaled.jpg"
        alt=""
      />

      <div className="onScreenBenefits">
        <Benefits />
      </div>

      <div className="home-title">
        <EventCate />
      </div>
      <div className="home-title">
        <SectionTitle title="SPECIAL OFFERS" searchResult={searchResult} />
      </div>
      <div className="home-title">
        <SectionTitle title="OUR PRODUCT" searchResult={searchResult} />
      </div>
    </div>
  );
}

export default Home;
