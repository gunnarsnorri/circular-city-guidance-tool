import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { NavDropdown } from "react-bootstrap"
import DarkModeDropdown from "./DarkModeDropdown"

export default function MainNavbar({ setActiveContainerId, mode, setPreferredTheme }: { setActiveContainerId: Function, mode: string, setPreferredTheme: Function }) {
    const handleSelect = (eventKey: String | null) => {
        if (eventKey !== null)
            setActiveContainerId(eventKey)
    }
    return (
        <Navbar collapseOnSelect expand="lg">
            <Navbar.Brand href="#" className="gap-3">
                <img
                    src="/logo.png"
                    height="50"
                    alt="Circular-City"
                />{" "}
                Circular City
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav defaultActiveKey="1" onSelect={handleSelect}>
                <Nav.Link eventKey="1">Navigator</Nav.Link>
                <NavDropdown title="Calculator" id="calculator-dropdown">
                    <NavDropdown.Item eventKey="2.1">Rainwater</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav className="ms-auto">
                <DarkModeDropdown mode={mode} setPreferredTheme={setPreferredTheme}/>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
