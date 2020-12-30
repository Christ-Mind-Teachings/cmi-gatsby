import React from 'react';
import { Header, Grid } from 'semantic-ui-react';

export function NotAuthorized(props) {
  return (
    <Grid.Row>
      <Header dividing size="huge" as="h1">
        Not Authorized
      </Header>
      Account Holder Features
    </Grid.Row>
  );
}
