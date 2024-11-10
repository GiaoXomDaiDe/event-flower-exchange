import React, { useEffect } from "react";
import "./index.scss";
import { getListOrder } from "../../services/orderService";

const OrderHistory = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [orderList, setOrderList] = React.useState([]);

  const fetchOrderList = async () => {
    const response = await getListOrder(token);
  }

  useEffect(() => {
  fetchOrderList()
},[orderList])




  const orders = [
    {
      id: "12345",
      date: "2023-09-01",
      total: "$99.99",
      status: "Shipped",
    },
    {
      id: "12346",

      date: "2023-08-25",
      total: "$49.99",
      status: "Delivered",
    },
    {
      id: "12347",
      date: "2023-08-15",
      total: "$29.99",
      status: "Pending",
    },
  ];

  return (
    <div className="order-history">
      <h1>Order History</h1>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.total}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
