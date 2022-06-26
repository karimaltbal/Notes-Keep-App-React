import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../../action/actionTypes";


const userAuthReducer = (state="", action)=>{
    switch (action.type) {
      //Register
      case USER_REGISTER_REQUEST:
        return {
          loading: true,
        };
      case USER_REGISTER_SUCCESS:
        return {
          userInfo: action.data,
          successMessage: "Account successfully created",
        };
      case USER_REGISTER_FAIL:
        return {
          error: action.payload,
          loading: false,
        };

      //Login
      case USER_LOGIN_REQUEST:
        return {
          loading: true,
        };
      case USER_LOGIN_SUCCESS:
        return {
          userInfo: action.payload,
        };
      case USER_LOGIN_FAIL:
        return {
          error: action.payload,
        };

      default:
        return state;
    }
}

const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};


export { userAuthReducer, userUpdateReducer };