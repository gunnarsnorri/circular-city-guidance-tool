import { NodeType, NodeWithLinkIds, getCreateNode, NodeWithLinks } from "../interfaces/DataInterface";


const units_and_links: Array<NodeWithLinkIds> = [
    ["Unit1", ["S1.1.1"]],
    ["Unit2", ["S1.2.1"]],
    ["Unit3", ["S1.3.1"]],
    ["Unit4", ["S2.1.1", "S1.1.1"]],
    ["Unit5", ["S2.2.1"]],
    ["Unit6", ["S3.1.1"]],
    ["Unit7", ["S4.1.1"]],
    ["Unit8", ["S4.2.1", "S1.1.1"]],
    ["Unit9", ["S5.1.1"]],
    ["Unit10", ["S6.1.1"]],
    ["Unit11", ["S7.1.1"]]
]

const units_with_links: Array<NodeWithLinks> = units_and_links.map(getCreateNode(NodeType.Unit))
export default units_with_links;

