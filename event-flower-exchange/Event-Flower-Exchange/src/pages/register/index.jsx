import React from "react";
import "./index.scss";
import { Checkbox, Col, Form, Input, Row } from "antd";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { googleProvider } from "../../config/firebase";
import { getFirestore } from 'firebase/firestore';

function RegisterPage() {
  const handleSignUpGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // **Check if the user is already signed in**
        if (result.user) {
          console.log("User  is already signed in");
        } else {
          // **Create a new user account**
          const user = result.user;
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const userData = {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          };
          // **You can add additional user data here**
          // ...
          // **Create a new user account in your database**
          // For example, using Firebase Firestore
          const db = getFirestore();
          db.collection("users")
            .doc(user.uid)
            .set(userData)
            .then(() => {
              console.log("User  account created successfully");
            })
            .catch((error) => {
              console.error("Error creating user account:", error);
            });
        }
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

          <div className="register_button">
            <button>Create an account</button>
            <p>or sign up with</p>
            <button className="guguru" onClick={handleSignUpGoogle}>
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
