import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap"
import {PropTypes} from 'prop-types';

import {registerRequest} from '../../services/authService';

export const RegisterForm = ({setNewUser}) => {
    const [validate, setValidate] = useState(false);
    const [pass1, setPass1] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        else{
            const resp = await registerRequest({
                email: form.email.value,
                password: form.password.value,
                username: form.username.value
            })
            
            if(resp.status === 201){
                setNewUser(false);
            }

        }
        
        setValidate(true);
    }

    return (
        <Form 
            className="auth-form-partial-size auth-form-container animate__animated animate__bounceInRight"
            onSubmit={handleSubmit}
            noValidate
            validated={validate}
        >
            <h2 className="text-center">Sign in</h2>

            <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>

                <Form.Control 
                    type="email"
                    placeholder="Enter email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                />
                <Form.Control.Feedback type="invalid">
                Please enter a valid email.
                </Form.Control.Feedback>

                <Form.Text className="font-italic">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>

                <Form.Control 
                    type="text"
                    placeholder="Enter username"
                    minLength={3}
                    required
                />
                <Form.Control.Feedback type="invalid">
                Please enter an username.
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>

                <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPass1(e.target.value)}
                    minLength={6}
                    required
                />
                <Form.Control.Feedback type="invalid">
                Password must be at least 6 characters long.
                </Form.Control.Feedback>

            </Form.Group>

            <Form.Group controlId="password2">
                <Form.Label>Repeat password</Form.Label>

                <Form.Control
                    type="password"
                    placeholder="Repet password"
                    pattern={`${pass1}$`}
                    required
                />
                <Form.Control.Feedback type="invalid">
                Passwords don't match.
                </Form.Control.Feedback>

            </Form.Group>
            {/*
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
            */}
            
            <div className="d-flex justify-content-between">
                <Col>
                    <Button variant="outline-light" type="submit">
                        Submit
                    </Button>
                </Col>

                <Col className="text-right">
                    <p className="m-0">Not new?</p>
                    <p onClick={() => setNewUser(false)} className="link-white">Login</p>
                </Col>
            </div>
        </Form>
    )
}

RegisterForm.propTypes = {
    setNewUser: PropTypes.func.isRequired,
}
