import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { Container, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import TranscriptNav from '../components/TranscriptNav';
import SearchNavigator from '../components/SearchNavigator';
import GlobalStyles from '../styles/GlobalStyles';
import { SearchContext } from '../components/SearchContext';

import 'react-toastify/dist/ReactToastify.css';

const StyledContainer = styled(Container)`
  &&& {
    /* font-size: 1rem; */
  }
`;

/**
 *  Look backwards through array for first item containing url and title
 *
 * @param {array} array - toc array
 * @param {*} c - position in array to start
 */
function findPrevious(array, c) {
  if (!array[c]) {
    return;
  }

  if (!array[c].contents) {
    return { url: array[c].url, title: array[c].title };
  }

  return findPrevious(array[c].contents, array[c].contents.length - 1);
}

/**
 *  Search through a table of contents array for a url. Return an object with results.
 *  The array can have multiple levels and has this general structure:
 *
 *  toc = [{
 *    title,
 *    url,
 *    [contents]: [
 *      title,
 *      url,
 *      [contents]
 *    ]
 *  }
 * ]
 *
 *  Each item in the array can optionally contain a "contents" array.
 *
 * @param {array} array - The array to search
 * @param {string} url - The string to look for
 * @param {*} pos - an empty array, used internally
 * @return {object} {found: boolean, next: {url, title}, prev: {url, title}}
 */
function findIndex(array, url, pos = []) {
  let prev;
  let next;
  for (let c = 0; c < array.length; c += 1) {
    if (array[c].url === url) {
      pos.push(c);

      // find prev
      prev = findPrevious(array, c - 1);

      // find next
      if (array[c].contents) {
        next = {
          url: array[c].contents[0].url,
          title: array[c].contents[0].title,
        };
      } else if (array[c + 1]) {
        next = { url: array[c + 1].url, title: array[c + 1].title };
      }

      return { found: true, url, pos, prev, next };
    }

    if (array[c].contents) {
      pos.push(c);
      const result = findIndex(array[c].contents, url, pos);
      if (result.found) {
        if (result.prev === undefined) {
          result.prev = { url: array[c].url, title: array[c].title };
        }

        if (result.next === undefined && array[c + 1]) {
          result.next = { url: array[c + 1].url, title: array[c + 1].title };
        }
        return result;
      }
      result.pos.pop();
    }
  }

  return { found: false, url, pos, prev, next };
}

export function GenericTranscriptTemplate({ location, data }) {
  const { unit, book, source, content } = data;
  const [searchPid, setSearchPid] = useState(
    location.state && location.state.search ? location.state.search : null
  );

  const [prev, setPrev] = useState({});
  const [next, setNext] = useState({});

  useEffect(() => {
    const { next = {}, prev = {} } = findIndex(book.toc, unit.url, []);
    setPrev(prev);
    setNext(next);
  }, []);

  return (
    <>
      <GlobalStyles />
      <Helmet title={`Transcript Name - ${unit.title}`} />
      <StyledContainer text>
        <div className="transcript">
          <Header as="h1">{source.title}</Header>
          <Header as="h2">{book.title}</Header>
          <Header as="h3">{unit.title}</Header>
        </div>
        <SearchContext.Provider value={{ searchPid, setSearchPid }}>
          <TranscriptNav
            source={source}
            book={book}
            unit={unit}
            next={next}
            prev={prev}
          />
          <div
            className="transcript-content"
            dangerouslySetInnerHTML={{ __html: content.html }}
          />
          {searchPid && (
            <SearchNavigator
              path={location.pathname}
              source={source}
              paragraph={searchPid}
            />
          )}
        </SearchContext.Provider>
      </StyledContainer>
      <ToastContainer />
    </>
  );
}
