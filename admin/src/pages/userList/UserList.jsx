import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { deleteUser, getUsers } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";
import PP from "../../assets/PP.png"

export default function UserList() {
  const { users, dispatch } = useContext(UserContext);
  console.log(users)
  useEffect(() => {
    getUsers(dispatch)
  },[dispatch])
  const handleDelete = (id) => {
    deleteUser(id,dispatch)
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 120 },
    {
      field: "user",
      headerName: "User",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.profilePic===""?PP:params.row.profilePic} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 550 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname:"/users/" + params.row._id}} state={params.row}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        getRowId={r => r._id}
      />
        <Link to="/newuser">
          <button className="newUserAddButton">Add a New User</button>
        </Link>
    </div>
  );
}