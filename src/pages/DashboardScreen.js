import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { changeBgImage } from "../actions/ui";
import { SongsTable } from "../components/dataDisplay/private/songsTable";
import { UserContainer } from "../components/dataDisplay/private/userContainer";
import { types } from "../models/types/types";

export const DashboardScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeBgImage(types.SCREEN_BG_CLASS.MAIN));
    }, [dispatch])

    return (
        <div>
            <div className="fancy-title-text">
                This is my creation
            </div>

            <div className="d-flex">

                <div className="col-md-4">
                    <div className="d-flex justify-content-center">
                        <UserContainer />
                    </div>
                </div>

                <div className="col-md-8">
                    <SongsTable />
                </div>


            </div>

        </div>
    )
}