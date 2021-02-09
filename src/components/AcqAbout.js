import React from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { Header, List } from 'semantic-ui-react';

function en() {
  return (
    <>
      <Header as="h2">What are Christ Mind Teachings?</Header>
      <p>Christ Mind teachings are any teaching that:</p>
      <List bulleted>
        <List.Item>
          is lovingly presented without complex practices, difficult to
          understand concepts, fearful or foreboding beliefs, or special
          privileges for advanced students.
        </List.Item>
        <List.Item>
          is an acknowledgement of our unbroken equality and unity.
        </List.Item>
        <List.Item>
          is authoritative, encouraging, patient, and fully accepting of each
          persons freedom to choose.
        </List.Item>
        <List.Item>
          teaches of a loving, ever present God that is closer to us than our
          own breath.
        </List.Item>
        <List.Item>
          clearly demonstrates how we have been mistaken about who we are and
          the world we live in and shows the way for healing.
        </List.Item>
        <List.Item>
          speaks that the truth of what we are is always true and has never been
          changed not even by our mistaken beliefs.
        </List.Item>
        <List.Item>
          encourages us to claim the truth of our being and reflect it in the
          world.
        </List.Item>
        <List.Item>
          encourages us to look with innocence at the things that frighten us to
          find the peace that lies just beyond.
        </List.Item>
        <List.Item>
          speaks of Love as that which reflects the Good, the Holy, and the
          Beautiful.
        </List.Item>
      </List>
      <p>
        Each of the teachings in the Library inspire these same ideas in
        different ways. The Library is not meant for comparison but to expand
        understanding by recognizing the same truth expressed in different ways.
      </p>
      <p>
        Union is our reality once fear is seen to be the only thing that
        separates us and in our innocence we each burst forth as an individual
        expression of God, of Truth, of Love - the Good, the Holy, and the
        Beautiful.
      </p>
      <Header as="h2">Features of the Site</Header>
      <List>
        <List.Item>
          <List.Content>
            <List.Header>Transcripts</List.Header>
            <List.Description>
              The content for each teaching in the Library is fully available
              with an easily accessible table of contents. Navigation within and
              between teachings is easy and at your finger tips.
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>Audio</List.Header>
            <List.Description>
              Audio is available for most of the teachings in the Library. Look
              for the <i className="volume up icon" /> icon in the menu on any
              page to listen.
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>Search</List.Header>
            <List.Description>
              Each teaching, except for The Impersonal Life, is searchable.
              Enter a search word or phrase and all matches are displayed
              allowing you to navigate directly to the source for each match.
              You can easily move within and between pages contains matches to
              your search.
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>Wisdom Cards</List.Header>
            <List.Description>
              The Wisdom card on some teaching home pages offer quotes that can
              be shared by email.
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>Accounts</List.Header>
            <List.Description>
              You can create a free user account to access other features of the
              site. Currently account holders can share wisdom quotes by email
              and create a mail list to make sharing easier. New features will
              be added over time.
            </List.Description>
          </List.Content>
        </List.Item>
      </List>
      <Header as="h2">Expansion Plans</Header>
      <p>
        Additional content will be added to the site and there are plans to add
        a new 'wing' to the Library that will offer content from those devoted
        to living Christ Mind teachings.
      </p>
    </>
  );
}

function pl() {
  return (
    <>
      <p>Not translated yet.</p>
    </>
  );
}

export function AcqAbout() {
  const { language } = useI18next();

  switch (language) {
    case 'en':
      return en();
    case 'pl':
      return pl();
    default:
      return <p>{`Unknown language ${language}`}</p>;
  }
}
