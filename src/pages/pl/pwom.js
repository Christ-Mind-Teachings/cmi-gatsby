import React, { useState } from 'react';
import { Header, Card, Image } from 'semantic-ui-react';
import PageLayout from '../../components/PageLayout';
import ContentsModal from '../../components/ContentsModal';
import pwomContents from '../../data/pwom/pwomContents.json';
import QuoteModal from '../../components/QuoteModal';
import woh from '../../assets/images/pwom/woh-big.jpg';
import wot from '../../assets/images/pwom/wot-big.jpg';
import wok from '../../assets/images/pwom/wok-big.jpg';
import lj from '../../assets/images/pwom/lj-big.jpg';
import wos from '../../assets/images/pwom/wos-big.jpg';
import early from '../../assets/images/pwom/early-big.jpg';

const sourceInfo = { sid: 16, sourceId: 'pwom', title: 'Droga Mistrzostwa ' };

export default function WomPage(props) {
  const [book, setBook] = useState();
  const [contentsOpen, setContentsOpen] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  function cardClick(e, obj) {
    console.log('card clicked: %s', obj.name);

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
      <button type="button" onClick={() => setShowQuote(true)}>
        Get Random Quote
      </button>
      <Card.Group itemsPerRow={3} stackable>
        <Card name="lj" onClick={cardClick}>
          <Image src={lj} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>Listy Jeszuy</Card.Description>
          </Card.Content>
        </Card>
        <Card name="wos" onClick={cardClick}>
          <Image src={wos} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>Droga Sługi</Card.Description>
          </Card.Content>
        </Card>
        <Card name="early" onClick={cardClick}>
          <Image src={early} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>Wczesne lata, Tom 1</Card.Description>
          </Card.Content>
        </Card>
        <Card name="woh" onClick={cardClick}>
          <Image src={woh} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>Droga Serca</Card.Description>
          </Card.Content>
        </Card>
        <Card name="wot" onClick={cardClick}>
          <Image src={wot} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>Droga Przemiany</Card.Description>
          </Card.Content>
        </Card>
        <Card name="wok" onClick={cardClick}>
          <Image src={wok} size="medium" wrapped ui={false} />
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
