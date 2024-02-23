import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import styled from "styled-components";
import DataArrayIcon from "@mui/icons-material/DataArray";
import DataObjectIcon from "@mui/icons-material/DataObject";

const ObjPropList = styled.div`
  display: flex;
  flex-direction: column;
  .obj-item {
    color: black;
    font-size: large;
    height: 31px;
  }
`;

const NodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 200px;
  height: fit-content;
  border-radius: 8px;
  border: 1px solid black;
`;

function ObjectNode({ data, id }) {
  // console.log(data)
  const { jsonObj, key, isArrayItem, count, height } = data;
  const isObject = typeof jsonObj === 'object';
  const jsonArr = Object.entries(isObject ? jsonObj : {});
  return (
    <>
      <Handle
        style={{ opacity: 0 }}
        type="target"
        position={Position.Left}
        id={id}
      />
      {isArrayItem && (
        <Handle
          style={{ opacity: 0 }}
          type="target"
          position={Position.Top}
          id={"array-target" + id}
        />
      )}
      <NodeContainer>
        <span
          style={{
            fontWeight: 600,
            fontSize: 20,
            borderBottom: "1px solid black",
          }}
        >
          {key}{" "}{`h:${height}, c: ${count}`}
        </span>

        {!isObject ? (
          <span>{jsonObj}</span>
        ) : (
          <ObjPropList>
            {jsonArr
              .filter((item) => item[0] !== "key")
              .map((item) => {
                return (
                  <span
                    style={{
                      position: "relative",
                      borderBottom: "1px solid black",
                    }}
                    key={item[0] + id}
                    className="obj-item"
                  >
                    {item[0]}
                    {":"}
                    {typeof item[1] === "object" ? (
                      <>
                        {Array.isArray(item[1]) ? (
                          <DataArrayIcon />
                        ) : (
                          <DataObjectIcon />
                        )}
                        <Handle
                          type="source"
                          position={Position.Right}
                          id={item[0] + id}
                        />
                      </>
                    ) : (
                      item[1]
                    )}
                  </span>
                );
              })}
          </ObjPropList>
        )}
      </NodeContainer>
      {isArrayItem && (
        <Handle
          style={{ opacity: 0 }}
          type="source"
          position={Position.Bottom}
          id={"array-source" + id}
        />
      )}
    </>
  );
}

export default ObjectNode;
