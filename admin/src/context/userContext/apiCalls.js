import { createUserFailure, createUserStart, createUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, getUsersFailure, getUsersStart, getUsersSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "./UserActions"
import axios from 'axios'
const axiosInstance =axios.create({baseURL:process.env.REACT_APP_API_URL})

export const getUsers = async(dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axiosInstance.get("/users", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (error) {
        dispatch(getUsersFailure());
    }
}
//create
export const createUser = async(user,dispatch) => {
    dispatch(createUserStart());
    try {
        const res = await axiosInstance.post("/users",user, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            },
        });
        dispatch(createUserSuccess(res.data));
    } catch (error) {
        dispatch(createUserFailure());
    }
}
//Update
export const updateUser = async(user,dispatch) => {
    dispatch(updateUserStart());
    try {
        const res = await axiosInstance.put(`/users/${user._id}`,user, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            },
        });
        dispatch(updateUserSuccess(res.data));
    } catch (error) {
        dispatch(updateUserFailure());
    }
}
//delete
export const deleteUser = async(id,dispatch) => {
    dispatch(deleteUserStart());
    try {
        await axiosInstance.delete("/users/"+id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            },
        });
        dispatch(deleteUserSuccess(id));
    } catch (error) {
        dispatch(deleteUserFailure());
    }
}
