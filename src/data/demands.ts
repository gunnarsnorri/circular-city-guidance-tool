import { NodeType, NodeWithLinkIds, NodeWithLinks, colorMapping, Pannable } from "../interfaces/DataInterface";
import { getCreateNode } from "./data";

const demandsAndLinks: Array<NodeWithLinkIds> = [
    ["D1.1", "Alt. Water Source Rainwater", ["UCC1"]],
    ["D1.2", "Sustainable Rainwater Management", ["UCC1"]],
    ["D2.1", "Alt. Water Source Wastewater", ["UCC2"]],
    ["D3.1", "Alt. Nutrient Source from Wastewater", ["UCC3"]],
    ["D3.2", "Alt. Nutrient Source from Bio-waste", ["UCC3"]],
    ["D5.1", "Food and Biomass Production", ["UCC5"]],
    ["D5.2", "Land Restoration", ["UCC5"]],
    ["D5.3", "Biomass Waste Harvesting", ["UCC5"]],
    ["D6.1", "UHI Mitigation / Reduction", ["UCC6"]],
    ["D6.2", "Increase Energy Sufficiency", ["UCC6"]],
]

export const demandParent: cytoscape.NodeDefinition & Pannable = {
    grabbable: false,
    selectable: true,
    pannable: true,
    data: {
        id: "Demand-Parent",
        label: "",  // "Demands",
        color: colorMapping.get(NodeType.Demand),
    },
    classes: "parent"
}

const demandsWithLinks: Array<NodeWithLinks> = demandsAndLinks.map(getCreateNode(NodeType.Demand, true, demandParent.data.id))
export default demandsWithLinks;
