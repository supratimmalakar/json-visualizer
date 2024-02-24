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
import { useTheme } from "../../provider/useTheme";
import { color } from "../../constants";

const VisualizerContainer = styled.div`
  width: ${(props) => (props.isExpanded ? "100vw" : "calc(100vw - 300px)")};
  transition: width 0.6s ease-in-out;
  height: calc(100vh - 81px);
`;

const initialNodes = [];
const initialEdges = [];

function Visualizer({ jsonObj, allowDrag, collapse }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodeTypes = useMemo(() => ({ object: ObjectNode }), []);
  const {themeMode} = useTheme()

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const getPosition = (count, index, height = 0, currHeight) => ({
    x: 800 * index,
    // y: ((height === 0 ? height : height + currHeight/2) + 3) * 16 * (count) ,
    y: height * 23 + 230 * count - 50*index,
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
    },
    position: getPosition(count, level, height, currHeight),
    type: "object",
  });
  useEffect(() => {
    let results = [];
    let edges = [];
    let count = 0;
    const prevHeightByLevel = {};
    const countByLevel = {};
    const addNodes = (obj, index, source, key) => {
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
          count++
          prevHeightByLevel[index] += height;
          countByLevel[index] += 1;
          results.push(node);
          for (let key in obj) {
            addNodes(obj[key], index + 1, id, key);
          }
        } else {
          const idArray = obj.map((item) => v4());
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
            count++;
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
    edges.forEach((edge) => {
      setEdges((oldEdges) => addEdge(edge, oldEdges));
    });
  }, [jsonObj]);

  useEffect(() => {
    setEdges((edges) => edges.map((edge) => ({
      ...edge,
      style: {
        stroke: color.edge[themeMode]
      }
    })))
  }, [themeMode])

  return (
    <VisualizerContainer isExpanded={collapse}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodesDraggable={allowDrag}
        onConnect={onConnect}
        nodesConnectable={false}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          nodes: [...nodes.slice(0, 5).map((node) => ({ id: node.id }))],
        }}
        minZoom={0.3}
        deleteKeyCode={[]}
      >
        <Controls />
        <MiniMap />
        <Background
          variant="dots"
          color={themeMode == 'dark' ? "white" : 'black'}
          gap={12}
          size={1}
          style={{ backgroundColor: color.visualizerBg[themeMode] }}
        />
      </ReactFlow>
    </VisualizerContainer>
  );
}

export default Visualizer;
