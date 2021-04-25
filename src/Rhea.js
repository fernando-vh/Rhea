import {Provider} from 'react-redux';
import { AppRouter } from './routers/AppRouter';
import {store} from './store/store';
import {NotificationContainer} from 'react-notifications';

require('dotenv').config();

const Rhea = () => {
    return(
        <Provider store={store}>
            <AppRouter />
            <NotificationContainer/>
        </Provider>
    )
}

export default Rhea;

/* TODOS:
    add:
        -user edit page
        -404 for user/song not found id
    
    fix:
        -fix token expiration
        -npm audit fix
        -fix that anoying paging movement
    
    implement:
        -Set up public routes restrictions, when logged you can't access login page
        -Implement delete button, with confirmation, in dashboard page
        -Add name and logout option in navbar
        -implement facebook and google login


    Make a fancy loading page (when token read)?
*/