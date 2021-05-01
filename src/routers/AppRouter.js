import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {    BrowserRouter as Router,
            Switch,
            Route
 } from "react-router-dom"
import { AuthScreen } from "../pages/AuthScreen";
import { MainRoutes } from "./MainRoutes"
import {PrivateRoutes} from './PrivateRoutes';
import {checkTokenIntegrity} from '../actions/auth'
import { LoadingComponent } from "../components/ui/LoadingComponent";

export const AppRouter = () => {
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        dispatch(checkTokenIntegrity(token, setChecking));
    }, [dispatch])

    if(checking){
        return (<LoadingComponent />)
    }
    else{
        return(
            <Router>
                <div>
    
                    <Switch>
                        
                        <Route exact path="/login" component={AuthScreen}/>
    
                        <PrivateRoutes
                            path="/"
                            component={ MainRoutes }
                            isAuthenticated={authState.logged}
                        />

                    </Switch>
                    
                </div>
            </Router>
        )

    }

}
