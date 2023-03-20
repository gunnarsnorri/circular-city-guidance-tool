import { Core } from 'cytoscape';
import { CSSProperties } from 'react';
import { Button } from 'react-bootstrap';
import { TfiZoomIn, TfiZoomOut, TfiHome, TfiFullscreen } from 'react-icons/tfi'

const NavigatorMenu = ({ cy, style, theme }: { cy: Core | null, style: CSSProperties, theme: string }) => {
    const adjustZoom = (zoom: number) => cy?.zoom(cy?.zoom() / (1 -zoom))
    return (
        <div style={style}>
            <Button variant={theme} size='lg' onClick={() => adjustZoom(0.15)}>
                <TfiZoomIn />
            </Button>
            <Button variant={theme} size='lg' onClick={() => adjustZoom(-0.15)}>
                <TfiZoomOut />
            </Button>
            <Button variant={theme} size='lg' onClick={() => cy?.fit(cy.$("#Service-Parent"))}>
                <TfiHome />
            </Button>
            <Button variant={theme} size='lg' onClick={() => cy?.fit()}>
                <TfiFullscreen />
            </Button>
        </div>
    )
}
export default NavigatorMenu;
