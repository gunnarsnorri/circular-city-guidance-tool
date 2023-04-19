import cytoscape from "cytoscape";
import { NodeType, NodeWithLinks, NodeWithLinkIds, colorMapping, Pannable } from "../interfaces/DataInterface";
import { getCreateNode, nodeDataToNodeWithLinks } from "./data";
import uccs from "./json/uccs.json";

const uccNames: Array<NodeWithLinkIds> = uccs.map(nodeDataToNodeWithLinks);

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
