/*
 * This is page navigation for pages not requiring authentication.
 *  Includes: Sign in/out menu item
 *  Includes: Authenticated page access for signed in users
 */

import React, { useContext, useState } from 'react';
import { navigate, Link } from 'gatsby';
import { Popup, Container, Icon, Menu, Visibility } from 'semantic-ui-react';
import SearchModal from './SearchModal';
import { IdentityContext } from './IdentityContextProvider';

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

export default function PageNav(props) {
  let activeItem;

  const { source } = props;

  const [menuFixed, setMenuFixed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const stickTopMenu = () => setMenuFixed(true);
  const unStickTopMenu = () => setMenuFixed(false);
  const toggleSearchModal = () => setSearchOpen(!searchOpen);

  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  /*
   * If user is signed in logout otherwise sign in
   */
  function userAccess() {
    if (user) {
      netlifyIdentity.logout();
    } else {
      netlifyIdentity.open();
    }
  }

  return (
    <>
      <SearchModal open={searchOpen} setOpen={setSearchOpen} source={source} />
      <Visibility
        onTopPassed={stickTopMenu}
        onTopVisible={unStickTopMenu}
        once={false}
      >
        <Menu
          icon
          borderless
          size="tiny"
          fixed={menuFixed ? 'top' : undefined}
          style={menuFixed ? fixedMenuStyle : menuStyle}
        >
          <Container text>
            <Menu.Item
              name="bookmark"
              active={activeItem === 'bookmark'}
              onClick={handleItemClick}
            >
              <Icon name="bookmark" />
            </Menu.Item>

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

            <Menu.Menu position="right">
              <Menu.Item
                name="help"
                active={activeItem === 'help'}
                onClick={handleItemClick}
              >
                <Icon name="question" />
              </Menu.Item>
              {user ? (
                <Menu.Item name="cmiUser" active={activeItem === 'cmiUser'}>
                  <Link to="/cmi">
                    <Icon name="user" />
                  </Link>
                </Menu.Item>
              ) : null}
              <Menu.Item
                onClick={userAccess}
                name="user"
                active={activeItem === 'user'}
              >
                {user ? (
                  <Icon style={{ color: 'green' }} name="sign out" />
                ) : (
                  <Icon style={{ color: 'red' }} name="sign in" />
                )}
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      </Visibility>
    </>
  );
}
