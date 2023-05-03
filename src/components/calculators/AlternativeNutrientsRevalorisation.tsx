import Stack from "react-bootstrap/Stack";
import { Form, Table } from "react-bootstrap";
import { allRegionData } from "../../calculator/Region";
import { GlobalCalcStorage } from "../../interfaces/CalculatorInterface";
import PersonForm from "../PersonForm";

export default function AlternativeNutrientsRevalorisationCalculator({ globalStorage, setGlobalStorage }: { globalStorage: Partial<GlobalCalcStorage>, setGlobalStorage: Function }) {
    const nitrogenAvgs = [12.7, 12.3, 1.4, 12];
    const phosphorusAvgs = [1.6, 1.0, 0.7, 0.45];
    const yearlyNitrogen: Array<number> = [];
    const yearlyPhosphorus: Array<number> = [];
    const unit = "kg/year"
    if (globalStorage.region !== undefined && allRegionData[globalStorage.region] !== undefined) {
        const regionData = allRegionData[globalStorage.region];
        if (regionData.blackWater !== undefined) {
            yearlyNitrogen.push(365 / 1000 * (globalStorage.persons ?? 0) * nitrogenAvgs[0] * regionData.blackWater);
            yearlyPhosphorus.push(365 / 1000 * (globalStorage.persons ?? 0) * phosphorusAvgs[0] * regionData.blackWater);
        }
        if (regionData.yellowWater !== undefined) {
            yearlyNitrogen.push(365 / 1000 * (globalStorage.persons ?? 0) * nitrogenAvgs[1] * regionData.yellowWater);
            yearlyPhosphorus.push(365 / 1000 * (globalStorage.persons ?? 0) * phosphorusAvgs[1] * regionData.yellowWater);
        }
        if (regionData.brownWater !== undefined) {
            yearlyNitrogen.push(365 / 1000 * (globalStorage.persons ?? 0) * nitrogenAvgs[2] * regionData.brownWater);
            yearlyPhosphorus.push(365 / 1000 * (globalStorage.persons ?? 0) * phosphorusAvgs[2] * regionData.brownWater);
        }
        if (regionData.kitchenWaste !== undefined) {
            yearlyNitrogen.push(365 / 1000 * (globalStorage.persons ?? 0) * nitrogenAvgs[3] * regionData.kitchenWaste);
            yearlyPhosphorus.push(365 / 1000 * (globalStorage.persons ?? 0) * phosphorusAvgs[3] * regionData.kitchenWaste);
        }
    }

    return (
        <Stack direction="horizontal" gap={3}>
            <Form>
                <Form.Group>
                    <PersonForm globalStorage={globalStorage} setGlobalStorage={setGlobalStorage} />
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
                            yearlyNitrogen.map((value, idx) => {
                                return <td key={`n-${idx}`}>{Math.round(value)}</td>
                            })
                        }
                    </tr>
                    <tr>
                        <th>Phosphorus ({unit})</th>
                        {
                            yearlyPhosphorus.map((value, idx) => {
                                return <td key={`p-${idx}`}>{Math.round(value)}</td>
                            })
                        }
                    </tr>
                </tbody>
            </Table>
        </Stack>
    )
}
