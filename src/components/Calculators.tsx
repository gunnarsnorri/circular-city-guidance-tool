import AlternativeWaterSourceCalculator from "./calculators/AlternativeWaterSourceCalculator";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import { allRegionData } from "../calculator/Region";
import { useReducer } from "react";
import AlternativeNutrientsCollectionCalculator from "./calculators/AlternativeNutrientsCollection";
import AlternativeNutrientsRevalorisationCalculator from "./calculators/AlternativeNutrientsRevalorisation";
import BiomassRecoveryCalculatorSelection from "./calculators/BiomassRecoveryCalculator";
import CostMedium from "../assets/costmedium.png";
import EU from "../assets/eu.png"
import ReactMarkdown from "react-markdown";
import { GlobalCalcStorage } from "../interfaces/CalculatorInterface";
import GreenRoofCalculator from "./calculators/GreenRoofCalculator";

export const Image = (
    props: React.DetailedHTMLProps<
        React.ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
    >
) => <img style={{ maxWidth: '100%' }}{...props} />

export default function Calculators(theme: string) {
    const [globalStorage, setGlobalStorage] = useReducer((prev: Partial<GlobalCalcStorage>, cur: Partial<GlobalCalcStorage>) => {
        localStorage.setItem('globalCalcStorage', JSON.stringify({ ...prev, ...cur }));
        return {...prev, ...cur};
    }, (JSON.parse(localStorage.getItem('globalCalcStorage') ?? "{}") as Partial<GlobalCalcStorage>) ?? {persons: 0});;

    const onChange = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setGlobalStorage({ region: target.value });
    }
    const costLogo = `![COST](${CostMedium})`;
    const costText = "COST (European Cooperation in Science and Technology) is a funding agency for research and innovation networks. Our Actions help connect research initiatives across Europe and enable scientists to grow their ideas by sharing them with their peers. This boosts their research, career and innovation. [www.cost.eu](www.cost.eu)"
    const euLogo = `![Funded by the European Union](${EU})`;

    return (
        <>
            <Stack gap={3}>

                <Form>
                    <Form.Group>
                        <Form.Select onChange={onChange} value={globalStorage.region ?? undefined}>
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
                        <Accordion.Header>Alternative Water Source</Accordion.Header>
                        <Accordion.Body>
                            <AlternativeWaterSourceCalculator
                                globalStorage={globalStorage}
                                setGlobalStorage={setGlobalStorage}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Alternative Nutrients Collection</Accordion.Header>
                        <Accordion.Body>
                            <AlternativeNutrientsCollectionCalculator
                                globalStorage={globalStorage}
                                setGlobalStorage={setGlobalStorage}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Alternative Nutrients Revalorisation</Accordion.Header>
                        <Accordion.Body>
                            <AlternativeNutrientsRevalorisationCalculator
                                globalStorage={globalStorage}
                                setGlobalStorage={setGlobalStorage}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Biomass Recovery</Accordion.Header>
                        <Accordion.Body>
                            <BiomassRecoveryCalculatorSelection />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Green Roof</Accordion.Header>
                        <Accordion.Body>
                            <GreenRoofCalculator />
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
