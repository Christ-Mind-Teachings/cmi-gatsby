import React, { createRef, useRef, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { Sticky, Icon, Header, Container, Dimmer } from 'semantic-ui-react';
import styled from 'styled-components';
import TranscriptNav from '../components/TranscriptNav';
import TranscriptHeader from '../components/TranscriptHeader';
import SearchNavigator from '../components/SearchNavigator';
import GlobalStyles from '../styles/GlobalStyles';
import { GlobalContext } from '../components/GlobalContext';

import 'react-toastify/dist/ReactToastify.css';
import { getNextPrev, displaySharedBookmark } from '../utils/cmiUtils';

const StyledContainer = styled(Container)``;

/**
 *  Find title and url of the next and previous pages
 *
 * @param {array} list - The array to search
 * @param {string} url - The string to look for
 * @return {object} {next: {url, title}, prev: {url, title}}
function getNextPrev(list, url) {
  let prev;
  let next;

  const urlIndex = list.findIndex((p) => p.url === url);
  if (urlIndex === -1) {
    console.error("Didn't find index in Pages for page, something is wrong");
    return {};
  }

  if (urlIndex > 0) {
    prev = list[urlIndex - 1];
  }

  if (urlIndex < list.length - 1) {
    next = list[urlIndex + 1];
  }

  return { url, next, prev };
}
*/

export function GenericTranscriptTemplate({ location, data }) {
  const { list, timing, unit, book, source, content } = data;
  const [searchPid, setSearchPid] = useState(
    location.state && location.state.search ? location.state.search : null
  );
  const [loading, setLoading] = useState(false);

  const [prev, setPrev] = useState({});
  const [next, setNext] = useState({});
  const transcriptRef = useRef(null);
  const contextRef = createRef();

  useEffect(() => {
    if (!location.search) return;

    const searchParms = new URLSearchParams(location.search);

    // annotation share
    const as = searchParms.get('as');
    if (!as) return;

    // remove query string from url
    // window.history.replaceState({}, document.title, location.pathname);

    const asParts = as.split(':');
    const keyInfo = {
      pid: asParts[0],
      creationDate: asParts[1],
      userId: asParts[2],
      key: unit.key,
    };
    displaySharedBookmark(keyInfo, setLoading);
  }, []);

  useEffect(() => {
    const { next = {}, prev = {} } = getNextPrev(list.nodes, unit.url);
    setPrev(prev);
    setNext(next);

    // add bookId as a class to transcript-content
    transcriptRef.current.classList.add(`${book.bookId}`, `${source.sourceId}`);
  }, []);

  return (
    <>
      <GlobalStyles />
      <Helmet title={`Transcript Name - ${unit?.title}`} />
      <GlobalContext.Provider
        value={{
          transcript: { source, book, unit },
          searchPid,
          setSearchPid,
        }}
      >
        <div ref={contextRef}>
          <Sticky context={contextRef}>
            <TranscriptNav
              source={source}
              book={book}
              unit={unit}
              next={next}
              prev={prev}
              timing={timing}
            />
          </Sticky>
          <TranscriptHeader source={source} book={book} unit={unit} />
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <StyledContainer text attached="bottom">
              <div
                className="transcript-content"
                ref={transcriptRef}
                dangerouslySetInnerHTML={{ __html: content.html }}
              />
              {searchPid && (
                <SearchNavigator
                  path={location.pathname}
                  source={source}
                  paragraph={searchPid}
                />
              )}
            </StyledContainer>
          </div>
        </div>
      </GlobalContext.Provider>
      <ToastContainer />
      <Dimmer active={loading} page onClickOutside={() => setLoading(false)}>
        <Header as="h2" icon inverted>
          <Icon loading name="cogs" />
          Hold on a sec...
        </Header>
      </Dimmer>
    </>
  );
}
