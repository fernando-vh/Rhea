import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import {
    NavLink,
    Link,
    useHistory
} from 'react-router-dom';

export const MyNavbar = () => {
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const term = e.currentTarget.searchTerm.value;
        const l = term.length;

        if( (term.includes('@')? l > 1 : l > 0) && l < 100 ){
            history.push(`/search?term=${term}`);
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