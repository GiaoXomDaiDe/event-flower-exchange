import classNames from "classnames/bind";
import styles from "./checkout.module.scss";
import { assets } from "../../assets";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { ConfigProvider, Input, Select } from "antd";

const cx = classNames.bind(styles);

function CheckOut() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
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

            {/* <ConfigProvider
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
            > */}
              <div className={cx("checkout-input")}>
                <div className={cx("checkout-contact")}>
                  <h1>Contact</h1>
                  <div className={cx("checkout-contact-name")}>
                    {/* <Input
                      placeholder="First Name"
                      size="large"
                      style={{ width: 335 }}
                    /> */}
                    {/* <Input
                      placeholder="Last Name"
                      size="large"
                      style={{ width: 335 }}
                    /> */}
                  </div>

                  {/* <Input placeholder="Email" size="large" type="email" /> */}
                  {/* <Input placeholder="Phone Number" size="large" /> */}
                </div>

                <div className={cx("checkout-delivery")}>
                  <h1>Delivery</h1>
                  <Input placeholder="Check Address" size="large" />
                  <h4>Shipping method</h4>
                  <Select
                    defaultValue="0"
                    size="default"
                    // disabled
                    style={{
                      width: 680,
                      backgroundColor: "#b4b4b4",
                    }}
                    onChange={handleChange}
                    options={[
                      {
                        value: "0",
                        label: "-- Select--",
                      },
                      {
                        value: "1",
                        label: "Lucy",
                      },
                      {
                        value: "2",
                        label: "yiminghe",
                      },
                    ]}
                  />
                </div>

                {/* Payment */}
                <div className={cx("checkout-payment")}>
                  <h1>Payment</h1>
                  <p>All transactions are secure and encrypted</p>

                  {/* Cash on Credit Card */}
                  <div className={cx("credit-card")}>
                    <div className={cx("choose-credit-card")}>
                      <input name="paymentMethod" type="radio" className={cx("radio")} />
                      <label htmlFor="radio" className={cx("radioLabel")}>
                        {" "}
                        <h4>PayOS</h4>
                      </label>
                    </div>

                    <div className={cx("cards-display")}>
                      <img src={assets.mastercard} alt="mastercard" />
                      <img src={assets.visa} alt="visa" />
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
                    <input name="paymentMethod" type="radio" className={cx("radio")} />
                    <label htmlFor="radio" className={cx("radioLabel")}>
                      {" "}
                      <h4>Cash on Delivery</h4>
                    </label>
                  </div>
                </div>
              </div>
            {/* </ConfigProvider> */}
            <button className={cx("pay-now-btn")}>Pay now</button>
          </div>
        </div>
        <div className={cx("payments")}>
          <div className={cx("products-display")}>
            <h1>Products</h1>
          </div>

          <div className="checkout_products">
            
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
