import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getProfileImagePath } from "../../../services/filesService";
import { getUserByIdRequest } from "../../../services/usersService";

const initialState = {
    username: 'Fer',
    description: 'this is a generic description, so dont judge me',
    email: 'mymail@mail.com',
    userSince: '23/23/23',
    pp: 'meh'
}

export const UserContainer = () => {
    const userState = useSelector(state => state.auth);
    const [user, setUser] = useState(initialState);
    const history = useHistory();

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
    }, [userState.uid, setUser])

    return(

        <div className="user-container text-center animate__animated animate__bounceInLeft">
            <div className="to-overlap-container">
                <div className="to-overlap-comp w-100">
                    <h2>This is you</h2>
                </div>
                <div className="to-overlap-comp w-100 text-right">
                    <i 
                        className="fas fa-cog fa-2x m-1 clickable_item"
                        onClick={()=>{history.push('/editor/user')}}></i>
                </div>
            </div>
            <img src={user.pp} alt={user.username} className="m-3 white-border" />

            <div className="d-flex white-border-b">
                <div className="col-4 text-right">
                    Username:
                </div>
                <div className="col-8 word-break">
                    {user.username}
                </div>
            </div>
            <hr/>

            <div className="d-flex white-border-b">
                <div className="col-4 text-right">
                    Description:
                </div>
                <div className="col-8 word-break">
                    {user.description}
                </div>
            </div>
            <hr/>

            <div className="d-flex white-border-b">
                <div className="col-4 text-right">
                    Contact:
                </div>
                <div className="col-8 word-break">
                    {user.email}
                </div>
            </div>
            <hr/>

            <div className="d-flex white-border-b mb-2">
                <div className="col-4 text-right">
                    User since:
                </div>
                <div className="col-8">
                    {user.userSince}
                </div>
            </div>

        </div>

    )
}