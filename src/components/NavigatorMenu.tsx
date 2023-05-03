import cytoscape, { Core } from 'cytoscape';
import { CSSProperties } from 'react';
import { Button } from 'react-bootstrap';
import { TfiZoomIn, TfiZoomOut, TfiHome, TfiFullscreen } from 'react-icons/tfi'

const NavigatorMenu = ({ cy, style, theme, setTextId, elements }: { cy: Core | null, style: CSSProperties, theme: string, setTextId: Function, elements: Array<cytoscape.ElementDefinition> }) => {
    const adjustZoom = (zoom: number) => cy?.zoom(cy?.zoom() / (1 - zoom))
    const reset = () => {
        if (cy === null) {
            setTextId("default")
            return;
        } else {
            setTextId("default");
            cy.json({ elements: elements });
            return;
        }
    }
    return (
        <div style={style}>
            <Button variant={theme} size='lg' onClick={() => adjustZoom(0.15)}>
                <TfiZoomIn />
            </Button>
            <Button variant={theme} size='lg' onClick={() => adjustZoom(-0.15)}>
                <TfiZoomOut />
            </Button>
            <Button variant={theme} size='lg' onClick={reset}>
                <TfiHome />
            </Button>
            <Button variant={theme} size='lg' onClick={() => cy?.fit()}>
                <TfiFullscreen />
            </Button>
        </div>
    )
}
export default NavigatorMenu;
