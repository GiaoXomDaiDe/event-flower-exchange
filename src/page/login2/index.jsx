import React, { useState } from "react";
import "./index.scss";
import { Checkbox, Form, Input, Row } from "antd";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { googleProvider } from "../../config/firebase";
import axios from "axios";
import Password from "antd/es/input/Password";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [credentials, setCredentials] = useState({email:"", password:""});
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const handleLogin = async () => {
    const formLogin = new FormData();
    formLogin.append("Email", email);
    formLogin.append("Password", password);

    console.log(email, "email");
    console.log(password, "password");

    try {
      const response = await axios.post(
        "https://localhost:7026/api/account/login",
        formLogin,
        {
          headers: {
            "Content-Type": " multipart/form-data",
          },
        }
      );

      const { token } = response.data;

      const profile = await axios.get(
        `https://localhost:7026/api/account/view-profile?accessToken=${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(profile.data.profile);
      dispatch(login(profile.data.profile));
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setError("Invalid email or password.");
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
        //
        axios
          .post("/api/account/signin-google", { token })
          .then((response) => {
            // Handle successful sign-in response
            console.log(response);
          })
          .catch((error) => {
            // Handle errors
            console.error(error);
          });
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

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <div className="login_form">
        <h1>Login</h1>

        <Form onFinish={handleLogin}>
          <Form.Item name="Email">
            <Input placeholder="Email" value={email} onChange={handleEmail} />
          </Form.Item>

          <Form.Item name="Password">
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={handlePassword}
            />
          </Form.Item>

          <div className="login_option">
            <Checkbox>Remember me</Checkbox>
            <a href="">Forget passowrd</a>
          </div>

          <div className="login_button">
            <button onClick={handleLogin}>Login</button>
            <button className="guguru" onClick={handleLoginGoogle}>
              <img
                src="https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK"
                alt=""
                width={25}
              />
              Guguru
            </button>
          </div>

          {error && <div style={{ color: "red" }}>{error}</div>}
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
