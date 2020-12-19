/*
 * Layout for authorized user pages
 */
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import AuthHeader from './AuthHeader';
import AuthNav from './AuthNav';
import { GlobalContext } from './GlobalContext';

import 'react-toastify/dist/ReactToastify.css';

export default function PageLayout(props) {
  const { children } = props;

  return (
    <>
      <Container text>
        <GlobalContext.Provider value={{ searchPid: null }}>
          <AuthHeader />
          <AuthNav />
          {children}
        </GlobalContext.Provider>
      </Container>
      <ToastContainer />
    </>
  );
}
