import { createAxiosRequest } from '../helpers/createAxiosRequest';

export const getUserByIdRequest = (uid) => {
    return createAxiosRequest(
        {
            method: 'get',
            url: process.env.REACT_APP_KRONOS_API_BASE_URL+`/api/users/${uid}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
}

export const updateUserPasswordRequest = (payload, uid) => {
    return createAxiosRequest(
        {
            method: 'put',
            url: process.env.REACT_APP_KRONOS_API_BASE_URL+`/api/users/${uid}/password`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: payload
        }
    )
}

export const updateUserBasicInfoRequest = (payload, uid) => {
    return createAxiosRequest(
        {
            method: 'put',
            url: process.env.REACT_APP_KRONOS_API_BASE_URL+`/api/users/${uid}/basic`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: payload
        }
    )
}

export const deleteUserRequest = (uid) => {
    return createAxiosRequest(
        {
            method: 'delete',
            url: process.env.REACT_APP_KRONOS_API_BASE_URL+`/api/users/${uid}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
}