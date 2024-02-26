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

const Container = styled.div`
  .app-body {
    display: flex;
  }
`;

function App() {
  const [collapse, setCollapse] = useState(false);
  const [jsonObj, setJsonObj] = useState({
    kind: "youtube#searchListResponse",
    etag: "q4ibjmYp1KA3RqMF4jFLl6PBwOg",
    nextPageToken: "CAUQAA",
    regionCode: "NL",
    pageInfo: { totalResults: 1000000, resultsPerPage: 5 },
    items: [
      {
        kind: "youtube#searchResult",
        etag: "QCsHBifbaernVCbLv8Cu6rAeaDQ",
        id: { kind: "youtube#video", videoId: "TvWDY4Mm5GM" },
        snippet: {
          publishedAt: "2023-07-24T14:15:01Z",
          channelId: "UCwozCpFp9g9x0wAzuFh0hwQ",
          title:
            "3 Football Clubs Kylian Mbappe Should Avoid Signing ✍️❌⚽️ #football #mbappe #shorts",
          description: "",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/TvWDY4Mm5GM/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/TvWDY4Mm5GM/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/TvWDY4Mm5GM/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "FC Motivate",
          liveBroadcastContent: "none",
          publishTime: "2023-07-24T14:15:01Z",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "0NG5QHdtIQM_V-DBJDEf-jK_Y9k",
        id: { kind: "youtube#video", videoId: "aZM_42CcNZ4" },
        snippet: {
          publishedAt: "2023-07-24T16:09:27Z",
          channelId: "UCM5gMM_HqfKHYIEJ3lstMUA",
          title:
            "Which Football Club Could Cristiano Ronaldo Afford To Buy? 💰",
          description:
            "Sign up to Sorare and get a FREE card: https://sorare.pxf.io/NellisShorts Give Soraredata a go for FREE: ...",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/aZM_42CcNZ4/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/aZM_42CcNZ4/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/aZM_42CcNZ4/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "John Nellis",
          liveBroadcastContent: "none",
          publishTime: "2023-07-24T16:09:27Z",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "WbBz4oh9I5VaYj91LjeJvffrBVY",
        id: { kind: "youtube#video", videoId: "wkP3XS3aNAY" },
        snippet: {
          publishedAt: "2023-07-24T16:00:50Z",
          channelId: "UC4EP1dxFDPup_aFLt0ElsDw",
          title: "PAULO DYBALA vs THE WORLD'S LONGEST FREEKICK WALL",
          description:
            "Can Paulo Dybala curl a football around the World's longest free kick wall? We met up with the World Cup winner and put him to ...",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/wkP3XS3aNAY/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/wkP3XS3aNAY/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/wkP3XS3aNAY/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Shoot for Love",
          liveBroadcastContent: "none",
          publishTime: "2023-07-24T16:00:50Z",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "juxv_FhT_l4qrR05S1QTrb4CGh8",
        id: { kind: "youtube#video", videoId: "rJkDZ0WvfT8" },
        snippet: {
          publishedAt: "2023-07-24T10:00:39Z",
          channelId: "UCO8qj5u80Ga7N_tP3BZWWhQ",
          title: "TOP 10 DEFENDERS 2023",
          description:
            "SoccerKingz https://soccerkingz.nl Use code: 'ILOVEHOF' to get 10% off. TOP 10 DEFENDERS 2023 Follow us! • Instagram ...",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/rJkDZ0WvfT8/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/rJkDZ0WvfT8/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/rJkDZ0WvfT8/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Home of Football",
          liveBroadcastContent: "none",
          publishTime: "2023-07-24T10:00:39Z",
        },
      },
      {
        kind: "youtube#searchResult",
        etag: "wtuknXTmI1txoULeH3aWaOuXOow",
        id: { kind: "youtube#video", videoId: "XH0rtu4U6SE" },
        snippet: {
          publishedAt: "2023-07-21T16:30:05Z",
          channelId: "UCwozCpFp9g9x0wAzuFh0hwQ",
          title:
            "3 Things You Didn’t Know About Erling Haaland ⚽️🇳🇴 #football #haaland #shorts",
          description: "",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/XH0rtu4U6SE/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/XH0rtu4U6SE/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/XH0rtu4U6SE/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "FC Motivate",
          liveBroadcastContent: "none",
          publishTime: "2023-07-21T16:30:05Z",
        },
      },
    ],
  });

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
