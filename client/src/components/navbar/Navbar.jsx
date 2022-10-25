import './navbar.scss'
import { ArrowDropDown, ExitToAppRounded} from '@material-ui/icons';
import { useContext, useState } from 'react';
import Logo from '../../assets/Logo.png'
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from '../../authContext/AuthContext';
import PP from '../../assets/PP.png'
import { logout } from '../../authContext/apiCalls';
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext)
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null);
  }
  const handleLogout = () => {
    localStorage.clear()
    logout(dispatch)
    navigate("/login")
  }
  return (
    <div className={isScrolled?"navbar scrolled":"navbar"}>
      <div className="container">
        <div className="left">
          <img src={Logo} alt="Logo" />
          <Link to="/"  className='link'>
            <span>Homepage</span>
          </Link>
          <Link to="/series" className='link'>
            <span className='navbarMainLink'>Series</span>
            </Link>
            <Link to="/movies" className='link'>
              <span className='navbarMainLink'>Movies</span>
              </Link>
              <Link to="/new" className='link'>
            <span>What's new</span>
            </Link>
            <Link to="/new" className='link'>
            <span>My List</span>
            </Link>
        </div>
        <div className="right">
          <span>{user.username}</span>
          <img src={user.profilePic===""?PP:user.profilePic} alt="profilepic" />
          <div className="profile">
            <ArrowDropDown className='icon' />
            <div className="options">
              <span className="topbarLogout" onClick={handleLogout}>Logout<ExitToAppRounded />
              </span>
            </div>
          </div>          
        </div>
      </div>
    </div>
  )
}

export default Navbar