import actionType from "./chatroom.type";

const initialState = {
    error: null,
    isLoading: false,
    isConnected: false,
    user: null,
    room: null,
    roomId: 0,
    rooms: [],
    socketError: null,
};

const chatReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.CREATE_NEW_ROOM:
            return {
                ...state,
                isLoading: true,
                user: action.user,
                room: action.room
            };
        case actionType.CREATE_ROOM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isConnected: true,
                data: action.payload.data,
                roomId: action.payload.data.id
            };
        case actionType.ENTER_ROOM:
            return {
                ...state,
                isLoading: true,
                isConnected: true,
                user: action.user,
                room: action.room,
                roomId: action.roomId
            };
        case actionType.GET_ALL_ROOMS:
            return {
                ...state,
                isLoading: true
            };
        case actionType.GET_ALL_ROOMS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                rooms: action.data
            };
        case actionType.CONNECT_TO_TCP_SOCKET_SUCCESS:
            return {
                ...state,
                isConnected: true
            };
        case actionType.DISCONNECT_TO_TCP_SOCKET:
            return {
                ...state,
                isConnected: false
            };
        // case actionType.RECEIVE_MESSAGE: 
        //     return {
        //         ...state,
        //         messages: [...state.messages, action.payload.message] 
        //     };
        case actionType.SOCKET_ERROR:
            return {
                ...state,
                socketError: action.payload.error
            };
        case actionType.SOCKET_CLOSED:
            return {
                ...state,
                isConnected: false
            };
        case actionType.SAVE_MESSAGE:
            state.rooms.map(room =>{
                if(room.id === action.roomId) room.chat.push(action.data);
                return room;
            });
            //console.log(JSON.stringify({STATE_REDUCER: state }));
            return {
                ...state,
                isLoading: true
            };
        case actionType.GET_CHAT_HISTORY_SUCCESS:
            return {
                ...state,
                chat: action.data
            };
        case actionType.ACTION_SUCCESS:
            return {
                ...state,
                isLoading: false
            };
        case actionType.ACTION_FAIL:
            return {
                ...state,
                error: action.payload.error
            };
        default:
            return { ...state };
    }
}

export default chatReducer;