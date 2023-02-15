import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

import data from '../data/data';
import { SizeMe } from 'react-sizeme';
import cytoscape from 'cytoscape';
import { NodeDataWithNodeType, NodeType } from '../interfaces/DataInterface';

function fixType(num: number | null): string {
    if (num === null) {
        return "";
    } else {
        return Math.trunc(num).toString() + "px";
    }
}
export default function Navigator({ setInfoTitle }: { setInfoTitle: Function }) {
    interface Myopts extends cytoscape.ConcentricLayoutOptions {
        concentric(node: any): number;
    }
    const options: Myopts = {
        name: "concentric",
        fit: true, // whether to fit the viewport to the graph
        padding: 30, // the padding on fit
        startAngle: 3 / 2 * Math.PI, // where nodes start in radians
        sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
        clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
        equidistant: false, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
        minNodeSpacing: 10, // min spacing between outside of nodes (used for radius adjustment)
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
        nodeDimensionsIncludeLabels: true, // Excludes the label when calculating node bounding boxes for the layout algorithm
        spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
        concentric: function (node) { // returns numeric value for each node, placing higher nodes in levels towards the centre
            return node.data("degree");
        },
        levelWidth: function (nodes) { // the variation of concentric values in each level
            return 1;
        },
        animate: false, // whether to transition the node positions
        animationDuration: 500, // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled
        animateFilter: function (node, i) { return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
        ready: undefined, // callback on layoutready
        stop: undefined, // callback on layoutstop
        transform: function (node, position) { return position; }, // transform a given node position. Useful for changing flow direction in discrete layouts
    }

    const stylesheet: Array<cytoscape.Stylesheet> = [
        {
            selector: "node",
            style: {
                width: 210,
                height: 210,
                label: "data(label)",
                "background-color": "data(color)",
                color: "#065143"
            }
        },
        {
            selector: "edge",
            style: {
                "curve-style": "straight"
            }
        },
        {
            selector: "node[label]",
            style: {
                "text-halign": "center",
                "text-valign": "center",
                "text-wrap": "wrap",
                "text-max-width": "150px",
                "font-size": 24,
                "font-family": "Raleway"
            }
        },
        {
            selector: ".collapsed",
            style: {
                opacity: 0
            }
        }
    ];

    const elements = [...data.nodes, ...data.edges];

    const dirMapping: Map<NodeType, string> = new Map();
    dirMapping.set(NodeType.UCC, "uccs");
    dirMapping.set(NodeType.Demand, "demands");
    dirMapping.set(NodeType.Service, "services");
    dirMapping.set(NodeType.Unit, "units");

    const getFilePath = (nodeData: NodeDataWithNodeType) => {
        const baseDir = "../../texts";
        if (nodeData.id === undefined) {
            return `${baseDir}/home.txt`
        }
        const subDir = dirMapping.get(nodeData.nodeType);
        return `${baseDir}/${subDir}/${nodeData.id.toLowerCase()}.txt`;
    }

    const collapseConnectedEdges = (node: cytoscape.NodeSingular) => {
        node.connectedEdges().forEach((edge) => {
            edge.addClass("collapsed");
        })
    }

    const expandConnectedEdges = (node: cytoscape.NodeSingular) => {
        node.connectedEdges().forEach((edge) => {
            edge.removeClass("collapsed");
        })
    }

    const collapseOuterNeighbors = (node: cytoscape.NodeSingular) => {
        const nodeData = node.data();

        node.connectedEdges().forEach((edge) => {
            const source = edge.source();
            const sourceData = source.data();
            if (sourceData.nodeType === undefined) {
                return;
            }
            if (sourceData.nodeType < nodeData.nodeType) {
                source.addClass("collapsed");
                source.unselectify();
                collapseOuterNeighbors(source);
                collapseConnectedEdges(source);
            }
        })
    }

    const expandOuterNeighbors = (node: cytoscape.NodeSingular, sameLevelNodes: cytoscape.NodeCollection) => {
        const nodeData = node.data();

        node.connectedEdges().forEach((edge) => {
            const source = edge.source();
            const sourceData = source.data();
            if (sourceData.nodeType === undefined) {
                return;
            }
            if (sourceData.nodeType < nodeData.nodeType) {
                source.removeClass("collapsed");
                source.selectify();
                expandConnectedEdges(node);
            }
        });
        sameLevelNodes.forEach((node) => {
            collapseOuterNeighbors(node);
        })
    }

    const clickNode = (node: cytoscape.NodeSingular | undefined = undefined, sameLevelNodes: cytoscape.NodeCollection) => {
        if (node === undefined) {
            setInfoTitle("fasdfas")
            return;
        }
        const filePath = getFilePath(node.data())
        const nodeData = node.data()
        setInfoTitle(nodeData.label);
        expandOuterNeighbors(node, sameLevelNodes);

    }

    return (
        <SizeMe monitorHeight>{({ size }) =>
            <CytoscapeComponent
                elements={elements}
                style={{ width: fixType(size.width), height: fixType(size.height) }}
                stylesheet={stylesheet}
                layout={options}
                userZoomingEnabled={false}
                userPanningEnabled={false}
                boxSelectionEnabled={false}
                cy={(cy) => {
                    cy.off("select", "node")
                    cy.on("select", "node", (event) => {
                        const node = event.target;
                        const sameLevelNodes = cy.nodes().filter(function (ele) {
                            return (ele.data().nodeType === node.data().nodeType && ele.id() !== node.id());
                        });
                        clickNode(node, sameLevelNodes);
                    })
                }}
            />
        }
        </SizeMe>
    );
}
