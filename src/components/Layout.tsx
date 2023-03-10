import React, { useEffect, useRef, useState } from 'react';
import Info from './Info';
import Navbar from './Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navigator from './Navigator';
import NavigatorMenu from './NavigatorMenu';
import cytoscape from 'cytoscape';

const Layout = ({ children, setActiveContainer }: { children: React.ReactNode, setActiveContainer: Function }) => {
    const [textId, setTextId] = useState("default");
    const [navbarHeight, setNavbarHeight] = useState(0);
    const [cy, setCy] = useState<cytoscape.Core | null>(null);

    const navbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (navbarRef.current !== null)
            setNavbarHeight(navbarRef.current.clientHeight)
    }, [navbarRef, setNavbarHeight])

    return (
        <Container fluid>
            <Row sm={1} md={1} lg={1}>
                <Col>
                    <div ref={navbarRef}>
                        <Navbar setActiveContainer={setActiveContainer} />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={8} md={8} lg={8}>
                    <Navigator
                        setTextId={setTextId}
                        navbarHeight={navbarHeight}
                        cyObj={cy}
                        setCy={setCy}
                    />
                    <NavigatorMenu
                        cy={cy}
                        style={{ top: navbarHeight, left: 0, position: "absolute", zIndex: 2 }} />
                </Col>
                <Col sm={4} md={4} lg={4} style={{ overflowY: "auto", height: `calc(100vh - ${navbarHeight}px)` }}>
                    <Info textId={textId} />
                </Col>
            </Row>
        </Container>
    )
}

export default Layout;
