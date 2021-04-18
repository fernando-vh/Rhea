import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import {
    NavLink,
    Link
} from 'react-router-dom';

export const MyNavbar = () => {
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
                            to="home">
                                Home
                    </NavLink>
                </Nav.Link>

                <Nav.Link>
                    <NavLink 
                            className="nav-item nav-link"
                            activeClassName="active"
                            to="dashboard">
                                Dashboard
                    </NavLink>
                </Nav.Link>

            </Nav>

            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
            </Form>
        </Navbar.Collapse>
        </Navbar>
    )
}