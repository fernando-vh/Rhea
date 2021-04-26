import { useEffect, useState } from "react"
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LoginForm } from "../components/auth/loginForm"
import { RegisterForm } from "../components/auth/registerForm";

export const AuthScreen = ({history}) => {
    const [newUser, setNewUser] = useState(false);
    const authState = useSelector(state => state.auth);

    useEffect(() => {
        if(authState.logged){
            history.push('/home');
        }

    }, [authState, history]);
    
    return(
        <div className="full-total-space">
            
            <div className="auth-page-bg">
                <div className="auth-gray-bg-filter">

                    <div className="auth-title-container d-flex">
                        <div>
                            <h1>Welcome to the MMC</h1>
                            <h3>[ My Music Creator ]</h3>
                        </div>
                    </div>

                    
                    <div className="align-items-center d-flex">
                        <Container>
                            <Row className="justify-content-center">
                                {(
                                    newUser
                                        ? <RegisterForm setNewUser={setNewUser} />
                                        : <LoginForm setNewUser={setNewUser} />
                                )}
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>

        </div>
    )
}
