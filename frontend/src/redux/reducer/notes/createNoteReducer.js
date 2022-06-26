import {
  CREATE_NOTE_REQUEST,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAIL,
} from "../../action/actionTypes";

const createNoteReducer = (state = "", action) => {
  switch (action.type) {
    case CREATE_NOTE_REQUEST:
      return {
        loading: true,
      };
    case CREATE_NOTE_SUCCESS:
      return {
        noteData: action.payload,
      };
    case CREATE_NOTE_FAIL:
      return {
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
};

export { createNoteReducer };
