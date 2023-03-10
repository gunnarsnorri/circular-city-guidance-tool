import { NodeType, NodeWithLinkIds, getCreateNode, NodeWithLinks, Pannable, colorMapping } from "../interfaces/DataInterface";


const units_and_links: Array<NodeWithLinkIds> = [
    ["U1", "Filter strips", ["S1.1.1"]],
    ["U2", "Filter drain", ["S1.1.1"]],
    ["U3", "Bioswale", ["S1.1.1"]],
    ["U4", "Dry swale", ["S1.1.1"]],
    ["U5", "Hidden", ["S1.1.1"]],
    ["U6", "Hidden", ["S1.1.1"]],
    ["U7", "Hidden", ["S1.1.1"]],
    ["U8", "Hidden", ["S1.1.1"]],
    ["U9", "Filter strips", ["S1.1.2"]],
    ["U10", "Filter drain", ["S1.1.2"]],
    ["U11", "Bioretention Cell (Rain Garden)", ["S1.1.2"]],
    ["U12", "Bioswale", ["S1.1.2"]],
    ["U13", "	Treatment wetland ", ["S1.1.2"]],
    ["U14", "Hidden", ["S1.1.2"]],
    ["U15", "Hidden", ["S1.1.2"]],
    ["U16", "Hidden", ["S1.1.2"]],
    ["U17", "(Wet) Retention pond", ["S1.1.3"]],
    ["U18", "Rain Water Harvesting", ["S1.1.3"]],
    ["U19", "Detention vaults and tanks", ["S1.1.3"]],
    ["U20", "Hidden", ["S1.1.3"]],
    ["U21", "Hidden", ["S1.1.3"]],
    ["U22", "Hidden", ["S1.1.3"]],
    ["U23", "Hidden", ["S1.1.3"]],
    ["U24", "Hidden", ["S1.1.3"]],
    ["U25", "Extensive Green Roof", ["S1.2.1"]],
    ["U26", "Intensive Green Roof", ["S1.2.1"]],
    ["U27", "(Wet) Retention pond", ["S1.2.1"]],
    ["U28", "(Dry) Detention pond", ["S1.2.1"]],
    ["U29", "River restoration", ["S1.2.1"]],
    ["U30", "Floodplain", ["S1.2.1"]],
    ["U31", "Hidden", ["S1.2.1"]],
    ["U32", "Hidden", ["S1.2.1"]],
    ["U33", "Infiltration Basin", ["S1.2.2"]],
    ["U34", "Infiltration Trench", ["S1.2.2"]],
    ["U35", "Bioretention cell (Rain garden)", ["S1.2.2"]],
    ["U36", "Tree pits", ["S1.2.2"]],
    ["U37", "Vegetated grid pavment", ["S1.2.2"]],
    ["U38", "Bioswale", ["S1.2.2"]],
    ["U39", "Hidden", ["S1.2.2"]],
    ["U40", "Hidden", ["S1.2.2"]],
    ["U41", "(Wet) Retention pond", ["S1.2.3"]],
    ["U42", "Tree pits", ["S1.2.3"]],
    ["U43", "Soil/ground-based green facade", ["S1.2.3"]],
    ["U44", "Wall-based green facade", ["S1.2.3"]],
    ["U45", "Pot-based green facade", ["S1.2.3"]],
    ["U46", "Intensive green roof", ["S1.2.3"]],
    ["U47", "Semi-intensive green roof", ["S1.2.3"]],
    ["U48", "Vegetated pergola", ["S1.2.3"]],
    ["U49", "Physical unit operations for solid/liquid separation", ["S2.1.1"]],
    ["U50", "Treatment wetland", ["S2.1.2"]],
    ["U51", "Anaerobic treatment (for nutrient, VFA & methene recovery)", ["S2.1.2"]],
    ["U52", "Intensive green roof", ["S2.1.2"]],
    ["U53", "Pot-based green facade", ["S2.1.2"]],
    ["U54", "Waste stabilisation pond", ["S2.1.2"]],
    ["U55", "Hidden", ["S2.1.2"]],
    ["U56", "Hidden", ["S2.1.2"]],
    ["U57", "Hidden", ["S2.1.2"]],
    ["U58", "Detention vaults and tanks", ["S2.1.3"]],
    ["U59", "(Wet) Retention pond", ["S2.1.3"]],
    ["U60", "Infiltration trench", ["S2.1.3"]],
    ["U61", "Infiltration basin", ["S2.1.3"]],
    ["U62", "Hidden", ["S2.1.3"]],
    ["U63", "Hidden", ["S2.1.3"]],
    ["U64", "Hidden", ["S2.1.3"]],
    ["U65", "Hidden", ["S2.1.3"]],
    ["U66", "TBD1", ["S3.1.1"]],
    ["U67", "TBD2", ["S3.1.1"]],
    ["U68", "TBD3", ["S3.1.1"]],
    ["U69", "TBD4", ["S3.1.1"]],
    ["U70", "TBD5", ["S3.1.1"]],
    ["U71", "TBD6", ["S3.1.1"]],
    ["U72", "Hidden", ["S3.1.1"]],
    ["U73", "Hidden", ["S3.1.1"]],
    ["U74", "TBD7", ["S3.1.2"]],
    ["U75", "TBD8", ["S3.1.2"]],
    ["U76", "TBD9", ["S3.1.2"]],
    ["U77", "TBD10", ["S3.1.2"]],
    ["U78", "TBD11", ["S3.1.2"]],
    ["U79", "TBD12", ["S3.1.2"]],
    ["U80", "Hidden", ["S3.1.2"]],
    ["U81", "Hidden", ["S3.1.2"]],
    ["U82", "TBD13", ["S3.1.3"]],
    ["U83", "TBD14", ["S3.1.3"]],
    ["U84", "TBD15", ["S3.1.3"]],
    ["U85", "TBD16", ["S3.1.3"]],
    ["U86", "TBD17", ["S3.1.3"]],
    ["U87", "Hidden", ["S3.1.3"]],
    ["U88", "Hidden", ["S3.1.3"]],
    ["U89", "Hidden", ["S3.1.3"]],
    ["U90", "TBD18", ["S3.2.1"]],
    ["U91", "TBD19", ["S3.2.1"]],
    ["U92", "TBD20", ["S3.2.1"]],
    ["U93", "TBD21", ["S3.2.1"]],
    ["U94", "TBD22", ["S3.2.1"]],
    ["U95", "TBD23", ["S3.2.1"]],
    ["U96", "Hidden", ["S3.2.1"]],
    ["U97", "Hidden", ["S3.2.1"]],
    ["U98", "TBD24", ["S3.2.2"]],
    ["U99", "TBD25", ["S3.2.2"]],
    ["U100", "TBD26", ["S3.2.2"]],
    ["U101", "TBD27", ["S3.2.2"]],
    ["U102", "TBD28", ["S3.2.2"]],
    ["U103", "Hidden", ["S3.2.2"]],
    ["U104", "Hidden", ["S3.2.2"]],
    ["U105", "Hidden", ["S3.2.2"]],
    ["U106", "TBD28", ["S3.2.3"]],
    ["U107", "TBD29", ["S3.2.3"]],
    ["U108", "TBD30", ["S3.2.3"]],
    ["U109", "TBD31", ["S3.2.3"]],
    ["U110", "TBD32", ["S3.2.3"]],
    ["U111", "Hidden", ["S3.2.3"]],
    ["U112", "Hidden", ["S3.2.3"]],
    ["U113", "Hidden", ["S3.2.3"]],
    ["U114", "Aquaculture", ["S5.1.1"]],
    ["U115", "Hydroponic and soilless technologies", ["S5.1.1"]],
    ["U116", "Organoponic", ["S5.1.1"]],
    ["U117", "Aquaponic farming", ["S5.1.1"]],
    ["U118", "Productive garden", ["S5.1.1"]],
    ["U119", "Hidden", ["S5.1.1"]],
    ["U120", "Hidden", ["S5.1.1"]],
    ["U121", "Hidden", ["S5.1.1"]],
    ["U122", "Urban forest", ["S5.1.2"]],
    ["U123", "Treatment wetland", ["S5.1.2"]],
    ["U124", "Hidden", ["S5.1.2"]],
    ["U125", "Hidden", ["S5.1.2"]],
    ["U126", "Hidden", ["S5.1.2"]],
    ["U127", "Hidden", ["S5.1.2"]],
    ["U128", "Hidden", ["S5.1.2"]],
    ["U129", "Green corridors", ["S5.3.1"]],
    ["U130", "Street trees", ["S5.3.1"]],
    ["U131", "Large urban park", ["S5.3.1"]],
    ["U132", "Urban meadows", ["S5.3.1"]],
    ["U133", "Hidden", ["S5.3.1"]],
    ["U134", "Hidden", ["S5.3.1"]],
    ["U135", "Hidden", ["S5.3.1"]],
    ["U136", "Hidden", ["S5.3.1"]],
    ["U137", "TBD33", ["S6.1.1"]],
    ["U138", "TBD34", ["S6.1.1"]],
    ["U139", "TBD35", ["S6.1.1"]],
    ["U140", "TBD36", ["S6.1.1"]],
    ["U141", "TBD37", ["S6.1.1"]],
    ["U142", "Hidden", ["S6.1.1"]],
    ["U143", "Hidden", ["S6.1.1"]],
    ["U144", "Hidden", ["S6.1.1"]],
    ["U145", "Extensive green roof", ["S6.2.1"]],
    ["U146", "Intensive green roof", ["S6.2.1"]],
    ["U147", "Soil/ground-based green facade", ["S6.2.1"]],
    ["U148", "Wall-based green facade", ["S6.2.1"]],
    ["U149", "Pot-based green facade", ["S6.2.1"]],
    ["U150", "Hidden", ["S6.2.1"]],
    ["U151", "Hidden", ["S6.2.1"]],
    ["U152", "Hidden", ["S6.2.1"]],
    ["U153", "TBD38", ["S6.2.2"]],
    ["U154", "TBD39", ["S6.2.2"]],
    ["U155", "TBD40", ["S6.2.2"]],
    ["U156", "TBD41", ["S6.2.2"]],
    ["U157", "TBD42", ["S6.2.2"]],
    ["U158", "Hidden", ["S6.2.2"]],
    ["U159", "Hidden", ["S6.2.2"]],
    ["U160", "Hidden", ["S6.2.2"]],
    ["U161", "TBD43", ["S6.2.3"]],
    ["U162", "TBD44", ["S6.2.3"]],
    ["U163", "TBD45", ["S6.2.3"]],
    ["U164", "TBD46", ["S6.2.3"]],
    ["U165", "TBD47", ["S6.2.3"]],
    ["U166", "Hidden", ["S6.2.3"]],
    ["U167", "Hidden", ["S6.2.3"]],
    ["U168", "Hidden", ["S6.2.3"]],
]

export const unit_parent: cytoscape.NodeDefinition & Pannable = {
    grabbable: false,
    selectable: false,
    pannable: true,
    data: {
        id: "Unit-Parent",
        label: "",  // "Units",
        color: colorMapping.get(NodeType.Unit),
    },
    classes: "parent",
}

const units_with_links: Array<NodeWithLinks> = units_and_links.map(getCreateNode(NodeType.Unit, true, unit_parent.data.id, units_and_links.length))
export default units_with_links;

