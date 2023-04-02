import { useState } from "react";
import Stack from "react-bootstrap/Stack";
import { Form, InputGroup } from "react-bootstrap";
import MonthlyTable from "../MonthlyTable";
import { allRegionData } from "../../calculator/Region";

export default function WasteWaterCalculator({ region }: { region: string | undefined }) {
    const [personCount, setPersonCount] = useState<number>(0);
    const onClick = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        target.select();
    };
    const onChange = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setPersonCount(target.valueAsNumber);
    };
    const monthlyWasteWater = Array<number>(12);
    const monthlyGreyWater = Array<number>(12);
    if (region !== undefined && allRegionData[region] !== undefined) {
        const regionData = allRegionData[region];
        if (regionData.wasteWater !== undefined) {
            monthlyWasteWater.fill(30 * personCount * regionData.wasteWater);
        }
        if (regionData.greyWater !== undefined) {
            monthlyGreyWater.fill(30 * personCount * regionData.greyWater);
        }
    }
    return (
        <>
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
                        { valueName: "Waste Water", unit: "L", monthlyValues: monthlyWasteWater },
                        { valueName: "Grey Water", unit: "L", monthlyValues: monthlyGreyWater }
                    ]
                } />
            </Stack>
        </>
    )
}
