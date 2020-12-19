import React from 'react';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledHeader = styled(Header)`
  h1.ui.header {
    font-weight: 500;
    color: #871212;
    margin-top: 2em;
    font-size: 31px;
  }

  h2.ui.header {
    font-weight: 400;
    color: #871212;
  }
`;

export default function SiteHeader() {
  return (
    <StyledHeader>
      <Header as="h1" textAlign="center">
        Teachings of Christ Mind
      </Header>
      <Header as="h2" textAlign="center">
        The Library
      </Header>
    </StyledHeader>
  );
}
