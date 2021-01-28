import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Grid, Segment, Header, Card } from 'semantic-ui-react';
import CoverAnimator from '../../components/CoverAnimator';
import PageLayout from '../../components/PageLayout';
import ContentsModal from '../../components/ContentsModal';
import pwomContents from '../../data/pwom/pwomContents.json';
import QuoteModal from '../../components/QuoteModal';
import wisdom from '../../assets/images/cmi/covers/wisdom.jpg';
import woh from '../../assets/images/pwom/woh-big.jpg';
import wot from '../../assets/images/pwom/wot-big.jpg';
import wok from '../../assets/images/pwom/wok-big.jpg';
import lj from '../../assets/images/pwom/lj-big.jpg';
import wos from '../../assets/images/pwom/wos-big.jpg';
import early from '../../assets/images/pwom/early-big.jpg';

export default function PwomPage({ data }) {
  const sourceInfo = data.source;
  const [book, setBook] = useState();
  const [contentsOpen, setContentsOpen] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  console.log('sourceInfo: %o', sourceInfo);

  function cardClick(e, obj) {
    const selectedBook = pwomContents.find((b) => b.bookId === obj.name);

    if (selectedBook) {
      setBook(selectedBook);
      setContentsOpen(true);
    }
  }

  return (
    <PageLayout source={sourceInfo}>
      <Header as="h2">witamy na drodze mistrzostwa</Header>
      <div className="page-introduction">
        <p>
          wszystkie książki wchodzące w skład drogi mistrzostwa możesz kupić w
          sklepie{' '}
          <a href="https://pokojchrystusa.pl" rel="noreferrer" target="_blank">
            wydawnictwa pokoju chrystusa.
          </a>
        </p>
      </div>
      <Grid>
        <Grid.Column width={10}>
          <Card name="quotes" onClick={() => setShowQuote(true)}>
            <CoverAnimator image={wisdom} />
            <Card.Content>
              <Card.Description>
                Cytaty z <em>Drodze Mistrzostwa</em>
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        {/* <Grid.Column width={10}>
          <Segment>Fill this in later</Segment>
        </Grid.Column> */}
      </Grid>
      <Card.Group itemsPerRow={3} stackable>
        <Card name="lj" onClick={cardClick}>
          <CoverAnimator image={lj} />
          <Card.Content>
            <Card.Description>Listy Jeszuy</Card.Description>
          </Card.Content>
        </Card>
        <Card name="wos" onClick={cardClick}>
          <CoverAnimator image={wos} />
          <Card.Content>
            <Card.Description>Droga Sługi</Card.Description>
          </Card.Content>
        </Card>
        <Card name="early" onClick={cardClick}>
          <CoverAnimator image={early} />
          <Card.Content>
            <Card.Description>Wczesne lata, Tom 1</Card.Description>
          </Card.Content>
        </Card>
        <Card name="woh" onClick={cardClick}>
          <CoverAnimator image={woh} />
          <Card.Content>
            <Card.Description>Droga Serca</Card.Description>
          </Card.Content>
        </Card>
        <Card name="wot" onClick={cardClick}>
          <CoverAnimator image={wot} />
          <Card.Content>
            <Card.Description>Droga Przemiany</Card.Description>
          </Card.Content>
        </Card>
        <Card name="wok" onClick={cardClick}>
          <CoverAnimator image={wok} />
          <Card.Content>
            <Card.Description>Droga Poznania</Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
      <QuoteModal
        showQuote={showQuote}
        setShowQuote={setShowQuote}
        userId="3f7f14c0d7a13eb2e5a05f3c981f33fb"
        source={sourceInfo}
        urlPrefix="/pl"
      />
      {book && (
        <ContentsModal
          open={contentsOpen}
          setOpen={setContentsOpen}
          book={book}
          unit={null}
        />
      )}
    </PageLayout>
  );
}

export const pageQuery = graphql`
  query pwomSourceInfo {
    source: cmiSourcesJson(sourceId: { eq: "pwom" }) {
      sid
      title
      sourceId
    }
  }
`;
