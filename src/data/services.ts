import { NodeType, NodeWithLinkIds, getCreateNode, NodeWithLinks } from "../interfaces/DataInterface";

const services_and_links: Array<NodeWithLinkIds> = [
    ["S1.1.1", ["D1.1"]],
    ["S1.2.1", ["D1.2"]],
    ["S1.3.1", ["D1.3", "D2.1"]],
    ["S2.1.1", ["D2.1"]],
    ["S2.2.1", ["D2.2"]],
    ["S3.1.1", ["D3.1"]],
    ["S4.1.1", ["D4.1"]],
    ["S4.2.1", ["D4.2"]],
    ["S5.1.1", ["D5.1"]],
    ["S6.1.1", ["D6.1"]],
    ["S7.1.1", ["D7.1"]]
]

const services_with_links: Array<NodeWithLinks> = services_and_links.map(getCreateNode(NodeType.Service))
export default services_with_links;
