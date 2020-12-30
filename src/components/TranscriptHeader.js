import React from 'react';
import { Link } from 'gatsby';
import { Icon, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import { useTranslation } from 'gatsby-plugin-react-i18next';

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
  const { t } = useTranslation(['translation']);

  return (
    <StyledHeader>
      <Header as="h1" title={t('To Card Catalog')} textAlign="center">
        <Link to="/">
          {t('Teachings of Christ Mind')}
          <Icon name="linkify" size="tiny" color="blue" />
        </Link>
      </Header>
      <Header as="h2" title={t('To Home Page')} textAlign="center">
        <Link to={source.url}>
          {source.title}/{book.title}
          <Icon name="linkify" size="tiny" color="blue" />
        </Link>
      </Header>
      <Header as="h3" textAlign="center">
        {unit?.title}
      </Header>
    </StyledHeader>
  );
}
