import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { login } from '../../context/authContext/apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import './login.css'
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isFetching, dispatch } = useContext(AuthContext);
    
    const handleLogin = (e) => {
        e.preventDefault();
        login({ email, password }, dispatch);
    };
  return (
      <div className='login'>
          <form className='loginForm'>
              <input type="email" placeholder='email' className="loginInput" onChange={(e)=>setEmail(e.target.value)} required/>
              <input type="password" placeholder='password' className="loginInput" onChange={(e)=>setPassword(e.target.value)} required />
              <button className="loginButton" onClick={handleLogin} disabled={isFetching}>LOGIN</button>
          </form>
    </div>
  )
}

export default Login