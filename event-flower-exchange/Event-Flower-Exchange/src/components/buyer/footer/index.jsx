import React from "react";
import "./index.css";
import flowerImg from "./../../assets/footer-flower.png";
import butterflyImg from "./../../assets/butterfly.png";
import footerImg from "./../../assets/footer-bgr.png";
import espoir from "./../../assets/Espoir.png";

function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="footer-bg">
          <img src={footerImg} alt="" />
        </div>
        <div className="footer-info">
          <div className="footer_logo">
            <img src={espoir} alt="" />
            {/* <span className="">Espoir</span> */}
          </div>
          <div className="policy">
            <ul>
              <li className="policy_title">Products</li>
              <li>Product List</li>
              <li>Best Sellers</li>
              <li>Combo & Sets</li>
            </ul>
            <ul>
              <li className="policy_title">About Us</li>
              <li>Brand story</li>
              <li>Core value</li>
              <li>Manufactory</li>
            </ul>
            <ul>
              <li className="policy_title">Terms & Policy</li>
              <li>Security Policy</li>
              <li>Delivery Policy</li>
              <li>Usage Policy</li>
            </ul>
            <ul>
              <li className="policy_title">Contact Us</li>
              <li>Contact Infomation</li>
              <li>FAQs</li>
              <li className="contact_logo">
                <i className="bi bi-facebook"></i>
                <i className="bi bi-instagram"></i>
                <i className="bi bi-youtube"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copy-right">© 2024 Espoir. All Rights Reserved.</div>
    </div>
  );
}

export default Footer;
