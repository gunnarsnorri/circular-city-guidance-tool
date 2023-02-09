import React from 'react';
import Info from './Info';
import Navbar from './Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navigator from './Navigator';

const Layout = ({ children, setActiveContainer }: { children: React.ReactNode, setActiveContainer: Function }) => {
    return (
        <>
            <div>
                <Container fluid>
                    <Row>
                        <Navbar setActiveContainer={setActiveContainer} />
                    </Row>
                    <Row>
                        <Col lg={true}>
                            <>
                                <Navigator></Navigator>
                            </>
                        </Col>
                        <Col lg={4}>
                            <Info />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Layout;
