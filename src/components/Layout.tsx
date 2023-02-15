import React, { useState } from 'react';
import Info from './Info';
import Navbar from './Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navigator from './Navigator';

const Layout = ({ children, setActiveContainer }: { children: React.ReactNode, setActiveContainer: Function }) => {
    const [infoTitle, setInfoTitle] = useState("Unit Selection Guidance Tool");
    return (
        <>
            <div>
                <Container className="vh-100 d-flex flex-column" fluid>
                    <Row sm={1} md={1} lg={1}>
                        <Col>
                        <Navbar setActiveContainer={setActiveContainer}/>
                        </Col>
                    </Row>
                    <Row className="h-100" sm={11} md={11} lg={11}>
                        <Col sm={8} md={8} lg={8}>
                            <Navigator setInfoTitle={setInfoTitle}></Navigator>
                        </Col>
                        <Col sm={4} md={4} lg={4}>
                            <Info title={infoTitle} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Layout;
