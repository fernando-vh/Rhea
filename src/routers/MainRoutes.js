import { useSelector } from "react-redux";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom"

import {MyNavbar} from '../components/ui/MyNavbar';
import { ComposeScreen } from "../pages/ComposeScreen";
import { DashboardScreen } from "../pages/DashboardScreen";
import { HomeScreen } from "../pages/HomeScreen";
import { SearchScreen } from "../pages/SearchScreen";

export const MainRoutes = () => {
    const uiState = useSelector(state => state.ui);

    return (
        <div className="full-total-space">
            <div className={`${uiState.bgClassName}-page-bg`}>
                <div className={`${uiState.bgClassName}-gray-bg-filter`}>

                    <MyNavbar />

                    <Switch>
                        <Route exact path="/home"       component={HomeScreen} />
                        <Route exact path="/dashboard"  component={DashboardScreen} />
                        <Route exact path="/composer"   component={ComposeScreen} />
                        <Route exact path="/search"     component={SearchScreen} />

                        <Redirect to="/home" />
                    </Switch>

                </div>
            </div>
        </div>
    )
}