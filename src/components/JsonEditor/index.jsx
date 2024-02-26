import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
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
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  const { themeMode } = useTheme();
  const inputRef = useRef(null);
  const handleUploadJson = (e) => {
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
      setAlert(true)
      setMessage("File not valid!");
    }
  };

  const handleChange = (value, event) => {
    if (isValidJson(value)) {
      setJsonObj(JSON.parse(value));
    }
    else {
      setAlert(true);
      setMessage("JSON not valid!")
    }
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
        <Tooltip title="Import JSON">
          <IconButton onClick={() => inputRef.current.click()} color="primary">
            <TextField style={{ display: "none" }} type="file" />
            <UploadFileOutlined />
          </IconButton>
          <input
            type="file"
            onChange={handleUploadJson}
            ref={inputRef}
            accept=".json"
            style={{ display: "none" }} // Make the file input element invisible
          />
        </Tooltip>
        <Tooltip title="Copy Content">
          <IconButton
            onClick={() =>
              navigator.clipboard.writeText(JSON.stringify(jsonObj))
            }
            color="primary"
          >
            <ContentCopyOutlined />
          </IconButton>
        </Tooltip>
      </div>
      <Snackbar
        open={alert}
        autoHideDuration={3000}
        onClose={() => setAlert(false)}
      >
        <Alert
          onClose={() => setAlert(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </EditorContainer>
  );
}

export default JsonEditor;
