import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom"
import { logout } from "../actions/auth";

import {MyNavbar} from '../components/ui/MyNavbar';
import { ComposeScreen } from "../pages/ComposeScreen";
import { DashboardScreen } from "../pages/DashboardScreen";
import { HomeScreen } from "../pages/HomeScreen";
import { SearchScreen } from "../pages/SearchScreen";
import { ViewScreen } from "../pages/ViewScreen";
import { tokenValidationRequest } from "../services/authService";

export const MainRoutes = () => {
    const uiState = useSelector(state => state.ui);
    const dispatch = useDispatch();

    useEffect(() => {
        const validateToken = async () => {
            const resp = await tokenValidationRequest(localStorage.getItem('token'));
            if(resp.status === 401){
                dispatch(logout());
            }
            else{
                localStorage.setItem('token', resp.data.token);
            }
        }

        validateToken();
    }, [dispatch])

    return (
        <div className="full-total-space">
            <div className={`${uiState.bgClassName}-page-bg`}>
                <div className={`${uiState.bgClassName}-gray-bg-filter`}>

                    <MyNavbar />

                    <Switch>
                        <Route exact path="/home"                   component={HomeScreen} />
                        <Route exact path="/dashboard"              component={DashboardScreen} />
                        <Route exact path="/composer"               component={ComposeScreen} />
                        <Route exact path="/search"                 component={SearchScreen} />
                        <Route exact path="/view/:component/:id"    component={ViewScreen} />

                        <Redirect to="/home" />
                    </Switch>

                </div>
            </div>
        </div>
    )
}