import axios from "axios";
import { loginFailure, loginStart, loginSuccess,logoutStart, registerFailure, registerStart, registerSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("auth/login", user);
        dispatch(loginSuccess(res.data));    
    } catch (error) {
        dispatch(loginFailure());
    }
};
export const register = async (user, dispatch) => {
    dispatch(registerStart());
    try {
        const res = await axios.post("auth/register", user);
        dispatch(registerSuccess(res.data));    
    } catch (error) {
        dispatch(registerFailure());
    }
};
export const logout = async (dispatch) => {
    dispatch(logoutStart());
};