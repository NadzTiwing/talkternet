import axiosConfig from "./axiosConfig";

export const createRoomAPI = (user, room) => {
    return axiosConfig({
        url: "/room",
        method: "POST",
        data: { room, chat: [] }
    });
}

export const getRoomsAPI = () => {
    return axiosConfig({
        url: "/room",
        method: "GET"
    });
}