import { SongExtTable } from "../dataDisplay/external/SongExtTable"
import { UserExtContainer } from "../dataDisplay/external/UserExtContainer"

export const UserView = ({uid}) => {

    return (
        <div>
            <div className="fancy-title-text">
                Welcome to my profile
            </div>

            <div className="d-flex">

                <div className="col-md-4">
                    <div className="d-flex justify-content-center">
                        <UserExtContainer uid={uid}/>
                    </div>
                </div>

                <div className="col-md-8">
                    <SongExtTable uid={uid}/>
                </div>

            </div>
        </div>
    )
}