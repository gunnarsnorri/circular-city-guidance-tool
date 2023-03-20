import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ActiveApp from './ActiveApp';
import { useResizeDetector } from 'react-resize-detector';

const IS_SERVER = typeof window === 'undefined';

let storedTheme = IS_SERVER ? 'light' : localStorage.getItem('theme');



const Layout = () => {
    const [activeContainerId, setActiveContainerId] = useState<String>("1")

    const { height, ref } = useResizeDetector();

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
            <Row>
                <div ref={ref}>
                    <Navbar setActiveContainerId={setActiveContainerId} mode={mode} setPreferredTheme={setPreferredTheme} />
                </div>
            </Row>
            <Row>
                <ActiveApp
                    activeContainerId={activeContainerId}
                    navigatorProps={{ navbarHeight: height ?? 0, theme: theme }}
                />
            </Row>
        </Container>
    )
}

export default Layout;
