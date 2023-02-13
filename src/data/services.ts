import { NodeType, NodeWithLinkIds, getCreateNode, NodeWithLinks } from "../interfaces/DataInterface";

const services_and_links: Array<NodeWithLinkIds> = [
    ["S1.1.1", "Collection", ["D1.1"]],
    ["S1.1.2", "Treatment of RW", ["D1.1"]],
    ["S1.1.3", "Storage of RW", ["D1.1"]],
    ["S2.1.1", "Collection / Separation of WW", ["D2.1"]],
    ["S2.1.2", "Treatment of WW", ["D2.1"]],
    ["S2.1.3", "Storage of WW", ["D2.1"]],
    ["S3.1.1", "Collection / Separation of WW", ["D3.1"]],
    ["S3.1.2", "Revalorization", ["D3.1"]],
    ["S3.1.3", "Storage", ["D3.1"]],
    ["S3.2.1", "Collection of FW", ["D3.2"]],
    ["S3.2.1", "Revalorization  of FW", ["D3.2"]],
    ["S3.2.1", "Storage of FW", ["D3.2"]],
    ["S5.1.1", "Production of Edible BM", ["D5.1"]],
    ["S5.1.2", "Production of Inedible BM", ["D5.1"]],
    ["S5.2.1", "Revalorisation of Soil", ["D5.2"]],
    ["S5.3.1", "Biomass Recovery", ["D5.3"]],
    ["S6.1.1", "Microclimate Regulation", ["D6.1"]],
    ["S6.2.1", "Increase Building Insulation", ["D6.2"]],
    ["S6.2.2", "Energy Recovery From BM", ["D6.2"]],
    ["S6.2.3", "Energy Recovery From WW", ["D6.2"]],
    // Add S4, S7
]

const services_with_links: Array<NodeWithLinks> = services_and_links.map(getCreateNode(NodeType.Service))
export default services_with_links;
