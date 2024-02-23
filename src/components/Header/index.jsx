import React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  padding: 10px 20px;
  width: calc(100vw - 40px);
  height: 60px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

function Header() {
  return (
    <HeaderContainer>Header</HeaderContainer>
  )
}

export default Header