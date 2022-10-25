import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  Publish,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./user.css";
import PP from "../../assets/PP.png"
import Moment from 'moment'
import storage from '../../firebase'
import { useContext, useState } from "react";
import { updateUser } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";
export default function User() {
  const location = useLocation();
  const user = location.state;
  delete user.password
  const [changedUser, setChangedUser] = useState(user);
  const [profilePic, setProfilePic] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [notImage, setNotImage] = useState(null);
  const { dispatch } = useContext(UserContext)

  const handleChange = (e) => {
    const [section] = e.target.name.split(".");
    console.log(user)
    setChangedUser(
        {...changedUser,[section]: e.target.value} )
  }
  const upload = (items) => {
    items.forEach(item => {
      const uploadTask = storage.ref(`/items/${item.file.name}`).put(item.file);
      uploadTask.on("state_changes", snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% Finished`);
      },
        (err) => { console.log(err) }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then(url => {
            setChangedUser(prev => { return { ...prev, [item.label]: url }; })
          });
          setUploaded(prev => prev + 1);
        }
      )
    });
    setUploaded(true)
  }
  const handleUpload = (e) => {
    e.preventDefault();
    let array=[]
    profilePic && array.push({ file: profilePic, label: "profilePic" });
    upload(array)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
      updateUser(changedUser, dispatch)
      window.open(`./`,"_self")
  }
  Moment.locale('en')
  const createDate=user.createdAt
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.profilePic===""?PP:user.profilePic}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user._id}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{Moment(createDate).format('YYYY / MMM / Do')}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">is Admin: {user.isAdmin?"YEHA":"NOPEE"}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  placeholder={user.username}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder={user.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className={`${notImage ? "notImage" : ""} userUpdateUpload`}>
                <img
                  className="userUpdateImg"
                  src={user.profilePic===""?PP:user.profilePic}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} onChange={e => { if (e.target.files[0].type.startsWith("image")) { setProfilePic(e.target.files[0]); setNotImage(false) } else {setNotImage(true)} }} />
              </div>
              {(notImage) ? (<button className="CantUploadButton" onClick={handleSubmit} disabled={true}>Can't Upload</button>)
                         : (uploaded ? (
          
          <button className="userUpdateButton" onClick={handleSubmit}>Update</button>
        ) : (
            
          <button className="userUpdateButton" onClick={handleUpload}>Upload</button> 
                      ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
