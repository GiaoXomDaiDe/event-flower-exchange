import React from "react";
import "./index.scss";
import { Col, Form, Input, Row } from "antd";

function Checkout() {
  return (
    <div className="checkout">
      <div className="checkout__left">
        <h3>Check out</h3>
        <Form
          labelCol={{
            span: 24,
          }}
        >
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item>
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item>
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item name="" label="Address">
            <Input placeholder="Your Address" />
          </Form.Item>
        </Form>
      </div>
      <div className="checkout__right"></div>
    </div>
  );
}

export default Checkout;