import { NodeType, NodeWithLinks } from "../interfaces/DataInterface";
import demandsWithLinks from "./demands";
import servicesWithLinks from "./services";
import unitsWithLinks from "./units";

const nodeTypeMapping: Map<NodeType, Array<NodeWithLinks> | undefined> = new Map();
nodeTypeMapping.set(NodeType.UCC, demandsWithLinks)
nodeTypeMapping.set(NodeType.Demand, servicesWithLinks)
nodeTypeMapping.set(NodeType.Service, unitsWithLinks)
nodeTypeMapping.set(NodeType.Unit, undefined)

export const getDescendantCount = (node: NodeWithLinks) => {
    const nodeCollection = nodeTypeMapping.get(node[0].data.nodeType)
    let descendantCount = 0
    if (nodeCollection !== undefined)
        nodeCollection.forEach((outerNode) => {
            const outerNodeParentIds = outerNode[1].map((edge) => edge.data.target);
            if (node[0].data.id !== undefined && outerNodeParentIds.includes(node[0].data.id))
                descendantCount += 1 + getDescendantCount(outerNode)
        })
    return descendantCount;
}

function argMax(array: Array<number | undefined>) {
    return array.map((x, i) => [x, i]).reduce((r, a) => ((a[0] ?? Number.NEGATIVE_INFINITY) > (r[0] ?? Number.NEGATIVE_INFINITY) ? a : r))[1];
}

function argMin(array: Array<number | undefined>) {
    return array.map((x, i) => [x, i]).reduce((r, a) => ((a[0] ?? Number.POSITIVE_INFINITY) < (r[0] ?? Number.POSITIVE_INFINITY) ? a : r))[1];
}

export const alternatingSort = (arr: Array<number>) => {
    const tmpArr: Array<number | undefined> = [...arr];
    const newArr = Array<number>(arr.length);
    let i = 0;
    let fun = argMin;
    while (i < arr.length) {
        const ind = fun(tmpArr);
        if (ind === undefined)
            break;
        newArr[i++] = ind;
        delete tmpArr[ind]
        if (fun === argMin)
            fun = argMax;
        else
            fun = argMin;
    }
    return newArr
}

export const alternatingSortByInnerCircle = (arr: Array<NodeWithLinks>, orderedInnerArr: Array<NodeWithLinks>) => {
    const grouped: Map<String, Array<NodeWithLinks>> = new Map();
    const orderedArr: Array<NodeWithLinks> = [];
    orderedInnerArr.forEach((node) => {
        if (node[0].data.id !== undefined)
            grouped.set(node[0].data.id, [])
    });
    arr.forEach((node) => {
        // Add to middle group, could calculate best index but may complicate things
        grouped.get(node[1][Math.floor(node[1].length / 2)].data.target)?.push(node)
    });
    orderedInnerArr.forEach((node) => {
        if (node[0].data.id !== undefined) {
            const group = grouped.get(node[0].data.id);
            if (group !== undefined) {
                const groupDescendants = group.map((node) => {return getDescendantCount(node)})
                const groupOrder = alternatingSort(groupDescendants);
                const orderedGroup = groupOrder.map((i => group[i]));
                orderedArr.push(...orderedGroup);
            }
        }
    });
    return orderedArr;
}
