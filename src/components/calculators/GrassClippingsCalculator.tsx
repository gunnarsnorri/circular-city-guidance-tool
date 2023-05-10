import { useReducer } from "react";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import AreaInput from "../AreaInput";

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

type GrassClippingsCalcStorage = {
    managementPractice: keyof typeof ManagementPractice,
    weatherCondition: keyof typeof WeatherCondition
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

export default function GrassClippingsCalculator(area: number, setArea: Function) {
    const [stateStorage, setStateStorage] = useReducer((prev: Partial<GrassClippingsCalcStorage>, cur: Partial<GrassClippingsCalcStorage>) => {
        localStorage.setItem('grassClippingsCalcStorage', JSON.stringify({ ...prev, ...cur }));
        return { ...prev, ...cur };
    }, (JSON.parse(localStorage.getItem('grassClippingsCalcStorage') ?? "{}") as Partial<GrassClippingsCalcStorage>) ?? { area: 0 });;
    let managementPractice: ManagementPractice | undefined = undefined
    if (stateStorage.managementPractice !== undefined)
        managementPractice = ManagementPractice[stateStorage.managementPractice];
    let weatherCondition: WeatherCondition | undefined = undefined
    if (stateStorage.weatherCondition !== undefined)
        weatherCondition = WeatherCondition[stateStorage.weatherCondition];
    let rec: Record<string, number> | undefined = undefined;
    if (managementPractice !== undefined)
        rec = gcRec[managementPractice];
    let gc = 0;
    if (rec !== undefined && weatherCondition !== undefined)
        gc = rec[weatherCondition] ?? 0;
    const recoveredGrassClippings = Math.round(area * gc);
    const bioPolymerRatio = 13.455;
    const bioPolymer = bioPolymerRatio / 1000 * recoveredGrassClippings;
    const onChangeManagementProcess = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setStateStorage({ managementPractice: target.value as keyof typeof ManagementPractice })
    }
    const onChangeWeatherCondition = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setStateStorage({ weatherCondition: target.value as keyof typeof WeatherCondition })
    }
    const onChangeInput = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        setArea(target.valueAsNumber);
    };
    return (
        <Stack direction="horizontal" gap={3}>
            <Form>
                <Form.Group>
                    <Form.Select value={stateStorage.managementPractice} onChange={onChangeManagementProcess}>
                        <option value={undefined} key={-1}>Management Practice</option>
                        {
                            (Object.keys(ManagementPractice) as Array<keyof typeof ManagementPractice>).map((key, index) => {
                                return <option value={key} key={index}>{ManagementPractice[key]}</option>
                            })
                        }
                    </Form.Select>
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
                        <th colSpan={2} className="text-center">Yearly Recovered Grass Clippings</th>
                        <th colSpan={2} className="text-center">Biopolymer Granules Yield</th>
                    </tr>
                    <tr>
                        <th>Per hectare (t/ha/year)</th>
                        <th>Total (t/year)</th>
                        <th>Per tonne of grass clippings (kg/t)</th>
                        <th>Total (kg)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{gc}</td>
                        <td>{recoveredGrassClippings}</td>
                        <td>{bioPolymerRatio}</td>
                        <td>{bioPolymer}</td>
                    </tr>
                </tbody>
            </Table>
        </Stack>
    )
}
