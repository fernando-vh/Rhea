import { types } from "../models/types/types";

const initialState = {
    logged:false
}

export const authReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.ACTIONS.CLASSIC_LOGIN:
            return {
                logged: true,
                uid: action.payload.id,
                username: action.payload.username,
                role: action.payload.role_id
            }
        
        case types.ACTIONS.LOGOUT:
            return {
                logged:false
            }
    
        default:
            break;
    }
    return state;
}