import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router";
import { changeBgImage } from "../actions/ui";
import { SongView } from "../components/view/SongView";
import { UserView } from "../components/view/UserView"
import { types } from "../models/types/types";

export const ViewScreen = () => {
    const {component, id} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeBgImage(types.SCREEN_BG_CLASS.VIEW));
    }, [dispatch]);

    switch(component){
        case types.SEARCH_COMPONENTS.USERS:
            return (<UserView uid={id} />);

        case types.SEARCH_COMPONENTS.SONGS:
            return (<SongView id={id} />);

        default:
            return (<Redirect to="/home" />) //or 404
    }
}