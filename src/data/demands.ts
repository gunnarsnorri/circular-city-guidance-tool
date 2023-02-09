import { NodeType, NodeWithLinkIds, getCreateNode, NodeWithLinks } from "../interfaces/DataInterface";

const demands_and_links: Array<NodeWithLinkIds> = [
    ["D1.1", ["UCC1"]],
    ["D1.2", ["UCC1"]],
    ["D1.3", ["UCC1"]],
    ["D2.1", ["UCC2"]],
    ["D2.2", ["UCC2"]],
    ["D3.1", ["UCC3"]],
    ["D4.1", ["UCC4"]],
    ["D4.2", ["UCC4"]],
    ["D5.1", ["UCC5"]],
    ["D6.1", ["UCC6"]],
    ["D7.1", ["UCC7"]]
]

const demands_with_links: Array<NodeWithLinks> = demands_and_links.map(getCreateNode(NodeType.Demand))
export default demands_with_links;
