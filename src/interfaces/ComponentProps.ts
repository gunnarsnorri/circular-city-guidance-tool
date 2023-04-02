export interface NavigatorProps {
    navbarHeight: number,
    theme: string
}

export interface MonthlyColumn {
    valueName: String;
    unit: String;
    monthlyValues: Array<number>;
}

export interface MonthlyTableProps {
    columns: Array<MonthlyColumn>;
}
