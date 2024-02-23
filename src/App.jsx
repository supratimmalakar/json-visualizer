import { useState } from "react";
import JsonEditor from "./components/JsonEditor";
import Header from "./components/Header";
import styled from "styled-components";
import Visualizer from "./components/Visualizer";

const Container = styled.div`
  .app-body {
    display: flex;
  }
`;

function App() {
  const [jsonObj, setJsonObj] = useState({
    id: 28802695164,
    date: {
      'text': "hello",
    },
    rand: {
      yes : "1",
      nigga: {
        "time": "now",
        no : "please"
      },
      nigga2: {
        hey: "hi"
      },
      yesnigga: [1,2,3]
    },
    data: {
      totalUsers: 99,
      online: 80,
      onlineStatus: { active: 67, away: 13, busy: 8 },
    },
    ball: {
      jeff : "my name",
      anotherObject: {
        "amount" : 25
      }
    }
  });
  return (
    <Container>
      <Header jsonObj={jsonObj} setJsonObj={setJsonObj} />
      <div className="app-body">
        <Visualizer jsonObj={jsonObj} setJsonObj={setJsonObj} />
        <JsonEditor jsonObj={jsonObj} setJsonObj={setJsonObj} />
      </div>
    </Container>
  );
}

export default App;
