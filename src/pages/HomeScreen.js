import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeBgImage } from "../actions/ui";
import { SongsTablePublic } from "../components/dataDisplay/public/songsTablePublic"
import { types } from "../models/types/types";

export const HomeScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeBgImage(types.SCREEN_BG_CLASS.MAIN));
    }, [dispatch]);

    return (
        <div className="m-3 d-flex"> 

            <div className="col-4 home-welcome-container">
                <div className="fancy-title-text animate__animated animate__flipInX">
                    Welcome to the MMC</div>
                
                <div className="home-welcome-container-text animate__animated animate__lightSpeedInLeft">
                    MMC or <span className="font-italic">My Music Creator</span> is a project that consist on the use of AI to build music pieces 
                    <small className="font-italic m-1">(That may not be as complex or pretty as a song created by a person)</small>. But we think
                    that a 30 seconds song created by a machine is impressive enough.

                    <hr />
                    Now you are here, we invite you to take a look in what our users had been creating <i className="fas fa-arrow-right"></i>
                </div>
            </div>

            <div className="col-8 home-welcome-container">
                <SongsTablePublic />
            </div>

        </div>
    )
}