import React, { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";

enum BiomassCalculator {
    GrassClippings = "Grass clippings",
    TreePruningResidues = "Tree Pruning Residues",
    UrbanPlantedBiomass = "Urban Planted Biomass",
    ReedBiomass = "Reed Biomass"
}

enum ManagementPractice {
    Unknown = "Unknown management",
    TwoCut = "2 cut management",
    FourCut = "4 cut management",
    Mulching = "Mulching management"
}

enum WeatherCondition {
    Normal = "Normal year",
    Favourable = "Favourable year"
}

const gcRec: Record<string, Record<string, number>> = {}
gcRec[ManagementPractice.TwoCut] = {};
gcRec[ManagementPractice.FourCut] = {};
gcRec[ManagementPractice.Mulching] = {};
gcRec[ManagementPractice.Unknown] = {};
gcRec[ManagementPractice.TwoCut][WeatherCondition.Normal] = 29.03;
gcRec[ManagementPractice.FourCut][WeatherCondition.Normal] = 16.55;
gcRec[ManagementPractice.Mulching][WeatherCondition.Normal] = 13.94;
gcRec[ManagementPractice.Unknown][WeatherCondition.Normal] = 19.84;
gcRec[ManagementPractice.TwoCut][WeatherCondition.Favourable] = 39.82;
gcRec[ManagementPractice.FourCut][WeatherCondition.Favourable] = 23.88;
gcRec[ManagementPractice.Mulching][WeatherCondition.Favourable] = 25.39;
gcRec[ManagementPractice.Unknown][WeatherCondition.Favourable] = 29.69666667;

function GrassClippingsCalculator() {
    const [area, setArea] = useState<number>(0);
    const [managementPractice, setManagementPractice] = useState<ManagementPractice | undefined>(undefined);
    const [weatherCondition, setWeatherCondition] = useState<WeatherCondition | undefined>(undefined);
    let rec: Record<string, number> | undefined = undefined;
    if (managementPractice !== undefined)
        rec = gcRec[managementPractice];
    let gc = 0;
    if (rec !== undefined && weatherCondition !== undefined)
        gc = rec[weatherCondition] ?? 0;
    const recoveredGrassClippings = area * gc;
    const onChangeManagementProcess = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setManagementPractice(ManagementPractice[target.value as keyof typeof ManagementPractice])
    }
    const onChangeWeatherCondition = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setWeatherCondition(WeatherCondition[target.value as keyof typeof WeatherCondition])
    }
    const onClickInput = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        target.select();
    };
    const onChangeInput = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setArea(target.valueAsNumber);
    };
    return <Stack direction="horizontal" gap={3}>
        <Form>
            <Form.Group>
                <Form.Select onChange={onChangeManagementProcess}>
                    <option value={undefined} key={-1}>Management Practice</option>
                    {
                        (Object.keys(ManagementPractice) as Array<keyof typeof ManagementPractice>).map((key, index) => {
                            return <option value={key} key={index}>{key}</option>
                        })
                    }
                </Form.Select>
                <Form.Select onChange={onChangeWeatherCondition}>
                    <option value={undefined} key={-1}>Weather Conditions</option>
                    {
                        (Object.keys(WeatherCondition) as Array<keyof typeof ManagementPractice>).map((key, index) => {
                            return <option value={key} key={index}>{key}</option>
                        })
                    }
                </Form.Select>
                <InputGroup onClick={onClickInput}>
                    <InputGroup.Text>Area</InputGroup.Text>
                    <Form.Control onChange={onChangeInput} type="number" defaultValue={area} />
                    <InputGroup.Text>m²</InputGroup.Text>
                </InputGroup>
            </Form.Group>
        </Form>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th colSpan={3} className="text-center">Yearly Recovered Grass Clippings</th>
                </tr>
                <tr>
                    <th>Per hectare (t/ha/year)</th>
                    <th>Total (t/year)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{gc}</td>
                    <td>{recoveredGrassClippings}</td>
                </tr>
            </tbody>
        </Table>
    </Stack>
}

export default function BiomassRecoveryCalculatorSelection({ theme }: { theme: string }) {
    const [biomassCalculator, setBiomassCalculator] = useState<BiomassCalculator>(BiomassCalculator.GrassClippings);
    const grassClippingsCalculator = GrassClippingsCalculator();
    let activeContainer: JSX.Element = grassClippingsCalculator;

    const onChange = (bmCalc: BiomassCalculator) => {
        setBiomassCalculator(bmCalc);
        switch (bmCalc) {
            default:
                if (activeContainer !== grassClippingsCalculator)
                    activeContainer = grassClippingsCalculator;
                break;
        }
    }
    return (
        <Stack gap={3}>
            <ButtonGroup>
                {(Object.keys(BiomassCalculator) as Array<keyof typeof BiomassCalculator>).map((key, index) =>
                    <ToggleButton
                        type="radio"
                        key={index}
                        id={key}
                        variant="outline-secondary"
                        name={BiomassCalculator[key]}
                        value={key}
                        checked={biomassCalculator === BiomassCalculator[key]}
                        onChange={(event) => onChange(BiomassCalculator[(event.currentTarget.value as typeof key)])}
                    >{BiomassCalculator[key]}</ToggleButton>
                )}
            </ButtonGroup>
            {activeContainer}
        </Stack>
    )

}
