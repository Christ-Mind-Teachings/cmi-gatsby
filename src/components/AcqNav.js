import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { Popup, Container, Icon, Menu } from 'semantic-ui-react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import ContentsModal from './ContentsModal';
import { Authenticate } from './Authenticate';
import { QuickLink } from './QuickLink';

const menuStyle = {
  border: '1px solid #ddd',
  backgroundColor: '#F1F1F7',
  borderRadius: 0,
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
  marginBottom: '1em',
  marginTop: '0',
  transition: 'box-shadow 1s ease, padding 1s ease',
};

function handleItemClick(e, obj) {
  if (obj.name === 'previous' || obj.name === 'next') {
    navigate(obj.url);
  }
}

export default function AcqNav(props) {
  let activeItem;

  const { book, next = {}, prev = {} } = props;
  const [contentsOpen, setContentsOpen] = useState(false);
  const toggleContentsModal = () => setContentsOpen(!contentsOpen);
  const { t } = useI18next();

  return (
    <>
      <ContentsModal
        open={contentsOpen}
        setOpen={setContentsOpen}
        book={book}
        unit={null}
      />
      <Menu attached="top" borderless style={menuStyle}>
        <Container text>
          <Popup
            trigger={
              <Menu.Item
                name="previous"
                url={prev.url}
                active={activeItem === 'previous'}
                onClick={handleItemClick}
                disabled={prev.url === undefined}
              >
                <Icon name="arrow circle left" />
              </Menu.Item>
            }
            content={prev.url !== undefined ? prev.title : undefined}
          />

          <Popup
            trigger={
              <Menu.Item
                name="toc"
                active={activeItem === 'toc'}
                onClick={toggleContentsModal}
              >
                <Icon name="align justify" />
              </Menu.Item>
            }
            content={t('Table of Contents')}
          />

          <Popup
            trigger={
              <Menu.Item
                name="next"
                url={next.url}
                active={activeItem === 'next'}
                onClick={handleItemClick}
                disabled={next.url === undefined}
              >
                <Icon name="arrow circle right" />
              </Menu.Item>
            }
            content={next.url !== undefined ? next.title : undefined}
          />
          <QuickLink sourceId="none" />

          <Menu.Menu position="right">
            <Authenticate />
          </Menu.Menu>
        </Container>
      </Menu>
    </>
  );
}
