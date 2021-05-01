import { useEffect, useState } from "react"
import { getProfileImagePath } from "../../services/filesService";
import { getUserByIdRequest } from "../../services/usersService";
import { SongExtTable } from "../dataDisplay/external/SongExtTable"
import { UserExtContainer } from "../dataDisplay/external/UserExtContainer"
import { NonExistingContent404 } from "../ui/NonExistingContent404";

export const UserView = ({uid}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const loadUserData = async () => {
            const resp = await getUserByIdRequest(uid);
            const u = resp.data.user;
            
            if(u){
                const image = await getProfileImagePath(uid);
                const d = new Date(u.createdAt);
                const str = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(d);

                setUser({
                    username: u.username,
                    description: u.description,
                    email: u.email,
                    userSince: str,
                    pp:image,
                    privateEmail:u.private_email
                })
            }
        }
        
        loadUserData();
    }, [uid]);

    return (
        <div>
            {
                user
                    ?(
                        <>
                            <div className="fancy-title-text">
                                Welcome to my profile
                            </div>

                            <div className="d-flex">

                                <div className="col-md-4">
                                    <div className="d-flex justify-content-center">
                                        <UserExtContainer user={user}/>
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <SongExtTable uid={uid}/>
                                </div>

                            </div>
                        </>
                    )

                    : (<NonExistingContent404 />)
            }
        </div>
    )
}