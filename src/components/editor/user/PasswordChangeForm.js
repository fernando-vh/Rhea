import { useState } from "react";
import { Button, Form } from "react-bootstrap"
import { createResponseNotification } from "../../../helpers/create-notification";
import { updateUserPasswordRequest } from "../../../services/usersService";

export const PasswordChangeForm = ({uid}) => {
    const [pass1, setPass1] = useState("");
    const [validate, setValidate] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        else{
            const resp = await updateUserPasswordRequest({
                old_password:form.oldPassword.value,
                new_password:form.newPassword.value
            }, uid);

            createResponseNotification(resp);
        }

        setValidate(true);

        form.reset();
    }

    const resetForm = () => {
        setValidate(false);
    }

    return (
        <Form 
            onSubmit={handleSubmit}
            noValidate
            onReset={resetForm}
            validated={validate}>

            <Form.Group controlId="oldPassword">
                <Form.Label>Old password: </Form.Label>
                <Form.Control 
                    type="password"
                    required
                    placeholder="Introduce password" />

                <Form.Control.Feedback type="invalid">
                Introduce password.
                </Form.Control.Feedback>

            </Form.Group>
            <Form.Group controlId="newPassword">
                <Form.Label>New password: </Form.Label>
                <Form.Control 
                    type="password"
                    placeholder="Introduce new password"
                    minLength={6}
                    onChange={(e)=>setPass1(e.target.value)}
                    required />

                <Form.Control.Feedback type="invalid">
                Password must be at least 6 characters long.
                </Form.Control.Feedback>

            </Form.Group>
            <Form.Group controlId="newPassword2">
                <Form.Label>Confirm new password: </Form.Label>

                <Form.Control 
                    type="password"
                    placeholder="Repeat new password"
                    required
                    pattern={`${pass1}$`} />

                <Form.Control.Feedback type="invalid">
                Passwords don't match.
                </Form.Control.Feedback>

            </Form.Group>

            <div className="d-flex justify-content-center">
                <Button type="submit" variant="outline-light" className="fix-button-size-100px mr-3">
                    Save
                </Button>

                <Button type="reset" variant="outline-danger" className="fix-button-size-100px">
                    Discard
                </Button>
            </div>
        </Form>
    )
}