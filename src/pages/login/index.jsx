import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth'
import { Checkbox, Form, Input } from 'antd'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authApi from '../../apis/auth.api'
import { googleProvider } from '../../configs/firebase'
import { SellerContext } from '../../contexts/seller.context.jsx'
import { login } from '../../redux/features/userSlice'
import './index.scss'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [credentials, setCredentials] = useState({email:"", password:""});
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(SellerContext)
  const [error, setError] = useState(null)

  const handleLogin = async () => {
    const formLogin = new FormData()
    formLogin.append('Email', email)
    formLogin.append('Password', password)
    try {
      await authApi.loginAccount(formLogin)
      const response = await authApi.getProfile()
      dispatch(login(response.data.profile))
      setIsAuthenticated(true)
      navigate('/')
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setError('Invalid email or password.')
            break
          case 500:
            setError('Server error. Please try again later.')
            break
          default:
            setError('An error occurred. Please try again.')
        }
      } else {
        setError('Network error. Please check your connection.')
      }
    }
  }
  // const { setIsAuthenticated } = useContext(SellerContext)
  // setIsAuthenticated(true)
  const handleLoginGoogle = () => {
    const auth = getAuth()
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        console.log(user)

        console.log('test something')
        // IdP data available using getAdditionalUserInfo(result)
        //
        axios
          .post('/api/account/signin-google', { token })
          .then((response) => {
            // Handle successful sign-in response
            console.log(response)
            navigate('/home')
          })
          .catch((error) => {
            // Handle errors
            console.error(error)
          })
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  }

  const handleEmail = (e) => {
    e.preventDefault()

    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    e.preventDefault()
    setPassword(e.target.value)
  }

  return (
    <div className='login'>
      <div className='login_form'>
        <h1>Login</h1>

        <Form onFinish={handleLogin}>
          <Form.Item name='Email'>
            <Input placeholder='Email' value={email} onChange={handleEmail} />
          </Form.Item>

          <Form.Item name='Password'>
            <Input placeholder='Password' type='password' value={password} onChange={handlePassword} />
          </Form.Item>

          <div className='login_option'>
            <Checkbox>Remember me</Checkbox>
            <a href='blank'>Forget passowrd</a>
            <p>
              New to us? <Link to={'/register'}>Click here</Link>
            </p>
          </div>

          <div className='login_button'>
            <button onClick={handleLogin}>Login</button>
            <button className='guguru' onClick={handleLoginGoogle}>
              <img
                src='https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK'
                alt=''
                width={25}
              />
              Guguru
            </button>
          </div>

          {error && <div style={{ color: 'red' }}>{error}</div>}
        </Form>
      </div>
    </div>
  )
}

export default LoginPage
