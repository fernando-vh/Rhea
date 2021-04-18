import { useEffect, useState } from "react"
//import { Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { changeBgImage } from "../actions/ui";
import { SongsTable } from "../components/dataDisplay/songsTable";
import { UserContainer } from "../components/dataDisplay/userContainer";
import { types } from "../models/types/types";
import { getProfileImagePath } from "../services/filesService";
import { getSongsRequest } from "../services/songsService";
import { getUserByIdRequest } from "../services/usersService"

export const DashboardScreen = () => {
    const userState = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [songs, setSongs] = useState([]);

    const [user, setUser] = useState({
        username: 'Fer',
        description: 'this is a generic description, so dont judge me',
        email: 'mymail@mail.com',
        userSince: '23/23/23',
        pp: 'meh'
    });

    useEffect(() => {
        const loadUserData = async () => {
            const resp = await getUserByIdRequest(userState.uid);
            const image = await getProfileImagePath(userState.uid);
            const u = resp.data.user;
    
            if(u){
                const d = new Date(u.createdAt);
                const str = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(d);

                setUser({
                    username: u.username,
                    description: u.description,
                    email: u.email,
                    userSince: str,
                    pp:image
                })
            }
        }

        const loadSongData = async () => {
            const resp = await getSongsRequest({
                orderBy:'createdAt:DESC',
                limit:10,
                userId:userState.uid
            });

            const s = resp.data.songs;
            if(s){
                setSongs(s);
            }
        }
        
        loadUserData();
        loadSongData();
        dispatch(changeBgImage(types.SCREEN_BG_CLASS.MAIN));
    }, [userState.uid, setUser, setSongs])

    return (
        <div>
            <div className="fancy-title-text">
                This is my creation
            </div>

            <div className="d-flex">

                <div className="col-md-4">
                    <div className="d-flex justify-content-center">
                        <UserContainer user={user} />
                    </div>
                </div>

                <div className="col-md-8">
                    <SongsTable songs={songs}/>
                </div>

            </div>

        </div>
    )
}