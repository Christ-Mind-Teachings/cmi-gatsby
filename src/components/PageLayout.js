import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import PageNav from './PageNav';
import { GlobalContext } from './GlobalContext';
import 'react-toastify/dist/ReactToastify.css';

const group = {
  title: 'ACIM Group Page',
  url: '/en/acim',
};

export default function PageLayout(props) {
  const { source, children } = props;

  return (
    <>
      <Container text>
        <GlobalContext.Provider value={{ searchPid: null }}>
          <PageHeader group={group} title={source.title} />
          <PageNav source={source} />
          {children}
        </GlobalContext.Provider>
      </Container>
      <ToastContainer />
    </>
  );
}
