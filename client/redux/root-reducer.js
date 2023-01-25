import { combineReducers } from "redux";
import chatReducer from "./chatroom/chatroom.reducer";

export default combineReducers({
    chat: chatReducer
});