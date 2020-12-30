import React, { useContext } from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { Icon, Popup, Menu, Dropdown } from 'semantic-ui-react';
import { IdentityContext } from './IdentityContextProvider';

export const Authenticate = () => {
  const { t } = useI18next();
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);
  const { navigate } = useI18next();

  function auth(e, { name }) {
    console.log('auth: %s', name);
    switch (name) {
      case 'signin':
        netlifyIdentity.open('login');
        break;
      case 'signup':
        netlifyIdentity.open('signup');
        break;
      case 'signout':
        netlifyIdentity.logout();
        break;
      case 'dashboard':
        navigate('/cmi');
        break;
      default:
        console.log('unknown value passed to auth: %s', name);
    }
  }

  return (
    <Menu.Item name="Authenticate">
      {user ? (
        <Popup
          trigger={
            <Dropdown
              icon="sign out"
              style={{ fontSize: '1em', color: '#008000' }}
              item
            >
              <Dropdown.Menu>
                <Dropdown.Item onClick={auth} name="signout">
                  <Icon style={{ color: '#c32e2e' }} name="sign out" />
                  {t('SignOut', { name: user.user_metadata.full_name })}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={auth} name="dashboard">
                  <Icon name="user" style={{ color: '#1E70BF' }} />
                  {t('Dashboard')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          }
          content={t('User Account')}
        />
      ) : (
        <Popup
          trigger={
            <Dropdown
              icon="sign in"
              style={{ fontSize: '1em', color: '#c32e2e' }}
              item
            >
              <Dropdown.Menu>
                <Dropdown.Item onClick={auth} name="signin">
                  <Icon style={{ color: '#008000' }} name="sign in" />
                  {t('Sign In')}
                </Dropdown.Item>
                <Dropdown.Item onClick={auth} name="signup">
                  <Icon style={{ color: '#008000' }} name="signup" />
                  {t('Create an Account ')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          }
          content={t('Sign in')}
        />
      )}
    </Menu.Item>
  );
};
