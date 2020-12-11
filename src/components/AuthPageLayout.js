/*
 * Layout for authorized user pages
 */
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import AuthHeader from './AuthHeader';
import AuthNav from './AuthNav';
import { SearchContext } from './SearchContext';

import 'react-toastify/dist/ReactToastify.css';

export default function PageLayout(props) {
  const { children } = props;

  return (
    <>
      <Container text>
        <SearchContext.Provider value={{ searchPid: null }}>
          <AuthHeader />
          <AuthNav />
          {children}
        </SearchContext.Provider>
      </Container>
      <ToastContainer />
    </>
  );
}
