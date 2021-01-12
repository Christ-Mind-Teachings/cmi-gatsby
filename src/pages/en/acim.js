import React from 'react';
import {
  Link,
  useI18next,
  Trans,
  useTranslation,
} from 'gatsby-plugin-react-i18next';
import {
  Segment,
  Grid,
  Card,
  Image,
  Container,
  Header,
} from 'semantic-ui-react';
import { navigate } from 'gatsby';
import PageHeader from '../../components/PageHeader';
import LibraryNav from '../../components/LibraryNav';
import oe from '../../assets/images/cmi/covers/acimoe-big.jpg';
import sparkly from '../../assets/images/cmi/covers/sparkly-big.jpg';

const headerStyle = {
  marginTop: '30px',
};

export default function ChristMindLibrary() {
  const { t } = useTranslation();
  const { language } = useI18next();

  return (
    <>
      <PageHeader title="A Course in Miracles" />
      <LibraryNav />
      <Container text>
        <Header as="h2" style={headerStyle}>
          <em>A Course in Miracles</em>
        </Header>
        <p>
          First published in 1976 <em>A Course in Miracles</em> (ACIM) is a
          complete self-study spiritual thought system. As a three-volume
          curriculum consisting of a Text, Workbook for Students, and Manual for
          Teachers, it teaches that the way to universal love and peace—or
          remembering God—is by undoing guilt through forgiving others. The
          Course thus focuses on the healing of relationships and making them
          holy. A Course in Miracles also emphasizes that it is but one version
          of the universal curriculum, of which there are “many thousands.”
          Consequently, even though the language of the Course is that of
          traditional Christianity, it expresses a non-sectarian,
          non-denominational spirituality. A Course in Miracles, therefore, is a
          universal spiritual teaching, not a religion.
        </p>
        <p>
          See{' '}
          <a
            rel="noreferrer"
            href="https://acim.org/about-acim/"
            target="_blank"
          >
            An Introduction to <em>A Course in Miracles</em>
            &nbsp;
            <i className="tiny external icon" />
          </a>{' '}
          for more information.
        </p>
        <Grid>
          <Grid.Row>
            <Grid.Column width={5}>
              <Card name="oe" onClick={() => navigate('/en/acim/oe')}>
                <Image src={oe} size="medium" wrapped ui={false} />
                <Card.Content>
                  <Card.Description>Original Edition</Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={10}>
              <Segment basic>
                <p>
                  This is the Original Edition published by the{' '}
                  <em>Course in Miracles Society</em> (CIMS)
                </p>
                <p>
                  This version includes audio beautifully presented and read by
                  Martin Weber-Caspers.
                </p>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}>
              <Card name="sparkly" onClick={() => navigate('/en/acim/sp')}>
                <Image src={sparkly} size="medium" wrapped ui={false} />
                <Card.Content>
                  <Card.Description>Sparkly Edition</Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={10}>
              <Segment basic>
                The Sparkly Edition is used by Raj in his{' '}
                <Link to="/en/raj">ACIM Study Group.</Link>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
}
