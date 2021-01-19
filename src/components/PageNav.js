/*
 * This is page navigation for pages not requiring authentication.
 *  Includes: Sign in/out menu item
 *  Includes: Authenticated page access for signed in users
 */

import React, { createRef, useState } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Popup, Container, Icon, Menu, Visibility } from 'semantic-ui-react';
import { menuItemEnabled } from '../utils/cmiUtils';
import { Authenticate } from './Authenticate';
import SearchModal from './SearchModal';
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

export default function PageNav(props) {
  let activeItem;

  const { source } = props;
  const [menuFixed, setMenuFixed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearchModal = () => setSearchOpen(!searchOpen);
  const { t } = useTranslation();

  return (
    <>
      <SearchModal open={searchOpen} setOpen={setSearchOpen} source={source} />
      {/* <Visibility
        onTopPassed={() => setMenuFixed(true)}
        onTopVisible={() => setMenuFixed(false)}
        once={false}
      > */}
      <Menu
        attached="top"
        borderless
        // fixed={menuFixed ? 'top' : undefined}
        // style={menuFixed ? fixedMenuStyle : menuStyle}
        style={menuStyle}
      >
        <Container text>
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
          <QuickLink sourceId={source.sourceId} />

          <Menu.Menu position="right">
            <Popup
              trigger={
                <Menu.Item name="help" active={activeItem === 'help'}>
                  <Icon name="question" />
                </Menu.Item>
              }
              content={t('Help')}
            />
            <Authenticate />
          </Menu.Menu>
        </Container>
      </Menu>
    </>
  );
}
