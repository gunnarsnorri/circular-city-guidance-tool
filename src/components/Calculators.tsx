import RainWaterCalculator from "./calculators/RainWaterCalculator";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import WasteWaterCalculator from "./calculators/WasteWaterCalculator";
import { allRegionData } from "../calculator/Region";
import { useState } from "react";
import AlternativeNutrientsCollectionCalculator from "./calculators/AlternativeNutrientsCollection";

export default function Calculators() {
    const [region, setRegion] = useState<string | undefined>(undefined);
    const onChange = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setRegion(target.value);
    }
    return (
        <Stack gap={3}>
            <Form>
                <Form.Group>
                    <Form.Select onChange={onChange}>
                        <option key="default">Region</option>
                        {
                            Object.keys(allRegionData).map((reg: string) => {
                                return <option value={reg} key={reg}>{reg}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>
            </Form>
            <RainWaterCalculator region={region} />
            <WasteWaterCalculator region={region} />
            <AlternativeNutrientsCollectionCalculator region={region} />
        </Stack>
    )
}
