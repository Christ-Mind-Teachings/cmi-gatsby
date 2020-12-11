import React, { useContext, useState } from 'react';
import { Link } from '@reach/router';
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Menu,
} from 'semantic-ui-react';
import { IdentityContext } from './IdentityContextProvider';

import './Dashboard.css';

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
          <Menu.Item header as="a" href="/">
            Library of Christ Mind Teachings
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Input placeholder="Search..." size="small" />
            </Menu.Item>
            <Menu.Item as="a">Dashboard</Menu.Item>
            <Menu.Item as="a">Settings</Menu.Item>
            <Menu.Item as="a">{user.user_metadata.full_name}</Menu.Item>
            <Menu.Item as="a">Help</Menu.Item>
          </Menu.Menu>
        </Menu>
      </Grid>
      {/* Top menu bar - mobile devices */}
      <Grid padded className="mobile only">
        <Menu borderless inverted fluid fixed="top">
          <Menu.Item header as="a">
            Library of Christ Mind Teachings
          </Menu.Item>
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
          <Menu
            borderless
            fluid
            inverted
            vertical
            style={{ display: dropdownDisplay }}
          >
            <Menu.Item as="a">Dashboard</Menu.Item>
            <Menu.Item as="a">Settings</Menu.Item>
            <Menu.Item as="a">{user.user_metadata.full_name}</Menu.Item>
            <Menu.Item as="a">Help</Menu.Item>
            <Divider fitted />
            <Menu.Item>
              <Input placeholder="Search..." size="small" />
            </Menu.Item>
          </Menu>
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
            <Menu.Item
              name="overview"
              active={activeItem === 'overview'}
              as={Link}
              to="/cmi/overview"
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
            {children}
          </Grid>
        </Grid.Column>
      </Grid>
    </div>
  );
}
