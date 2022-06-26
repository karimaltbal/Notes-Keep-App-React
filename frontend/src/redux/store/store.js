import { createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"

import {userAuthReducer, userUpdateReducer} from "../reducer/users/userAuthReducer"
import {noteListReducer} from "../reducer/notes/noteListReducer"
import { createNoteReducer } from "../reducer/notes/createNoteReducer";
import { updateNoteReducer } from "../reducer/notes/updateNoteReducer";
import { deleteNoteReducer } from "../reducer/notes/deleteNoteReducer";


const reducer = combineReducers({
  userLogin: userAuthReducer,
  noteList: noteListReducer,
  createNote: createNoteReducer,
  updateNote: updateNoteReducer,
  deleteNote: deleteNoteReducer,
  userUpdate: userUpdateReducer,
});
//Get user from localstorage and save it into our store
const userAuthFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
    userLogin: { userInfo: userAuthFromStorage },
};



const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store