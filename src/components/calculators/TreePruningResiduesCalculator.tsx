import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import AreaInput from "../AreaInput";

export default function TreePruningResiduesCalculator(area: number, setArea: Function) {
    const tp = 4.18;
    const treePruningRecovery = tp * area;
    const hvwc = 17;
    const heatValue = treePruningRecovery * hvwc;

    const onChangeInput = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setArea(target.valueAsNumber);
    };

    return (
        <Stack direction="horizontal" gap={3}>
            <Form onSubmit={(event) => {event.preventDefault()}}>
                <Form.Group>
                    <AreaInput defaultValue={area} onChangeInput={onChangeInput}/>
                </Form.Group>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th colSpan={2} className="text-center">Yearly Recovered Biomass From Tree Pruning</th>
                        <th colSpan={2} className="text-center">Heating Energy From Wood Chips</th>
                    </tr>
                    <tr>
                        <th>Per hectare (t/ha/year)</th>
                        <th>Total (t/year)</th>
                        <th>Per tonne of tree pruning BM (MJ)</th>
                        <th>Total (L)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{tp}</td>
                        <td>{Math.round(treePruningRecovery)}</td>
                        <td>{hvwc}</td>
                        <td>{Math.round(heatValue)}</td>
                    </tr>
                </tbody>
            </Table>
        </Stack>
    )
}
