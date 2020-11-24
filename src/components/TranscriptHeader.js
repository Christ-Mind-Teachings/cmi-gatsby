import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledHeader = styled(Header)`
  h1 {
    font-weight: 500;
  }
  h2 {
    font-weight: 400;
  }
  h1.ui.header {
    margin-top: 2em;
  }
  h2.ui.header,
  h3.ui.header,
  h2 a,
  h1 a {
    color: #871212;
  }
  h2 a:hover,
  h1 a:hover {
    color: #1f70bf;
  }
`;

export default function TranscriptHeader(props) {
  const { source, book, unit } = props;

  return (
    <StyledHeader>
      <Header as="h1" title="To Card Catalog" textAlign="center">
        <Link to="/">Teachings of Christ Mind</Link>
      </Header>
      <Header as="h2" title="To Home Page" textAlign="center">
        <Link to={source.url}>
          {source.title}/{book.title}
        </Link>
      </Header>
      <Header as="h3" textAlign="center">
        {unit?.title}
      </Header>
    </StyledHeader>
  );
}
