import { NodeObjectWithNodeType, NodeWithLinks, NodeType, NodeWithLinkIds, colorMapping } from "../interfaces/DataInterface";
import uccsWithLinks, { uccParent } from "./uccs";
import demandsWithLinks, { demandParent } from "./demands";
import servicesWithLinks, { serviceParent } from "./services";
import unitsWithLinks, { innerUnitParent, outerUnitParent } from "./units";
import cytoscape from "cytoscape";
import { alternatingSort, alternatingSortByInnerCircle, getDescendantCount } from "./order";

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


const getData = (all_nodes_and_links: Array<NodeWithLinks>) => {
    const nodes: Array<NodeObjectWithNodeType> = getNodes(all_nodes_and_links);
    const edges: Array<cytoscape.EdgeDefinition> = getLinks(all_nodes_and_links);
    return { nodes: nodes, edges: edges };
}

export function linkNodesToSource(source: string, hide: boolean): (target: string) => cytoscape.EdgeDefinition {
    function linkCb(target: string): cytoscape.EdgeDefinition {
        const classes = hide? "hidden" : "collapsed";
        return {
            data: {
                source: source,
                target: target
            },
            classes: classes,
            selectable: true
        }
    }
    return linkCb;
}

export function getCreateNode(nodeType: NodeType, collapsed: boolean, parent?: string, parents?: [string, string]): (nodeWithLinkIds: NodeWithLinkIds) => NodeWithLinks {
    function createNode(nodeWithLinkIds: NodeWithLinkIds): NodeWithLinks {
        let hidden = nodeWithLinkIds[1] === "Hidden";
        const nodeObject: NodeObjectWithNodeType = {
            grabbable: false,
            selectable: true,
            pannable: true,
            data: {
                id: nodeWithLinkIds[0],
                label: nodeWithLinkIds[1],
                nodeType: nodeType,
                color: colorMapping.get(nodeType),
                parent: parent
            },
            classes: hidden ? "hidden" : collapsed ? "collapsed" : ""
        }
        nodeObject.data.degree = nodeObject.data.nodeType;
        hidden = (nodeObject.data.nodeType === NodeType.Unit)? true : hidden
        return [
            nodeObject,
            nodeWithLinkIds[2].map(linkNodesToSource(nodeWithLinkIds[0], hidden))
        ];
    }
    return createNode
}

const uccDecendants = uccsWithLinks.map((node) => { return getDescendantCount(node) })
const uccOrder = alternatingSort(uccDecendants);
const orderedUCCs: Array<NodeWithLinks> = uccOrder.map((i) => uccsWithLinks[i]);

const orderedDemands: Array<NodeWithLinks> = alternatingSortByInnerCircle(demandsWithLinks, orderedUCCs)
const orderedServices: Array<NodeWithLinks> = alternatingSortByInnerCircle(servicesWithLinks, orderedDemands)
const orderedUnits: Array<NodeWithLinks> = alternatingSortByInnerCircle(unitsWithLinks, orderedServices)

orderedUnits.forEach((node, index) => {
    node[0].data.degree = (index % 5) + 1;
})

const data: cytoscape.ElementsDefinition = getData([...orderedUCCs, ...orderedDemands, ...orderedServices, ...orderedUnits])

data.nodes.push(uccParent, demandParent, serviceParent, outerUnitParent, innerUnitParent);

export default data;
