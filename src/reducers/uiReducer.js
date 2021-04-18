import { types } from "../models/types/types";

const initialState = {
    bgClassName:types.SCREEN_BG_CLASS.MAIN
}

export const uiReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.ACTIONS.CHANGE_BG:
            return {
                bgClassName: action.payload.bgClassName
            }
    
        default:
            break;
    }
    return state;
}