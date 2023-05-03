import { NodeType, NodeWithLinkIds, NodeWithLinks, colorMapping, Pannable } from "../interfaces/DataInterface";
import { getCreateNode, nodeDataToNodeWithLinks } from "./data";
import services from "./json/nodes/services.json";

const servicesAndLinks: Array<NodeWithLinkIds> = services.map(nodeDataToNodeWithLinks);

export const serviceParent: cytoscape.NodeDefinition & Pannable = {
    grabbable: false,
    selectable: true,
    pannable: true,
    data: {
        id: "Service-Parent",
        label: "",  // "Services",
        color: colorMapping.get(NodeType.Service),
    },
    classes: "parent"
}

const servicesWithLinks: Array<NodeWithLinks> = servicesAndLinks.map(getCreateNode(NodeType.Service, true, serviceParent.data.id))
export default servicesWithLinks;
