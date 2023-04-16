import { NodeType, NodeWithLinkIds, NodeWithLinks, colorMapping, Pannable } from "../interfaces/DataInterface";
import { getCreateNode } from "./data";

const servicesAndLinks: Array<NodeWithLinkIds> = [
    ["S1.1.1", "Collection / Conveyance", ["D1.1"]],
    ["S1.1.3", "Storage of Rainwater", ["D1.1"]],
    ["S1.1.2", "Treatment of Rainwater", ["D1.1", "D1.2"]],
    ["S1.2.1", "Detention", ["D1.2"]],
    ["S1.2.2", "Infiltration", ["D1.2"]],
    ["S1.2.3", "Evapotranspiration", ["D1.2"]],
    ["S2.1.1", "Collection / Separation of Wastewater", ["D2.1"]],
    ["S2.1.2", "Treatment of Wastewater", ["D2.1"]],
    ["S2.1.3", "Storage of Wastewater", ["D2.1"]],
    ["S3.1.1", "Collection / Separation of Wastewater", ["D3.1"]],
    ["S3.1.2", "Revalorization", ["D3.1"]],
    ["S3.1.3", "Storage", ["D3.1"]],
    ["S3.2.1", "Collection of FW", ["D3.2"]],
    ["S3.2.2", "Revalorization  of FW", ["D3.2"]],
    ["S3.2.3", "Storage of FW", ["D3.2"]],
    ["S5.1.1", "Production of Edible Biomass", ["D5.1"]],
    ["S5.1.2", "Production of Inedible Biomass", ["D5.1"]],
    // ["S5.2.1", "Revalorisation of Soil", ["D5.2"]],
    ["S5.3.1", "Biomass Recovery", ["D5.3"]],
    ["S6.1.1", "Microclimate Regulation", ["D6.1"]],
    ["S6.2.1", "Increase Building Insulation", ["D6.2"]],
    ["S6.2.2", "Energy Recovery From Biomass", ["D6.2"]],
    ["S6.2.3", "Energy Recovery From Wastewater", ["D6.2"]],
    // Add S4, S7
]

export const serviceParent: cytoscape.NodeDefinition & Pannable = {
    grabbable: false,
    selectable: true,
    pannable: true,
    data: {
        id: "Service-Parent",
        label: "",  // "Services",
        color: colorMapping.get(NodeType.Service),
    },
    classes: "parent"
}

const servicesWithLinks: Array<NodeWithLinks> = servicesAndLinks.map(getCreateNode(NodeType.Service, true, serviceParent.data.id))
export default servicesWithLinks;
