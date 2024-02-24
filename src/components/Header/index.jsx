import { FormControlLabel, IconButton, Switch, Tooltip } from '@mui/material';
import React from 'react'
import styled from 'styled-components'
import { useTheme } from '../../provider/useTheme';
import { DarkModeOutlined, FirstPageOutlined, LastPageOutlined, LightModeOutlined } from '@mui/icons-material';
import githubDark from '../../assets/github-mark-white.svg';
import githubLight from '../../assets/github-mark.svg'
import { color } from '../../constants';


const HeaderContainer = styled.div`
  font-family: "Inter", sans-serif;
  padding: 10px 20px;
  width: calc(100vw - 40px);
  height: 60px;
  border-bottom: 0.3px solid ${(props) => color.outline[props.themeMode]};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => color.headerBg[props.themeMode]};
  .button-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    .switch-label {
      font-family: "Inter", sans-serif;
      font-weight: 400;
      font-size: 14px;
      position: relative;
      right: -16px;
    }
  }
  .app-heading {
    font-family: "Inter", sans-serif;
    font-size: 32px;
    color: ${(props) => color.heading[props.themeMode]};
    .heading-sub {
      color: ${(props) => color.headsub[props.themeMode]};
    }
  }
`;

function Header({setAllowDrag, allowDrag, collapse, setCollapse}) {
  const {themeMode, toggleThemeMode} = useTheme();
  return (
    <HeaderContainer themeMode={themeMode}>
      <span className="app-heading">
        JSON <span className='heading-sub'>Visualizer</span>
      </span>
      <div className="button-container">
        {/* <span className='switch-label'>Allow Drag</span> */}
        <Tooltip title="Allow node dragging?">
            <Switch
              checked={allowDrag}
              onChange={() => setAllowDrag((prev) => !prev)}
            />
        </Tooltip>
        <IconButton onClick={() => toggleThemeMode()}>
          {themeMode === "dark" ? (
            <LightModeOutlined style={{ color: color.icon[themeMode] }} />
          ) : (
            <DarkModeOutlined style={{ color: color.icon[themeMode] }} />
          )}
        </IconButton>
        <IconButton>
          <img
            style={{ width: 24, height: 24 }}
            src={themeMode === "dark" ? githubLight : githubDark}
          />
        </IconButton>
        <IconButton onClick={() => setCollapse((prev) => !prev)}>
          {collapse ? (
            <FirstPageOutlined
              style={{
                fontSize: 30,
                color: color.icon[themeMode],
              }}
            />
          ) : (
            <LastPageOutlined
              style={{ fontSize: 30, color: color.icon[themeMode] }}
            />
          )}
        </IconButton>
      </div>
    </HeaderContainer>
  );
}

export default Header