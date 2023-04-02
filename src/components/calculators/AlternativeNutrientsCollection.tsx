import { useState } from "react";
import Stack from "react-bootstrap/Stack";
import { Form, InputGroup } from "react-bootstrap";
import MonthlyTable from "../MonthlyTable";
import { allRegionData } from "../../calculator/Region";

export default function AlternativeNutrientsCollectionCalculator({ region }: { region: string | undefined }) {
    const [personCount, setPersonCount] = useState<number>(0);
    const onClick = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        target.select();
    };
    const onChange = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setPersonCount(target.valueAsNumber);
    };
    const monthlyBlackWater = Array<number>(12);
    const monthlyYellowWater = Array<number>(12);
    const monthlyBrownWater = Array<number>(12);
    if (region !== undefined && allRegionData[region] !== undefined) {
        const regionData = allRegionData[region];
        if (regionData.blackWater !== undefined) {
            monthlyBlackWater.fill(30 * personCount * regionData.blackWater);
        }
        if (regionData.yellowWater !== undefined) {
            monthlyYellowWater.fill(30 * personCount * regionData.yellowWater);
        }
        if (regionData.brownWater !== undefined) {
            monthlyBrownWater.fill(30 * personCount * regionData.brownWater);
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
