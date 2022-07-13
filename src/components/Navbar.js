import { Link } from "react-router-dom";
import { Navbar as RBNav, Nav, Container } from "react-bootstrap";

export const Navbar = () => {
  return (
    <>
      <RBNav bg="light" expand="lg">
        <Container>
          <RBNav.Brand href="#home">DXL</RBNav.Brand>
          <RBNav.Toggle aria-controls="basic-navbar-nav" />
          <RBNav.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item>
                <Link to="/">Basics</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/headers">Headers</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/inrequest">In Request</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/outrequest">Out Request</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/requestmap">Request map</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/statics">Statics</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/outresponse">Out Response</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/inreponse">In Response</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/responsemap">Response map</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/success">OK Check</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/complete">Complete</Link>
              </Nav.Item>
            </Nav>
          </RBNav.Collapse>
        </Container>
      </RBNav>
    </>
  );
};
