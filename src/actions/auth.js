import { loginRequest, tokenValidationRequest } from "../services/authService";
import { createResponseNotification } from "../helpers/create-notification";
import { types } from "../models/types/types";
import { decode } from 'jsonwebtoken';

export const classicLogin = ({email, password}) => {
    return async (dispatch) => {
        const token = await login({ email, password });
        let action;

        if(token){
            localStorage.setItem('token', token);
            const user = decode(token);

            action = {
                type:types.ACTIONS.CLASSIC_LOGIN,
                payload: user           
            }
        }
        else{
            action = {
                type:types.ACTIONS.LOGOUT,
            }
        } 
    
        dispatch(action);
    }
}


/*  This is trash code, but couldn't find another way

    Receive checking state, so, when token validation is ready,
    checking is set to false so router load the correct component
*/
export const checkTokenIntegrity = (token, checking) => {
    return async (dispatch) => {
        const resp = await tokenValidationRequest(token);
        const user = resp.data.user

        let action;

        if(user){
            action = {
                type:types.ACTIONS.CLASSIC_LOGIN,
                payload: user
            }
        }
        else{
            action = {
                type:types.ACTIONS.LOGOUT,
            }
        }
    
        dispatch(action);
        checking(false);
    }
}

const login = async (loginInfo) => {
    const resp = await loginRequest(loginInfo);

    createResponseNotification(resp);

    return resp.data.token;
}