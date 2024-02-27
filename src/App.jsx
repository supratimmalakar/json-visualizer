import { useState } from "react";
import JsonEditor from "./components/JsonEditor";
import Header from "./components/Header";
import styled from "styled-components";
import Visualizer from "./components/Visualizer";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { useTheme } from "./provider/useTheme";
import { initialJson } from "./constants";

const Container = styled.div`
  .app-body {
    display: flex;
  }
`;

function App() {
  const [collapse, setCollapse] = useState(false);
  const [jsonObj, setJsonObj] = useState(initialJson);

  const { themeMode } = useTheme()

  const theme = createTheme({
    palette: {
      primary:
        themeMode === "light"
          ? {
              main: "#6750A4",
              light: "#EADDFF",
              dark: "#21005D",
            }
          : {
              main: "#EADDFF",
              light: "#FFFFFF",
              dark: "#6750A4",
            },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Container>
        <Header
          collapse={collapse}
          setCollapse={setCollapse}
          jsonObj={jsonObj}
          setJsonObj={setJsonObj}
        />
        <div className="app-body">
          <Visualizer
            collapse={collapse}
            jsonObj={jsonObj}
            setJsonObj={setJsonObj}
          />
          <JsonEditor
            collapse={collapse}
            jsonObj={jsonObj}
            setJsonObj={setJsonObj}
          />
        </div>
      </Container>
    </MuiThemeProvider>
  );
}

export default App;
