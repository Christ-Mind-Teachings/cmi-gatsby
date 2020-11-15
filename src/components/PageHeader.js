import React from 'react';
import { Link } from 'gatsby';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledHeader = styled(Header)`
  h1.ui.header {
    margin-top: 2em;
  }
  h1 a {
    color: #871212;
  }
  h1 a:hover {
    color: #1f70bf;
  }
  h2.ui.header {
    color: #871212;
  }
`;

export default function PageHeader(props) {
  const { title } = props;
  return (
    <StyledHeader>
      <Header as="h1" title="To Home Page" textAlign="center">
        <Link to="/">Teachings of Christ Mind</Link>
      </Header>
      <Header as="h2" textAlign="center">
        {title}
      </Header>
    </StyledHeader>
  );
}
