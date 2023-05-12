import { useReducer } from "react";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import AreaInput from "../AreaInput";

export default function ReedBiomassCalculator() {
    const harvestedReedsPerSqM = 1.0
    const [area, setArea] = useReducer((prev: number, cur: number) => {
        localStorage.setItem('wetlandArea', cur.toString());
        return cur;
    }, (JSON.parse(localStorage.getItem('wetlandArea') ?? "0") as number) ?? 0);;
    const harvestedReedBiomass = harvestedReedsPerSqM * area;
    const bioMethanePerKg = 170;
    const bioMethane = harvestedReedBiomass * bioMethanePerKg;

    const onChangeInput = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setArea(target.valueAsNumber);
    };

    return (
        <Stack direction="horizontal" gap={3}>
            <Form onSubmit={(event) => {event.preventDefault()}}>
                <Form.Group>
                    <AreaInput defaultValue={area} onChangeInput={onChangeInput} />
                </Form.Group>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th colSpan={2} className="text-center">Urban Planted Biomass (multiple sources)</th>
                        <th colSpan={2} className="text-center">Biomethane Yield</th>
                    </tr>
                    <tr>
                        <th>Per m² (t/m²/year)</th>
                        <th>Total (t/year)</th>
                        <th>Per kg of biomass residue (L/kg)</th>
                        <th>Total (L/year)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{harvestedReedsPerSqM}</td>
                        <td>{harvestedReedBiomass}</td>
                        <td>{bioMethanePerKg}</td>
                        <td>{bioMethane}</td>
                    </tr>
                </tbody>
            </Table>
        </Stack>

    )
}
