import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap"
import {PropTypes} from 'prop-types';

import { useDispatch } from "react-redux";
import { classicLogin, facebookLogin, googleLogin } from "../../actions/auth";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from "react-google-login";

export const LoginForm = ({setNewUser}) => {
    const [validate, setValidate] = useState(false);
    const dispatch = useDispatch();

    const responseFacebook = async (response) => {
        if(!response.status){
            dispatch(facebookLogin(response.accessToken));
        }
    }

    const responseGoogle = async (response) => {
        if(response.tokenId){
            dispatch(googleLogin(response.tokenId));
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const form = e.currentTarget;
        
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        else{
            dispatch(classicLogin({
                email: form.email.value,
                password: form.password.value
            }));
        }
        
        setValidate(true);
    }

    return ( 
        <Form 
            className="auth-form-partial-size auth-form-container animate__animated animate__bounceInLeft"
            onSubmit={handleSubmit}
            noValidate
            validated={validate}
        >
            <h2 className="text-center">Login</h2>

            <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>

                <Form.Control 
                    type="email"
                    placeholder="Enter email"
                    required
                />
                <Form.Control.Feedback type="invalid">
                Please enter an email.
                </Form.Control.Feedback>

            </Form.Group>
            
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>

                <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                />
                <Form.Control.Feedback type="invalid">
                Please type your password.
                </Form.Control.Feedback>

            </Form.Group>
            {/*
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
            */}
            
            <p className="text-center">or</p>

            <div className="mb-3">
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    render={renderProps => (
                        <Button 
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className="mb-2 w-100"
                            variant="danger">
                                <i className="fab fa-google"></i>
                                <small className="ml-1">Signin with google</small>
                        </Button>
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    autoLoad={false}
                />

                <FacebookLogin
                    appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                    autoLoad={false}
                    callback={responseFacebook}
                    render={renderProps => (
                        <Button className="mb-2 w-100" variant="primary" onClick={renderProps.onClick}>
                            <i className="fab fa-facebook-f"></i>
                            <small className="ml-1">Signin with facebook</small>
                        </Button>
                    )}
                />

            </div>
            
            <div className="d-flex justify-content-between">
                <Col>
                    <Button variant="outline-light" type="submit">
                        Submit
                    </Button>
                </Col>

                <Col className="text-right">
                    <p className="m-0">No account?</p>
                    <p onClick={() => setNewUser(true)} className="link-white">Register here</p>
                </Col>
            </div>
        </Form>
    )
}

LoginForm.propTypes = {
    setNewUser: PropTypes.func.isRequired,
}
