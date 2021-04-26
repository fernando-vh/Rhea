import { Button, Dropdown, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    NavLink,
    Link,
    useHistory
} from 'react-router-dom';
import { logout } from '../../actions/auth';

export const MyNavbar = () => {
    const history = useHistory();
    const userState = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const term = e.currentTarget.searchTerm.value;
        const l = term.length;

        if( (term.includes('@')? l > 1 : l > 0) && l < 100 ){
            history.push(`/search?term=${term}`);
        }
    }

    const handleUserDropdownMenu = (option) =>{
        switch(option){
            case 0:
                dispatch(logout());
                break;
            case 1:
                history.push('dashboard');
                break;
            case 2:
                //go to setting
                break;

            default:;
        }
    }

    return (
        <Navbar bg="black" expand="lg" variant="dark">

        <Navbar.Brand>
            <Link 
                className="navbar-brand" 
                to="">
                    MMC <i className="fa fa-music"></i>
            </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="mr-auto">

                <Nav.Link>
                    <NavLink 
                            className="nav-item nav-link"
                            activeClassName="active"
                            to="/home">
                                Home
                    </NavLink>
                </Nav.Link>

                <Nav.Link>
                    <NavLink 
                            className="nav-item nav-link"
                            activeClassName="active"
                            to="/dashboard">
                                Dashboard
                    </NavLink>
                </Nav.Link>

            </Nav>

            <Dropdown className="mr-3 mt-2 mb-2">
                <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
                    <i className="far fa-user"></i> {userState.username}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>handleUserDropdownMenu(0)}>Logout</Dropdown.Item>
                    <Dropdown.Item onClick={()=>handleUserDropdownMenu(1)}>Go to profile</Dropdown.Item>
                    <Dropdown.Item onClick={()=>handleUserDropdownMenu(2)}>Settings</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Form inline onSubmit={handleSubmit}>

                <Form.Group controlId="searchTerm">

                    <FormControl 
                        type="text" 
                        placeholder="Search (@forUsername)" 
                        className="mr-sm-2" />

                </Form.Group>

            <Button variant="outline-light" type="submit">Search</Button>

            </Form>
        </Navbar.Collapse>
        </Navbar>
    )
}