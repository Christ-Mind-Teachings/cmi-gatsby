import React, { useEffect } from 'react';
import {
  Segment,
  Grid,
  Card,
  Image,
  Container,
  Header,
} from 'semantic-ui-react';
import { navigate } from 'gatsby';
import SiteHeader from '../components/SiteHeader';
import LibraryNav from '../components/LibraryNav';
import oe from '../assets/images/cmi/covers/acimoe-big.jpg';
import jsb from '../assets/images/cmi/covers/jsb-big.jpg';
import acol from '../assets/images/cmi/covers/acol2-big.jpg';
import raj from '../assets/images/cmi/covers/raj-big.jpg';
import wom from '../assets/images/cmi/covers/wom-big.jpg';
import pwom from '../assets/images/cmi/covers/pwom-big.jpg';
import acq from '../assets/images/cmi/covers/acq-big.jpg';

const headerStyle = {
  marginTop: '30px',
};

export default function ChristMindLibrary() {
  return (
    <>
      <SiteHeader />
      <LibraryNav />
      <Container text>
        <Header as="h2" style={headerStyle}>
          Welcome to the Library of Christ Mind Teachings!
        </Header>
        <p>
          This library of Christ Mind teachings is offered to you from a deep
          appreciation and love of the content contained herein and for the love
          expressed and demonstrated in the words of each teaching. Within these
          words is found the motivation and power for real and lasting
          transformation of the human condition through love. Approached with
          honesty, curiosity, patience and a genuine desire for change the
          materials presented here will serve as a trusted guide and friend on
          the journey of awakening.
        </p>
        <p>
          One of the goals of this site is to bring all the bits and pieces of a
          teaching together in an easily discoverable and usable format. This is
          particularly true for <em>The Way of Mastery</em> and{' '}
          <em>The Raj Material</em> which, because of the volume of content, was
          difficult to compile into an approachable package.
        </p>
        <p>
          Another goal is to integrate audio, where present, with the written
          word so you can read along as you listen and not lose your place. See
          the <em>Get Acquainted</em> guide for details of this and other
          features of the library.
        </p>
        <p>
          The intent of the library is to offer simple, readable, and
          uncluttered access to the material herein. The interface is terse by
          design so be sure to poke around and get familiar with the features
          available. Start by clicking the <i className="question icon" />
          option in the menu bar of each page. Video documentation is also
          available.
        </p>
        <Grid>
          <Grid.Column width={5}>
            <Card name="acq">
              <Image src={acq} size="medium" wrapped ui={false} />
              <Card.Content>
                <Card.Description>
                  Get Acquainted with the Library
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={10}>
            <Segment>Fill this in later</Segment>
          </Grid.Column>
        </Grid>
        <Card.Group itemsPerRow={3} stackable>
          <Card name="oe">
            <Image src={oe} size="medium" wrapped ui={false} />
            <Card.Content>
              <Card.Description>
                A Course in Miracles Original Edition
              </Card.Description>
            </Card.Content>
          </Card>
          <Card name="wom" onClick={() => navigate('/wom')}>
            <Image src={wom} size="medium" wrapped ui={false} />
            <Card.Content>
              <Card.Description>The Way of Mastery</Card.Description>
            </Card.Content>
          </Card>
          <Card name="acol">
            <Image src={acol} size="medium" wrapped ui={false} />
            <Card.Content>
              <Card.Description>A Course Of Love</Card.Description>
            </Card.Content>
          </Card>
          <Card name="raj" onClick={() => navigate('/raj')}>
            <Image src={raj} size="medium" wrapped ui={false} />
            <Card.Content>
              <Card.Description>The Raj Materials</Card.Description>
            </Card.Content>
          </Card>
          <Card name="pwom" onClick={() => navigate('/pl/pwom')}>
            <Image src={pwom} size="medium" wrapped ui={false} />
            <Card.Content>
              <Card.Description>The Way of Mastery in Polish</Card.Description>
            </Card.Content>
          </Card>
          <Card name="jsb">
            <Image src={jsb} size="medium" wrapped ui={false} />
            <Card.Content>
              <Card.Description>The Impersonal Life</Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
    </>
  );
}
