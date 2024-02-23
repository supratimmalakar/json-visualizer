import React, { useCallback, useEffect, useMemo } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";
import styled from "styled-components";
import ObjectNode from "./ObjectNode";
import { v4 } from "uuid";

const VisualizerContainer = styled.div`
  width: calc(100vw - 300px);
  height: calc(100vh - 81px);
`;

const initialNodes = [];
const initialEdges = [];

function Visualizer({ jsonObj }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodeTypes = useMemo(() => ({ object: ObjectNode }), []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const getPosition = (count, index, height = 0, currHeight) => ({
    x: 500 * index,
    // y: ((height === 0 ? height : height + currHeight/2) + 3) * 16 * (count) ,
    y: (height  ) * 160,
  });
  const getNode = (id, obj, key, height, currHeight, count, level, isArrayItem) => ({
    id,
    data: {
      jsonObj: obj,
      key,
      height,
      count,
      isArrayItem,
    },
    position: getPosition(
      count,
      level,
      height,
      currHeight,
    ),
    type: "object",
  });
  useEffect(() => {
    let results = [];
    let edges = [];
    const prevHeightByLevel = {};
    const countByLevel = {};
    const addNodes = (obj, index, source, key) => {
      if (typeof obj === "object") {
        if (!Array.isArray(obj)) {
          const height = (Object.keys(obj).length + 1);
          const id = v4();
          if (source) {
            edges.push({
              source,
              target: id,
              sourceHandle: key + source,
              targetHandle: id,
            });
          }

          if (prevHeightByLevel[index] === undefined) prevHeightByLevel[index] = 0;
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
          const idArray = obj.map((item) => v4());
          obj.forEach((arrayItem, idx) => {
            const height = typeof arrayItem === 'object' ? (Object.keys(arrayItem).length + 1) : 2;
            const id = idArray[idx];
            if (source) {
              edges.push({
                source,
                target: id,
                sourceHandle: key + source,
                targetHandle: id,
                animated: true,
              });
            }
            if (idx > 0) {
              edges.push({
                source: idArray[idx - 1],
                target: id,
                sourceHandle: "array-source" + idArray[idx - 1],
                targetHandle: "array-target" + id,
                animated: true,
              });
            }

            if (prevHeightByLevel[index] === undefined) prevHeightByLevel[index] = 0;
            if (countByLevel[index] === undefined) countByLevel[index] = 0;

            const node = getNode(
              id,
              arrayItem,
              `[${idx}]`,
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
    addNodes(jsonObj, 0, null, "root", 0);
    setNodes((nodes) => [...results]);
    console.log(results)
    edges.forEach((edge) => {
      setEdges((oldEdges) => addEdge(edge, oldEdges));
    });
  }, [jsonObj]);

  return (
    <VisualizerContainer>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodesDraggable={false}
        nodesConnectable={false}
        nodeTypes={nodeTypes}
        fitView
        deleteKeyCode={[]}
      >
        <Controls />
        {/* <MiniMap /> */}
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </VisualizerContainer>
  );
}

export default Visualizer;

// xyz =
// const objKeyArray = [];
// for (let key in obj) {
//   // addNodes(obj[key], index + 1, id,key);
//   if (typeof obj[key] === 'object') {
//     objKeyArray.push(key);
//   }
// }
// const clone = {
//   ...obj,
// }
// objKeyArray.forEach((key) => {
//   clone[key] = {source};
// })
