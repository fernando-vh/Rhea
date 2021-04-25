import { createAxiosRequest } from '../helpers/createAxiosRequest';

export const getBySearchTermRequest = (component, term, query) => {
    return createAxiosRequest(
        {
            method:'get',
            url: process.env.REACT_APP_KRONOS_API_BASE_URL+`/api/search/${component}/${term}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            params: query
        }
    )
}