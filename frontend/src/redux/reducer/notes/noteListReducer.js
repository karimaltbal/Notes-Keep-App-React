import {FETCH_NOTE_REQUEST, FETCH_NOTE_SUCCESS, FETCH_NOTE_FAIL} from "../../action/actionTypes"


const noteListReducer = (state="", action)=>{
    switch(action.type){
        case FETCH_NOTE_REQUEST:
            return {
                loading: true
            }
        case FETCH_NOTE_SUCCESS:
            return{
                noteData: action.payload
                
            }
        case FETCH_NOTE_FAIL:
            return{
                loading: false,
                error: action.message
            }
        default:
            return state
    }
}

export {noteListReducer};