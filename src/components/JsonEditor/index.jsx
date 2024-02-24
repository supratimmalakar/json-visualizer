import React from 'react'
import ReactJson from "react-json-view";
import styled from 'styled-components';
import { useTheme } from '../../provider/useTheme';
import { color } from '../../constants';

const EditorContainer = styled.div`
  height: calc(100vh - 81px);
  width: ${(props) => (props.isCollapsed ? 0 : "300px")};
  transition: width 0.6s ease-in-out;
  position: relative;
  border-left: 1px solid hsla(0, 0%, 100%, 0.4);
  background-color: ${(props) => color.editorBg[props.themeMode]};
`;



function JsonEditor({jsonObj, collapse}) {
  const {themeMode} = useTheme()
  return (
    <EditorContainer isCollapsed={collapse} themeMode={themeMode}>
        <ReactJson theme={themeMode === 'dark' ? 'monokai' : 'rjv-default'} style={{ height: 'calc(100% - 20px)', paddingTop: 20, paddingLeft: 10, overflow: 'auto', backgroundColor: 'transparent'}} enableClipboard={false} src={jsonObj}/>
    </EditorContainer>
  )
}

export default JsonEditor;

