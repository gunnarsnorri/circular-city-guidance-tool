import { Form, InputGroup } from "react-bootstrap";
import { GlobalCalcStorage } from "../interfaces/CalculatorInterface";

export default function PersonForm({ globalStorage, setGlobalStorage }: { globalStorage: Partial<GlobalCalcStorage>, setGlobalStorage: Function }) {
    const onClick = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        target.select();
    };
    const onChange = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        const val = (Number.isNaN(target.valueAsNumber)) ? 0 : target.valueAsNumber;
        setGlobalStorage({ persons: val });
    };
    return (

        <InputGroup onClick={onClick}>
            <InputGroup.Text>Number of people</InputGroup.Text>
            <Form.Control onChange={onChange} type="number" value={globalStorage.persons ?? 0} />
            <InputGroup.Text>persons</InputGroup.Text>
        </InputGroup>
    )
}
