import { useLocation } from "react-router";
import queryString from 'query-string';
import { useEffect } from "react";
import { types } from "../models/types/types";
import { useDispatch } from "react-redux";
import { changeBgImage } from "../actions/ui";
import { ResultTable } from "../components/dataDisplay/searchResult/ResultTable";

export const SearchScreen = () => {
    const location = useLocation();
    const {term=''} = queryString.parse(location.search);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeBgImage(types.SCREEN_BG_CLASS.SUBROUTES));
    }, [dispatch]);

    return(
        <>
            <ResultTable term={term} />
        </>
    )
}