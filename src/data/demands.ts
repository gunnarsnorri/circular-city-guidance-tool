import { NodeType, NodeWithLinkIds, getCreateNode, NodeWithLinks } from "../interfaces/DataInterface";

const demands_and_links: Array<NodeWithLinkIds> = [
    ["D1.1", "Alt. Water Source RW", ["UCC1"]],
    ["D5.1", "Food and Biomass Production", ["UCC5"]],
    ["D5.2", "Land Restoration", ["UCC5"]],
    ["D5.3", "Biomass Waste Harvesting", ["UCC5"]],
    ["D3.1", "Alt. Nutrient Source from WW", ["UCC3"]],
    ["D3.2", "Alt. Nutrient Source from BW", ["UCC3"]],
    ["D2.1", "Alt. Water Source WW", ["UCC2"]],
    ["D6.1", "UHI Mitigation", ["UCC6"]],
    ["D6.2", "Increase Energy Sufficiency", ["UCC6"]],
]

const demands_with_links: Array<NodeWithLinks> = demands_and_links.map(getCreateNode(NodeType.Demand, true))
export default demands_with_links;
