import Table from "react-bootstrap/Table";
import { MonthlyTableProps } from "../interfaces/ComponentProps";

export default function MonthlyTable(props: MonthlyTableProps) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
        <Table className={props.className} striped bordered hover>
            <thead>
                <tr>
                    <th>Month</th>
                    {props.columns.map((column) => {
                        return <th key={`col-${column.valueName}`}>{column.valueName} ({column.unit})</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {months.map((month, index) => {
                    return (
                        <tr key={month}>
                            <td>{month}</td>
                            {props.columns.map((column) => {
                                return <td key={`${month}-${column.valueName}`}>{column.monthlyValues[index]}</td>
                            })}
                        </tr>
                    )
                })}
                <tr key="total">
                    <th>Total</th>
                            {props.columns.map((column) => {
                                return <th key={`total-${column.valueName}`}>{column.monthlyValues.reduce((a, b) => a + b, 0)} {column.unit}</th>
                            })}
                </tr>
            </tbody>
        </Table>
    )
}
