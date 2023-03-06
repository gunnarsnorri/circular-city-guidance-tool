import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"

export default function MainNavbar({setActiveContainer }: {setActiveContainer: Function }) {
    return (
        <Navbar bg="white" expand="lg">
                <Navbar.Brand href="#">
                    <img
                        src="/logo.png"
                        height="50"
                        className="d-inline-block align-top"
                        alt="Circular-City"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Button variant="link" onClick={() => {setActiveContainer(0)}}>Calculators</Button>
                        <Button variant="link" onClick={() => {setActiveContainer(1)}}>Diagram</Button>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}
