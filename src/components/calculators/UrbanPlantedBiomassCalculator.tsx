import { useReducer } from "react";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import AreaInput from "../AreaInput";

enum WeatherCondition {
    Normal = "Normal year",
    HighPrecipitation = "High precipitation year"
}

type UrbanPlantedBMCalcStorage = {
    area: number,
    weatherCondition: keyof typeof WeatherCondition
}

const upRec: Record<string, number> = {}
upRec[WeatherCondition.Normal] = 8.0;
upRec[WeatherCondition.HighPrecipitation] = 13.5;


export default function UrbanPlantedBiomassCalculator() {
    const [stateStorage, setStateStorage] = useReducer((prev: Partial<UrbanPlantedBMCalcStorage>, cur: Partial<UrbanPlantedBMCalcStorage>) => {
        localStorage.setItem('urbanPlantedBMCalcStorage', JSON.stringify({ ...prev, ...cur }));
        return { ...prev, ...cur };
    }, (JSON.parse(localStorage.getItem('urbanPlantedBMCalcStorage') ?? "{}") as Partial<UrbanPlantedBMCalcStorage>) ?? { area: 0 });
    const area = stateStorage.area ?? 0;
    let up: number = 0;
    if (stateStorage.weatherCondition !== undefined)
        up = upRec[WeatherCondition[stateStorage.weatherCondition]];
    const bioMassMixedUrbanGreenery = up * area;
    const bioMethanePerKg = 40.8;
    const bioMethane = bioMassMixedUrbanGreenery * bioMethanePerKg * 1000;

    const onChangeWeatherCondition = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setStateStorage({ weatherCondition: target.value as keyof typeof WeatherCondition })
    }
    const onChangeInput = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setStateStorage({ area: target.valueAsNumber });
    };

    return (
        <Stack direction="horizontal" gap={3}>
            <Form>
                <Form.Group>
                    <Form.Select value={stateStorage.weatherCondition} onChange={onChangeWeatherCondition}>
                        <option value={undefined} key={-1}>Weather Conditions</option>
                        {
                            (Object.keys(WeatherCondition) as Array<keyof typeof WeatherCondition>).map((key, index) => {
                                return <option value={key} key={index}>{WeatherCondition[key]}</option>
                            })
                        }
                    </Form.Select>
                    <AreaInput defaultValue={area} onChangeInput={onChangeInput}/>
                </Form.Group>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th colSpan={2} className="text-center">Urban Planted Biomass (multiple sources)</th>
                        <th colSpan={2} className="text-center">Biomethane Yield</th>
                    </tr>
                    <tr>
                        <th>Per hectare (t/ha/year)</th>
                        <th>Total (t/year)</th>
                        <th>Per kg of biomass residue (L/kg)</th>
                        <th>Total (L/year)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{up}</td>
                        <td>{bioMassMixedUrbanGreenery}</td>
                        <td>{bioMethanePerKg}</td>
                        <td>{bioMethane}</td>
                    </tr>
                </tbody>
            </Table>
        </Stack>
    )
}
