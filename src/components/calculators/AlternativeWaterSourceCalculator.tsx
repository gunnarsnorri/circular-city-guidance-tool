import React, { useEffect, useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import "../../styles/calculator.css";
import { allNBSSystems, NBSSystem } from "../../calculator/NBSSystem";
import { allRegionData } from "../../calculator/Region";
import MonthlyTable from "../MonthlyTable";
import { GlobalCalcStorage } from "../../interfaces/CalculatorInterface";
import PersonForm from "../PersonForm";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface NumberInputGroupProps {
    nbsSystem: NBSSystem;
    toggleState: boolean;
    setToggleState: Function;
}

const AreaInputGroup = (props: NumberInputGroupProps) => {
    const onClick = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        target.select();
    };
    const onChange = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        const val = (Number.isNaN(target.valueAsNumber)) ? 0 : target.valueAsNumber;
        props.nbsSystem.setArea(val);
        props.setToggleState(!props.toggleState);
    };

    return (
        <InputGroup onClick={onClick}>
            <InputGroup.Text>{props.nbsSystem.name}</InputGroup.Text>
            <Form.Control onChange={onChange} type="number" defaultValue={props.nbsSystem.area} />
            <InputGroup.Text>m²</InputGroup.Text>
        </InputGroup>
    )
}

const AWSBarChart = ({ surfaceRunoff, monthlyGreyWater, monthlyWasteWater }: { surfaceRunoff: Array<number>, monthlyGreyWater: Array<number>, monthlyWasteWater: Array<number> }) => {
    const options: ChartOptions<"bar"> = {
        responsive: true,
        aspectRatio: 1.2,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            }
        },
        interaction: {
            intersect: false,
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true
            },
        },
        datasets: {
            bar: {
                barThickness: 10,
                maxBarThickness: 15
            }
        }
    };
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const chartData = {
        labels,
        datasets: [
            {
                label: "Surface Runoff",
                data: surfaceRunoff,
                backgroundColor: "#A2D729",
                stack: "Stack 0"
            },
            {
                label: "Greywater",
                data: monthlyGreyWater,
                backgroundColor: "#6699CC",
                stack: "Stack 1"

            },
            {
                label: "Waste Water",
                data: monthlyWasteWater,
                backgroundColor: "#60637C",
                stack: "Stack 1"

            },
        ]
    }
    return <Bar options={options} data={chartData} />;
}

export default function AlternativeWaterSourceCalculator({ globalStorage, setGlobalStorage }: { globalStorage: Partial<GlobalCalcStorage>, setGlobalStorage: Function }) {
    const [surfaceRunoff, setSurfaceRunoff] = useState<Array<number>>(Array<number>(12));
    const [toggleState, setToggleState] = useState<boolean>(false);

    const monthlyWasteWater = Array<number>(12);
    const monthlyGreyWater = Array<number>(12);
    if (globalStorage.region !== undefined && allRegionData[globalStorage.region] !== undefined) {
        const regionData = allRegionData[globalStorage.region];
        if (regionData.wasteWater !== undefined) {
            monthlyWasteWater.fill(30 * (globalStorage.persons ?? 0) * regionData.wasteWater);
        }
        if (regionData.greyWater !== undefined) {
            monthlyGreyWater.fill(30 * (globalStorage.persons ?? 0) * regionData.greyWater);
        }
    }

    useEffect(() => {
        if (globalStorage.region !== undefined && allRegionData[globalStorage.region] !== undefined) {
            const regionData = allRegionData[globalStorage.region];
            if (regionData.monthlyRainfall !== undefined) {
                const runoff = regionData.monthlyRainfall.map((rainfall) => {
                    return allNBSSystems.map(nbsSystem => nbsSystem.surfaceRunoff(rainfall)).reduce((a, b) => a + b)
                })
                setSurfaceRunoff(runoff);
            }
        }
    }, [globalStorage.region, toggleState])



    return (
        <Row>
            <Col xs={3} md={3} lg={3}>
                <Form onSubmit={(event) => { event.preventDefault() }}>
                    <Form.Group>
                        <PersonForm globalStorage={globalStorage} setGlobalStorage={setGlobalStorage} />
                        {allNBSSystems.map((nbsSystem) => {
                            return (
                                <AreaInputGroup nbsSystem={nbsSystem} key={nbsSystem.name as string} toggleState={toggleState} setToggleState={setToggleState} />
                            )
                        })}
                    </Form.Group>
                </Form>
            </Col>
            <Col xs={3} md={3} lg={3}>
                <MonthlyTable total columns={[{ valueName: "Surface Runoff", unit: "L", monthlyValues: surfaceRunoff }]} />
            </Col>
            <Col xs={6} md={6} lg={6}>
                <AWSBarChart surfaceRunoff={surfaceRunoff} monthlyGreyWater={monthlyGreyWater} monthlyWasteWater={monthlyWasteWater} />
            </Col>
        </Row>
    )
}
