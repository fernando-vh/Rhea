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