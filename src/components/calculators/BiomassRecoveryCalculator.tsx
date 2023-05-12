import { useReducer, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Stack from "react-bootstrap/Stack";
import GrassClippingsCalculator from "./GrassClippingsCalculator";
import TreePruningResiduesCalculator from "./TreePruningResiduesCalculator";
import UrbanPlantedBiomassCalculator from "./UrbanPlantedBiomassCalculator";
import ReedBiomassCalculator from "./ReedBiomassCalculator";

enum BiomassCalculator {
    GrassClippings = "Grass clippings",
    TreePruningResidues = "Tree Pruning Residues",
    UrbanPlantedBiomass = "Urban Planted Biomass",
    ReedBiomass = "Reed Biomass"
}

export default function BiomassRecoveryCalculatorSelection() {
    const [biomassCalculator, setBiomassCalculator] = useState<BiomassCalculator>(BiomassCalculator.GrassClippings);
    const [area, setArea] = useReducer((prev: number, cur: number) => {
        localStorage.setItem('grassClippingsArea', cur.toString());
        return cur;
    }, (JSON.parse(localStorage.getItem('grassClippingsArea') ?? "0") as number) ?? 0);;
    const grassClippingsCalculator = GrassClippingsCalculator(area, setArea);
    const treePruningResiduesCalculator = TreePruningResiduesCalculator(area, setArea);
    const urbanPlantedBiomassCalculator = UrbanPlantedBiomassCalculator();
    const reedBiomassCalculator = ReedBiomassCalculator();
    let activeContainer: JSX.Element = grassClippingsCalculator;
    switch (biomassCalculator) {
        case BiomassCalculator.TreePruningResidues:
            if (activeContainer !== treePruningResiduesCalculator)
                activeContainer = treePruningResiduesCalculator;
            break;
        case BiomassCalculator.UrbanPlantedBiomass:
            if (activeContainer !== urbanPlantedBiomassCalculator)
                activeContainer = urbanPlantedBiomassCalculator;
            break;
        case BiomassCalculator.ReedBiomass:
            if (activeContainer !== reedBiomassCalculator)
                activeContainer = reedBiomassCalculator;
            break;
        case BiomassCalculator.GrassClippings:
        default:
            if (activeContainer !== grassClippingsCalculator)
                activeContainer = grassClippingsCalculator;
            break;
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
                        onChange={(event) => setBiomassCalculator(BiomassCalculator[(event.currentTarget.value as typeof key)])}
                    >{BiomassCalculator[key]}</ToggleButton>
                )}
            </ButtonGroup>
            {activeContainer}
        </Stack>
    )

}
