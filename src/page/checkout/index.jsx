import classNames from "classnames/bind";
import styles from "./checkout.module.scss";
import { assets } from "../../assets";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { ConfigProvider, Input, Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutItem from "../../component/checkout-item";
import { checkoutOrder, paymentPayOS } from "../../services/paymentService";

const cx = classNames.bind(styles);

function CheckOut() {
  const location = useLocation();
  const order = location.state.order;
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [paymentRadio, setPaymentRadio] = useState("payOS");

  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [numberAddress, setNumberAddress] = useState("");

  const [province, setProvince] = useState({
    id: 0,
    name: "",
  });
  const [district, setDistrict] = useState({
    id: 0,
    name: "",
  });
  const [ward, setWard] = useState({
    id: 0,
    name: "",
  });
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const checkout = {
    orderId: order.orderDetails[0].orderId,
    fullName: formValues.firstName + " " + formValues.lastName,
    phoneNumber: formValues.phone,
    address: [numberAddress, ward.name, district.name, province.name].join(
      ", "
    ),
  };

  const fetchProvinceList = async () => {
    const response = await axios.get("https://vapi.vnappmob.com/api/province/");
    if (response.status === 200) {
      setProvinceList(response.data.results);
    }
  };

  const fetchDistrictList = async (provinceId) => {
    const response = await axios.get(
      `https://vapi.vnappmob.com/api/province/district/${provinceId}`
    );
    if (response.status === 200) {
      setDistrictList(response.data.results);
    }
  };

  const fetchWardList = async (districtId) => {
    const response = await axios.get(
      `https://vapi.vnappmob.com/api/province/ward/${districtId}`
    );
    if (response.status === 200) {
      setWardList(response.data.results);
    }
  };

  const fetchCheckout = async () => {
    const response = await checkoutOrder(token, checkout);
    return response;
  };

  const fetchPayOS = async () => {
    console.log(order.orderDetails[0].orderId, "orderId");
    
    const response = await paymentPayOS(token, order.orderDetails[0].orderId);
    console.log(response, "23456789");
    return response;
  };

  useEffect(() => {
    fetchProvinceList();
  }, []);

  useEffect(() => {
    if (province.id > 0) {
      fetchDistrictList(province.id);
    }
  }, [province.id]);

  useEffect(() => {
    if (district.id > 0) {
      fetchWardList(district.id);
    }
  }, [district.id]);

  const handleProvince = (value, label) => {
    setProvince((prev) => ({
      ...prev,
      id: value,
      name: label.label,
    }));
  };

  const handleDistrict = (value, label) => {
    setDistrict((prev) => ({
      ...prev,
      id: value,
      name: label.label,
    }));
  };

  const handleWard = (value, label) => {
    setWard((prev) => ({
      ...prev,
      id: value,
      name: label.label,
    }));
  };

  const handleNumberAddress = (e) => {
    setNumberAddress(e.target.value);
  };

  const handleInput = (e) => {
    const { name, value } = e.target; // Get the name and value from the input element
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value, // Update the value of the field with the same name
    }));
  };

  const handleCheckout = async (paymentMethod) => {
    const checkout = await fetchCheckout();
    console.log(checkout);

    if (checkout.statusCode === 200) {
      console.log("assa");

      if (paymentMethod === "payOS") {
        console.log("sdfsdf"); 
        const payOS = await fetchPayOS();
        window.location.replace(payOS.checkoutUrl);
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className={cx("checkout")}>
      
      <div className={cx("container")}>
        <div className={cx("content")}>
          <div className={cx("content-input")}>
            
            <div className={cx("checkout-back")}>
              <h1>Check Out</h1>
            </div>

            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    activeBorderColor: "#FF99AC",
                    hoverBorderColor: "#FF99AC",
                  },
                  Select: {
                    activeBorderColor: "#FF99AC",
                    hoverBorderColor: "#FF99AC",
                    optionActiveBg: "#FF99AC",
                    optionSelectedBg: "#FF99AC",
                  },
                },
              }}
            >
              <div className={cx("checkout-input")}>
                <div className={cx("checkout-contact")}>
                  <h1>Contact</h1>
                  <div className={cx("checkout-contact-name")}>
                    <Input
                      name="firstName"
                      onChange={handleInput}
                      placeholder="First Name"
                      size="large"
                      style={{ width: 335 }}
                    />
                    <Input
                      name="lastName"
                      onChange={handleInput}
                      placeholder="Last Name"
                      size="large"
                      style={{ width: 335 }}
                    />
                  </div>

                  <Input
                    name="phone"
                    onChange={handleInput}
                    placeholder="Phone Number"
                    size="large"
                  />
                </div>

                <div className={cx("checkout-delivery")}>
                  <h1>Address</h1>
                  {/* <Input placeholder="Your Province" size="large" /> */}

                  {/* <h4>Shipping method</h4> */}
                  <div className={cx("checkout-delivery_address")}>
                    <Select
                      defaultValue="Select Province"
                      size="default"
                      // disabled
                      style={{
                        width: 680,
                        backgroundColor: "#b4b4b4",
                      }}
                      onChange={handleProvince}
                      options={provinceList.map((data) => {
                        return {
                          value: data.province_id,
                          label: data.province_name,
                        };
                      })}
                    />
                    <Select
                      defaultValue="Select District"
                      size="default"
                      // disabled
                      style={{
                        width: 680,
                        backgroundColor: "#b4b4b4",
                      }}
                      onChange={handleDistrict}
                      options={districtList.map((data) => {
                        return {
                          value: data.district_id,
                          label: data.district_name,
                        };
                      })}
                    />
                    <Select
                      defaultValue="Select Ward"
                      size="default"
                      // disabled
                      style={{
                        width: 680,
                        backgroundColor: "#b4b4b4",
                      }}
                      onChange={handleWard}
                      options={wardList.map((data) => {
                        return {
                          value: data.ward_id,
                          label: data.ward_name,
                        };
                      })}
                    />
                    <Input
                      placeholder="Number Address and Street"
                      onChange={handleNumberAddress}
                      size=""
                    />
                  </div>
                </div>

                {/* Payment */}
                <div className={cx("checkout-payment")}>
                  <h1>Payment</h1>
                  <p>All transactions are secure and encrypted</p>

                  {/* Cash on Credit Card */}
                  <div className={cx("credit-card")}>
                    <div className={cx("choose-credit-card")}>
                      <input
                        name="paymentMethod"
                        type="radio"
                        className={cx("radio")}
                        value={"payOS"}
                        onChange={(e) => setPaymentRadio(e.target.value)}
                      />
                      <label htmlFor="radio" className={cx("radioLabel")}>
                        {" "}
                        <h4>PayOS</h4>
                      </label>
                    </div>

                    <div className={cx("cards-display")}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTyOkJX2-C9OCpJq_Mz8WybGo2SS0gSfkHJw&s"
                        alt="mastercard"
                      />
                      {/* <img src={assets.visa} alt="visa" /> */}
                    </div>
                  </div>
                </div>

                {/* Credit Card Form */}
                {/* <div className={cx("credit-card-form")}>
                  <Input placeholder="Card Number" size="large" />
                  <div className={cx("credit-card-code-number")}>
                    <Input
                      placeholder="Expiration Date(MM//YY)"
                      size="large"
                      style={{ width: 335 }}
                    />
                    <Input
                      placeholder="Security Code"
                      size="large"
                      style={{ width: 335 }}
                    />
                  </div>

                  <Input
                    placeholder="Name on card "
                    size="large"
                    type="email"
                  />
                </div> */}

                {/* Cash on delivery */}
                <div className={cx("cash-on-delivery")}>
                  <div className={cx("choose-cash-on-delivery")}>
                    <input
                      name="paymentMethod"
                      type="radio"
                      className={cx("radio")}
                      value={"cash"}
                      onChange={(e) => setPaymentRadio(e.target.value)}
                    />
                    <label htmlFor="radio" className={cx("radioLabel")}>
                      <h4>Cash on Delivery</h4>
                    </label>
                  </div>
                </div>
              </div>
            </ConfigProvider>
            <button
              className={cx("pay-now-btn")}
              onClick={() => handleCheckout(paymentRadio)}
            >
              Pay now
            </button>
          </div>
        </div>
        <div className={cx("payments")}>
          <div className={cx("products-display")}>
            <h1>Products</h1>
            <h4>Check your products before continue!</h4>
          </div>

          <div className={cx("checkout_products")}>
            {order.orderDetails.map((item, index) => {
              return <CheckoutItem key={index} item={item} />;
            })}
          </div>
          {/* <div className={cx("subtotal-shipping")}>
            <div className={cx("subtotal")}>
              <h3>Subtotal</h3>
              <p>500.000VND</p>
            </div>
            <div className={cx("shipping")}>
              <h3>Shipping</h3>
              <p>FREE</p>
            </div>
          </div>
          <div className={cx("total")}>
            <h2>TOTAL</h2>
            <h2>500.000VND</h2>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
