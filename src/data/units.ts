import { NodeType, NodeWithLinkIds, NodeWithLinks, Pannable, colorMapping } from "../interfaces/DataInterface";
import { getCreateNode, nodeDataToNodeWithLinks } from "./data";
import units from "./json/units.json";


const unitsAndLinks: Array<NodeWithLinkIds> = units.map(nodeDataToNodeWithLinks);

export const unitParent: cytoscape.NodeDefinition & Pannable = {
    grabbable: false,
    selectable: true,
    pannable: true,
    data: {
        id: "Unit-Parent",
        label: "",  // "Units",
        color: colorMapping.get(NodeType.Unit),
    },
    classes: "parent",
}

const unitsWithLinks: Array<NodeWithLinks> = unitsAndLinks.map(getCreateNode(NodeType.Unit, true, unitParent.data.id))
export default unitsWithLinks;

