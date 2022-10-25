import './register.scss'
import Logo from '../../assets/Logo.png'
import { useState } from 'react'
import { useRef } from 'react'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function Register() {
    const axiosInstance =axios.create({baseURL:process.env.REACT_APP_API_URL})
    const [email, setEmail] = useState("")
    const [password,setPassword]=useState("")
    const [username,setUsername]=useState("")
    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();
    const navigate = useNavigate();
    const handleStart = () => {
        setEmail(emailRef.current.value)
    }
    const handleFinish = async (e) => {
        e.preventDefault();
        setPassword(passwordRef.current.value);
        setUsername(usernameRef.current.value);
        try {
            await axiosInstance.post("auth/register", { email, username, password })
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }
    const handleLogin = () => {
        navigate("/login")
    }
  return (
      <div className='register'>
          <div className="top">
              <div className="wrapper">
                  
              <img className='logo' src={Logo} alt="Logo" />
              <button className="loginButton" onClick={handleLogin}>
                  Sign In
              </button>
              </div>
          </div>
          <div className="container">
              <h1>Don't Have an Account? Register NOW!</h1>
              {
                  !email ?(              <div className="input">
                  <input type="email" placeholder='Your Email Address' ref={emailRef} />
                  <button className="registerButton" onClick={handleStart}>
                      Get Started
                  </button>
                  </div>):(
                      <div className="input">
                  <input type="username" placeholder='Your Username ' ref={usernameRef} />
                  <input type="password" placeholder='Your Password ' ref={passwordRef} />
                  <button className="registerButton" onClick={handleFinish}>
                      Make an account
                  </button>
              </div>
              )
              }

          </div>
    </div>
  )
}

export default Register