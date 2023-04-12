import RainWaterCalculator from "./calculators/RainWaterCalculator";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import WasteWaterCalculator from "./calculators/WasteWaterCalculator";
import { allRegionData } from "../calculator/Region";
import { useState } from "react";
import AlternativeNutrientsCollectionCalculator from "./calculators/AlternativeNutrientsCollection";
import AlternativeNutrientsRevalorisationCalculator from "./calculators/AlternativeNutrientsRevalorisation";
import BiomassRecoveryCalculatorSelection from "./calculators/BiomassRecoveryCalculator";
import CostMedium from "../assets/costmedium.png";
import EU from "../assets/eu.png"
import ReactMarkdown from "react-markdown";

export const Image = (
    props: React.DetailedHTMLProps<
        React.ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
    >
) => <img style={{ maxWidth: '100%' }}{...props} />

export default function Calculators(theme: string) {
    const [region, setRegion] = useState<string | undefined>(undefined);
    const onChange = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setRegion(target.value);
    }
    const costLogo = `![COST](${CostMedium})`;
    const costText = "COST (European Cooperation in Science and Technology) is a funding agency for research and innovation networks. Our Actions help connect research initiatives across Europe and enable scientists to grow their ideas by sharing them with their peers. This boosts their research, career and innovation. [www.cost.eu](www.cost.eu)"
    const euLogo = `![Funded by the European Union](${EU})`;
    return (
        <>
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
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Biomass Recovery</Accordion.Header>
                        <Accordion.Body>
                            <BiomassRecoveryCalculatorSelection theme={theme} />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Stack>
            <Col>
                <ReactMarkdown children={costLogo} components={{ img: Image }} />
            </Col>
            <Col xs={6} className="calculator-footer">
                <ReactMarkdown children={costText} />
            </Col>
            <Col>
                <ReactMarkdown children={euLogo} components={{ img: Image }} />
            </Col>
        </>
    )
}
