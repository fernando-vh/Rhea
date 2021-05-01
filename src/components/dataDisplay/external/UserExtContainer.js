export const UserExtContainer = ({user}) => {

    return(

        <div className="user-view-container text-center animate__animated animate__bounceInUp">
            <h2>This is me</h2>
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

            {
                !user.privateEmail &&
                    (
                        <div>

                            <div className="d-flex white-border-b">
                                <div className="col-4 text-right">
                                    Contact:
                                </div>
                                <div className="col-8 word-break">
                                    {user.email}
                                </div>
                            </div>
                            <hr />

                        </div>
                    )
            }

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