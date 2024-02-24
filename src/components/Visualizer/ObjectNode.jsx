import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import styled from "styled-components";
import DataArrayIcon from "@mui/icons-material/DataArray";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { useTheme } from "../../provider/useTheme";
import { color } from "../../constants";
import { Tooltip } from "@mui/material";

const ObjPropList = styled.div`
  display: flex;
  flex-direction: column;
  .obj-item {
    color: black;
    font-size: 22px;
    height: 35px;
    padding: 5px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: "Source Code Pro", monospace;
    position: relative;
    border-bottom: 1px solid ${(props) => color.outline[props.themeMode]};
    .key-1 {
      width: 150px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: ${(props) => color.key[props.themeMode]};
      font-weight: 500;
    }
    .value-1 {
      max-width: 250px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;

const NodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => color.nodeBg[props.themeMode]};
  width: 480px;
  height: fit-content;
  border: 1px solid ${(props) => color.outline[props.themeMode]};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  font-family: "Source Code Pro", monospace;
  font-size: 22px;
  cursor: grab;
  .primitive-value {
    padding: 5px 10px;
  }
  .heading {
    font-weight: 600;
    font-size: 28px;
    border-bottom: 1px solid ${(props) => color.outline[props.themeMode]};
    padding: 5px 20px;
    display: flex;
    color: ${(props) => color.heading[props.themeMode]};
    justify-content: space-between;
  }
  .string-value {
    color: ${(props) => color.string[props.themeMode]};
  }
  .number-value {
    color: ${(props) => color.number[props.themeMode]};
  }
  .true-value {
    background-color: #18c96433;
    color: #18c964;
    padding: 2px 6px;
    border-radius: 12px;
  }
  .false-value {
    background-color: #f3126033;
    color: #f31260;
    padding: 2px 6px;
    border-radius: 12px;
  }
`;

const renderValue = (value) => {
  switch (typeof value) {
    case "string":
      return <span className="value-1 string-value">{`"${value}"`}</span>;
    case "number":
      return <span className="value-1 number-value">{`${value}`}</span>;
    case "boolean":
      return <span className={`value-1 ${value}-value`}>{`${value}`}</span>;
    default:
      return <span className="value-1 string-value">{`${value}`}</span>;
  }
};

function ObjectNode({ data, id }) {
  const { themeMode } = useTheme();
  const { jsonObj, key, isArrayItem, count, height } = data;
  const isObject = typeof jsonObj === "object";
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
      <NodeContainer themeMode={themeMode}>
        <span className="heading">
          <span>{key}</span>
          {!isObject && renderValue(jsonObj)}
        </span>

        {/* {isObject ? (
            <span className="primitive-value">{renderValue(jsonObj)}</span>
        ) :  */}
        {isObject && (
          <ObjPropList themeMode={themeMode}>
            {jsonArr
              .filter((item) => item[0] !== "key")
              .map((item) => {
                return (
                  <span key={item[0] + id} className="obj-item">
                    <Tooltip title={item[0].toString()}>
                      <span className="key-1">{item[0]}</span>
                    </Tooltip>
                    {typeof item[1] === "object" ? (
                      <>
                        {Array.isArray(item[1]) ? (
                          <DataArrayIcon
                            style={{ color: color.icon[themeMode] }}
                          />
                        ) : (
                          <DataObjectIcon
                            style={{ color: color.icon[themeMode] }}
                          />
                        )}
                        <Handle
                          type="source"
                          position={Position.Right}
                          id={item[0] + id}
                        />
                      </>
                    ) : (
                      <Tooltip title={item[1].toString()}>
                        {renderValue(item[1])}
                      </Tooltip>
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
