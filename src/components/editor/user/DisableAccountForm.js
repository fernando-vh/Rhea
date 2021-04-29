import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/auth";
import { deleteUserRequest } from "../../../services/usersService";

export const DisableAccountForm = ({uid}) => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const handleClose = async (archive) => {
        if(archive){
            await deleteUserRequest(uid);
            dispatch(logout());
        }
        setShow(false)
    };

    const handleShow = () => setShow(true);

    return (
        <>
            <Form>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Label></Form.Label>
                    This will disable your account
                    <div className="m-4 d-flex justify-content-center">
                        <Button variant="danger" onClick={handleShow}>Disable account</Button>
                    </div>
                </Form.Group>
            </Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Achieve account</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure? Undoing this may take a while</Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={() => handleClose()}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleClose(true)}>
                        Achieve
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}