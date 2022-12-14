import { getListsFailure, getListsStart, getListsSuccess,deleteListStart,deleteListSuccess,deleteListFailure,createListStart,createListSuccess,createListFailure,updateListStart,updateListSuccess,updateListFailure} from "./ListActions"
import axios from 'axios'
const axiosInstance =axios.create({baseURL:process.env.REACT_APP_API_URL})

export const getLists = async(dispatch) => {
    dispatch(getListsStart());
    try {
        const res = await axiosInstance.get("/lists", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            },
        });
        dispatch(getListsSuccess(res.data));
    } catch (error) {
        dispatch(getListsFailure());
    }
}
//create
export const createList = async(list,dispatch) => {
    dispatch(createListStart());
    try {
        const res = await axiosInstance.post("/lists/",list, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            },
        });
        dispatch(createListSuccess(res.data));
    } catch (error) {
        dispatch(createListFailure());
    }
}
//Update
export const updateList = async(list,dispatch) => {
    dispatch(updateListStart());
    try {
        const res = await axiosInstance.put(`/lists/${list._id}`,list, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            },
        });
        dispatch(updateListSuccess(res.data));
    } catch (error) {
        dispatch(updateListFailure());
    }
}
//delete
export const deleteList = async(id,dispatch) => {
    dispatch(deleteListStart());
    try {
        await axiosInstance.delete("/lists/"+id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            },
        });
        dispatch(deleteListSuccess(id));
    } catch (error) {
        dispatch(deleteListFailure());
    }
}
