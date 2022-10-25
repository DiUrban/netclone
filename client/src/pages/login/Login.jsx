import './login.scss'
import Logo from '../../assets/Logo.png'
import { useContext, useState } from 'react'
import { AuthContext } from '../../authContext/AuthContext';
import {login} from '../../authContext/apiCalls'
import { useNavigate } from 'react-router-dom';
function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isFetching, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        login({ email, password }, dispatch);
        if (!isFetching) {
            navigate("/home")
        }
    };
  return (
      <div className='login'>
          <div className="top">
              <div className="wrapper">
                  
              <img className='logo' src={Logo} alt="Logo" />

              </div>
          </div>
          <div className="container">
              <form action="">
                  <h1>Sign In</h1>
                  <input type="email" placeholder='Please Enter Your Email' onChange={(e)=>setEmail(e.target.value)} required />
                  <input type="password" placeholder='Please Enter Your Password' onChange={(e)=>setPassword(e.target.value)}/>
                  <button className="loginButton" onClick={handleLogin} disabled={isFetching}>Sign In</button>
                  <span>Haven't Made An Account? <b>Sign Up Now</b></span>
                  <small>reCAPTCHA</small>
              </form>
          </div>
    </div>
  )
}

export default Login