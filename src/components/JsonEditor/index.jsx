import React from 'react'
import ReactJson from "react-json-view";
import styled from 'styled-components';

const EditorContainer = styled.div`
    height: calc(100vh - 81px);
    width: 300px;
    position: relative;
    overflow: auto;
    /* border-left: 1px solid black; */
    background-color: rgba(0,0,0,0.02);
`;



function JsonEditor({jsonObj, setJsonObj}) {
  return (
    <EditorContainer>
        <ReactJson onEdit={(e) => setJsonObj(e.updated_src)} style={{ height: 'calc(100% - 20px)', paddingTop: 20, paddingLeft: 10}} enableClipboard={false} src={jsonObj}/>
    </EditorContainer>
  )
}

export default JsonEditor;

