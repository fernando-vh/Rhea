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
    
    fix:
        -fix that anoying paging movement (home/search)
        -add action to change username, call in username update
    
    implement:
        -token with long duration (10days)??, when remember me?
    
        
    Make a fancy loading page (when token read) or maybe not?

    Maybe, just maybe, add user preview in edit page?
*/