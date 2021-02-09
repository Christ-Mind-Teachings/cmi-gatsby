import React, { useState } from 'react';
import { navigate, Link, graphql } from 'gatsby';
import { Header, Card } from 'semantic-ui-react';
import SEO from '../../../components/SEO';
import CoverAnimator from '../../../components/CoverAnimator';
import PageLayout from '../../../components/PageLayout';
import ContentsModal from '../../../components/ContentsModal';
import spContents from '../../../data/acim/sp/spContents.json';
import text from '../../../assets/images/sp/text.jpg';
import preface from '../../../assets/images/sp/preface.jpg';
import workbook from '../../../assets/images/sp/workbook.jpg';
import manual from '../../../assets/images/sp/manual.jpg';

export default function SpPage({ data }) {
  const sourceInfo = data.source;
  const [book, setBook] = useState();
  const [contentsOpen, setContentsOpen] = useState(false);

  function cardClick(e, obj) {
    const selectedBook = spContents.find((b) => b.bookId === obj.name);

    if (selectedBook) {
      setBook(selectedBook);
      setContentsOpen(true);
    }
  }

  return (
    <PageLayout source={sourceInfo}>
      <SEO type="page" data={{ source: sourceInfo }} />
      <Header as="h2">
        <em>A Course in Miracles</em> Sparkly Edition
      </Header>
      <p>
        A Course In Miracles is included in the Library because it is literally
        life changing in its surprising authority on topics that no one can
        know, its trusted source and incredible consistency. Clarity on the
        nature of Being from out of this world its words are naturally known to
        be true by the way they feel.
      </p>
      <p>
        The Sparkly Edition of the Course is included here because that is the
        version from which Raj reads in the{' '}
        <Link to="/en/raj">ACIM Study Group</Link> which is also included in the
        Library.
      </p>
      <Card.Group itemsPerRow={3}>
        <Card
          name="preface"
          onClick={() => navigate('/en/acim/sp/preface/preface')}
        >
          <CoverAnimator image={preface} />
          {/* <Image src={preface} size="medium" wrapped ui={false} /> */}
          <Card.Content>
            <Card.Description>Preface</Card.Description>
          </Card.Content>
        </Card>
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
  query spSourceInfo {
    source: cmiSourcesJson(sourceId: { eq: "sp" }) {
      sid
      title
      description
      sourceId
      group {
        title
        url
      }
    }
  }
`;
