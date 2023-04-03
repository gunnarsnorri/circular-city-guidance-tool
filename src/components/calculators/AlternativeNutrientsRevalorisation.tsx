import { useState } from "react";
import Stack from "react-bootstrap/Stack";
import { Form, InputGroup, Table } from "react-bootstrap";
import { allRegionData } from "../../calculator/Region";

export default function AlternativeNutrientsRevalorisationCalculator({ region }: { region: string | undefined }) {
    const [personCount, setPersonCount] = useState<number>(0);
    const onClick = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        target.select();
    };
    const onChange = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setPersonCount(target.valueAsNumber);
    };
    const nitrogenAvgs = [12.7, 12.3, 1.4, 12];
    const phosphorusAvgs = [1.6, 1.0, 0.7, 0.45];
    const yearlyNitrogen: Array<number> = [];
    const yearlyPhosphorus: Array<number> = [];
    const unit = "kg/year"
    if (region !== undefined && allRegionData[region] !== undefined) {
        const regionData = allRegionData[region];
        if (regionData.blackWater !== undefined) {
            yearlyNitrogen.push(365/1000 * personCount * nitrogenAvgs[0] * regionData.blackWater);
            yearlyPhosphorus.push(365/1000 * personCount * phosphorusAvgs[0] * regionData.blackWater);
        }
        if (regionData.yellowWater !== undefined) {
            yearlyNitrogen.push(365/1000 * personCount * nitrogenAvgs[1] * regionData.yellowWater);
            yearlyPhosphorus.push(365/1000 * personCount * phosphorusAvgs[1] * regionData.yellowWater);
        }
        if (regionData.brownWater !== undefined) {
            yearlyNitrogen.push(365/1000 * personCount * nitrogenAvgs[2] * regionData.brownWater);
            yearlyPhosphorus.push(365/1000 * personCount * phosphorusAvgs[2] * regionData.brownWater);
        }
        if (regionData.kitchenWaste !== undefined) {
            yearlyNitrogen.push(365/1000 * personCount * nitrogenAvgs[3] * regionData.kitchenWaste);
            yearlyPhosphorus.push(365/1000 * personCount * phosphorusAvgs[3] * regionData.kitchenWaste);
        }
    }

    return (
        <Stack direction="horizontal" gap={3}>
            <Form>
                <Form.Group>
                    <InputGroup onClick={onClick}>
                        <InputGroup.Text>Number of people</InputGroup.Text>
                        <Form.Control onChange={onChange} type="number" defaultValue={0} />
                        <InputGroup.Text>persons</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th colSpan={5} className="text-center">Yearly Recoverable Nutrients</th>
                    </tr>
                    <tr>
                        <th>Nutrient</th>
                        <th>Black Water</th>
                        <th>Yellow Water</th>
                        <th>Brown Water</th>
                        <th>Kitchen Waste</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Nitrogen ({unit})</th>
                        {
                            yearlyNitrogen.map((value) => {
                                return <td>{Math.round(value)}</td>
                            })
                        }
                    </tr>
                    <tr>
                        <th>Phosphorus ({unit})</th>
                        {
                            yearlyPhosphorus.map((value) => {
                                return <td>{Math.round(value)}</td>
                            })
                        }
                    </tr>
                </tbody>
            </Table>
        </Stack>
    )
}
