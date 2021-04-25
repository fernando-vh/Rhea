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
        -search page
        -visualizing page for users and songs?
    
    fix:
        -Fix the auto resizing in home page (long title)
        -fix token expiration
        -load image from project, not from endpoints
        -npm audit fix
    
    implement:
        -Set up public routes restrictions, when logged you can't access login page
        -Implement delete button, with confirmation, in dashboard page
        -Add name and logout option in navbar
        -implement facebook and google login


    Pulish animations
    Make a fancy loading page (when token read)
*/