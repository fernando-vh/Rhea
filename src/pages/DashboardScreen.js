import { useEffect, useState } from "react"
//import { Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import { getProfileImagePath } from "../services/filesService";
import { getUserByIdRequest } from "../services/usersService"

export const DashboardScreen = () => {
    const userState = useSelector(state => state.auth);

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
            const image = getProfileImagePath(userState.uid);
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
        
        loadUserData();
    }, [userState.uid, setUser])

    return (
        <div>

            <div className="d-flex">
                <div className="col-md-4">

                    <div className="auth-form-container">
                        <h1>This is the profile info</h1>
                        <img src={user.pp} alt={user.username} />

                        <div className="d-flex">
                            <div className="col-6">
                                Username:
                            </div>
                            <div className="col-6">
                                {user.username}
                            </div>
                        </div>
                        <hr/>

                        <div className="d-flex">
                            <div className="col-6">
                                Description:
                            </div>
                            <div className="col-6">
                                {user.description}
                            </div>
                        </div>
                        <hr/>

                        <div className="d-flex">
                            <div className="col-6">
                                Contact:
                            </div>
                            <div className="col-6">
                                {user.email}
                            </div>
                        </div>
                        <hr/>

                        <div className="d-flex">
                            <div className="col-6">
                                User since:
                            </div>
                            <div className="col-6">
                                {user.userSince}
                            </div>
                        </div>
                        <hr/>

                    </div>

                </div>
                <div className="col-md-8">
                    <h1>These are the songs related to the profile</h1>
                </div>
            </div>

        </div>
    )
}