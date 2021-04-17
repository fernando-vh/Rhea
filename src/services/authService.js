import { createAxiosRequest } from "../helpers/createAxiosRequest";

export const loginRequest = (payload) => {
    return createAxiosRequest(
        {
            method: "post",
            url: process.env.REACT_APP_KRONOS_API_BASE_URL+'/api/auth/login',
            headers:{'Content-Type':'application/json'},
            data: payload
        }
    )
}

export const registerRequest = (payload) => {
    return createAxiosRequest(
        {
            method: "post",
            url: process.env.REACT_APP_KRONOS_API_BASE_URL+'/api/auth/signin',
            headers:{'Content-Type':'application/json'},
            data: payload
        }
    )
}

export const tokenValidationRequest = (token) => {
    return createAxiosRequest(
        {
            method: "post",
            url: process.env.REACT_APP_KRONOS_API_BASE_URL+'/api/auth/validateToken',
            headers: { Authorization: `Bearer ${token}`}
        }
    )
}