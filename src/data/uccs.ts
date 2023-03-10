import cytoscape from "cytoscape";
import { NodeType, NodeWithLinks, getCreateNode, NodeWithLinkIds, colorMapping, Pannable } from "../interfaces/DataInterface";

const ucc_names: Array<NodeWithLinkIds> = [
    ["UCC1", "Restoring and Maintaining the Water Cycle", []],
    ["UCC5", "Food and Biomass Production", []],
    ["UCC3", "Nutrient Recovery and Reuse", []],
    // ["UCC4", "UCC4", []],
    ["UCC2", "Water and Waste Treatment and Recovery", []],
    ["UCC6", "Energy Efficiency and Recovery", []],
    // ["UCC7", "UCC7", []]
]

export const ucc_parent: cytoscape.NodeDefinition & Pannable = {
    grabbable: false,
    selectable: false,
    pannable: true,
    data: {
        id: "UCC-Parent",
        label: "",  // "UCCs",
        color: colorMapping.get(NodeType.UCC),
    },
    classes: "parent",
}

const uccs_with_links: Array<NodeWithLinks> = ucc_names.map(getCreateNode(NodeType.UCC, false, ucc_parent.data.id))
export default uccs_with_links;
