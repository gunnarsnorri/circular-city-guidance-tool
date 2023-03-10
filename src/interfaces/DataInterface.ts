import cytoscape from "cytoscape";

export enum NodeType {
  Unit = 1,
  Service = 6,
  Demand = 7,
  UCC = 8
};

export const colorMapping: Map<NodeType, string> = new Map();
colorMapping.set(NodeType.UCC, "#FFC0CB")
colorMapping.set(NodeType.Demand, "#FF4444")
colorMapping.set(NodeType.Service, "#7FB3D5")
colorMapping.set(NodeType.Unit, "#A2D729")

export interface Pannable {
  pannable: boolean
}

export type NodeWithLinkIds = [string, string, Array<string>];

export type NodeWithLinks = [NodeObjectWithNodeType, Array<cytoscape.EdgeDefinition>]

export interface NodeDataWithNodeType extends cytoscape.NodeDataDefinition {
  nodeType: NodeType;
}

export interface NodeObjectWithNodeType extends cytoscape.NodeDefinition {
  data: NodeDataWithNodeType;
  pannable?: boolean;
};

export function linkNodesToSource(source: string): (target: string) => cytoscape.EdgeDefinition {
  function linkCb(target: string): cytoscape.EdgeDefinition {
    return {
      data: {
        source: source,
        target: target
      },
      classes: "collapsed",
      selectable: false
    }
  }
  return linkCb;
}

export function getCreateNode(nodeType: NodeType, collapsed: boolean, parent?: string, nodeCount?: number): (nodeWithLinkIds: NodeWithLinkIds, index: number) => NodeWithLinks {
  function createNode(nodeWithLinkIds: NodeWithLinkIds, index: number): NodeWithLinks {
    const hidden = nodeWithLinkIds[1] === "Hidden";
    const nodeObject: NodeObjectWithNodeType = {
      grabbable: false,
      selectable: hidden? false : true,
      pannable: true,
      data: {
        id: nodeWithLinkIds[0],
        label: nodeWithLinkIds[1],
        nodeType: nodeType,
        color: colorMapping.get(nodeType),
        parent: parent
      },
      classes: hidden? "hidden" : collapsed ? "collapsed" : ""
    }
    if ((nodeObject.data.nodeType > 1) || (nodeCount === undefined))
      nodeObject.data.degree = nodeObject.data.nodeType;
    else if (index < nodeCount * 0.1)
      nodeObject.data.degree = 5;
    else if (index < nodeCount * 0.3)
      nodeObject.data.degree = 4;
    else if (index < nodeCount * 0.5)
      nodeObject.data.degree = 3;
    else if (index < nodeCount * 0.7)
      nodeObject.data.degree = 2;
    else
      nodeObject.data.degree = 1;

    return [
      nodeObject,
      nodeWithLinkIds[2].map(linkNodesToSource(nodeWithLinkIds[0]))
    ];
  }
  return createNode
}

export default interface ElementsWithNodeType extends cytoscape.ElementsDefinition {
  nodes: NodeObjectWithNodeType[];
}
