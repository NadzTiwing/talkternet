import axiosConfig from "./axiosConfig";

export const saveMessageAPI = async (roomId, data) => {
    const response = await axiosConfig({
        url: `/room/${roomId}`,
        method: "GET"
    });
    const room = response.data;
    room.chat.push(data);
    return axiosConfig.patch(`/room/${roomId}`, room);
}

export const getChatHistoryAPI = (roomId) => {
    return axiosConfig({
        url: `/room/${roomId}`,
        method: "GET"
    });
}