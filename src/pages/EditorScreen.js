import { Accordion, Card } from "react-bootstrap"
import { useSelector } from "react-redux"
import { BasicInfoForm } from "../components/editor/user/BasicInfoForm"
import { DisableAccountForm } from "../components/editor/user/DisableAccountForm"
import { PasswordChangeForm } from "../components/editor/user/PasswordChangeForm"
import { ProfilePicForm } from "../components/editor/user/ProfilePicForm"

export const EditorScreen = () => {
    const {uid} = useSelector(state => state.auth);
    return(
        <div className="d-flex justify-content-center">
            <div className="editor-component editor-size">
                <h1>Edit my account</h1>

                <Accordion defaultActiveKey="0">

                <Card className="editor-card">
                    <Card.Header className="editor-card-header">
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <div className="section-div">
                            <i className="fas fa-caret-right mr-2"></i>
                            Profile Picture
                        </div>
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        
                        <ProfilePicForm uid={uid} />

                    </Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Card className="editor-card">
                    <Card.Header className="editor-card-header">
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        <div className="section-div">
                            <i className="fas fa-caret-right mr-2"></i>
                            Basic info
                        </div>
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        
                        <BasicInfoForm uid={uid} />

                    </Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Card className="editor-card">
                    <Card.Header className="editor-card-header">
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                        <div className="section-div">
                            <i className="fas fa-caret-right mr-2"></i>
                            Password
                        </div>
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                    <Card.Body>
                        
                        <PasswordChangeForm uid={uid} />

                    </Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Card className="editor-card">
                    <Card.Header className="editor-card-header">
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
                        <div className="section-div">
                            <i className="fas fa-caret-right mr-2"></i>
                            Archieve account
                        </div>
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="3">
                    <Card.Body>
                        
                        <DisableAccountForm uid={uid} />

                    </Card.Body>
                    </Accordion.Collapse>
                </Card>

                </Accordion>

            </div>
        </div>
    )
}