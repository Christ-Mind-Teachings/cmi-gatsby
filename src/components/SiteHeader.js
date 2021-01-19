import React from 'react';
import { Trans } from 'gatsby-plugin-react-i18next';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledHeader = styled(Header)`
  &.ui.header {
    margin-bottom: 4rem;
  }
  h1.ui.header {
    font-weight: 500;
    color: #871212;
    margin-top: 2em;
    font-size: 2.5rem;
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
        <Trans>Teachings of Christ Mind</Trans>
      </Header>
      <Header as="h2" textAlign="center">
        <Trans>The Library</Trans>
      </Header>
    </StyledHeader>
  );
}
