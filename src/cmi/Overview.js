import React from 'react';
import { Header, Grid } from 'semantic-ui-react';
import { Dashboard } from '../components/Dashboard';

export function Overview(props) {
  return (
    <Dashboard activeItem="overview">
      <Grid.Row>
        <Header dividing size="huge" as="h1">
          Library Overview
        </Header>
      </Grid.Row>
    </Dashboard>
  );
}
