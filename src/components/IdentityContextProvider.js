import React, { useState, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

export const IdentityContext = React.createContext({});

export function IdentityContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    netlifyIdentity.init({});
  }, []);

  netlifyIdentity.on('login', (user) => {
    netlifyIdentity.close();
    setUser(user);
  });

  netlifyIdentity.on('logout', () => {
    netlifyIdentity.close();
    setUser();
  });

  return (
    <IdentityContext.Provider value={{ identity: netlifyIdentity, user }}>
      {children}
    </IdentityContext.Provider>
  );
}
