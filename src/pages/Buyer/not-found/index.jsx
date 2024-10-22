import { Col, Row } from "antd";
import React from "react";
import "./index.scss";

function NotFound() {
  return (
    <div className="not-found-wrapper">
      <Row className="not-found">
        <Col>
          <img src="/cat-confused.png" alt="" />
        </Col>
        <Col>
          <h1>404</h1>
          <h3>Error</h3>
          <p>This page is missing</p>
        </Col>
      </Row>
    </div>
  );
}

export default NotFound;
