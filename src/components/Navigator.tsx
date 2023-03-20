import React, { useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

import data from '../data/data';
import { useResizeDetector } from 'react-resize-detector';
import cytoscape from 'cytoscape';
import { NodeType } from '../interfaces/DataInterface';
import NavigatorMenu from './NavigatorMenu';
import { NavigatorProps } from '../interfaces/ComponentProps'

let firstTime = true;

export default function Navigator(
    {
        setTextId,
        navbarHeight,
        theme
    }: NavigatorProps) {
    const [cy, setCy] = useState<cytoscape.Core | null>(null);
    const { width, height, ref } = useResizeDetector();
    interface Myopts extends cytoscape.ConcentricLayoutOptions {
        concentric(node: any): number;
        levelWidth(node: any): number;
    }
    const options: Myopts = {
        name: "concentric",
        fit: false, // whether to fit the viewport to the graph
        padding: 30, // the padding on fit
        startAngle: 3 / 2 * Math.PI, // where nodes start in radians
        sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
        clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
        equidistant: false, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
        minNodeSpacing: 30, // min spacing between outside of nodes (used for radius adjustment)
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
        nodeDimensionsIncludeLabels: true, // Excludes the label when calculating node bounding boxes for the layout algorithm
        spacingFactor: 1, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
        concentric: function (node) { // returns numeric value for each node, placing higher nodes in levels towards the centre
            return node.data("degree");
        },
        levelWidth: function (nodes) { // the variation of concentric values in each level
            return 1;
        },
        animate: true, // whether to transition the node positions
        animationDuration: 50, // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled
        animateFilter: function (node, i) { return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
        ready: undefined, // callback on layoutready
        stop: async (event) => {
            if (firstTime) {  // Need a timeout so that all points are fully created
                await new Promise(f => setTimeout(f, 500));
                firstTime = false;
            }
            const allNodes = event.cy.nodes();
            const unselected = event.cy.nodes(".collapsed,.hidden,.parent");
            const serviceParent = event.cy.$("#Service-Parent");
            event.cy.fit(allNodes.not(unselected).union(serviceParent), 60)
        }, // callback on layoutstop, fit services and selected nodes.
        transform: function (node, position) { return position; }, // transform a given node position. Useful for changing flow direction in discrete layouts
    }

    const makeSVGDonut = (node: cytoscape.NodeSingular) => {
        const parser = new DOMParser();
        const center_x = node.width() / 2;
        const center_y = node.height() / 2;
        const child_radius = node.children()[0].width() / 2
        const radius = (node.width() + node.height()) / 4 - child_radius;
        const stroke_width = child_radius * 2.0;
        const svgStr = `<circle class="donut-segment" cx="${center_x}" cy="${center_y}" r="${radius}" fill="transparent" stroke="${node.data().color}" stroke-width="${stroke_width}"></circle>`;
        let svgText = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg><svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='${node.width()}' height='${node.height()}'>${svgStr}</svg>`;
        return parser.parseFromString(svgText, 'text/xml').documentElement;
    }

    const bsDark = "#dee2e6"
    const bsLight = "#212529"

    const stylesheet: Array<cytoscape.Stylesheet> = [
        {
            selector: "node",
            style: {
                width: 200,
                height: 200,
                label: "data(label)",
                "background-color": "data(color)",
                color: theme === "dark" ? bsDark : bsLight,
                "overlay-opacity": 0,
                "border-width": 1
            }
        },
        {
            selector: "edge",
            style: {
                "curve-style": "straight",
                "overlay-opacity": 0
            }
        },
        {
            selector: "node[label]",
            style: {
                "text-halign": "center",
                "text-valign": "center",
                "text-wrap": "wrap",
                "text-max-width": "120px",
                "font-size": 24,
            }
        },
        {
            selector: ".collapsed",
            style: {
                opacity: 0.4,
                "border-width": 0
            }
        },
        {
            selector: ".parent",
            style: {
                "background-image": function (node: cytoscape.NodeSingular) {
                    const s = makeSVGDonut(node)
                    return 'data:image/svg+xml;utf8,' + encodeURIComponent(s.outerHTML);;
                },
                "border-opacity": 0,
                "background-opacity": 0,
                "background-image-opacity": 0.3,
                'background-fit': 'cover',
            }
        },
        {
            selector: ".hidden",
            style: {
                opacity: 0
            }
        }
    ];

    const elements = [...data.nodes, ...data.edges];

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

    const collapseNodeAndOuterNeighbors = (node: cytoscape.NodeSingular) => {
        node.addClass("collapsed");
        collapseConnectedEdges(node);
        const nodeData = node.data();

        node.connectedEdges().forEach((edge) => {
            const source = edge.source();
            const sourceData = source.data();
            if (sourceData.nodeType === undefined) {
                return;
            }
            if (sourceData.nodeType < nodeData.nodeType) {
                collapseNodeAndOuterNeighbors(source);
            }
        })
    }

    const expandOuterNeighbors = (node: cytoscape.NodeSingular) => {
        const nodeData = node.data();

        node.connectedEdges().forEach((edge) => {
            const source = edge.source();
            const sourceData = source.data();
            if (sourceData.nodeType === undefined) {
                return;
            }
            if (sourceData.nodeType < nodeData.nodeType) {
                source.removeClass("collapsed");
            }
        });
        expandConnectedEdges(node);
    }

    const expandRoot = (node: cytoscape.NodeSingular) => {
        const nodeData = node.data();

        node.connectedEdges().forEach((edge) => {
            const target = edge.target();
            const targetData = target.data();
            if (targetData.nodeType === undefined) {
                return;
            }
            if (targetData.nodeType > nodeData.nodeType) {
                target.removeClass("collapsed");
                edge.removeClass("collapsed");
                expandRoot(target);
            }
        });
    }

    const expandNode = (node: cytoscape.NodeSingular) => {
        node.removeClass("collapsed");
        expandOuterNeighbors(node);
        expandRoot(node);
    }

    const clickNode = (node: cytoscape.NodeSingular, otherNodes: cytoscape.NodeCollection) => {
        setTextId(node.id());
        otherNodes.forEach((node) => {
            collapseNodeAndOuterNeighbors(node);
        })
        expandNode(node);
    }

    const getInnerNode = (node: cytoscape.NodeSingular): cytoscape.NodeSingular => {
        return node.connectedEdges().filter(function (ele) {
            const target = ele.target("node")
            return target.data().nodeType > node.data().nodeType;
        })[0].target()
    }

    const getInnerNodes = (node: cytoscape.NodeSingular): Array<cytoscape.NodeSingular> => {
        let currentNode = node;
        const innerNodes: Array<cytoscape.NodeSingular> = [];

        while (currentNode.data().nodeType !== NodeType.UCC) {
            innerNodes.push(currentNode);
            currentNode = getInnerNode(currentNode);
        }
        innerNodes.push(currentNode)
        return innerNodes;
    }

    const onSelect = (event: cytoscape.EventObject) => {
        const node: cytoscape.NodeSingular = event.target;
        if (cy === null) {
            setTextId("default")
            return;
        } else if (node === undefined || node.data().nodeType === undefined || node.hasClass("hidden")) {
            setTextId("default");
            cy.json({ elements: elements });
            return;
        }

        const innerNodes = getInnerNodes(node);
        const otherNodes = cy.nodes().filter(function (ele) {
            return innerNodes.some((innerNode) => {
                return (ele.data().nodeType === innerNode.data().nodeType && ele.id() !== innerNode.id());
            });
        });
        clickNode(node, otherNodes);
    };

    return (
        <div ref={ref} style={{ height: `calc(100vh - ${navbarHeight}px)` }}>
            <CytoscapeComponent
                elements={elements}
                style={{ width: width, height: height }}
                stylesheet={stylesheet}
                layout={options}
                userZoomingEnabled={true}
                userPanningEnabled={true}
                boxSelectionEnabled={false}
                minZoom={0.08}
                maxZoom={1.0}
                wheelSensitivity={0.2}
                cy={(cy: cytoscape.Core) => {
                    setCy(cy)
                    cy.off("select", "node")
                    cy.on("select", "node", onSelect)
                    cy.off("select", "edge")
                    cy.on("select", "edge", (event: cytoscape.EventObject) => {
                        setTextId("default");
                        const edge: cytoscape.EdgeSingular = event.target;
                        edge.unselect();
                        cy.json({ elements: elements });
                    })
                }}
            />
            <NavigatorMenu
                cy={cy}
                style={{ top: navbarHeight, left: 0, position: "absolute", zIndex: 2 }}
                theme={theme} />
        </div>
    );
}
