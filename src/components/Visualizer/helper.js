import { v4 } from "uuid";
import { color } from '../../constants'

const getPosition = (count, index, height = 0) => ({
    x: 1100 * index,
    y: height * 23 + 230 * count,
});

const getNode = (
    id,
    obj,
    key,
    height,
    currHeight,
    count,
    level,
    isArrayItem
) => ({
    id,
    data: {
        jsonObj: obj,
        key,
        height,
        count,
        isArrayItem,
        level,
    },
    position: getPosition(count, level, height, currHeight),
    type: "object",
});

export const generateGraph = (jsonObj, themeMode) => {
    let results = [];
    let edges = [];
    const prevHeightByLevel = {};
    const countByLevel = {};
    const addNodes = (obj, index = 0, source = null, key = 'root') => {
        if (typeof obj === "object") {
            if (!Array.isArray(obj)) {
                const height = Object.keys(obj).length + 1;
                const id = v4();
                if (source) {
                    edges.push({
                        source,
                        target: id,
                        sourceHandle: key + source,
                        targetHandle: id,
                        style: {
                            stroke: color.edge[themeMode]
                        }
                    });
                }

                if (prevHeightByLevel[index] === undefined)
                    prevHeightByLevel[index] = 0;
                if (countByLevel[index] === undefined) countByLevel[index] = 0;

                const node = getNode(
                    id,
                    obj,
                    key,
                    prevHeightByLevel[index],
                    height,
                    countByLevel[index],
                    index,
                    false
                );
                prevHeightByLevel[index] += height;
                countByLevel[index] += 1;
                results.push(node);
                for (let key in obj) {
                    addNodes(obj[key], index + 1, id, key);
                }
            } else {
                const idArray = obj.map(() => v4());
                obj.forEach((arrayItem, idx) => {
                    const height =
                        typeof arrayItem === "object"
                            ? Object.keys(arrayItem).length + 1
                            : 1;
                    const id = idArray[idx];
                    if (source) {
                        edges.push({
                            source,
                            target: id,
                            sourceHandle: key + source,
                            targetHandle: id,
                            animated: true,
                            style: {
                                stroke: color.edge[themeMode],
                            },
                        });
                    }
                    if (idx > 0) {
                        edges.push({
                            source: idArray[idx - 1],
                            target: id,
                            sourceHandle: "array-source" + idArray[idx - 1],
                            targetHandle: "array-target" + id,
                            animated: true,
                            style: {
                                stroke: color.edge[themeMode],
                            },
                        });
                    }

                    if (prevHeightByLevel[index] === undefined)
                        prevHeightByLevel[index] = 0;
                    if (countByLevel[index] === undefined) countByLevel[index] = 0;
                    const node = getNode(
                        id,
                        arrayItem,
                        `${key}[${idx}]`,
                        prevHeightByLevel[index],
                        height,
                        countByLevel[index],
                        index,
                        true
                    );
                    prevHeightByLevel[index] += height;
                    countByLevel[index] += 1;
                    results.push(node);
                    for (let key in arrayItem) {
                        addNodes(arrayItem[key], index + 1, id, key);
                    }
                });
            }
        } else return;
    };
    
    addNodes(jsonObj);
    const nodes = results.map((node, index) => {
        const key = node.data.level;
            return {
                ...node,
                position: {
                    ...node.position,
                    y: node.position.y - prevHeightByLevel[key] * 12 - countByLevel[key] * 115
                }
            }
    })

    return { nodes, edges };
};