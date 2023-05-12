import { useReducer } from "react";
import { Form, InputGroup, Stack } from "react-bootstrap";
import { allCityData } from "../../calculator/City";
import { MonthlyColumn } from "../../interfaces/ComponentProps";
import MonthlyTable from "../MonthlyTable";

enum Orientation {
    ET0_hor = "Roof",
    ET0_north = "North wall",
    ET0_east = "East wall",
    ET0_south = "South wall",
    ET0_west = "West wall",
}

type GrassClippingsCalcStorage = {
    orientation: keyof typeof Orientation,
    cropFactor: number,
    city: string
}

export default function GreenRoofCalculator() {
    const [stateStorage, setStateStorage] = useReducer((prev: Partial<GrassClippingsCalcStorage>, cur: Partial<GrassClippingsCalcStorage>) => {
        localStorage.setItem('greenRoofCalcStorage', JSON.stringify({ ...prev, ...cur }));
        return { ...prev, ...cur };
    }, (JSON.parse(localStorage.getItem('greenRoofCalcStorage') ?? '{"cropFactor": 1}') as Partial<GrassClippingsCalcStorage>));;
    let monthlyEvapoTranspiration = Array<number>(12);
    let monthlyEvaporation = Array<number>(12);
    let monthlyEnergySaved = Array<number>(12);
    let monthlyACUnitEquivalent = Array<number>(12);
    const daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (stateStorage.city !== undefined && allCityData[stateStorage.city] !== undefined) {
        const cityData = allCityData[stateStorage.city]
        monthlyEvapoTranspiration = cityData.map((cityData) => {
            if (stateStorage.orientation !== undefined)
                return cityData[stateStorage.orientation]
            else
                return 0
        })
        monthlyEvaporation = monthlyEvapoTranspiration.map((et0) => et0 * (stateStorage.cropFactor ?? 1.0));
        monthlyEnergySaved = monthlyEvaporation.map((etc) => etc * 0.680555555555);
        monthlyACUnitEquivalent = monthlyEnergySaved.map((energy, index) => 68.58 * daysOfMonth[index] / energy);
    }

    const roundArray = (arr: Array<number>, pow = 0) => arr.map((ele) => {
        const deci = 10 ** pow;
        return Math.round(ele * deci) / deci;
    });

    const columns: Array<MonthlyColumn> = [
        { valueName: "Evaporation", unit: "mm/month", monthlyValues: roundArray(monthlyEvaporation, 2) },
        { valueName: "Energy Saved", unit: "kWh/m²", monthlyValues: roundArray(monthlyEnergySaved, 2) },
        { valueName: "Area Equivalence for 1 AC unit", unit: "m²", monthlyValues: roundArray(monthlyACUnitEquivalent, 2) },
    ]

    const onChangeCity = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setStateStorage({ city: target.value });
    }

    const onChangeOrientation = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setStateStorage({ orientation: target.value as keyof typeof Orientation })
    }

    const onClickCropFactor = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        target.select();
    };

    const onChangeCropFactor = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setStateStorage({ cropFactor: target.valueAsNumber });
    };

    return (
        <Stack direction="horizontal" gap={3}>
            <Form onSubmit={(event) => {event.preventDefault()}}>
                <Form.Group>
                    <Form.Select onChange={onChangeCity} value={stateStorage.city ?? undefined}>
                        <option key="default">Region</option>
                        {
                            Object.keys(allCityData).map((city: string) => {
                                return <option value={city} key={city}>{city}</option>
                            })
                        }
                    </Form.Select>
                    <Form.Select value={stateStorage.orientation} onChange={onChangeOrientation}>
                        <option value={undefined} key={-1}>Orientation</option>
                        {
                            (Object.keys(Orientation) as Array<keyof typeof Orientation>).map((key, index) => {
                                return <option value={key} key={index}>{Orientation[key]}</option>
                            })
                        }
                    </Form.Select>
                    <InputGroup  onClick={onClickCropFactor}>
                        <InputGroup.Text>Crop Factor</InputGroup.Text>
                        <Form.Control onChange={onChangeCropFactor} type="number" min={0.8} max={1.3} step={0.01} defaultValue={stateStorage.cropFactor} />
                    </InputGroup>
                </Form.Group>
            </Form>
            <MonthlyTable columns={columns}></MonthlyTable>
        </Stack>
    )
}
