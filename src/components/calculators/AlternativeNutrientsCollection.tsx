import Stack from "react-bootstrap/Stack";
import { Form, Table } from "react-bootstrap";
import { allRegionData } from "../../calculator/Region";
import { GlobalCalcStorage } from "../../interfaces/CalculatorInterface";
import PersonForm from "../PersonForm";

export default function AlternativeNutrientsCollectionCalculator({ globalStorage, setGlobalStorage }: { globalStorage: Partial<GlobalCalcStorage>, setGlobalStorage: Function }) {
    let dailyBlackWater: number | undefined = undefined;
    let dailyYellowWater: number | undefined = undefined;
    let dailyBrownWater: number | undefined = undefined;
    let monthlyBlackWater: number | undefined = undefined;
    let monthlyYellowWater: number | undefined = undefined;
    let monthlyBrownWater: number | undefined = undefined;
    let yearlyBlackWater: number | undefined = undefined;
    let yearlyYellowWater: number | undefined = undefined;
    let yearlyBrownWater: number | undefined = undefined;
    if (globalStorage.region !== undefined && allRegionData[globalStorage.region] !== undefined) {
        const regionData = allRegionData[globalStorage.region];
        if (regionData.blackWater !== undefined) {
            dailyBlackWater = (globalStorage.persons ?? 0) * regionData.blackWater;
            monthlyBlackWater = 30 * dailyBlackWater;
            yearlyBlackWater = 365 * dailyBlackWater;
        }
        if (regionData.yellowWater !== undefined) {
            dailyYellowWater = (globalStorage.persons ?? 0) * regionData.yellowWater;
            monthlyYellowWater = 30 * dailyYellowWater;
            yearlyYellowWater = 365 * dailyYellowWater;
        }
        if (regionData.brownWater !== undefined) {
            dailyBrownWater = (globalStorage.persons ?? 0) * regionData.brownWater;
            monthlyBrownWater = 30 * dailyBrownWater;
            yearlyBrownWater = 365 * dailyBrownWater;
        }
    }
    return (
        <Stack direction="horizontal" gap={3}>
            <Form>
                <Form.Group>
                    <PersonForm globalStorage={globalStorage} setGlobalStorage={setGlobalStorage} />
                </Form.Group>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Black Water (L)</th>
                        <th>Yellow Water (L)</th>
                        <th>Brown Water (L)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Daily</td>
                        <td>{dailyBlackWater}</td>
                        <td>{dailyYellowWater}</td>
                        <td>{dailyBrownWater}</td>
                    </tr>
                    <tr>
                        <td>Monthly</td>
                        <td>{monthlyBlackWater}</td>
                        <td>{monthlyYellowWater}</td>
                        <td>{monthlyBrownWater}</td>
                    </tr>
                    <tr>
                        <td>Yearly</td>
                        <td>{yearlyBlackWater}</td>
                        <td>{yearlyYellowWater}</td>
                        <td>{yearlyBrownWater}</td>
                    </tr>
                </tbody>
            </Table>
        </Stack>
    )
}
