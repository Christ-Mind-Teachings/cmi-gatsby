import React, { useContext } from 'react';
import { Link } from 'gatsby';
import {
  Image,
  Button,
  Container,
  Header,
  Card,
  Segment,
} from 'semantic-ui-react';
import { IdentityContext } from './IdentityContextProvider';
import raj from '../assets/images/cmi/covers/raj-big.jpg';
import wom from '../assets/images/cmi/covers/wom-big.jpg';
import './NotAuthorized.css';

export function NotAuthorized(props) {
  const { identity: netlifyIdentity } = useContext(IdentityContext);

  return (
    <div className="App">
      <Segment inverted vertical textAlign="center">
        <Container>
          <Header inverted as="h1">
            <Link to="/">Teachings of Christ Mind</Link>
          </Header>
        </Container>

        <Container className="teachings">
          <Card.Group itemsPerRow={4}>
            <Card raised as={Link} to="/raj">
              <Image src={raj} wrapped ui={false} />
              <Card.Header>The Raj Material</Card.Header>
            </Card>
            <Card raised as={Link} to="/wom">
              <Image src={wom} wrapped ui={false} />
              <Card.Header>The Way of Mastery</Card.Header>
            </Card>
          </Card.Group>
        </Container>
        <Container className="content">
          <Header inverted as="h1">
            Create an Account (Forever Free)
          </Header>
          <p>
            With an account you have access to additional features. You can set
            up an email list that simplifies sharing quotes with your friends.
            You can request full access to <em>A Course Of Love</em> which is
            only partially available to those without an account.
          </p>
          <p> More features will be added over time.</p>
          <Button size="large" onClick={() => netlifyIdentity.open('signup')}>
            Sign Up or Sign In
          </Button>
        </Container>
      </Segment>
    </div>
  );
}
