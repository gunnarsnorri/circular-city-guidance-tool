import { NodeType, NodeWithLinks, getCreateNode, NodeWithLinkIds } from "../interfaces/DataInterface";

const ucc_names: Array<NodeWithLinkIds> = [
    ["UCC1", "Restoring and Maintaining the Water Cycle", []],
    ["UCC5", "Food and Biomass Production", []],
    ["UCC3", "Nutrient Recovery and Reuse", []],
    // ["UCC4", "UCC4", []],
    ["UCC2", "Water and Waste Treatment and Recovery", []],
    ["UCC6", "Energy Efficiency and Recovery", []],
    // ["UCC7", "UCC7", []]
]

const uccs_with_links: Array<NodeWithLinks> = ucc_names.map(getCreateNode(NodeType.UCC, false))
export default uccs_with_links;
