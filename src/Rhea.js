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
    Set up public routes restrictions, when logged you can't access login page
    Implement delete button, with confirmation, in dashboard page
    Add name and logout option in navbar
    Fix the auto resizing in home page (long title)
    search page
    visualizing page for users and songs?
    load image from project, not from endpoints
    implement facebook and google login

    Pulish animations
    Make a fancy loading page (when token read)

    Refactor route system
*/