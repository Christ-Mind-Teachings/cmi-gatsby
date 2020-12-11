import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';
import { IdentityContext } from '../components/IdentityContextProvider';
import { NotAuthorized } from '../components/NotAuthorized';
import { MailList } from '../cmi/MailList';
import { Overview } from '../cmi/Overview';

function AccountHolderPage(props) {
  return <Overview />;
}

/*
 * This is rendered for users who are not signed in
 */
function GuestPage(props) {
  return <NotAuthorized />;
}

export default function CMI(props) {
  const { user } = useContext(IdentityContext);

  if (!user) {
    return (
      <Router>
        <GuestPage path="/cmi" />
        <GuestPage path="/cmi/:any" />
      </Router>
    );
  }
  return (
    <Router>
      <AccountHolderPage path="/cmi" />
      <MailList path="/cmi/maillist" />
      <Overview path="/cmi/overview" />
    </Router>
  );
}
