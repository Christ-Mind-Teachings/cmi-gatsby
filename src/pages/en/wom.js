import React, { useState } from 'react';
import { Header, Card, Image } from 'semantic-ui-react';
import PageLayout from '../../components/PageLayout';
import ContentsModal from '../../components/ContentsModal';
import womContents from '../../data/wom/womContents.json';
import QuoteModal from '../../components/QuoteModal';
import woh from '../../assets/images/wom/woh-big.jpg';
import wot from '../../assets/images/wom/wot-big.jpg';
import wok from '../../assets/images/wom/wok-big.jpg';
import tjl from '../../assets/images/wom/tjl-big.jpg';
import wos from '../../assets/images/wom/wos-big.jpg';
import early from '../../assets/images/wom/early-big.jpg';

const sourceInfo = { sid: 10, sourceId: 'wom', title: 'The Way of Mastery' };

export default function WomPage(props) {
  const [book, setBook] = useState();
  const [contentsOpen, setContentsOpen] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  function cardClick(e, obj) {
    console.log('card clicked: %s', obj.name);

    const selectedBook = womContents.find((b) => b.bookId === obj.name);

    if (selectedBook) {
      setBook(selectedBook);
      setContentsOpen(true);
    }
  }

  return (
    <PageLayout source={sourceInfo}>
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
      <button type="button" onClick={() => setShowQuote(true)}>
        Get Random Quote
      </button>
      <Card.Group itemsPerRow={3} stackable>
        <Card name="woh" onClick={cardClick}>
          <Image src={woh} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>Way of the Heart</Card.Description>
          </Card.Content>
        </Card>
        <Card name="wot" onClick={cardClick}>
          <Image src={wot} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>Way of Transformation</Card.Description>
          </Card.Content>
        </Card>
        <Card name="wok" onClick={cardClick}>
          <Image src={wok} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>Way of Knowing</Card.Description>
          </Card.Content>
        </Card>
        <Card name="tjl" onClick={cardClick}>
          <Image src={tjl} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>The Jeshua Letters</Card.Description>
          </Card.Content>
        </Card>
        <Card name="wos" onClick={cardClick}>
          <Image src={wos} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>Way of the Servant</Card.Description>
          </Card.Content>
        </Card>
        <Card name="early" onClick={cardClick}>
          <Image src={early} size="medium" wrapped ui={false} />
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
