import cytoscape from "cytoscape";
import { NodeType, NodeWithLinks, NodeWithLinkIds, colorMapping, Pannable } from "../interfaces/DataInterface";
import { getCreateNode } from "./data";

const uccNames: Array<NodeWithLinkIds> = [
    ["UCC1", "Restoring and Maintaining the Water Cycle", []],
    ["UCC2", "Water and Waste Treatment and Recovery", []],
    ["UCC3", "Nutrient Recovery and Reuse", []],
    // ["UCC4", "UCC4", []],
    ["UCC5", "Food and Biomass Production", []],
    ["UCC6", "Energy Efficiency and Recovery", []],
    // ["UCC7", "UCC7", []]
]

export const uccParent: cytoscape.NodeDefinition & Pannable = {
    grabbable: false,
    selectable: true,
    pannable: true,
    data: {
        id: "UCC-Parent",
        label: "",  // "UCCs",
        color: colorMapping.get(NodeType.UCC),
    },
    classes: "parent",
}

const uccsWithLinks: Array<NodeWithLinks> = uccNames.map(getCreateNode(NodeType.UCC, false, uccParent.data.id))
export default uccsWithLinks;
