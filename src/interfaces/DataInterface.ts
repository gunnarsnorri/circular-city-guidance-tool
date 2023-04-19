import cytoscape from "cytoscape";

export enum NodeType {
  Unit = 1,
  Service = 6,
  Demand = 7,
  UCC = 8
};

export const colorMapping: Map<NodeType, string> = new Map();
colorMapping.set(NodeType.UCC, "#FF9F00")
colorMapping.set(NodeType.Demand, "#FF4444")
colorMapping.set(NodeType.Service, "#7FB3D5")
colorMapping.set(NodeType.Unit, "#A2D729")

export interface Pannable {
  pannable: boolean
}

export type NodeData = {
  id: string;
  name: string;
  parents: Array<string>;
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

export default interface ElementsWithNodeType extends cytoscape.ElementsDefinition {
  nodes: NodeObjectWithNodeType[];
}
