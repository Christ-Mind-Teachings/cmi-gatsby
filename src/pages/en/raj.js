import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Segment, Grid, Header, Card } from 'semantic-ui-react';
import CoverAnimator from '../../components/CoverAnimator';
import PageLayout from '../../components/PageLayout';
import ContentsModal from '../../components/ContentsModal';
import rajContents from '../../data/raj/rajContents.json';
import yaa from '../../assets/images/raj/yaa-big.jpg';
import grad from '../../assets/images/raj/grad-big.jpg';
import acim from '../../assets/images/raj/acim-big.jpg';
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

const acimBookStyle = {
  borderLeft: '5px solid #39cdfd',
  padding: '10px',
};

const acimStudentStyle = {
  borderLeft: '5px solid #ea56f7',
  padding: '10px',
};

const indentStyle = {
  marginLeft: '20px',
  marginBottom: '20px',
};

export default function RajPage({ data }) {
  const sourceInfo = data.source;
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
      <Header as="h2">Pauls Relationship with Raj</Header>
      <p>
        In <em>You Are the Answer</em> Paul recounts his initial introduction to
        Raj and in <em>Graduation</em> he brings us up to date after nine years
        with Raj.
      </p>
      <Card.Group itemsPerRow={3} stackable>
        <Card name="yaa" onClick={cardClick}>
          <CoverAnimator image={yaa} />
          <Card.Content>
            <Card.Description>You Are the Answer</Card.Description>
          </Card.Content>
        </Card>
        <Card name="grad" onClick={cardClick}>
          <CoverAnimator image={grad} />
          <Card.Content>
            <Card.Description>Graduation: The End of Illusion</Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
      <Header as="h2">A Course In Miracles Study Group with Raj</Header>
      <p>
        Starting in 2002 the ACIM Study Group contains over 440 recorded
        sessions of Raj speaking about the Course. These sessions are grouped by
        year in the books below.
      </p>
      <p>
        In the study group transcripts below you'll find some paragraphs marked
        by a color bar in the margin. All other paragraphs are comments from
        Raj.
      </p>
      <div style={indentStyle}>
        <p style={acimBookStyle}>
          This is where Raj reads directly from the Text.
        </p>
        <p style={acimStudentStyle}>
          These are student questions and comments.
        </p>
      </div>
      <Grid>
        <Grid.Column width={6}>
          <Card name="acim" onClick={cardClick}>
            <CoverAnimator image={acim} />
            <Card.Content>
              <Card.Description>
                ACIM Sparkly Edition Cross Reference
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={10}>
          <Segment>
            Except for the first year, Raj has read from the Sparkly Edition of
            ACIM during his study group. This cross reference identifies study
            group sessions that correspond to chapters and sections in the Text.
          </Segment>
        </Grid.Column>
      </Grid>
      <Card.Group itemsPerRow={3} stackable>
        <Card name="sg2002" onClick={cardClick}>
          <CoverAnimator image={sg2002} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2002</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2003" onClick={cardClick}>
          <CoverAnimator image={sg2003} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2003</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2004" onClick={cardClick}>
          <CoverAnimator image={sg2004} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2004</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2005" onClick={cardClick}>
          <CoverAnimator image={sg2005} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2005</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2006" onClick={cardClick}>
          <CoverAnimator image={sg2006} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2006</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2007" onClick={cardClick}>
          <CoverAnimator image={sg2007} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2007</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2008" onClick={cardClick}>
          <CoverAnimator image={sg2008} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2008</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2009" onClick={cardClick}>
          <CoverAnimator image={sg2009} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2009</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2010" onClick={cardClick}>
          <CoverAnimator image={sg2010} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2010</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2011" onClick={cardClick}>
          <CoverAnimator image={sg2011} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2011</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2012" onClick={cardClick}>
          <CoverAnimator image={sg2012} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2012</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2013" onClick={cardClick}>
          <CoverAnimator image={sg2013} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2013</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2014" onClick={cardClick}>
          <CoverAnimator image={sg2014} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2014</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2015" onClick={cardClick}>
          <CoverAnimator image={sg2015} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2015</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2016" onClick={cardClick}>
          <CoverAnimator image={sg2016} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2016</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2017" onClick={cardClick}>
          <CoverAnimator image={sg2017} />
          <Card.Content>
            <Card.Description>ACIM Study Group: 2017</Card.Description>
          </Card.Content>
        </Card>
        <Card name="sg2018" onClick={cardClick}>
          <CoverAnimator image={sg2017} />
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

export const pageQuery = graphql`
  query rajSourceInfo {
    source: cmiSourcesJson(sourceId: { eq: "raj" }) {
      sid
      title
      sourceId
    }
  }
`;
