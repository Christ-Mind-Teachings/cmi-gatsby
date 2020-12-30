import React from 'react';
import { useI18next, Trans, useTranslation } from 'gatsby-plugin-react-i18next';
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
  const { t } = useTranslation();
  const { language, originalPath } = useI18next();
  // const { navigate } = i18;

  return (
    <>
      <SiteHeader />
      <LibraryNav />
      <Container text>
        <Header as="h2" style={headerStyle}>
          <Trans>Welcome to the Library of Christ Mind Teachings!</Trans>
        </Header>
        <p>{t('p1')}</p>
        <p>
          <Trans i18nKey="p2">
            One of the goals of this site is to bring all the bits and pieces of
            a teaching together in an easily discoverable and usable format.
            This is particularly true for <em>The Way of Mastery</em> and
            <em>The Raj Material</em> which, because of the volume of content,
            was difficult to compile into an approachable package.
          </Trans>
        </p>
        <p>
          <Trans i18nKey="p3">
            Another goal is to integrate audio, where present, with the written
            word so you can read along as you listen and not lose your place.
            See the <em>Get Acquainted</em> guide for details of this and other
            features of the library.
          </Trans>
        </p>
        <p>
          <Trans i18nKey="p4">
            The intent of the library is to offer simple, readable, and
            uncluttered access to the material herein. The interface is terse by
            design so be sure to poke around and get familiar with the features
            available. Start by clicking the <i className="question icon" />
            option in the menu bar of each page. Video documentation is also
            available.
          </Trans>
        </p>
        <Grid>
          <Grid.Column width={5}>
            <Card name="acq">
              <Image src={acq} size="medium" wrapped ui={false} />
              <Card.Content>
                <Card.Description>
                  <Trans>Get Acquainted with the Library</Trans>
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
                <Trans>A Course in Miracles Original Edition</Trans>
              </Card.Description>
            </Card.Content>
          </Card>
          {language === 'en' && (
            <Card name="wom" onClick={() => navigate('/en/wom')}>
              <Image src={wom} size="medium" wrapped ui={false} />
              <Card.Content>
                <Card.Description>
                  <Trans>The Way of Mastery</Trans>
                </Card.Description>
              </Card.Content>
            </Card>
          )}
          {language === 'pl' && (
            <Card name="pwom" onClick={() => navigate('/pl/pwom')}>
              <Image src={pwom} size="medium" wrapped ui={false} />
              <Card.Content>
                <Card.Description>
                  <Trans>The Way of Mastery</Trans>
                </Card.Description>
              </Card.Content>
            </Card>
          )}
          <Card name="acol">
            <Image src={acol} size="medium" wrapped ui={false} />
            <Card.Content>
              <Card.Description>
                <Trans>A Course Of Love</Trans>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card name="raj" onClick={() => navigate('/en/raj')}>
            <Image src={raj} size="medium" wrapped ui={false} />
            <Card.Content>
              <Card.Description>
                <Trans>The Raj Materials</Trans>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card name="jsb">
            <Image src={jsb} size="medium" wrapped ui={false} />
            <Card.Content>
              <Card.Description>
                <Trans>The Impersonal Life</Trans>
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
    </>
  );
}
