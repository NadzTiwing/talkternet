import actionType from "./chatroom.type";

// FETCHING AND CREATING CHATROOM
export const createNewRoom = (user, room) => ({
    type: actionType.CREATE_NEW_ROOM,
    user,
    room
});

export const createRoomSuccess = (data) => ({
    type: actionType.CREATE_ROOM_SUCCESS,
    payload: data
});

export const enterRoom = (user, room, roomId) => ({
    type: actionType.ENTER_ROOM,
    user,
    room,
    roomId
});

export const getAllRooms = () => ({
    type: actionType.GET_ALL_ROOMS
});

export const getAllRoomsSuccess = (data) => ({
    type: actionType.GET_ALL_ROOMS_SUCCESS,
    data
});

// TCP SOCKET CONNECTION
export const connectToTcpSocket = () => ({
    type: actionType.CONNECT_TO_TCP_SOCKET
});

export const disconnectToTcpSocket = () => ({
    type: actionType.DISCONNECT_TO_TCP_SOCKET
});

export const socketConnectionSuccess = () => ({
    type: actionType.CONNECT_TO_TCP_SOCKET_SUCCESS
});

// SAVING ANG GETTING CHAT DATA
export const saveMessage = (roomId, data) => ({
    type: actionType.SAVE_MESSAGE,
    roomId,
    data
});

export const getChatHistory = (room) => ({
    type: actionType.GET_CHAT_HISTORY,
    room
});

export const getChatHistorySuccess = (data) => ({
    type: actionType.GET_CHAT_HISTORY_SUCCESS,
    data
});

// THROWING ERROR OR RETURNING SUCCESS RESPONSE
export const actionSuccess = () => ({
    type: actionType.ACTION_SUCCESS
})

export const actionFail = (error) => ({
    type: actionType.ACTION_FAIL,
    payload: error
});
