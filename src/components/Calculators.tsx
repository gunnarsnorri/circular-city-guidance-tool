import RainWaterCalculator from "./calculators/RainWaterCalculator";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import WasteWaterCalculator from "./calculators/WasteWaterCalculator";
import { allRegionData } from "../calculator/Region";
import { useState } from "react";
import AlternativeNutrientsCollectionCalculator from "./calculators/AlternativeNutrientsCollection";
import AlternativeNutrientsRevalorisationCalculator from "./calculators/AlternativeNutrientsRevalorisation";

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
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Rain Water</Accordion.Header>
                    <Accordion.Body>

                        <RainWaterCalculator region={region} />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Waste Water</Accordion.Header>
                    <Accordion.Body>

                        <WasteWaterCalculator region={region} />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Alternative Nutrients Collection</Accordion.Header>
                    <Accordion.Body>
                        <AlternativeNutrientsCollectionCalculator region={region} />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Alternative Nutrients Revalorisation</Accordion.Header>
                    <Accordion.Body>
                        <AlternativeNutrientsRevalorisationCalculator region={region} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Stack>
    )
}
