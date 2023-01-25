import { takeLatest, call, put, takeEvery } from "redux-saga/effects";
import actionType from "./chatroom.type";
import { 
    createRoomSuccess, getAllRoomsSuccess,
    getChatHistorySuccess,
    actionFail, actionSuccess 
} from "./chatroom.actions";
import { createRoomAPI, getRoomsAPI } from "../../api/room";
import { saveMessageAPI, getChatHistoryAPI } from "../../api/chat";


function* createRoomSaga({ user, room }) {
    try {
        const data = yield call(createRoomAPI, user, room);
        yield put(createRoomSuccess(data));
    } catch(error) {
        yield put(actionFail(error));
    }
}

function* getAllRoomsSaga() {
    try {
        const rooms = yield call(getRoomsAPI) || [];
        yield put(getAllRoomsSuccess(rooms.data));
    } catch(error) {
        yield put(actionFail(error));
    }
}

function* getChatHistorySaga({ roomId }) {
    try {
        const history = yield call(getChatHistoryAPI, roomId);
        yield put(getChatHistorySuccess(history));
    } catch(error) {
        yield put(actionFail(error));
    }
}

function* saveMessageSaga({ roomId, data }) {
    try {
        yield call(saveMessageAPI, roomId, data);
        yield put(actionSuccess());
    } catch(error) {
        yield put(actionFail(error));
    }
}

// function* tcpSocketSaga() {
//     try {
//         const data = yield call()
//     } catch(error) {
//         yield put(actionFail(error));
//     }
// }

export default function* watchChatroom() {
    yield takeLatest(actionType.CREATE_NEW_ROOM, createRoomSaga);
    yield takeLatest(actionType.GET_ALL_ROOMS, getAllRoomsSaga);
    yield takeLatest(actionType.SAVE_MESSAGE, saveMessageSaga);
    yield takeLatest(actionType.GET_CHAT_HISTORY, getChatHistorySaga);
    //yield takeEvery(actionType.CONNECT_TO_TCP_SOCKET, tcpSocketSaga);
}