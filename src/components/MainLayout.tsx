import React, { useEffect, useRef, useState } from 'react';
import Info from './Info';
import Navbar from './Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ActiveApp from './ActiveApp';

const IS_SERVER = typeof window === 'undefined';

let storedTheme = IS_SERVER ? 'light' : localStorage.getItem('theme');



const Layout = () => {
    const [textId, setTextId] = useState("default");
    const [navbarHeight, setNavbarHeight] = useState(0);
    const [activeContainerId, setActiveContainerId] = useState<String>("1")

    const navbarRef = useRef<HTMLDivElement>(null);

    const [mode, setMode] = useState(getPreferredTheme());
    const [theme, setTheme] = useState("light");

    function modifyDOM(inTheme: string) {
        if (
            inTheme === 'auto')
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.setAttribute('data-bs-theme', 'dark');
                setTheme("dark")
            } else {
                document.documentElement.setAttribute('data-bs-theme', 'light');
                setTheme("light")
            }
        else {
            document.documentElement.setAttribute('data-bs-theme', inTheme);
            setTheme(inTheme)
        }
    }

    useEffect(() => {
        if (navbarRef.current !== null)
            setNavbarHeight(navbarRef.current.clientHeight)
    }, [navbarRef, setNavbarHeight])

    useEffect(() => {
        if (IS_SERVER) return;
        modifyDOM(mode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getPreferredTheme() {
        if (storedTheme) {
            return storedTheme;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    }

    function setPreferredTheme(preferredTheme: string) {
        modifyDOM(preferredTheme)

        localStorage.setItem('theme', preferredTheme);
        setMode(preferredTheme);
    }

    return (
        <Container fluid>
            <Row sm={1} md={1} lg={1}>
                <Col>
                    <div ref={navbarRef}>
                        <Navbar setActiveContainerId={setActiveContainerId} mode={mode} setPreferredTheme={setPreferredTheme} />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={8} md={8} lg={8}>
                    <ActiveApp
                        activeContainerId={activeContainerId}
                        navigatorProps={{ setTextId: setTextId, navbarHeight: navbarHeight, theme: theme }}
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
