import cytoscape from "cytoscape";

export enum NodeType {
  Unit = 1,
  Service,
  Demand,
  UCC
};

export type NodeWithLinkIds = [string, Array<string>];

export type NodeWithLinks = [NodeObjectWithNodeType, Array<cytoscape.EdgeDefinition>]

export interface NodeDataWithNodeType extends cytoscape.NodeDataDefinition {
  nodeType: NodeType;
}

export interface NodeObjectWithNodeType extends cytoscape.NodeDefinition {
  data: NodeDataWithNodeType;
};

export function linkNodesToSource(source: string): (target: string) => cytoscape.EdgeDefinition {
  function linkCb(target: string): cytoscape.EdgeDefinition {
    return { data: { source: source, target: target } }
  }
  return linkCb;
}

export function getCreateNode(nodeType: NodeType): (nodeWithLinkIds: NodeWithLinkIds) => NodeWithLinks {
  function createNode(nodeWithLinkIds: NodeWithLinkIds): NodeWithLinks {
    const nodeObject: NodeObjectWithNodeType = {
      data: {
        id: nodeWithLinkIds[0],
        nodeType: nodeType,
      }
    }
    nodeObject.data["label"] = nodeObject.data.id;
    nodeObject.data.degree = nodeObject.data.nodeType;
    return [
      nodeObject,
      nodeWithLinkIds[1].map(linkNodesToSource(nodeWithLinkIds[0]))
    ];
  }
  return createNode
}

export default interface ElementsWithNodeType extends cytoscape.ElementsDefinition {
  nodes: NodeObjectWithNodeType[];
}
