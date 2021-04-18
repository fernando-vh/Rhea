import { types } from "../models/types/types";

export const changeBgImage = (screenPageClass) => {
    return (dispatch) => {
        dispatch(
            {
                type: types.ACTIONS.CHANGE_BG,
                payload: {
                    bgClassName: screenPageClass
                }
            }
        );
    }
}