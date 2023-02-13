import { NodeType, NodeWithLinks, getCreateNode, NodeWithLinkIds } from "../interfaces/DataInterface";

const ucc_names: Array<NodeWithLinkIds> = [
    ["UCC1", "UCC1", []],
    ["UCC2", "UCC2", []],
    ["UCC3", "UCC3", []],
    // ["UCC4", "UCC4", []],
    ["UCC5", "UCC5", []],
    ["UCC6", "UCC6", []],
    // ["UCC7", "UCC7", []]
]

const uccs_with_links: Array<NodeWithLinks> = ucc_names.map(getCreateNode(NodeType.UCC))
export default uccs_with_links;
