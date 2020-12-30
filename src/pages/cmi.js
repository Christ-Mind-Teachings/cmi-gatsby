import React, { useContext } from 'react';
import { Header, Grid } from 'semantic-ui-react';
import { useI18next, Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { Dashboard } from '../components/Dashboard';
import { IdentityContext } from '../components/IdentityContextProvider';

export default function CMI(props) {
  const { user } = useContext(IdentityContext);
  const { language, defaultLanguage } = useI18next();

  return (
    <Dashboard activeItem="overview">
      <Grid.Row>
        <Header dividing size="huge" as="h1">
          Library Overview
        </Header>
        Overview page
      </Grid.Row>
    </Dashboard>
  );
}
