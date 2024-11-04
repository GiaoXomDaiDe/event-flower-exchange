import classNames from "classnames/bind";
import styles from "./checkout.module.scss";
import { assets } from "../../assets";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { ConfigProvider, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutItem from "../../components/checkout-item";
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
      {/* <div className={cx("header")}>
        <div className={cx("header-content")}>
          <img src={logo} alt="Logo" className={cx("header-logo")} />
          <button className={cx("shop-btn")}>
            <img src={""} alt="ShopIcon" className={cx("shop-icon")} />
          </button>
        </div>
      </div> */}
      <div className={cx("container")}>
        <div className={cx("content")}>
          <div className={cx("content-input")}>
            {/* <img
              src={assets.fieldPicture}
              alt="Field"
              className={cx("field-picture")}
            /> */}
            <div className={cx("checkout-back")}>
              {/* <ArrowLeftOutlined style={{ fontSize: 25, cursor: "pointer" }} /> */}
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
              <Form onFinish={() => handleCheckout(paymentRadio)}>
                <div className={cx("checkout-input")}>
                  <div className={cx("checkout-contact")}>
                    <h1>Contact</h1>
                    <div className={cx("checkout-contact-name")}>
                      <Form.Item
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                      >
                        <Input placeholder="First Name" size="large" style={{ width: 335 }} />
                      </Form.Item>
                      <Form.Item
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                      >
                        <Input placeholder="Last Name" size="large" style={{ width: 335 }} />
                      </Form.Item>
                    </div>

                    <Form.Item
                      name="phone"
                      rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                      <Input placeholder="Phone Number" size="large" />
                    </Form.Item>
                  </div>

                  <div className={cx("checkout-delivery")}>
                    <h1>Address</h1>
                    <div className={cx("checkout-delivery_address")}>
                      <Form.Item
                        name="province"
                        rules={[{ required: true, message: 'Please select a province!' }]}
                      >
                        <Select
                          placeholder="Select Province"
                          size="default"
                          style={{ width: 680 }}
                          onChange={handleProvince}
                          options={provinceList.map((data) => ({
                            value: data.province_id,
                            label: data.province_name,
                          }))}
                        />
                      </Form.Item>
                      <Form.Item
                        name="district"
                        rules={[{ required: true, message: 'Please select a district!' }]}
                      >
                        <Select
                          placeholder="Select District"
                          size="default"
                          style={{ width: 680 }}
                          onChange={handleDistrict}
                          options={districtList.map((data) => ({
                            value: data.district_id,
                            label: data.district_name,
                          }))}
                        />
                      </Form.Item>
                      <Form.Item
                        name="ward"
                        rules={[{ required: true, message: 'Please select a ward!' }]}
                      >
                        <Select
                          placeholder="Select Ward"
                          size="default"
                          style={{ width: 680 }}
                          onChange={handleWard}
                          options={wardList.map((data) => ({
                            value: data.ward_id,
                            label: data.ward_name,
                          }))}
                        />
                      </Form.Item>
                      <Form.Item
                        name="numberAddress"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                      >
                        <Input
                          placeholder="Number Address and Street"
                          onChange={handleNumberAddress}
                          size="large"
                        />
                      </Form.Item>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className={cx("checkout-payment")}>
                    <h1>Payment</h1>
                    <p>All transactions are secure and encrypted</p>

                    {/* PayOS */}
                    <div className={cx("credit-card")}>
                      <div className={cx("choose-credit-card")}>
                        <input
                          name="paymentMethod"
                          type="radio"
                          className={cx("radio")}
                          value={"payOS"}
                          onChange={(e) => setPaymentRadio(e.target.value)}
                          checked={paymentRadio === "payOS"}
                        />
                        <label htmlFor="radio" className={cx("radioLabel")}>
                          <h4>PayOS</h4>
                        </label>
                      </div>
                    </div>

                    {/* Cash on delivery */}
                    {/* <div className={cx("cash-on-delivery")}>
                      <div className={cx("choose-cash-on-delivery")}>
                        <input
                          name="paymentMethod"
                          type="radio"
                          className={cx("radio")}
                          value={"cash"}
                          onChange={(e) => setPaymentRadio(e.target.value)}
                          checked={paymentRadio === "cash"}
                        />
                        <label htmlFor="radio" className={cx("radioLabel")}>
                          <h4>Cash on Delivery</h4>
                        </label>
                      </div>
                    </div> */}
                  </div>

                  <button className={cx("pay-now-btn")} type="submit">
                    Pay now
                  </button>
                </div>
              </Form>
            </ConfigProvider>
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
