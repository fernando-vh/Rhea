import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { changeBgImage } from "../actions/ui";
import { SongsTable } from "../components/dataDisplay/private/songsTable";
import { UserContainer } from "../components/dataDisplay/private/userContainer";
import { types } from "../models/types/types";
import { getProfileImagePath } from "../services/filesService";
import { getUserByIdRequest } from "../services/usersService"

export const DashboardScreen = () => {
    const userState = useSelector(state => state.auth);
    const dispatch = useDispatch();

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
        
        loadUserData();
        dispatch(changeBgImage(types.SCREEN_BG_CLASS.MAIN));
    }, [userState.uid, setUser, dispatch])

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
                    <SongsTable />
                </div>

            </div>

        </div>
    )
}