// import React, { useState } from "react";
// import "./index.scss";
// import { Checkbox, Col, DatePicker, Form, Input, Row, Select } from "antd";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { googleProvider } from "../../config/firebase";
// import { getFirestore } from "firebase/firestore";
// import axios from "axios";

// function RegisterPage() {
//   const [fullName, setFullName] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [birthday, setBirthday] = useState("");
//   const [gender, setGender] = useState("");
//   const [address, setAddress] = useState("");
//   const [error, setError] = useState(null);

//   const handleSignUpGoogle = () => {
//     const auth = getAuth();
//     signInWithPopup(auth, googleProvider)
//       .then((result) => {
//         if (result.user) {
//           console.log("User  is already signed in");
//         } else {
//           // **Create a new user account**
//           const user = result.user;
//           const credential = GoogleAuthProvider.credentialFromResult(result);
//           const token = credential.accessToken;
//           const userData = {
//             uid: user.uid,
//             name: user.displayName,
//             email: user.email,
//             photoURL: user.photoURL,
//           };
//           const db = getFirestore();
//           db.collection("users")
//             .doc(user.uid)
//             .set(userData)
//             .then(() => {
//               console.log("User  account created successfully");
//             })
//             .catch((error) => {
//               console.error("Error creating user account:", error);
//             });
//         }
//       })
//       .catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // ...
//       });
//   };

//   const handleRegister = async (values) => {
//     if (values.password !== values.confirmPassword) {
//       setError("Password do not match! ");
//       return;
//     }
//     try {
//       const response = await axios.post(
//         "http://localhost:7026/api/account/register",
//         {
//           fullName: values.FullName,
//           username: values.Username,
//           email: values.email,
//           password: values.password,
//           phone: values.Phone,
//           birthday: values.Birthday,
//           gender: values.Gender,
//           address: values.Address,
//         }
//       );
//       console.log(response);
//     } catch (error) {
//       if (error.response) {
//         switch (error.response.status) {
//           case 400:
//             setError("Bad request. Please check your input.");
//             break;
//           case 500:
//             setError("Server error. Please try again later.");
//             break;
//           default:
//             setError("An error occurred. Please try again.");
//         }
//       } else {
//         setError("Network error. Please check your connection.");
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     switch (e.target.name) {
//       case "fullName":
//         setFullName(e.target.value);
//         break;
//       case "username":
//         setUsername(e.target.value);
//         break;
//       case "email":
//         setEmail(e.target.value);
//         break;
//       case "password":
//         setPassword(e.target.value);
//         break;
//       case "confirmPassword":
//         setConfirmPassword(e.target.value);
//         break;
//       case "Phone":
//         setPhone(e.target.value);
//         break;
//       case "Birthday":
//         setBirthday(e.target.value);
//         break;
//       case "Gender":
//         setGender(e.target.value);
//         break;
//       case "Address":
//         setAddress(e.target.value);
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div className="register">
//       <div className="register_form">
//         <h1>Sign up</h1>
//         <Form onFinish={handleRegister}>
//           <Row gutter={12}>
//             <Col span={12}>
//               <Form.Item name="fullName" label="Fullname">
//                 <Input
//                   placeholder="Fullname"
//                   value={fullName}
//                   onChange={handleInputChange}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item name="username" label="Username">
//                 <Input
//                   placeholder="Username"
//                   value={username}
//                   onChange={handleInputChange}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Form.Item name="email" label="Email">
//             <Input
//               placeholder="Email Address"
//               value={email}
//               onChange={handleInputChange}
//             />
//           </Form.Item>

//           <Form.Item name="password" label="Password">
//             <Input.Password
//               placeholder="Password"
//               value={password}
//               onChange={handleInputChange}
//             />
//           </Form.Item>

//           <Form.Item name="confirmPassword" label="Confirm Password">
//             <Input.Password
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={handleInputChange}
//             />
//           </Form.Item>

//           <Form.Item name="Phone" label="Phone">
//             <Input
//               placeholder="Phone Number"
//               value={phone}
//               onChange={handleInputChange}
//             />
//           </Form.Item>

//           <Form.Item name="Birthday" label="Birthday">
//             <DatePicker
//               placeholder="Birthday"
//               value={birthday}
//               onChange={(date, dateString) => setBirthday(dateString)}
//             />
//           </Form.Item>

//           <Form.Item name="Gender" label="Gender">
//             <Select
//               placeholder="Gender"
//               value={gender}
//               onChange={(value) => setGender(value)}
//             >
//               <Select.Option value="Male">Male</Select.Option>
//               <Select.Option value="Female">Female</Select.Option>
//               <Select.Option value="Other">Other</Select.Option>
//             </Select>
//           </Form.Item>

//           <Form.Item name="Address" label="Address">
//             <Input
//               placeholder="Address"
//               value={address}
//               onChange={handleInputChange}
//             />
//           </Form.Item>

//           <Checkbox>I agree with Term and Privacy Policy</Checkbox>

//           <div className="register_button">
//             <button type ="submit">Create an account</button>
//             <p>or sign up with</p>
//             <button className="guguru" onClick={handleSignUpGoogle}>
//               <img
//                 src="https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK"
//                 alt=""
//                 width={25}
//               />
//               Guguru
//             </button>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default RegisterPage;
