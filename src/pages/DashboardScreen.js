import { useEffect, useState } from "react"
//import { Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import { SongsTable } from "../components/dataDisplay/songsTable";
import { UserContainer } from "../components/dataDisplay/userContainer";
import { getProfileImagePath } from "../services/filesService";
import { getSongsRequest } from "../services/songsService";
import { getUserByIdRequest } from "../services/usersService"

export const DashboardScreen = () => {
    const userState = useSelector(state => state.auth);

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
                setUser({
                    username: u.username,
                    description: u.description,
                    email: u.email,
                    userSince: u.createdAt,
                    pp:image
                })
            }
        }

        const loadSongData = async () => {
            const resp = await getSongsRequest();
            const s = resp.data.songs;
            if(s){
                setSongs(s);
            }
        }
        
        loadUserData();
        loadSongData();
    }, [userState.uid, setUser, setSongs])

    return (
        <div>
            <div className="dashboard-title">
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