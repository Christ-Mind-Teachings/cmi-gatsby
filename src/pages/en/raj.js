import React, { useEffect, useState } from 'react';
import { Header, Card, Image } from 'semantic-ui-react';
import PageLayout from '../../components/PageLayout';
import ContentsModal from '../../components/ContentsModal';
import rajContents from '../../data/raj/rajContents.json';
import yaa from '../../assets/images/raj/yaa-big.jpg';
import grad from '../../assets/images/raj/grad-big.jpg';
import sg2002 from '../../assets/images/raj/sg2002-big.jpg';
import sg2003 from '../../assets/images/raj/sg2003-big.jpg';
import sg2004 from '../../assets/images/raj/sg2004-big.jpg';
import sg2005 from '../../assets/images/raj/sg2005-big.jpg';
import sg2006 from '../../assets/images/raj/sg2006-big.jpg';
import sg2007 from '../../assets/images/raj/sg2007-big.jpg';
import sg2008 from '../../assets/images/raj/sg2008-big.jpg';
import sg2009 from '../../assets/images/raj/sg2009-big.jpg';
import sg2010 from '../../assets/images/raj/sg2010-big.jpg';
import sg2011 from '../../assets/images/raj/sg2011-big.jpg';
import sg2012 from '../../assets/images/raj/sg2012-big.jpg';
import sg2013 from '../../assets/images/raj/sg2013-big.jpg';
import sg2014 from '../../assets/images/raj/sg2014-big.jpg';
import sg2015 from '../../assets/images/raj/sg2015-big.jpg';
import sg2016 from '../../assets/images/raj/sg2016-big.jpg';
import sg2017 from '../../assets/images/raj/sg2017-big.jpg';
import sg2018 from '../../assets/images/raj/sg2018-big.jpg';

const sourceInfo = { sourceId: 'raj', title: 'The Raj Material' };

export default function RajPage(props) {
  const [book, setBook] = useState();
  const [contentsOpen, setContentsOpen] = useState(false);

  function cardClick(e, obj) {
    console.log('card clicked: %s', obj.name);

    const selectedBook = rajContents.find((b) => b.bookId === obj.name);

    if (selectedBook) {
      setBook(selectedBook);
      setContentsOpen(true);
    }
  }

  return (
    <PageLayout source={sourceInfo}>
      <Header as="h2">
        Welcome to <em>The Raj Material</em>
      </Header>
      <p>
        Through Paul Tuttle, Raj offers a very practical, down to earth, feet on
        the ground approach to living <em>A Course In Miracles</em>. For over 15
        years Raj patiently explains the meaning of the Course through the ACIM
        Study Group.
      </p>
      <Card.Group itemsPerRow={3} stackable>
        <Card name="yaa" onClick={cardClick}>
          <Image src={yaa} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>You Are the Answer</Card.Description>
          </Card.Content>
        </Card>
        <Card name="grad" onClick={cardClick}>
          <Image src={grad} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>Graduation: The End of Illusion</Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
      <Card.Group itemsPerRow={3} stackable>
        <Card name="sg2002" onClick={cardClick}>
          <Image src={sg2002} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2002</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2003" onClick={cardClick}>
          <Image src={sg2003} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2003</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2004" onClick={cardClick}>
          <Image src={sg2004} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2004</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2005" onClick={cardClick}>
          <Image src={sg2005} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2005</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2006" onClick={cardClick}>
          <Image src={sg2006} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2006</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2007" onClick={cardClick}>
          <Image src={sg2007} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2007</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2008" onClick={cardClick}>
          <Image src={sg2008} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2008</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2009" onClick={cardClick}>
          <Image src={sg2009} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2009</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2010" onClick={cardClick}>
          <Image src={sg2010} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2010</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2011" onClick={cardClick}>
          <Image src={sg2011} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2011</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2012" onClick={cardClick}>
          <Image src={sg2012} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2012</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2013" onClick={cardClick}>
          <Image src={sg2013} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2013</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2014" onClick={cardClick}>
          <Image src={sg2014} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2014</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2015" onClick={cardClick}>
          <Image src={sg2015} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2015</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2016" onClick={cardClick}>
          <Image src={sg2016} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2016</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2017" onClick={cardClick}>
          <Image src={sg2017} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2017</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2018" onClick={cardClick}>
          <Image src={sg2018} size="medium" wrapped ui={false} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2018</Card.Description>
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
