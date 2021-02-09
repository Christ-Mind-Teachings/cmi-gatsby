import React, { useContext, useState } from 'react';
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
import { ToastContainer } from 'react-toastify';
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Menu,
} from 'semantic-ui-react';
import { QuickLink } from './QuickLink';
import { NotAuthorized } from './NotAuthorized';
import { IdentityContext } from './IdentityContextProvider';

import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css';
import { ChangeLanguage } from './ChangeLanguage';

export function Dashboard(props) {
  const { activeItem, children } = props;
  const [dropdownDisplay, setDropdownDisplay] = useState('none');
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  const handleToggleDropdownMenu = () => {
    if (dropdownDisplay === 'none') {
      setDropdownDisplay('flex');
    } else {
      setDropdownDisplay('none');
    }
  };

  return (
    <div className="App">
      {/* Top menu bar - non mobile devices */}
      <Grid padded className="tablet computer only">
        <Menu borderless inverted fluid fixed="top">
          <Menu.Item header>
            <Link to="/">Home</Link>
          </Menu.Item>
          <QuickLink sourceId="Dashboard" />
          <ChangeLanguage />
          {user && (
            <Menu.Menu position="right">
              <Menu.Item>{user?.user_metadata.full_name}</Menu.Item>
              <Menu.Item as="a">Help</Menu.Item>
            </Menu.Menu>
          )}
        </Menu>
      </Grid>
      {/* Top menu bar - mobile devices */}
      <Grid padded className="mobile only">
        <Menu borderless inverted fluid fixed="top">
          <Menu.Item header>
            <Link to="/">Library of Christ Mind Teachings</Link>
          </Menu.Item>
          {user && (
            <Menu.Menu position="right">
              <Menu.Item>
                <Button
                  basic
                  inverted
                  icon
                  toggle
                  onClick={handleToggleDropdownMenu}
                >
                  <Icon name="content" />
                </Button>
              </Menu.Item>
            </Menu.Menu>
          )}
          {user && (
            <Menu
              borderless
              fluid
              inverted
              vertical
              style={{ display: dropdownDisplay }}
            >
              <Menu.Item>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item
                name="overview"
                active={activeItem === 'overview'}
                as={Link}
                to="/cmi"
              >
                Overview
              </Menu.Item>
              <Menu.Item
                name="maillist"
                active={activeItem === 'maillist'}
                as={Link}
                to="/cmi/maillist"
              >
                MailList
              </Menu.Item>
              <Menu.Item as="a">Help</Menu.Item>
              <QuickLink icon={false} sourceId="Dashboard" />
            </Menu>
          )}
        </Menu>
      </Grid>
      {/* Sidebar */}
      <Grid padded>
        <Grid.Column
          tablet={3}
          computer={3}
          only="tablet computer"
          id="sidebar"
        >
          <Menu vertical borderless fluid text>
            {user ? (
              <Menu.Item
                name="overview"
                active={activeItem === 'overview'}
                as={Link}
                to="/cmi"
              >
                Overview
              </Menu.Item>
            ) : (
              <Menu.Item
                as="a"
                name="overview"
                active={activeItem === 'overview'}
              >
                Overview
              </Menu.Item>
            )}
            {user ? (
              <Menu.Item
                name="maillist"
                active={activeItem === 'maillist'}
                as={Link}
                to="/cmi/maillist"
              >
                MailList
              </Menu.Item>
            ) : (
              <Menu.Item
                as="a"
                name="maillist"
                active={activeItem === 'maillist'}
              >
                MailList
              </Menu.Item>
            )}
            <Menu.Item as="a">Analytics</Menu.Item>
            <Menu.Item as="a">Export</Menu.Item>
            <Divider hidden />
            <Menu.Item as="a">Nav item</Menu.Item>
            <Menu.Item as="a">Nav item again</Menu.Item>
            <Menu.Item as="a">One more nav</Menu.Item>
            <Menu.Item as="a">Another nav item</Menu.Item>
            <Menu.Item as="a">More navigation</Menu.Item>
            <Divider hidden />
            <Menu.Item as="a">Macintoch</Menu.Item>
            <Menu.Item as="a">Linux</Menu.Item>
            <Menu.Item as="a">Windows</Menu.Item>
          </Menu>
        </Grid.Column>
        <Grid.Column
          mobile={16}
          tablet={13}
          computer={13}
          floated="right"
          id="content"
        >
          <Grid padded>
            <Grid.Row>
              <Header dividing size="huge" as="h1">
                User Dashboard
              </Header>
            </Grid.Row>
            <Divider section hidden />
            {/* Page specific area, layout with Grid.Row for each vertical section */}
            {user ? children : <NotAuthorized />}
          </Grid>
        </Grid.Column>
      </Grid>
      <ToastContainer />
    </div>
  );
}
