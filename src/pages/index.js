import React, { useState, createRef } from 'react';
import { useI18next, Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import {
  Segment,
  Grid,
  Card,
  Container,
  Header,
  Sticky,
} from 'semantic-ui-react';
import { navigate } from 'gatsby';
import CoverAnimator from '../components/CoverAnimator';
import { IndexIntro } from '../components/IndexIntro';
import acqContents from '../data/acq/acqContents.json';
import ContentsModal from '../components/ContentsModal';
import SiteHeader from '../components/SiteHeader';
import LibraryNav from '../components/LibraryNav';
import acimGroup from '../assets/images/cmi/covers/acim-group.jpg';
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
  const [contentsOpen, setContentsOpen] = useState(false);
  const { language } = useI18next();
  const contextRef = createRef();

  return (
    <>
      <div ref={contextRef}>
        <Sticky context={contextRef}>
          <LibraryNav />
        </Sticky>
        <SiteHeader />
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Container text attached="bottom">
            <Header as="h2" style={headerStyle}>
              <Trans>Welcome to the Library of Christ Mind Teachings!</Trans>
            </Header>
            <IndexIntro />
            <Grid>
              <Grid.Column width={5}>
                <Card name="acq" onClick={() => setContentsOpen(true)}>
                  <CoverAnimator image={acq} />
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
            <Card.Group itemsPerRow={3}>
              <Card name="acim" onClick={() => navigate('/en/acim')}>
                <CoverAnimator image={acimGroup} />
                <Card.Content>
                  <Card.Description>
                    <Trans>Multiple versions of A Course in Miracles</Trans>
                  </Card.Description>
                </Card.Content>
              </Card>
              {language === 'en' && (
                <Card name="wom" onClick={() => navigate('/en/wom')}>
                  <CoverAnimator image={wom} />
                  <Card.Content>
                    <Card.Description>
                      <Trans>The Way of Mastery</Trans>
                    </Card.Description>
                  </Card.Content>
                </Card>
              )}
              {language === 'pl' && (
                <Card name="pwom" onClick={() => navigate('/pl/pwom')}>
                  <CoverAnimator image={pwom} />
                  <Card.Content>
                    <Card.Description>
                      <Trans>The Way of Mastery</Trans>
                    </Card.Description>
                  </Card.Content>
                </Card>
              )}
              <Card name="acol" onClick={() => navigate('/en/acol')}>
                <CoverAnimator image={acol} />
                <Card.Content>
                  <Card.Description>A Course Of Love</Card.Description>
                </Card.Content>
              </Card>
              <Card name="raj" onClick={() => navigate('/en/raj')}>
                <CoverAnimator image={raj} />
                <Card.Content>
                  <Card.Description>The Raj Materials</Card.Description>
                </Card.Content>
              </Card>
              <Card name="jsb" onClick={() => navigate('/en/jsb')}>
                <CoverAnimator image={jsb} />
                <Card.Content>
                  <Card.Description>The Impersonal Life</Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </Container>
        </div>
      </div>
      <ContentsModal
        open={contentsOpen}
        setOpen={setContentsOpen}
        book={acqContents[0]}
        unit={null}
      />
    </>
  );
}
