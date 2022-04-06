import { CLEAR_ERRORS } from "../constants/productConstants";
import axios from "axios";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
} from "../constants/userConstants";

const baseUrl = "http://localhost:3000";

//login user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "api/v1/user/login",
      { email, password },
      config
    );
    console.log(data);
    if (data.success) dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    else dispatch({ type: LOGIN_FAIL, payload: data.message });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      "api/v1/user/createUser",
      userData,
      config
    );
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios.get("/api/v1/user/me");
    if (data.success) {
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } else dispatch({ type: LOAD_USER_FAIL, payload: data.message });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

//logout user
export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/user/logout");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

//update user
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    //content-type is this because we sending images
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put(
      "/api/v1/user/me/updateProfile",
      userData,
      config
    );
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//update password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/v1/user/password/forgot",
      passwords,
      config
    );
    if (data.success) {
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } else dispatch({ type: UPDATE_PASSWORD_FAIL, payload: data.message });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//forgotpassword
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `${baseUrl}/api/v1/user/password/forgot`,
      email,
      config
    );
    console.log(data);
    if (data.success) {
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } else dispatch({ type: FORGOT_PASSWORD_FAIL, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
