import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import "../../styles/calculator.css";
import { allNBSSystems, NBSSystem } from "../../calculator/NBSSystem";
import { allRegionData } from "../../calculator/Region";
import MonthlyTable from "../MonthlyTable";

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


export default function RainWaterCalculator({ region }: { region: string | undefined }) {
    const [surfaceRunoff, setSurfaceRunoff] = useState<Array<number>>(Array<number>(12));
    const [toggleState, setToggleState] = useState<boolean>(false);

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
                        {allNBSSystems.map((nbsSystem) => {
                            return (
                                <AreaInputGroup nbsSystem={nbsSystem} key={nbsSystem.name as string} toggleState={toggleState} setToggleState={setToggleState}/>
                            )
                        })}
                    </Form.Group>
                </Form>
                <MonthlyTable columns={[{ valueName: "Surface Runoff", unit: "L", monthlyValues: surfaceRunoff }]} />
            </Stack>
        </>
    )
}
