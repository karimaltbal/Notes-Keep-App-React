import {
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAIL,
} from "../../action/actionTypes";

const deleteNoteReducer = (state = "", action) => {
  switch (action.type) {
    case DELETE_NOTE_REQUEST:
      return {
        loading: true,
      };
    case DELETE_NOTE_SUCCESS:
      return {
        noteData: action.payload,
      };
    case DELETE_NOTE_FAIL:
      return {
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
};

export { deleteNoteReducer };
