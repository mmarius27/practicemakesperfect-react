import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {NavDropdown} from 'react-bootstrap'
import {FormControl, Button, Container} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom'
import { JWT_KEY } from '../service/constants';

let searchQuerryInput = {searchTerm:""};

const CustomNavbar = () => {

    const history = useHistory();
    const searchButtonClicked = () =>{
        console.log(searchQuerryInput);
        history.push("/search?searchTerm="+searchQuerryInput.searchTerm);
    }

    return(
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
        <Link className="text-decoration-none" to="/">
          <Navbar.Brand as="span" href="#home">Practice Makes Perfect</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="mr-2"
                    aria-label="Search"
                    onChange={(e)=> searchQuerryInput.searchTerm = e.target.value}
                    onKeyUp={(e)=> {if(e.key === 'Enter')searchButtonClicked();}}
                />
                <Button variant="outline-primary" onClick={searchButtonClicked}>Search</Button>
          </Nav>
          {window.localStorage.getItem(JWT_KEY) === null
          ?<Nav>
              <Nav.Link as="div"><Link className="text-decoration-none" to="/login">Log in</Link></Nav.Link>
              <Nav.Link as="div"><Link className="text-decoration-none" to="/signup">Sign up</Link></Nav.Link>
              
            </Nav>
          :<Nav>
              <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="Account"
                  variant="dark"
                >
                  <Link className="text-decoration-none" to="/profile"><NavDropdown.Item as="div">Profile</NavDropdown.Item></Link>
                  <Link className="text-decoration-none" to="/my-posts"><NavDropdown.Item as="div">My Posts</NavDropdown.Item></Link>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => {window.localStorage.removeItem(JWT_KEY); history.push("/")}}>Log out</NavDropdown.Item>
                </NavDropdown>
            </Nav>
          }
        </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default CustomNavbar