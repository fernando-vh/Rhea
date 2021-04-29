import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap"
import { createResponseNotification } from "../../../helpers/create-notification";
import { getUserByIdRequest, updateUserBasicInfoRequest } from "../../../services/usersService";

const initialState = {
    username:'',
    description:'',
    private_email:false
}

export const BasicInfoForm = ({uid}) => {
    const [validate, setValidate] = useState(false);
    const [user, setUser] = useState(initialState);

    useEffect(() => {
        const getUser = async () => {
            const resp = await getUserByIdRequest(uid);
            setUser(resp.data.user);
        }

        getUser();
    }, [user, uid])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        else{
            const {username, description, privateEmail} = form;

            let payload = {
                username:username.value,
                description:description.value,
                private_email:privateEmail.checked
            };

            if(username.value.lenght === "") delete payload.username;

            console.log(payload);

            const resp = await updateUserBasicInfoRequest(payload, uid);
            createResponseNotification(resp);
            setUser(initialState);
            
            form.reset();
        }

        setValidate(true);
    }

    const resetForm = () => {
        setValidate(false);
    }

    return (
        <>
            {
                user.username !== "" &&

                <Form 
                    onSubmit={handleSubmit}
                    noValidate
                    onReset={resetForm}
                    validated={validate}>

                    <Form.Group controlId="username">
                        <Form.Label>Username: </Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="My new username"
                            minLength={3}
                            defaultValue={user.username} />

                        <Form.Control.Feedback type="invalid">
                        Username must be at least 3 characters long.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description: </Form.Label>
                        <Form.Control 
                            as="textarea"
                            placeholder="My new Description"
                            rows={4}
                            maxLength={250}
                            defaultValue={user.description} />

                        <Form.Control.Feedback type="invalid">
                        Description should no overpass 250 characters.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="privateEmail">
                        <Form.Label>Want some privacy?: </Form.Label>

                        <Form.Check 
                            type="checkbox"
                            label="Private email"
                            defaultChecked={user.private_email} />

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
            
            }
        </>
    )
}