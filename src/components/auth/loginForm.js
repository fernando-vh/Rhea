import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap"
import {PropTypes} from 'prop-types';

import { useDispatch } from "react-redux";
import { classicLogin } from "../../actions/auth";

export const LoginForm = ({setNewUser}) => {
    const [validate, setValidate] = useState(false);
    const dispatch = useDispatch();
    
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
                <Button className="mb-2 w-100" variant="danger">
                    <i className="fab fa-google"></i>
                    <small className="ml-1">Login with google</small>
                </Button>

                <Button className="mb-2 w-100" variant="primary">
                    <i className="fab fa-facebook-f"></i>
                    <small className="ml-1">Login with facebook</small>
                </Button>
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
