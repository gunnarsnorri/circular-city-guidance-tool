import ElementsWithNodeType, { NodeObjectWithNodeType, NodeWithLinks } from "../interfaces/DataInterface";
import uccs_with_links from "./uccs";
import demands_with_links from "./demands";
import services_with_links from "./services";
import units_with_links from "./units";
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

const data: ElementsWithNodeType = getData([...uccs_with_links, ...demands_with_links, ...services_with_links, ...units_with_links])

export default data;
