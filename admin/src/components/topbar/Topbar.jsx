import React from "react";
import "./topbar.css";
import { ExitToAppRounded } from "@material-ui/icons";
import Logo from '../../assets/Logo.png'
import PP from "../../assets/PP.png"
import { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/apiCalls";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();
  const {user,dispatch}=useContext(AuthContext)
  const handleLogout = () => {
    localStorage.clear()
    logout(dispatch)
    navigate("/login")
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <img src={Logo} alt="Logo" className="logoImg"/>
        </div>
        <div className="topRight">
          <span className="topbarLogout" onClick={handleLogout}><h4>Logout</h4>
          <ExitToAppRounded />
          </span>
          <h1 className="topbarUsername">{user.username}</h1>
          <img src={user.profilePic===""?PP:user.profilePic} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
