import React, { useContext } from 'react';
import { Router, Link } from '@reach/router';
import { IdentityContext } from '../components/IdentityContextProvider';

function AccountHolderPage(props) {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  // page for authenticated users
  return (
    <div>
      CMI User Dashboard user name "{user && user.user_metadata.full_name}"
    </div>
  );
}

/*
 * This is rendered for users who are not signed in
 */
function GuestPage(props) {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  // add sign in option
  return (
    <div>
      This is the guest page. You should create an account to have access to
      cool stuff.
    </div>
  );
}

export default function CMI(props) {
  const { user } = useContext(IdentityContext);

  if (!user) {
    return (
      <Router>
        <GuestPage path="/cmi" />
      </Router>
    );
  }
  return (
    <Router>
      <AccountHolderPage path="/cmi" />
    </Router>
  );
}
