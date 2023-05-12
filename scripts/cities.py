from pathlib import Path
import pandas as pd
import json

cities = ["Vienna", "Berlin", "Copenhagen", "Lisbon", "Rome", "Istanbul", "TelAviv"]

base_dir = Path(__file__).parent.parent / "src/data/json/cities"

month_days = {
    "January": 31,
    "February": 28,
    "March": 31,
    "April": 30,
    "May": 31,
    "June": 30,
    "July": 31,
    "August": 31,
    "September": 30,
    "October": 31,
    "November": 30,
    "December": 31,
}

for city in cities:
    csv_filename = base_dir / f"{city}.csv"
    output_json_filename = base_dir / f"{city}.json"
    city_data = pd.read_csv(csv_filename, delimiter="\t")
    monthly_data = city_data.iloc[:0, :].copy()
    start = 0
    for days in month_days.values():
        end = start + days
        monthly_data.loc[len(monthly_data)] = city_data.iloc[start:end].sum()
        start = end
    json_data = monthly_data.to_json(output_json_filename, indent=2, orient="records")
