import { types } from "../models/types/types";

export const decodeEmotionCode = (emotionCode) => {
    const e = types.EMOTIONS;
    let res;

    switch (emotionCode) {
        case e.ALARMED.code:    res=e.ALARMED;  break;
        case e.TIRED.code:      res=e.TIRED;    break;
        case e.HAPPY.code:      res=e.HAPPY;    break;
        case e.SAD.code:        res=e.SAD;      break;
    
        default:    res={error:'error'}; break;
    }

    return res;
}