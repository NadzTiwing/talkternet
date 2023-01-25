import { all, fork } from "redux-saga/effects";
import watchChatroom from "./chatroom/chatroom.saga";

export default function* rootSaga() {
    yield all([
        fork(watchChatroom)
    ]);
}