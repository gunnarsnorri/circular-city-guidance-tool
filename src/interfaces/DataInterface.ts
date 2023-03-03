import cytoscape from "cytoscape";

export enum NodeType {
  Unit = 1,
  Service,
  Demand,
  UCC
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

export function getCreateNode(nodeType: NodeType, collapsed: boolean, parent?: string): (nodeWithLinkIds: NodeWithLinkIds) => NodeWithLinks {
  function createNode(nodeWithLinkIds: NodeWithLinkIds): NodeWithLinks {
    const nodeObject: NodeObjectWithNodeType = {
      grabbable: false,
      data: {
        id: nodeWithLinkIds[0],
        label: nodeWithLinkIds[1],
        nodeType: nodeType,
        color: colorMapping.get(nodeType),
        parent: parent
      },
      classes: collapsed ? "collapsed" : ""
    }
    nodeObject.data.degree = nodeObject.data.nodeType;
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
