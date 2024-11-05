import React from "react";
import "./index.scss";
import { Checkbox, Col, Form, Input, Row } from "antd";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { googleProvider } from "../../config/firebase";

function RegisterPage() {
  const handleLoginGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="register">
      <div className="register_form">
        <h1>Sign up</h1>

        <Form>
          <Row gutter={15}> 
            {/* Gutter = gap */}
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
            <Input placeholder="Email Address" />
          </Form.Item>

          <Form.Item>
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Form.Item>
            <Input placeholder="Confirm Password" type="password" />
          </Form.Item>

          <Checkbox>I agree with Term and Privacy Policy</Checkbox>

          <p>or sign up with</p>

          <div className="login_button">
            <button>Create an account</button>
            <button className="guguru" onClick={handleLoginGoogle}>
              <img
                src="https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK"
                alt=""
                width={25}
              />
              Guguru
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;
