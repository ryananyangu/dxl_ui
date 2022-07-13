import { Link } from "react-router-dom";
import { Navbar as RBNav, Nav, Container } from "react-bootstrap";

export const Navbar = () => {
  return (
    <>
      <RBNav bg="light" expand="lg">
        <Container>
          <RBNav.Brand as={Link} to="/">
            DXL
          </RBNav.Brand>
          <RBNav.Toggle aria-controls="basic-navbar-nav" />
          <RBNav.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Basics
              </Nav.Link>
              <Nav.Link as={Link} to="/headers">
                Headers
              </Nav.Link>
              <Nav.Link as={Link} to="/inrequest">
                In Request
              </Nav.Link>
              <Nav.Link as={Link} to="/outrequest">
                Out Request
              </Nav.Link>
              <Nav.Link as={Link} to="/requestmap">
                Request map
              </Nav.Link>
              <Nav.Link as={Link} to="/statics">
                Statics
              </Nav.Link>
              <Nav.Link as={Link} to="/outresponse">
                Out Response
              </Nav.Link>
              <Nav.Link as={Link} to="/inreponse">
                In Response
              </Nav.Link>
              <Nav.Link as={Link} to="/responsemap">
                Response map
              </Nav.Link>
              <Nav.Link as={Link} to="/success">
                OK Check
              </Nav.Link>
              <Nav.Link as={Link} to="/complete">
                Complete
              </Nav.Link>
            </Nav>
          </RBNav.Collapse>
        </Container>
      </RBNav>
    </>
  );
};
