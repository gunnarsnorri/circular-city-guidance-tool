import { NodeType, NodeWithLinkIds, NodeWithLinks, colorMapping, Pannable } from "../interfaces/DataInterface";
import { getCreateNode, nodeDataToNodeWithLinks } from "./data";
import demands from "./json/demands.json";

const demandsAndLinks: Array<NodeWithLinkIds> = demands.map(nodeDataToNodeWithLinks);

export const demandParent: cytoscape.NodeDefinition & Pannable = {
    grabbable: false,
    selectable: true,
    pannable: true,
    data: {
        id: "Demand-Parent",
        label: "",  // "Demands",
        color: colorMapping.get(NodeType.Demand),
    },
    classes: "parent"
}

const demandsWithLinks: Array<NodeWithLinks> = demandsAndLinks.map(getCreateNode(NodeType.Demand, true, demandParent.data.id))
export default demandsWithLinks;
