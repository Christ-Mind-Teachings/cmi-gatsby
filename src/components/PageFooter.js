import React from 'react';
import { Link } from 'gatsby-plugin-react-i18next';
import {
  Segment,
  Container,
  Grid,
  Header,
  Image,
  List,
  Divider,
} from 'semantic-ui-react';

export function PageFooter(props) {
  return (
    <Segment
      inverted
      vertical
      style={{ margin: 'auto 0em 0em', padding: '5em 0em' }}
    >
      <Container textAlign="center">
        <Grid divided inverted stackable>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Group 1" />
            <List link inverted>
              <List.Item as={Link} to="/">
                Return Home
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Group 1" />
            <List link inverted>
              <List.Item as={Link} to="/">
                Return Home
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Group 1" />
            <List link inverted>
              <List.Item as={Link} to="/">
                Return Home
              </List.Item>
            </List>
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  );
}
