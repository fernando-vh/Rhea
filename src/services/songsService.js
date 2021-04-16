import { createAxiosRequest } from '../helpers/createAxiosRequest';

export const getSongsRequest = () => {
    return createAxiosRequest(
        {
            method:'get',
            url: process.env.REACT_APP_KRONOS_API_BASE_URL+`/api/songs`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
}