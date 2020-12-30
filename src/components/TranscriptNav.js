import React, { useContext, useEffect, useState } from 'react';
import { navigate, Link } from 'gatsby';
import { Popup, Container, Icon, Menu, Visibility } from 'semantic-ui-react';
import ContentsModal from './ContentsModal';
import SearchModal from './SearchModal';
import AudioPlayer from './AudioPlayer';
import { Authenticate } from './Authenticate';

const menuStyle = {
  border: 'none',
  backgroundColor: '#F1F1F7',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  marginTop: '4em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
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
      <Visibility
        onTopPassed={stickTopMenu}
        onTopVisible={unStickTopMenu}
        once={false}
      >
        <Menu
          icon
          borderless
          size="small"
          fixed={menuFixed ? 'top' : undefined}
          style={menuFixed ? fixedMenuStyle : menuStyle}
        >
          <Container text>
            {unit?.audio ? (
              <Menu.Item
                name="audio"
                active={activeItem === 'audio'}
                onClick={() => setAudioPlayerOpen(!audioPlayerOpen)}
              >
                <Icon name="volume up" />
              </Menu.Item>
            ) : null}

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
              content="Search"
            />

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
              content="Display Table of Contents"
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

            <Menu.Menu position="right">
              <Menu.Item
                name="help"
                active={activeItem === 'help'}
                onClick={handleItemClick}
              >
                <Icon name="question" />
              </Menu.Item>
              <Authenticate />
            </Menu.Menu>
          </Container>
        </Menu>
      </Visibility>
    </>
  );
}
