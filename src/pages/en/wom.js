import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Grid, Segment, Header, Card } from 'semantic-ui-react';
import CoverAnimator from '../../components/CoverAnimator';
import PageLayout from '../../components/PageLayout';
import ContentsModal from '../../components/ContentsModal';
import womContents from '../../data/wom/womContents.json';
import QuoteModal from '../../components/QuoteModal';
import SEO from '../../components/SEO';
import wisdom from '../../assets/images/cmi/covers/wisdom.jpg';
import woh from '../../assets/images/wom/woh-big.jpg';
import wot from '../../assets/images/wom/wot-big.jpg';
import wok from '../../assets/images/wom/wok-big.jpg';
import tjl from '../../assets/images/wom/tjl-big.jpg';
import wos from '../../assets/images/wom/wos-big.jpg';
import early from '../../assets/images/wom/early-big.jpg';

export default function WomPage({ data }) {
  const sourceInfo = data.source;
  const [book, setBook] = useState();
  const [contentsOpen, setContentsOpen] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  function cardClick(e, obj) {
    const selectedBook = womContents.find((b) => b.bookId === obj.name);

    if (selectedBook) {
      setBook(selectedBook);
      setContentsOpen(true);
    }
  }

  return (
    <PageLayout source={sourceInfo}>
      <SEO type="page" data={{ source: sourceInfo }} />
      <Header as="h2">
        Welcome to the <em>Way of Mastery</em>
      </Header>
      <p>
        The central teaching of The Way of Mastery is a pathway of awakening
        described in a three year series of monthly channeled lessons given by
        Jeshua through Jayem. With answers to many questions and much supporting
        material and effective exercises the Way of Mastery is a practical and
        down to earth guide to transformation.
      </p>
      <Grid>
        <Grid.Column width={10}>
          <Card name="quotes" onClick={() => setShowQuote(true)}>
            <CoverAnimator image={wisdom} />
            <Card.Content>
              <Card.Description>
                Quotes from <em>The Way of Mastery</em>
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        {/* <Grid.Column width={10}>
          <Segment>Fill this in later</Segment>
        </Grid.Column> */}
      </Grid>
      <Card.Group itemsPerRow={3} stackable>
        <Card name="woh" onClick={cardClick}>
          <CoverAnimator image={woh} />
          <Card.Content>
            <Card.Description>Way of the Heart</Card.Description>
          </Card.Content>
        </Card>
        <Card name="wot" onClick={cardClick}>
          <CoverAnimator image={wot} />
          <Card.Content>
            <Card.Description>Way of Transformation</Card.Description>
          </Card.Content>
        </Card>
        <Card name="wok" onClick={cardClick}>
          <CoverAnimator image={wok} />
          <Card.Content>
            <Card.Description>Way of Knowing</Card.Description>
          </Card.Content>
        </Card>
        <Card name="tjl" onClick={cardClick}>
          <CoverAnimator image={tjl} />
          <Card.Content>
            <Card.Description>The Jeshua Letters</Card.Description>
          </Card.Content>
        </Card>
        <Card name="wos" onClick={cardClick}>
          <CoverAnimator image={wos} />
          <Card.Content>
            <Card.Description>Way of the Servant</Card.Description>
          </Card.Content>
        </Card>
        <Card name="early" onClick={cardClick}>
          <CoverAnimator image={early} />
          <Card.Content>
            <Card.Description>The Early Years</Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
      <QuoteModal
        showQuote={showQuote}
        setShowQuote={setShowQuote}
        sid="10"
        userId="05399539cca9ac38db6db36f5c770ff1"
        header="The Way of Mastery"
        source={sourceInfo}
        urlPrefix="/en"
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
  query womSourceInfo {
    source: cmiSourcesJson(sourceId: { eq: "wom" }) {
      sid
      description
      title
      sourceId
    }
  }
`;
