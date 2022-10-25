import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState,useEffect } from "react";
import axios from 'axios'
export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);
  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("/users?new=true", {
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDQ5M2IxZjczYWU4MWFiNDU1MDc0MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NTc4NjAwNCwiZXhwIjoxNjY1ODcyNDA0fQ.Hl1mvK-QfZezs81GaigLRXLMg-l4k8W5L9W2Y_XL4fA"
          },
        });
        setNewUsers(res.data)
      } catch (error) {
        console.log(error)
      }
    };
    getNewUsers();
  }, [])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
          <img
            src={user.profilePic||"https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg"}
            alt="Profile"
            className="widgetSmImg"
            />
          <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
          ))}
      </ul>
    </div>
  );
}
