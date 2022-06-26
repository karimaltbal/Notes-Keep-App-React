import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../actionTypes";

import axios from "axios"

const userRegisterAction = (registerdata) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post("/api/users/register", registerdata, config);

      localStorage.setItem("userInfo", JSON.stringify(data));

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};


const userloginAction = (logindata)=>{
    return async (dispatch) => {
        try {
            dispatch({
              type: USER_LOGIN_REQUEST,
            });

            const config = { headers: { "Content-Type": "application/json" } };
            const { data } = await axios.post("/api/users/login",logindata,config);

            localStorage.setItem("userInfo", JSON.stringify(data));

            dispatch({
              type: USER_LOGIN_SUCCESS,
              payload: data,
            });
        } catch (error) {
            dispatch({
              type: USER_LOGIN_FAIL,
              payload: error.response && error.response.data.message,
            });
        }
    };
}


const logoutUserAction = () => {
  return (dispatch) => {
    try {
      localStorage.removeItem("userInfo");
      dispatch({
        type: USER_LOGOUT_SUCCESS,
      });
    } catch (error) {}
  };
};





const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const { userInfo } = getState().userLogin

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/users/profile", user, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
    });
  }
};



export { userloginAction, userRegisterAction, logoutUserAction, updateProfile };