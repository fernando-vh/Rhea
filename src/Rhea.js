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
        -fix that anoying paging movement (home/search)
        -npm audit fix
    
    implement:

    Make fancy notification message when delete
    
    Make a fancy loading page (when token read) or maybe not?
*/