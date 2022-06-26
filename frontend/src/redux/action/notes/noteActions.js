import axios from "axios";
import {FETCH_NOTE_REQUEST, FETCH_NOTE_SUCCESS, FETCH_NOTE_FAIL, 
        CREATE_NOTE_REQUEST, CREATE_NOTE_SUCCESS, CREATE_NOTE_FAIL, 
        UPDATE_NOTE_REQUEST, UPDATE_NOTE_SUCCESS, UPDATE_NOTE_FAIL, 
        DELETE_NOTE_REQUEST, DELETE_NOTE_SUCCESS, DELETE_NOTE_FAIL} from "../actionTypes"

const noteFatchAction = ()=>{
    return async (dispatch, getState)=>{
        try {
            dispatch({
                type: FETCH_NOTE_REQUEST,
            });

            const { userInfo } = getState().userLogin
        
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get("/api/notes/", config);

            dispatch({
                type: FETCH_NOTE_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: FETCH_NOTE_FAIL,
                payload: error.response && error.response.data.message,
            });
        }
    }
}



const noteCreateAction = (createaData)=>{
    return async (dispatch, getState)=>{
        try {
            dispatch({
                type: CREATE_NOTE_REQUEST,
            });

            const { userInfo } = getState().userLogin;

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.post("/api/notes/", createaData, config);

            dispatch({
                type: CREATE_NOTE_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: CREATE_NOTE_FAIL,
                payload: error.response && error.response.data.message,
            });
        }
    }
}


const noteUpdataAction = ( noteID, updataData)=>{
    return async (dispatch, getState)=>{
        try {
            dispatch({
                type: UPDATE_NOTE_REQUEST,
            });

            const { userInfo } = getState().userLogin;

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put(`/api/notes/${noteID}`, updataData, config);
        
            dispatch({
                type: UPDATE_NOTE_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: UPDATE_NOTE_FAIL,
                payload: error.response && error.response.data.message,
            });
        }
    }
}



const noteDeleteAction = (noteID)=>{
    return async (dispatch, getState)=>{
        try {
            dispatch({
                type: DELETE_NOTE_REQUEST,
            });

            const { userInfo } = getState().userLogin;

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.delete(`/api/notes/${noteID}`, config);
        
            dispatch({
                type: DELETE_NOTE_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: DELETE_NOTE_FAIL,
                payload: error.response && error.response.data.message,
            });
        }
    }
}
export { noteFatchAction, noteCreateAction, noteUpdataAction, noteDeleteAction };