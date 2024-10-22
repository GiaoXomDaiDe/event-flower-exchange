import React from "react";
import "./index.scss";

function Benefits() {
  return (
    <div className="benefits">
      <div className="benefits_title">
        <div className="line"></div>
        <h3>
          <i className="fa fa-check"></i>Mua hàng tại hehe.com
        </h3>
        <div className="line"></div>
      </div>

      <div className="benefits_detail">
        <div className="item">
          <img src="https://flowershop.com.vn/wp-content/uploads/2023/08/incon-mien-phi-giao-hoa2-2.png"
          alt="" /> 
          <h3>MIỄN PHÍ GIAO HOA</h3>
          <h4>NỘI THÀNH CÁC TỈNH</h4>
        </div>

        <div className="item">
          <img src="https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_200/https://flowershop.com.vn/wp-content/uploads/2023/08/0-rui-ro-mua-hoa-online-1-1.png"
          alt="" /> 
          <h3>% RỦI RO KHI</h3>
          <h4>MUA HOA ONLINE</h4>
        </div>

        <div className="item">
          <img src="https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_200/https://flowershop.com.vn/wp-content/uploads/2023/08/gui-hinh-anh-truoc-khi-giao-hoa-1.png"
          alt="" /> 
          <h3>GỬI HÌNH ẢNH</h3>
          <h4>TRƯỚC & SAU GIAO </h4>
        </div>

        <div className="item">
          <img src="https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_200/https://flowershop.com.vn/wp-content/uploads/2023/08/100-hoa-tuoi-moi-1.png"
          alt="" /> 
          <h3>HOA LUÔN TƯƠI ĐẸP</h3>
          <h4>HOA MỚI MỖI NGÀY</h4>
        </div>

      </div>
    </div>
  );
}

export default Benefits;
