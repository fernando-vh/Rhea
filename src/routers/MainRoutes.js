import {
    Switch,
    Route,
    Redirect
} from "react-router-dom"

import {MyNavbar} from '../components/ui/MyNavbar';
import { DashboardScreen } from "../pages/DashboardScreen";
import { HomeScreen } from "../pages/HomeScreen";

export const MainRoutes = () => {
    return (
        <div className="full-total-space">
            <div className="main-page-bg">
                <div className="main-gray-bg-filter">

                <MyNavbar />

                <Switch>
                    <Route exact path="/home" component={HomeScreen}/>
                    <Route exact path="/dashboard" component={DashboardScreen}/>

                    <Redirect to="/home" />
                </Switch>

                </div>
            </div>
        </div>
    )
}