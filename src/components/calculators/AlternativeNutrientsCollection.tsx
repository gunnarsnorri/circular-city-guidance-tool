import Stack from "react-bootstrap/Stack";
import { Form, InputGroup } from "react-bootstrap";
import MonthlyTable from "../MonthlyTable";
import { allRegionData } from "../../calculator/Region";
import { GlobalCalcStorage } from "../../interfaces/CalculatorInterface";

export default function AlternativeNutrientsCollectionCalculator({ globalStorage, setGlobalStorage }: { globalStorage: Partial<GlobalCalcStorage>, setGlobalStorage: Function }) {
    const onClick = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        target.select();
    };
    const onChange = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setGlobalStorage({ persons: target.valueAsNumber });
    };
    const monthlyBlackWater = Array<number>(12);
    const monthlyYellowWater = Array<number>(12);
    const monthlyBrownWater = Array<number>(12);
    if (globalStorage.region !== undefined && allRegionData[globalStorage.region] !== undefined) {
        const regionData = allRegionData[globalStorage.region];
        if (regionData.blackWater !== undefined) {
            monthlyBlackWater.fill(30 * (globalStorage.persons ?? 0) * regionData.blackWater);
        }
        if (regionData.yellowWater !== undefined) {
            monthlyYellowWater.fill(30 * (globalStorage.persons ?? 0) * regionData.yellowWater);
        }
        if (regionData.brownWater !== undefined) {
            monthlyBrownWater.fill(30 * (globalStorage.persons ?? 0) * regionData.brownWater);
        }
    }
    return (
        <Stack direction="horizontal" gap={3}>
            <Form>
                <Form.Group>
                    <InputGroup onClick={onClick}>
                        <InputGroup.Text>Number of people</InputGroup.Text>
                        <Form.Control onChange={onChange} type="number" value={globalStorage.persons ?? 0} />
                        <InputGroup.Text>persons</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            </Form>
            <MonthlyTable columns={
                [
                    { valueName: "Black Water", unit: "L", monthlyValues: monthlyBlackWater },
                    { valueName: "Yellow Water", unit: "L", monthlyValues: monthlyYellowWater },
                    { valueName: "Brown Water", unit: "L", monthlyValues: monthlyBrownWater }
                ]
            } />
        </Stack>
    )
}
