import axios from 'axios';

export const createAxiosRequest = (config) => {
    return axios(config)
        .then((res) => ({
            data: res.data,
            status: res.status
        }))
        .catch((err) => ({
            data: err.response.data,
            status: err.response.status
        }));
}