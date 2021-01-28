import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Grid, Segment, Icon, Header, Card } from 'semantic-ui-react';
import CoverAnimator from '../../components/CoverAnimator';
import PageLayout from '../../components/PageLayout';
import ContentsModal from '../../components/ContentsModal';
import acolContents from '../../data/acol/acolContents.json';
import QuoteModal from '../../components/QuoteModal';
import wisdom from '../../assets/images/cmi/covers/wisdom.jpg';
import course from '../../assets/images/acol/course-big.jpg';
import treatise from '../../assets/images/acol/treatise-big.jpg';
import dialog from '../../assets/images/acol/dialog-big.jpg';

export default function OePage({ data }) {
  const sourceInfo = data.source;
  const [book, setBook] = useState();
  const [contentsOpen, setContentsOpen] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  function cardClick(e, obj) {
    const selectedBook = acolContents.find((b) => b.bookId === obj.name);

    if (selectedBook) {
      setBook(selectedBook);
      setContentsOpen(true);
    }
  }

  return (
    <PageLayout source={sourceInfo}>
      <Header as="h2">
        Welcome to <em>A Course Of Love</em>
      </Header>
      <p>
        A Course of Love is a book that changes lives because its purpose is to
        return you to your true Self. That one change will completely change
        your life and the world. Forty years ago Jesus dictated ACIM to the
        scribe Helen Schucman. More recently, over three years, he similarly
        dictated A Course of Love to Mari Perron. Students of ACIM will
        recognize the Voice. Jesus describes ACOL as a “continuation” of A
        Course in Miracles. Students of truth, whatever their background, will
        find that ACOL resonates with the heart. ACOL is often experienced as
        more of a transmission than a text. It keeps on revealing more, even to
        those who have read it numerous times before. Many readers find it to be
        truly alive.
      </p>
      <Header textAlign="center" as="h3" icon>
        <Icon color="green" name="bullhorn" />
        Please Note!
      </Header>
      <p>
        Twenty-five chapters of ACOL including seven chapters with audio
        narrated by Mari Perron, the receiver, are available freely to the
        public. The creator of this website has specially arranged for all 150
        chapters of the Second Edition of ACOL to be provided for your benefit
        here, along with this website’s helpful tools, with the understanding
        that you will be in personal integrity to ACOL’s receiver by purchasing
        a book (either physical or ebook). Click here for details.
      </p>
      <p>
        Click on the book covers to display the table of contents. Chapters with
        active links are available for you to enjoy.
      </p>
      <Grid>
        <Grid.Column width={10}>
          <Card name="quotes" onClick={() => setShowQuote(true)}>
            <CoverAnimator image={wisdom} />
            <Card.Content>
              <Card.Description>
                Quotes from <em>A Course Of Love</em>
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        {/* <Grid.Column width={10}>
          <Segment>Fill this in later</Segment>
        </Grid.Column> */}
      </Grid>
      <Card.Group itemsPerRow={3} stackable>
        <Card name="course" onClick={cardClick}>
          <CoverAnimator image={course} />
          <Card.Content>
            <Card.Description>Book One: The Course</Card.Description>
          </Card.Content>
        </Card>
        <Card name="treatise" onClick={cardClick}>
          <CoverAnimator image={treatise} />
          <Card.Content>
            <Card.Description>Book Two: The Treatises</Card.Description>
          </Card.Content>
        </Card>
        <Card name="dialog" onClick={cardClick}>
          <CoverAnimator image={dialog} />
          <Card.Content>
            <Card.Description>Book Three: The Dialogues</Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
      <QuoteModal
        showQuote={showQuote}
        setShowQuote={setShowQuote}
        sid="15"
        userId="05399539cca9ac38db6db36f5c770ff1"
        header="A Course Of Love"
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
  query acolSourceInfo {
    source: cmiSourcesJson(sourceId: { eq: "acol" }) {
      sid
      title
      sourceId
    }
  }
`;
