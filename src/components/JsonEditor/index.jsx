import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Editor from "@monaco-editor/react";
import { useTheme } from "../../provider/useTheme";
import { color } from "../../constants";
import { Button, IconButton, TextField, Tooltip, Snackbar, Alert } from "@mui/material";
import { ContentCopyOutlined, UploadFileOutlined } from "@mui/icons-material";
import { isValidJson } from "./helper";

const EditorContainer = styled.div`
  top: 81px;
  right: 0;
  height: calc(100vh - 131px);
  width: 400px;
  transform: translateX(${(props) => (props.isCollapsed ? "400px" : "0")});
  transition: transform 0.3s ease-in-out;
  position: absolute;
  border-left: 1px solid hsla(0, 0%, 100%, 0.4);
  background-color: ${(props) => color.editorBg[props.themeMode]};
  padding-bottom: 50px;
  .button-container-json-view {
    position: absolute;
    bottom: 0;
    width: 100%;
    right: 0;
    height: 50px;
    background-color: ${(props) => color.btnContainer[props.themeMode]};
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

function JsonEditor({ jsonObj, collapse, setJsonObj }) {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const { themeMode } = useTheme();
  const inputRef = useRef(null);
  const handleUploadJson = (e) => {
    if (e.target.files[0].size > 50000) {
      setAlert({
        open: true,
        message: "File size should be less than 50kb!",
        severity: "error",
      });
      return;
    }
    var fr = new FileReader();

    fr.onload = function (e) {
      var result = JSON.parse(e.target.result);
      var formatted = JSON.stringify(result, null, 2);
      setJsonObj({...result})
    };

    try {
      fr.readAsText(e.target.files[0]);

    }
    catch (e) {
      setAlert({
        open: true,
        message: "File not valid!",
        severity: "error"
      })
    }
  };

  const handleChange = (value, event) => {
    if (isValidJson(value)) {
      setJsonObj(JSON.parse(value));
    }
    else {
      setAlert({
        open: true,
        message: "Invalid JSON!",
        severity: "error"
      })
    }
  }

  const closeAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  }

  return (
    <EditorContainer isCollapsed={collapse} themeMode={themeMode}>
      <Editor
      theme={themeMode === "light" ? "vs" : "vs-dark"}
        height="calc(100vh - 131px)"
        defaultLanguage="json"
        options={{
          minimap: {
            enabled: false,
          },
          scrollbar: {
            horizontal: "hidden",
          },
          overviewRulerLanes: 0,
          formatOnType: true,
          formatOnPaste: true,
        }}
        value={JSON.stringify(jsonObj, null, 2)}
        onChange={handleChange}
      />
      <div className="button-container-json-view">
        <Tooltip title="Import JSON(50kb)">
          <IconButton onClick={() => inputRef.current.click()} color="primary">
            <TextField style={{ display: "none" }} type="file" />
            <UploadFileOutlined />
          </IconButton>
          <input
            type="file"
            onChange={handleUploadJson}
            ref={inputRef}
            accept=".json"
            style={{ display: "none" }}
            multiple={false}
          />
        </Tooltip>
        <Tooltip title="Copy Content">
          <IconButton
            onClick={() =>{
              navigator.clipboard.writeText(JSON.stringify(jsonObj))
              setAlert({
                open: true,
                message: "Copied to clipboard!",
                severity: "success"
              })
            }
            }
            color="primary"
          >
            <ContentCopyOutlined />
          </IconButton>
        </Tooltip>
      </div>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={closeAlert}
      >
        <Alert
          onClose={closeAlert}
          severity={alert.severity || "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </EditorContainer>
  );
}

export default JsonEditor;
