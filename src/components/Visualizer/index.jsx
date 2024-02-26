import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { useTheme } from "../../provider/useTheme";
import { color } from "../../constants";
import { generateGraph } from "./helper";

const VisualizerContainer = styled.div`
  width: ${(props) => (props.isExpanded ? "100vw" : "calc(100vw - 300px)")};
  transition: width 0.5s ease-in-out;
  height: calc(100vh - 81px);
`;

const initialNodes = [];
const initialEdges = [];

function Visualizer({ jsonObj, collapse }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodeTypes = useMemo(() => ({ object: ObjectNode }), []);
  const {themeMode} = useTheme()

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    const {nodes , edges } = generateGraph(jsonObj, themeMode);
    setNodes(() => [...nodes]);
    setEdges(() => [...edges]);
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
        nodesDraggable={false}
        onConnect={onConnect}
        nodesConnectable={false}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          nodes: [...nodes.slice(0, 4).map((node) => ({ id: node.id }))],
        }}
        minZoom={0.2}
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
