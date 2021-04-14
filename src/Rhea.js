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

/*
    Set up public routes restrictions, when logged you can't access login page

    Make a fancy loading page (when token read)
    Refactor route system
*/