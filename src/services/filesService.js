import { createAxiosRequest } from "../helpers/createAxiosRequest";

export const getProfileImagePath = (uid) => {
    return process.env.REACT_APP_KRONOS_API_BASE_URL+`/api/uploads/${uid}/image`;
}

export const getSongPath = (id) => {
    return `${process.env.REACT_APP_KRONOS_API_BASE_URL}/api/uploads/songs/${id}`
}

export const createNewSong = async (payload) => {
    return await createAxiosRequest({
        method:'post',
        url: process.env.REACT_APP_KRONOS_API_BASE_URL+`/api/uploads/songs`,
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: payload
    })
}

export const deleteSong = async (id) => {
    return await createAxiosRequest({
        method:'delete',
        url: process.env.REACT_APP_KRONOS_API_BASE_URL+`/api/uploads/songs/${id}`,
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
}