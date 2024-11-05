import React, { useEffect, useState } from "react";
import "./index.css";
import { Checkbox, Divider, Pagination, Select } from "antd";
import ProductCard from "../../components/product-card";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { getProductList } from "../../services/productService";

function SearchPage() {
  const location = useLocation();
  const searchValue = location.state?.search || "";

  const [flowers, setFlowers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDesc, setSortDesc] = useState(false);
  const pageSize = 20;
  const [sortBy, setSortBy] = useState("FlowerName");

  const CheckboxGroup = Checkbox.Group;

  // const plainOptions = ["Apple", "Pear", "Orange"];

  // const defaultCheckedList = [];
  // const [checkedList, setCheckedList] = useState(defaultCheckedList);

  // const checkAll = plainOptions.length === checkedList.length;
  // const indeterminate =
  //   checkedList.length > 0 && checkedList.length < plainOptions.length;

  const showTotal = (total) => `Total ${total} items`;

  // const fetchFlower = async () => {
  //   const response = await axios.get(
  //     "https://localhost:7026/api/flower/list-flowers",
  //     {
  //       params: {
  //         pageIndex: currentPage,
  //         pageSize: pageSize,
  //         sortBy: "FlowerName",
  //         sortDesc: true,
  //         search: searchValue,
  //       },
  //     }
  //   );

  //   setFlowers(response.data.data);
  //   setSearchResult(response.data);
  // };

  const fetchProductList = async () => {
    const response = await getProductList(
      currentPage,
      pageSize,
      searchValue,
      sortDesc,
      sortBy
    );
    setFlowers(response.data);
    setSearchResult(response);
  };

  useEffect(() => {
    fetchProductList();
  }, [currentPage, searchValue, sortDesc, sortBy]);

  const onChange = (list) => {
    setCheckedList(list);
  };

  const handleCurrentPage = (pageNo) => {
    setCurrentPage(pageNo);
    console.log(pageNo);
  };

  return (
    <div>
      <div className="search">
        <div className="search_product">
          <div className="search_header">
            <h4>Search results</h4>
            <div>
              <span>Sort by: </span>

              <Select
                defaultValue={"FlowerName"}
                style={{ width: "13  0px" }}
                onChange={(value) => {
                  setSortBy(value);
                }}
              >
                <Select.Option value={"FlowerName"}>Flower Name</Select.Option>
                <Select.Option value={"price"}>Price</Select.Option>
              </Select>
              <Select
                defaultValue={false}
                onChange={(value) => {
                  setSortDesc(value);
                }}
              >
                <Select.Option value={false}>Asc</Select.Option>
                <Select.Option value={true}>Desc</Select.Option>
              </Select>
            </div>
          </div>
          <div className="search_content">
            {flowers.map((flower, index) => (
              <ProductCard key={index} flower={flower} />
            ))}

            <div className="pageNo">
              <Pagination
                size="small"
                current={currentPage}
                onChange={(page) => handleCurrentPage(page)}
                total={searchResult.totalCount}
                showTotal={showTotal}
                showQuickJumper
                defaultPageSize={pageSize}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Dropdown = ({ title, children }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default SearchPage;
