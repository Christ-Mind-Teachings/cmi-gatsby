import React, { useEffect, useState } from 'react';
import { Header, Card, Image } from 'semantic-ui-react';
import netlifyIdentity from 'netlify-identity-widget';
import PageLayout from '../components/PageLayout';

export default function WomPage(props) {
  const [book, setBook] = useState();

  function cardClick(e, obj) {
    setBook(obj.name);
  }

  useEffect(() => {
    console.log('Init Identity');
    netlifyIdentity.init({});
  }, []);

  return (
    <PageLayout source="wom" book={book} unit={null} title="Way of Mastery">
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
      <Card.Group itemsPerRow="3">
        <Card name="woh" onClick={cardClick}>
          <Card.Content>
            <Image scr="/assets/img/wom/wohN-big.jpg" size="medium" wrapped />
            <Card.Header>Way of the Heart</Card.Header>
            <Card.Description>Why won't the image display?</Card.Description>
          </Card.Content>
        </Card>
        <Card name="wot" onClick={cardClick}>
          <Card.Content>
            <Image scr="/assets/img/wom/wotN-big.jpg" ui={false} />
            <Card.Header>Way of Transformation</Card.Header>
          </Card.Content>
        </Card>
        <Card name="wok" onClick={cardClick}>
          <Card.Content>
            <Image scr="/assets/img/wom/wokN-big.jpg" ui={false} />
            <Card.Header>Way of Knowing</Card.Header>
          </Card.Content>
        </Card>
      </Card.Group>
    </PageLayout>
  );
}
