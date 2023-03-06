import { NodeObjectWithNodeType, NodeWithLinks } from "../interfaces/DataInterface";
import uccs_with_links, { ucc_parent } from "./uccs";
import demands_with_links, { demand_parent } from "./demands";
import services_with_links, { service_parent } from "./services";
import units_with_links, { unit_parent } from "./units";
import cytoscape from "cytoscape";

const getNodes = (nodes_with_links: Array<NodeWithLinks>) => {
    return nodes_with_links.map(function (nodeWithLinks: NodeWithLinks) {
        return nodeWithLinks[0];
    });
};

const getLinks = (nodes_with_links: Array<NodeWithLinks>) => {
    return nodes_with_links.map(function (nodeWithLinks: NodeWithLinks) {
        return nodeWithLinks[1];
    }).flat();
};


const getData = (all_nodes_and_links: Array<NodeWithLinks>) =>  {
    const nodes: Array<NodeObjectWithNodeType> = getNodes(all_nodes_and_links);
    const edges: Array<cytoscape.EdgeDefinition> = getLinks(all_nodes_and_links);
    return { nodes: nodes, edges: edges };
}

const data: cytoscape.ElementsDefinition = getData([...uccs_with_links, ...demands_with_links, ...services_with_links, ...units_with_links])

data.nodes.push(ucc_parent, demand_parent, service_parent, unit_parent);

export default data;
