import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import "./newUser.css";
import storage from '../../firebase'
import { createUser } from "../../context/userContext/apiCalls";

export default function NewUser() {
  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);
  const [notImage, setNotImage] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const { dispatch } = useContext(UserContext);
  const handleChange = (e) => {
    setUser({...user,[e.target.name]:e.target.value})
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
            setUser(prev => { return { ...prev, [item.label]: url }; })
          });
          setUploaded(prev => prev + 1);
        }
      )
    });
  }
  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      {
        file: image, label: "profilePic"
      }
    ])
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(user,dispatch)
  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
      <div className="newUserItem">
          <label>Profile Pic</label>
          <input className={`${notImage ? "notImage" : ""}`} type="file" id="img" name="profilePic" onChange={e => { if (e.target.files[0].type.startsWith("image")) { setImage(e.target.files[0]); setNotImage(false) } else {setNotImage(true)} }} />
        </div>
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john" name="username" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" name="email" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" name="password" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Give Admin privileges?</label>
          <select name="isAdmin" id="isAdmin" onChange={handleChange}>
            <option value="false">Nope</option>
            <option value="true">YEHA</option>
          </select>
        </div>
        {(notImage) ? (<button className="CantUploadButton" onClick={handleSubmit} disabled={true}>Can't Upload</button>)
                         : (uploaded===1 ? (
          
          <button className="newUserButton" onClick={handleSubmit}>Update</button>
        ) : (
            
          <button className="newUserButton" onClick={handleUpload}>Upload</button> 
                      ))}
      </form>
    </div>
  );
}
