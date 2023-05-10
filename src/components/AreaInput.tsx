import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { ChangeEventHandler } from "react";

export default function AreaInput({defaultValue, onChangeInput}: {defaultValue: number, onChangeInput: ChangeEventHandler<HTMLInputElement>}) {
    const onClickInput = (event: React.FormEvent<HTMLElement>) => {
        const target = event.target as HTMLInputElement;
        target.select();
    };

    return (
        <InputGroup onClick={onClickInput}>
            <InputGroup.Text>Area</InputGroup.Text>
            <Form.Control onChange={onChangeInput} type="number" defaultValue={defaultValue} />
            <InputGroup.Text>ha</InputGroup.Text>
        </InputGroup>
    )
}
