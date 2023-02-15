import { NodeType, NodeWithLinkIds, getCreateNode, NodeWithLinks } from "../interfaces/DataInterface";


const units_and_links: Array<NodeWithLinkIds> = [
//     ["U3", "Filter strips", ["S1.1.2"]],
//     ["U4", "Filter drain", ["S1.1.2"]],
//     ["U7", "Bioretention cell (Rain garden)", ["S1.1.2"]],
//     ["U8", "Bioswale", ["S1.1.2"]],
//     ["U21", "	Treatment wetland ", ["S1.1.2"]],
]

const units_with_links: Array<NodeWithLinks> = units_and_links.map(getCreateNode(NodeType.Unit, true))
export default units_with_links;

