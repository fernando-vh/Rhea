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
    
    implement:

    
        
        
        Maybe, just maybe, add user preview in edit page? or maybe not, probably not, yeah better not, definitely not
*/