import React, { useContext, useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { Popup, Container, Icon, Menu } from 'semantic-ui-react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { menuItemEnabled } from '../utils/cmiUtils';
import ContentsModal from './ContentsModal';
import SearchModal from './SearchModal';
import AudioPlayer from './AudioPlayer';
import { Authenticate } from './Authenticate';
import { QuickLink } from './QuickLink';

const menuStyle = {
  // border: 'none',
  border: '1px solid #ddd',
  backgroundColor: '#F1F1F7',
  borderRadius: 0,
  // boxShadow: 'none',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
  marginBottom: '1em',
  marginTop: '0',
  transition: 'box-shadow 1s ease, padding 1s ease',
};

const fixedMenuStyle = {
  backgroundColor: '#F1F1F7',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};

function handleItemClick(e, obj) {
  if (obj.name === 'previous' || obj.name === 'next') {
    navigate(obj.url);
  }
}

export default function TranscriptNav(props) {
  let activeItem;

  const { timing, source, book, unit, next, prev } = props;
  const [menuFixed, setMenuFixed] = useState(false);
  const [contentsOpen, setContentsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const stickTopMenu = () => setMenuFixed(true);
  const unStickTopMenu = () => setMenuFixed(false);
  const toggleContentsModal = () => setContentsOpen(!contentsOpen);
  const toggleSearchModal = () => setSearchOpen(!searchOpen);
  const [audioPlayerOpen, setAudioPlayerOpen] = useState(false);
  const { t } = useI18next();

  return (
    <>
      <ContentsModal
        open={contentsOpen}
        setOpen={setContentsOpen}
        book={book}
        unit={unit}
      />
      {unit?.audio ? (
        <AudioPlayer
          timing={timing}
          src={`${source.audioBaseUrl}${unit.audio}`}
          open={audioPlayerOpen}
        />
      ) : null}
      <SearchModal open={searchOpen} setOpen={setSearchOpen} source={source} />
      {/* <Visibility
        onTopPassed={stickTopMenu}
        onTopVisible={unStickTopMenu}
        once={false}
      > */}
      <Menu attached="top" borderless style={menuStyle}>
        <Container text>
          {unit?.audio ? (
            <Popup
              trigger={
                <Menu.Item
                  name="audio"
                  active={activeItem === 'audio'}
                  onClick={() => setAudioPlayerOpen(!audioPlayerOpen)}
                >
                  <Icon name="volume up" />
                </Menu.Item>
              }
              content={t('Listen')}
            />
          ) : null}

          {menuItemEnabled(source, 'search') && (
            <Popup
              trigger={
                <Menu.Item
                  name="search"
                  active={activeItem === 'search'}
                  onClick={toggleSearchModal}
                >
                  <Icon name="search" />
                </Menu.Item>
              }
              content={t('Search')}
            />
          )}

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
          <QuickLink sourceId={source.sourceId} />

          <Menu.Menu position="right">
            <Popup
              trigger={
                <Menu.Item
                  name="help"
                  active={activeItem === 'help'}
                  onClick={handleItemClick}
                >
                  <Icon name="question" />
                </Menu.Item>
              }
              content={t('Help')}
            />
            <Authenticate />
          </Menu.Menu>
        </Container>
      </Menu>
      {/* </Visibility> */}
    </>
  );
}
