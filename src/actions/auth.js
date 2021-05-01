import { loginFacebookRequest, loginGoogleRequest, loginRequest, tokenValidationRequest } from "../services/authService";
import { createResponseNotification } from "../helpers/create-notification";
import { types } from "../models/types/types";
import { decode } from 'jsonwebtoken';

export const classicLogin = ({email, password, remember}) => {
    return async (dispatch) => {
        const token = await login({ email, password, remember }, types.LOGIN_TYPE.INTERNAL);
        let action = setLoginAction(token); 
    
        dispatch(action);
    }
}

export const facebookLogin = (accessToken) => {
    return async (dispatch) => {
        const token = await login({access_token:accessToken}, types.LOGIN_TYPE.FACEBOOK);
        let action = setLoginAction(token);
    
        dispatch(action);
    }
}

export const googleLogin = (accessToken) => {
    return async (dispatch) => {
        const token = await login({access_token:accessToken}, types.LOGIN_TYPE.GOOGLE);
        let action = setLoginAction(token);
    
        dispatch(action);
    }
}

export const logout = () => {
    return async (dispatch) => {
        localStorage.setItem('token', '');
        dispatch({type:types.ACTIONS.LOGOUT});
    }
}


/*  This is trash code, but couldn't find another way

    Receive checking state, so, when token validation is ready,
    checking is set to false so router load the correct component
*/
export const checkTokenIntegrity = (token, checking = () =>{}) => {
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

const login = async (loginInfo, logType) => {
    let resp;

    switch(logType){
        case types.LOGIN_TYPE.INTERNAL:
            resp = await loginRequest(loginInfo);
            break;

        case types.LOGIN_TYPE.GOOGLE:
            resp = await loginGoogleRequest(loginInfo);
            break;

        case types.LOGIN_TYPE.FACEBOOK:
            resp = await loginFacebookRequest(loginInfo);
            break;

        default:;
    }

    createResponseNotification(resp);

    return resp.data.token;
}

const setLoginAction = (token) => {
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

    return action;
}