import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
} from "antd";
import Password from "antd/es/input/Password";
import axios from "axios";
import React, { useState } from "react";
import "./index.scss";

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState(new Date());
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleSignUpGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
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

  const handleRegister = async () => {
    try {
      const formRegister = new FormData();
      formRegister.append("FullName", fullName);
      formRegister.append("Username", username);
      formRegister.append("Email", email);
      formRegister.append("Password", password);
      formRegister.append("Phone", phone);
      formRegister.append(
        "Birthday",
        birthday.format("YYYY-MM-DD") ? birthday.format("YYYY-MM-DD") : ""
      );
      formRegister.append("Gender", gender == "Male" ? 0 : 1);
      formRegister.append("Address", address);
      formRegister.append("Status", 0);

      console.log("FullName", fullName);
      console.log("Username", username);
      console.log("Email", email);
      console.log("Password", password);
      console.log("Phone", phone);
      console.log("Birthday", birthday.format("YYYY-MM-DD").toString());
      console.log("Gender", gender.trim() == "Male" ? 0 : 1);
      console.log("Address", address);
      console.log("Status", 0);

      console.log(formRegister);

      const response = await axios.post(
        "https://localhost:7026/api/account/register",
        formRegister,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.errors, "qwet");
      message.success("Registation completed");
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setError("Bad request. Please check your input.");
            break;
          case 500:
            setError("Server error. Please try again later.");
            break;
          default:
            setError("An error occurred. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  return (
    <div className="register">
      <div className="register_form">
        <h1>Sign up</h1>
        {error && <div className="error-message">{error}</div>}
        <Form onFinish={handleRegister}>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="FullName">
                <Input
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Username">
                <Input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="Email">
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="Password">
            <Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="ConfirmPassword">
            <Password
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="Phone">
            <Input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="Birthday">
            <DatePicker
              placeholder="Birthday"
              value={birthday}
              onChange={(date) => setBirthday(date)}
              format="YYYY-MM-DD"
            />
          </Form.Item>

          <Form.Item name="Gender">
            <Select
              placeholder="Gender"
              value={gender}
              onChange={(value) => setGender(value)}
            >
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="Address">
            <Input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Item>

          <Checkbox>I agree with Term and Privacy Policy</Checkbox>

          <div className="register_button">
            <button type="submit">Create an account</button>
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
