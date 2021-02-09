import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Header, Card } from 'semantic-ui-react';
import SEO from '../../components/SEO';
import CoverAnimator from '../../components/CoverAnimator';
import PageLayout from '../../components/PageLayout';
import ContentsModal from '../../components/ContentsModal';
import jsbContents from '../../data/jsb/jsbContents.json';
import til from '../../assets/images/jsb/til-big.jpg';

export default function JsbPage({ data }) {
  const sourceInfo = data.source;
  const [book, setBook] = useState();
  const [contentsOpen, setContentsOpen] = useState(false);

  function cardClick(e, obj) {
    const selectedBook = jsbContents.find((b) => b.bookId === obj.name);

    if (selectedBook) {
      setBook(selectedBook);
      setContentsOpen(true);
    }
  }

  return (
    <PageLayout source={sourceInfo}>
      <SEO type="page" data={{ source: sourceInfo }} />
      <Header as="h2">The Impersonal Life</Header>
      <p>
        Joseph Benner published <em>The Impersonal Life</em> under the pseudonym
        Anonymous in 1914 believing its words were directly from God.
      </p>
      <Card.Group itemsPerRow={3}>
        <Card name="til" onClick={cardClick}>
          <CoverAnimator image={til} />
          <Card.Content>
            <Card.Description>
              The Impersonal Life by Joseph S. Benner, 1914
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
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
  query jsbSourceInfo {
    source: cmiSourcesJson(sourceId: { eq: "jsb" }) {
      sid
      description
      title
      sourceId
      search
    }
  }
`;
