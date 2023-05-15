import AlternativeWaterSourceCalculator from "./calculators/AlternativeWaterSourceCalculator";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import { allRegionData } from "../calculator/Region";
import { useReducer, useState } from "react";
import AlternativeNutrientsCollectionCalculator from "./calculators/AlternativeNutrientsCollection";
import AlternativeNutrientsRevalorisationCalculator from "./calculators/AlternativeNutrientsRevalorisation";
import BiomassRecoveryCalculatorSelection from "./calculators/BiomassRecoveryCalculator";
import { GlobalCalcStorage } from "../interfaces/CalculatorInterface";
import GreenRoofCalculator from "./calculators/GreenRoofCalculator";
import Info from "./Info";
import { calculatorTexts } from "../texts";
import { Stack } from "react-bootstrap";

export default function Calculators(navbarHeight: number) {
    const [textId, setTextId] = useState("default");
    const [globalStorage, setGlobalStorage] = useReducer((prev: Partial<GlobalCalcStorage>, cur: Partial<GlobalCalcStorage>) => {
        localStorage.setItem('globalCalcStorage', JSON.stringify({ ...prev, ...cur }));
        return { ...prev, ...cur };
    }, (JSON.parse(localStorage.getItem('globalCalcStorage') ?? "{}") as Partial<GlobalCalcStorage>) ?? { persons: 0 });;

    const onChange = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setGlobalStorage({ region: target.value });
    }

    return (
        <>
            <Col sm={8} md={8} lg={8}>
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
                    <Accordion onSelect={(eventKey) => setTextId((eventKey?.toString()) ?? "calculator")}>
                        <Accordion.Item eventKey="aws">
                            <Accordion.Header>Alternative Water Source</Accordion.Header>
                            <Accordion.Body>
                                <AlternativeWaterSourceCalculator
                                    globalStorage={globalStorage}
                                    setGlobalStorage={setGlobalStorage}
                                />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="anc">
                            <Accordion.Header>Alternative Nutrients Collection</Accordion.Header>
                            <Accordion.Body>
                                <AlternativeNutrientsCollectionCalculator
                                    globalStorage={globalStorage}
                                    setGlobalStorage={setGlobalStorage}
                                />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="anr">
                            <Accordion.Header>Alternative Nutrients Revalorisation</Accordion.Header>
                            <Accordion.Body>
                                <AlternativeNutrientsRevalorisationCalculator
                                    globalStorage={globalStorage}
                                    setGlobalStorage={setGlobalStorage}
                                />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="br">
                            <Accordion.Header>Biomass Recovery</Accordion.Header>
                            <Accordion.Body>
                                <BiomassRecoveryCalculatorSelection />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="gr">
                            <Accordion.Header>Green Roof</Accordion.Header>
                            <Accordion.Body>
                                <GreenRoofCalculator />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Stack>
            </Col >
            <Col sm={4} md={4} lg={4} style={{ overflowY: "auto", height: `calc(100vh - ${navbarHeight ?? 0}px)` }}>
                <Info texts={calculatorTexts} textId={textId} />
            </Col>
        </>
    )
}
