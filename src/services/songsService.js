import { createAxiosRequest } from '../helpers/createAxiosRequest';

export const getSongsRequest = (query) => {
    return createAxiosRequest(
        {
            method:'get',
            url: process.env.REACT_APP_KRONOS_API_BASE_URL+`/api/songs`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            params: query
        }
    )
}

export const getSongById = (id) => {
    return createAxiosRequest(
        {
            method:'get',
            url: process.env.REACT_APP_KRONOS_API_BASE_URL+`/api/songs/${id}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
}

export const updateSongRequest = (payload, id) => {
    return createAxiosRequest(
        {
            method:'put',
            url: process.env.REACT_APP_KRONOS_API_BASE_URL+`/api/songs/${id}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: payload
        }
    )
}