import {
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAIL,
} from "../../action/actionTypes";

const updateNoteReducer = (state = "", action) => {
  switch (action.type) {
    case UPDATE_NOTE_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_NOTE_SUCCESS:
      return {
        noteData: action.payload,
      };
    case UPDATE_NOTE_FAIL:
      return {
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
};

export { updateNoteReducer };
