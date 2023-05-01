import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import "../../styles/calculator.css";
import { allNBSSystems, NBSSystem } from "../../calculator/NBSSystem";
import { allRegionData } from "../../calculator/Region";
import MonthlyTable from "../MonthlyTable";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
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
        props.nbsSystem.setArea(target.valueAsNumber);
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
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Bar Chart',
            },
        },
        interaction: {
            intersect: false,
        },
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        }
    };
    const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novermber", "December"];
    const chartData = {
        labels,
        datasets: [
            {
                label: "Surface Runoff",
                data: surfaceRunoff,
                backgroundColor: "red",
                stack: "Stack 0"
            },
            {
                label: "Greywater",
                data: monthlyGreyWater,
                backgroundColor: "blue",
                stack: "Stack 1"

            },
            {
                label: "Waste Water",
                data: monthlyWasteWater,
                backgroundColor: "green",
                stack: "Stack 1"

            },
        ]
    }
    return <Bar options={options} data={chartData} />;
}


export default function AlternativeWaterSourceCalculator({ region }: { region: string | undefined }) {
    const [surfaceRunoff, setSurfaceRunoff] = useState<Array<number>>(Array<number>(12));
    const [toggleState, setToggleState] = useState<boolean>(false);
    const [personCount, setPersonCount] = useState<number>(0);
    const onClickPersons = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        target.select();
    };
    const onChangePersons = (event: React.FormEvent<HTMLElement>) => {
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

    useEffect(() => {
        if (region !== undefined && allRegionData[region] !== undefined) {
            const regionData = allRegionData[region];
            if (regionData.monthlyRainfall !== undefined) {
                const runoff = regionData.monthlyRainfall.map((rainfall) => {
                    return allNBSSystems.map(nbsSystem => nbsSystem.surfaceRunoff(rainfall)).reduce((a, b) => a + b)
                })
                setSurfaceRunoff(runoff);
            }
        }
    }, [region, toggleState])



    return (
        <>
            <Stack direction="horizontal" gap={3}>
                <Form>
                    <Form.Group>
                        <InputGroup onClick={onClickPersons}>
                            <InputGroup.Text>Number of people</InputGroup.Text>
                            <Form.Control onChange={onChangePersons} type="number" defaultValue={0} />
                            <InputGroup.Text>persons</InputGroup.Text>
                        </InputGroup>
                        {allNBSSystems.map((nbsSystem) => {
                            return (
                                <AreaInputGroup nbsSystem={nbsSystem} key={nbsSystem.name as string} toggleState={toggleState} setToggleState={setToggleState} />
                            )
                        })}
                    </Form.Group>
                </Form>
                <MonthlyTable className="alt-water-table" columns={[{ valueName: "Surface Runoff", unit: "L", monthlyValues: surfaceRunoff }]} />
                <AWSBarChart surfaceRunoff={surfaceRunoff} monthlyGreyWater={monthlyGreyWater} monthlyWasteWater={monthlyWasteWater} />
            </Stack>
        </>
    )
}
