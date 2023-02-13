import { NodeType, NodeWithLinkIds, getCreateNode, NodeWithLinks } from "../interfaces/DataInterface";


const units_and_links: Array<NodeWithLinkIds> = [
]

const units_with_links: Array<NodeWithLinks> = units_and_links.map(getCreateNode(NodeType.Unit))
export default units_with_links;

