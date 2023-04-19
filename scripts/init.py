from pathlib import Path
import pandas as pd
import json


scripts_dir = Path(__file__).parent
excel_data = pd.read_excel(scripts_dir / "connections.xlsx")
excel_data.iloc[:, :6] = excel_data.iloc[:, :6].fillna(method="ffill")
excel_data = excel_data.dropna()
unique_units = excel_data.iloc[:, 6:].drop_duplicates()

src_dir = scripts_dir.parent / "src"
text_dir = src_dir / "texts"
json_dir = src_dir / "data" / "json"


class Node:
    def __init__(
        self, id_: str, name: str, parents: list[str] = [], text: str | None = None
    ):
        self.id = id_
        self.name = name.strip()
        self.parents = parents
        self.text = text
        if self.text is not None:
            self.text = self.text.strip("\ufeff")

    def __str__(self):
        return f"{self.id}, Name: {self.name}, Parents: {self.parents}"

    def create_md_file(self, base_dir):
        node_dir = base_dir / self.id.lower()
        node_dir.mkdir(parents=True, exist_ok=True)
        md_path = node_dir / "text.md"
        if not md_path.exists():
            with open(md_path, "w") as md_file:
                header = f"# {self.name}\n"
                md_file.write(header)
                if self.text is not None:
                    md_file.write(f"{self.text}\n")

    def as_dict(self):
        return {"id": self.id, "name": self.name, "parents": self.parents}

    def as_list(self):
        return [self.id, self.name, self.parents]


uccs = {}
demands = {}
services = {}
units = {}

for _, (
    ucc,
    ucc_name,
    demand,
    demand_name,
    service,
    service_name,
    unit,
    unit_name,
    text,
) in excel_data.iterrows():
    if ucc not in uccs:
        uccs[ucc] = Node(ucc, ucc_name)

    if demand not in demands:
        demands[demand] = Node(demand, demand_name, [ucc])
    elif ucc not in demands[demand].parents:
        demands[demand].parents.append(ucc)

    if service not in services:
        services[service] = Node(service, service_name, [demand])
    elif demand not in services[service].parents:
        services[service].parents.append(demand)

    if unit not in units:
        units[unit] = Node(f"U{unit}", unit_name, [service], text)
    elif service not in units[unit].parents:
        units[unit].parents.append(service)

node_type_dict = {
    "uccs": uccs,
    "demands": demands,
    "services": services,
    "units": units,
}

for node_type, node_dict in node_type_dict.items():
    json_obj = []
    if not json_dir.exists():
        json_dir.mkdir(parents=True, exist_ok=True)
    node_type_dir = text_dir / node_type

    for node_id, node in node_dict.items():
        node.create_md_file(node_type_dir)
        json_obj.append(node.as_dict())

    json_path = json_dir / f"{node_type}.json"
    with open(json_path, "w") as json_file:
        json.dump(json_obj, json_file, indent=2)
