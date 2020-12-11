import React from 'react';
import { Header, Grid } from 'semantic-ui-react';
import { Dashboard } from '../components/Dashboard';

export function MailList(props) {
  return (
    <Dashboard activeItem="maillist">
      <Grid.Row>
        <Header dividing size="huge" as="h1">
          Manage your email list
        </Header>
      </Grid.Row>
    </Dashboard>
  );
}
