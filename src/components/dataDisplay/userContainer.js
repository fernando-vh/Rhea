export const UserContainer = ({user}) => {
    return(

            <div className="user-container text-center ">
                <h2>This is you</h2>
                <img src={user.pp} alt={user.username} className="m-3 white-border" />

                <div className="d-flex white-border-b">
                    <div className="col-4 text-right">
                        Username:
                    </div>
                    <div className="col-8">
                        {user.username}
                    </div>
                </div>
                <hr/>

                <div className="d-flex white-border-b">
                    <div className="col-4 text-right">
                        Description:
                    </div>
                    <div className="col-8">
                        {user.description}
                    </div>
                </div>
                <hr/>

                <div className="d-flex white-border-b">
                    <div className="col-4 text-right">
                        Contact:
                    </div>
                    <div className="col-8">
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