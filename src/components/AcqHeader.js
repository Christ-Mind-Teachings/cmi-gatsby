import React from 'react';
import { Icon, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import { Link, useI18next } from 'gatsby-plugin-react-i18next';

const StyledHeader = styled(Header)`
  &.ui.header {
    margin-bottom: 4rem;
  }

  h1.ui.header {
    font-size: 2.5rem;
    font-weight: 500;
  }
  h2.ui.header {
    font-weight: 400;
  }
  h1.ui.header {
    margin-top: 2em;
  }
  h1.ui.header a {
    color: #871212;
  }
  h1 a:hover {
    color: #1f70bf;
  }
  h2.ui.header {
    color: #871212;
  }
`;

export default function AcqHeader(props) {
  const { title } = props;
  const { t } = useI18next();

  return (
    <StyledHeader>
      <Header as="h1" title={t('To Home Page')} textAlign="center">
        <Link to="/">
          {t('Teachings of Christ Mind')}
          <Icon name="linkify" size="tiny" color="blue" />
        </Link>
      </Header>
      <Header as="h2" textAlign="center">
        {title}
      </Header>
    </StyledHeader>
  );
}
