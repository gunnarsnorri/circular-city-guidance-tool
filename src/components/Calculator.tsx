import React, { useEffect, useState } from "react";
import { Form, InputGroup, Table } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import "../styles/calculator.css"
import { allNBSSystems, NBSSystem } from "../calculator/NBSSystem";
import { allRegionData } from "../calculator/Region";

interface NumberInputGroupProps {
    nbsSystem: NBSSystem;
    children: React.ReactNode | Array<React.ReactNode>;
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

interface SurfaceRunoffTableProps {
    surfaceRunoff: Array<number>;
}

const SurfaceRunoffTable = (props: SurfaceRunoffTableProps) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Month</th>
                    <th>Surface Runoff (L)</th>
                </tr>
            </thead>
            <tbody>
                {months.map((month, index) => {
                    return (
                        <tr key={month}>
                            <td>{month}</td>
                            <td>{props.surfaceRunoff[index]}</td>
                        </tr>
                    )
                })}
                <tr key="total">
                    <th>Total</th>
                    <th>{props.surfaceRunoff.reduce((a,b)=>a+b, 0)} L</th>
                </tr>
            </tbody>
        </Table>
    )
}

export default function Calculator() {
    const [surfaceRunoff, setSurfaceRunoff] = useState<Array<number>>(Array<number>(12));
    const [region, setRegion] = useState<string | undefined>(undefined);
    const [toggleState, setToggleState] = useState<boolean>(false);
    const onChange = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setRegion(target.value);
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
        <Stack gap={3}>
            <Stack direction="horizontal" gap={3}>
                <Form>
                    <Form.Group>
                        <Form.Select onChange={onChange}>
                            <option key="default">Region</option>
                            {
                                Object.keys(allRegionData).map((reg: string) => {
                                    if (allRegionData[reg]["monthlyRainfall"] !== undefined)
                                        return <option value={reg} key={reg}>{reg}</option>
                                    else
                                        return <></>
                                })
                            }
                        </Form.Select>
                        {allNBSSystems.map((nbsSystem) => {
                            return (
                                <AreaInputGroup nbsSystem={nbsSystem} key={nbsSystem.name as string} toggleState={toggleState} setToggleState={setToggleState}>
                                </AreaInputGroup>
                            )
                        })}
                    </Form.Group>
                </Form>
            </Stack>
            <SurfaceRunoffTable surfaceRunoff={surfaceRunoff} />
        </Stack>
    )
}
