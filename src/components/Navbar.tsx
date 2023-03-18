import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { NavDropdown } from "react-bootstrap"

export default function MainNavbar({ setActiveContainerId }: { setActiveContainerId: Function }) {
    const handleSelect = (eventKey: String | null) => {
        if (eventKey !== null)
            setActiveContainerId(eventKey)
    }
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
            <Nav variant="tabs" defaultActiveKey="1" onSelect={handleSelect}>
                <Nav.Link eventKey="1">Navigator</Nav.Link>
                <NavDropdown title="Calculator" id="calculator-dropdown">
                    <NavDropdown.Item eventKey="2.1">Rainwater</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar>
    )
}
