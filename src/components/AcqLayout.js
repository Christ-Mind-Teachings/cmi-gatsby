import React, { createRef } from 'react';
import { ToastContainer } from 'react-toastify';
import { Sticky, Container } from 'semantic-ui-react';
import AcqHeader from './AcqHeader';
import AcqNav from './AcqNav';
import 'react-toastify/dist/ReactToastify.css';

export default function AcqLayout(props) {
  const { title, book, next, prev, children } = props;
  const contextRef = createRef();

  console.log({ next, prev });
  return (
    <>
      <div ref={contextRef}>
        <Sticky context={contextRef}>
          <AcqNav book={book} next={next} prev={prev} />
        </Sticky>
        <AcqHeader title={title} />
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
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
