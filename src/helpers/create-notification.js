import { NotificationManager } from "react-notifications";

export const createResponseNotification = ({status, data}) => {
    if(data){
        const title = data.msg[0].toUpperCase() + data.msg.substring(1);
        let message="";
        let error = false;
    
        switch (status) {
            case 400:
                if(data.errors){
                    let errorsToStr = "";
                    
                    data.errors.forEach((e) => {
                        errorsToStr += `-${e.msg}: ${e.param}\n`;
                    });

                    message = errorsToStr;
                }

                error = true;
                
                break;
    
            case 401:
                message="You don't have the permissions"
                error = true;
                break;
            
            case 500:
                message="Internal server error"
                error = true;
                break;
        
            default:
                message=""
                break;
        }

        if(error){
            NotificationManager.error(message, title);
        }
        else{
            NotificationManager.success(message, title);
        }
    }
}

export const createNormalNotification = (title, message, error = true) => {
    if(error){
        NotificationManager.error(message, title);
    }
    else{
        NotificationManager.success(message, title);
    }
}