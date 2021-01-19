import React, { createRef } from 'react';
import { ToastContainer } from 'react-toastify';
import { Sticky, Container } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import PageNav from './PageNav';
import { GlobalContext } from './GlobalContext';
import { PageFooter } from './PageFooter';
import 'react-toastify/dist/ReactToastify.css';

export default function PageLayout(props) {
  const { source, children } = props;
  const contextRef = createRef();

  return (
    <>
      {/* <Container text style={{ minHeight: '100vh' }}> */}
      <GlobalContext.Provider value={{ searchPid: null }}>
        <div ref={contextRef}>
          <Sticky context={contextRef}>
            <PageNav source={source} />
          </Sticky>
          <PageHeader group={source.group} title={source.title} />
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Container text attached="bottom">
              {children}
            </Container>
            <PageFooter />
          </div>
        </div>
      </GlobalContext.Provider>
      {/* </Container> */}
      <ToastContainer />
    </>
  );
}
