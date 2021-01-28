import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Grid, Segment, Header, Card } from 'semantic-ui-react';
import CoverAnimator from '../../../components/CoverAnimator';
import PageLayout from '../../../components/PageLayout';
import ContentsModal from '../../../components/ContentsModal';
import oeContents from '../../../data/acim/oe/oeContents.json';
import QuoteModal from '../../../components/QuoteModal';
import wisdom from '../../../assets/images/cmi/covers/wisdom.jpg';
import text from '../../../assets/images/oe/text-big.jpg';
import workbook from '../../../assets/images/oe/manual-big.jpg';
import manual from '../../../assets/images/oe/workbook-big.jpg';

export default function OePage({ data }) {
  const sourceInfo = data.source;
  const [book, setBook] = useState();
  const [contentsOpen, setContentsOpen] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  function cardClick(e, obj) {
    const selectedBook = oeContents.find((b) => b.bookId === obj.name);

    if (selectedBook) {
      setBook(selectedBook);
      setContentsOpen(true);
    }
  }

  return (
    <PageLayout source={sourceInfo}>
      <Header as="h2">
        <em>A Course in Miracles</em> Original Edition
      </Header>
      <p>
        This edition of A Course in Miracles is referred to as the “Original
        Edition“ and is the Course as it was completed in 1972 before
        significant edits were made in 1975. It is essentially the manuscript
        that was discovered in 1999 and published by Course in Miracles Society
        in 2006.
      </p>
      <p>
        Perhaps you may have only previously been aware of A Course in Miracles
        as published by the Foundation for Inner Peace and then by some amazing
        sequence of events you have discovered that there is actually an edition
        that pre-dates the well-known blue book. The ACIM Original Edition,
        published by Course in Miracles Society [CIMS], is that early edition.
      </p>
      <Grid>
        <Grid.Column width={10}>
          <Card name="quotes" onClick={() => setShowQuote(true)}>
            <CoverAnimator image={wisdom} />
            <Card.Content>
              <Card.Description>
                Quotes from <em>A Course in Miracles</em>
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        {/* <Grid.Column width={10}>
          <Segment>Fill this in later</Segment>
        </Grid.Column> */}
      </Grid>
      <Card.Group itemsPerRow={3} stackable>
        <Card name="text" onClick={cardClick}>
          <CoverAnimator image={text} />
          <Card.Content>
            <Card.Description>Text</Card.Description>
          </Card.Content>
        </Card>
        <Card name="workbook" onClick={cardClick}>
          <CoverAnimator image={workbook} />
          <Card.Content>
            <Card.Description>Workbook</Card.Description>
          </Card.Content>
        </Card>
        <Card name="manual" onClick={cardClick}>
          <CoverAnimator image={manual} />
          <Card.Content>
            <Card.Description>Manual for Teachers</Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
      <QuoteModal
        showQuote={showQuote}
        setShowQuote={setShowQuote}
        sid="15"
        userId="05399539cca9ac38db6db36f5c770ff1"
        header="ACIM Original Edition"
        source={sourceInfo}
        urlPrefix="/en/acim"
        onLoad={(quote) => {
          quote.url = quote.url.replace(/acimoe\/text\/\d\d/, 'oe/text');
        }}
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
  query oeSourceInfo {
    source: cmiSourcesJson(sourceId: { eq: "oe" }) {
      sid
      title
      sourceId
      group {
        title
        url
      }
    }
  }
`;
