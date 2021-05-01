import { Link } from "react-router-dom"

export const NonExistingContent404 = () => {
    return (
        <div className="d-flex justify-content-center">
            <div className="non-content-container-bg animate__animated animate__bounceIn">
                <div className="non-content-container-gray-bg-filter d-flex align-items-top">
                    <div className="non-content-container text-center">

                        <div className="fancy-title-text">
                            404
                        </div>

                        <div className="non-content-container-text">
                            Sorry but what you are looking for, apparently doesn't exist anymore
                        </div>

                        <div className="d-flex align-items-end justify-content-center mt-2">
                            <Link 
                                to="/home"
                                className="btn btn-outline-warning mr-3">
                                Disappear in shame
                            </Link>

                            <Link 
                                to="/home"
                                className="btn btn-outline-warning">
                                Pretend you didn't see this
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}