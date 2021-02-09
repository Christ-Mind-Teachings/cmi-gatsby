/*
 * This is page navigation for pages not requiring authentication.
 *  Includes: Sign in/out menu item
 *  Includes: Authenticated page access for signed in users
 */

import React, { useState } from 'react';
import { Popup, Container, Icon, Menu, Visibility } from 'semantic-ui-react';
import { ChangeLanguage } from './ChangeLanguage';
import { Authenticate } from './Authenticate';
// import { QuickLink } from './QuickLink';

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

export default function LibraryNav() {
  let activeItem;

  const [menuFixed, setMenuFixed] = useState(false);
  const stickTopMenu = () => setMenuFixed(true);
  const unStickTopMenu = () => setMenuFixed(false);

  return (
    <>
      {/* <Visibility
        onTopPassed={stickTopMenu}
        onTopVisible={unStickTopMenu}
        once={false}
      > */}
      <Menu
        borderless
        // fixed={menuFixed ? 'top' : undefined}
        // style={menuFixed ? fixedMenuStyle : menuStyle}
        style={menuStyle}
      >
        <Container text>
          <ChangeLanguage />
          {/* <QuickLink sourceId="ACIM" /> */}
          <Menu.Menu position="right">
            <Menu.Item name="help" active={activeItem === 'help'}>
              <Popup trigger={<Icon name="question" />} content="Get Help" />
            </Menu.Item>
            <Authenticate />
          </Menu.Menu>
        </Container>
      </Menu>
      {/* </Visibility> */}
    </>
  );
}
