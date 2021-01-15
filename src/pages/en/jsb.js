import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Header, Card, Image } from 'semantic-ui-react';
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
      <Header as="h2">The Impersonal Life</Header>
      <p>
        Joseph Benner published <em>The Impersonal Life</em> under the pseudonym
        Anonymous in 1914 believing its words were directly from God.
      </p>
      <Card.Group itemsPerRow={3} stackable>
        <Card name="til" onClick={cardClick}>
          <Image src={til} size="medium" wrapped ui={false} />
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
      title
      sourceId
      search
    }
  }
`;
