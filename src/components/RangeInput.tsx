import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";

export default function SliderWithInputFormControl() {

    const [value, setValue] = useState(25);

    return (
        <Form.Group as={Row}>
            <Form.Label column sm="4">
                Crop Factor
            </Form.Label>
            <Col sm={8}>
                <RangeSlider
                    value={value}
                    onChange={e => setValue(e.target.valueAsNumber)}
                    variant="secondary"
                />
            </Col>
        </Form.Group>
    );

};
