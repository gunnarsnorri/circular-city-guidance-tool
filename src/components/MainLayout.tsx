import React, { useEffect, useRef, useState } from 'react';
import Info from './Info';
import Navbar from './Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ActiveApp from './ActiveApp';

const Layout = () => {
    const [textId, setTextId] = useState("default");
    const [navbarHeight, setNavbarHeight] = useState(0);
    const [activeContainerId, setActiveContainerId] = useState<String>("1")

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
                        <Navbar setActiveContainerId={setActiveContainerId} />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={8} md={8} lg={8}>
                    <ActiveApp
                    activeContainerId={activeContainerId}
                    setActiveContainerId={setActiveContainerId}
                    navigatorProps={{setTextId: setTextId, navbarHeight: navbarHeight}}
                    />
                </Col>
                <Col sm={4} md={4} lg={4} style={{ overflowY: "auto", height: `calc(100vh - ${navbarHeight}px)` }}>
                    <Info textId={textId} />
                </Col>
            </Row>
        </Container>
    )
}

export default Layout;
