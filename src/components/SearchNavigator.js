/*
 * Search Navigator
 *
 * The Search Navigator is displayed when the url contains ?search=pid query parameter. The 'pid'
 * is the paragraph id containing matches to a user search. Search results are stored in local storage
 * by sourceId. Results for Way of Mastery is stored with key of 'wom:searchResults'.
 *
 * Note:
 * Search results contain a 'location' attribute which is the pid containing search matches. The location
 * is based on pid's starting from 0. In this new version of CMI, pid's start from 1 so the location
 * values are off by one and need to be adjusted by adding one.
 *
 *
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { toast } from 'react-toastify';
import { List, Divider, Header, Icon, Segment } from 'semantic-ui-react';
import useLocalStorage from '../utils/useLocalStorage';
import { incrementLocation } from '../utils/cmiUtils';

const linkStyle = {
  color: '#347CC5',
  cursor: 'pointer',
};

/**
 *  Increment the id by one. This is needed because paragraph id's are one greater
 *  than that returned by the search api.
 * @param {String} p - this is the id of the paragraph a search hit is found in
function incrementLocation(p) {
  const pid = parseInt(p.substr(1), 10);
  return `p${pid + 1}`;
}
 */

/**
 * Initialize search navigator
 *
 * @param {String} path - page location.pathname
 * @param {object} searchResults - search results
 */
function getNavigatorData(path, searchResults, paragraph) {
  let trimmedPath = path.substring(1);

  if (trimmedPath.endsWith('/')) {
    trimmedPath = trimmedPath.substring(0, trimmedPath.length - 1);
  }
  const [, book, unit] = trimmedPath.split('/');
  const bookMatchesIndex = searchResults.matches.findIndex(
    (i) => i.bookId === book
  );

  // no matches found for book
  if (bookMatchesIndex === -1) {
    return {
      error: true,
      message: '(book) No search results found for this page.',
    };
  }

  const unitIndex = searchResults.matches[
    bookMatchesIndex
  ].units.findIndex((i) => i.url.endsWith(unit));

  // no matches found for unit
  if (unitIndex === -1) {
    return {
      error: true,
      message: '(unit) No search results found for this page.',
    };
  }

  // hits for this page
  const thisPageHits = searchResults.matches[bookMatchesIndex].units[unitIndex];

  // find index of paragraph in hits array
  const hitIndex = thisPageHits.hits.findIndex((i) => i.location === paragraph);

  // no hit found for paragraph requested in url query parameters
  if (hitIndex === -1) {
    return {
      error: true,
      message: `(paragraph) No search results found for requested paragraph ${paragraph}.`,
    };
  }

  // get previous page hits
  let previousPageHits = {};
  if (unitIndex > 0) {
    previousPageHits =
      searchResults.matches[bookMatchesIndex].units[unitIndex - 1];
  } else if (bookMatchesIndex > 0) {
    const lastUnitItem =
      searchResults.matches[bookMatchesIndex - 1].units.length - 1;
    previousPageHits =
      searchResults.matches[bookMatchesIndex - 1].units[lastUnitItem];
  }

  // get next page hits
  let nextPageHits = {};
  if (unitIndex < searchResults.matches[bookMatchesIndex].units.length - 1) {
    nextPageHits = searchResults.matches[bookMatchesIndex].units[unitIndex + 1];
  } else if (bookMatchesIndex < searchResults.matches.length - 1) {
    nextPageHits = searchResults.matches[bookMatchesIndex + 1].units[0];
  }

  // determine previous page url
  const previousPageUrl = {};
  if (previousPageHits.hits) {
    previousPageUrl.pid =
      previousPageHits.hits[previousPageHits.hits.length - 1].location;
    previousPageUrl.url = previousPageHits.url;
  }

  // determine next page url
  const nextPageUrl = {};
  if (nextPageHits.hits) {
    nextPageUrl.pid = nextPageHits.hits[0].location;
    nextPageUrl.url = nextPageHits.url;
  }

  return {
    hitIndex,
    bookTitle: searchResults.matches[bookMatchesIndex].title,
    thisPageHits,
    previousPageUrl,
    nextPageUrl,
  };
}

/**
 * Wrap query strings in <mark> tags
 *
 * @param {DOM Element} el - paragraph node containing search matches
 * @param {String} query - the search query
 */
function markParagraph(el, query, pid, hitIndex, scrollCurrent) {
  // console.log(
  //   'markParagraph %s, hitIndex: %s, scrollCurrent: %s',
  //   pid,
  //   hitIndex,
  //   scrollCurrent
  // );
  let content;
  const regex = new RegExp(
    `(?:^|(?=[a-pr-uwy-zA-PR-UWY-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]))(${query})(?:$|\\b|)`,
    'gim'
  );

  if (!el) {
    // paragraph not found
    // TODO: notify user
    return;
  }
  el.style.background = 'aliceblue';
  el.style.padding = '5px';
  el.style['border-radius'] = '5px';

  content = el.innerHTML;

  // remove newline chars in content - they can prevent the
  // query string from being highlighted
  content = content.replace(/[\r\n]/gm, ' ');
  el.innerHTML = content.replace(
    regex,
    "<mark class='cmi-search-hit'>$1</mark>"
  );

  // test if query was highlighted
  if (el.innerHTML === content) {
    console.log('Regex did not match: "%s" for %s', query, pid);
    // TODO: notify user
  }
}

export default function SearchNavigator(props) {
  const { source, path, paragraph } = props;
  const [searchResults] = useLocalStorage(
    {},
    `${source.sourceId}:searchResults`
  );
  const [bookTitle, setBookTitle] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [hitsOnPage, setHitsOnPage] = useState(0);
  const [visible, setVisible] = useState(true);
  const [prevUrl, setPrevUrl] = useState();
  const [prevUrlPid, setPrevUrlPid] = useState();
  const [nextUrl, setNextUrl] = useState();
  const [nextUrlPid, setNextUrlPid] = useState();
  const [currentPid, setCurrentPid] = useState();
  const [scrollCurrent, setScrollCurrent] = useState(false);

  const [hitIndex, setHitIndex] = useState(0);
  const [hitPos, setHitPos] = useState(1);
  const [nextMatch, setNextMatch] = useState('');
  const [prevMatch, setPrevMatch] = useState('');

  const pageHits = useRef();

  /*
   * Setup Search Navigator
   * - only called once
   */
  useEffect(() => {
    const nd = getNavigatorData(path, searchResults, paragraph);

    // console.log({ path, paragraph });
    // console.log('searchResults: %o', searchResults);
    // console.log({ nd });

    // if error close navigator and exit
    if (nd.error) {
      toast(nd.message);
      setVisible(false);
      return;
    }

    if (!nd.previousPageUrl.url) {
      setPrevUrlPid();
      setPrevUrl();
    } else {
      setPrevUrlPid(nd.previousPageUrl.pid);
      setPrevUrl(nd.previousPageUrl.url);
    }

    if (!nd.nextPageUrl.url) {
      setNextUrlPid();
      setNextUrl();
    } else {
      setNextUrlPid(nd.nextPageUrl.pid);
      setNextUrl(nd.nextPageUrl.url);
    }

    setBookTitle(nd.bookTitle);
    setPageTitle(nd.thisPageHits.title);
    setHitsOnPage(nd.thisPageHits.hits.length);

    pageHits.current = nd.thisPageHits;
    setHitIndex(nd.hitIndex);
  }, []);

  useEffect(() => {
    // console.log(
    //   'useEffect hitIndex: %s, scrollCurrent: %s',
    //   hitIndex,
    //   scrollCurrent
    // );

    const currentLocation = pageHits.current.hits[hitIndex].location;
    const adjustedLocation = incrementLocation(currentLocation);
    const el = document.getElementById(adjustedLocation);

    // scrollCurrent is used to scroll to the current location, this is quirky and useEffect()
    // is called again when we reset the value to false. Not sure how to avoid this.
    if (scrollCurrent) {
      setScrollCurrent(!scrollCurrent);
    } else if (!visible) {
      // let cleanup remove styling from current paragraph
    } else {
      markParagraph(
        el,
        searchResults.query,
        adjustedLocation,
        hitIndex,
        scrollCurrent
      );
      const len = pageHits.current.hits.length;
      setCurrentPid(adjustedLocation);

      // only one search on page so prev and next match are null
      if (len === 1) {
        setPrevMatch(null);
        setNextMatch(null);
      } else {
        setPrevMatch(
          hitIndex > 0
            ? pageHits.current.hits[hitIndex - 1].location
            : pageHits.current.hits[len - 1].location
        );

        setNextMatch(
          hitIndex < len - 1
            ? pageHits.current.hits[hitIndex + 1].location
            : pageHits.current.hits[0].location
        );

        setHitPos(hitIndex + 1);
      }
    }

    // scroll paragraph into view
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return () => {
      if (scrollCurrent) return;

      let mark = el.querySelector('mark.cmi-search-hit');
      while (mark) {
        mark.outerHTML = searchResults.query;
        mark = el.querySelector('mark.cmi-search-hit');
      }

      el.style.background = '';
      el.style.padding = '';
      el.style['border-radius'] = '';
    };
  }, [visible, hitIndex, scrollCurrent]);

  function closeNavigator() {
    setVisible(false);
  }

  /*
   * Manage previous, next, and current options on the search navigator. Previous
   * and next reference the previous and next search matches on the page. They roll
   * over from the first to the last and the last to the first.
   */
  function navigateInternally(e, obj) {
    const len = pageHits.current.hits.length;

    switch (obj.name) {
      case 'previous':
        if (hitIndex > 0) {
          setHitIndex(hitIndex - 1);
        } else {
          setHitIndex(len - 1);
        }
        break;
      case 'next':
        if (hitIndex < len - 1) {
          setHitIndex(hitIndex + 1);
        } else {
          setHitIndex(0);
        }
        break;
      case 'current':
        setScrollCurrent(true);
        break;
      default:
        break;
    }
  }

  return (
    <Segment
      raised
      padded
      color="red"
      className={visible ? 'search-navigator-visible' : 'cmi-hidden'}
    >
      <Header as="h4">
        <Icon name="book" />
        <Header.Content>
          {bookTitle} - {pageTitle}
        </Header.Content>
      </Header>
      <Divider />
      <Header as="h4">
        <Icon name="search" />
        <Header.Content>
          Search for "{searchResults.query}" ({hitPos} of {hitsOnPage})
        </Header.Content>
      </Header>
      <div className="sn-controls">
        <List horizontal>
          <List.Item>
            <Icon name="left arrow" />
            {prevUrl ? (
              <Link state={{ search: prevUrlPid }} to={prevUrl}>
                Previous Page
              </Link>
            ) : (
              'Previous Page'
            )}
          </List.Item>
          <List.Item
            location={prevMatch}
            name="previous"
            onClick={navigateInternally}
          >
            <Icon name="up arrow" />
            <span style={prevMatch ? linkStyle : null}>Previous Match</span>
          </List.Item>
          <List.Item
            name="current"
            location={currentPid}
            onClick={navigateInternally}
          >
            <Icon name="asterisk" />
            <span style={linkStyle}>{currentPid}</span>
          </List.Item>
          <List.Item
            location={nextMatch}
            name="next"
            onClick={navigateInternally}
          >
            <Icon name="down arrow" />
            <span style={nextMatch ? linkStyle : null}>Next Match</span>
          </List.Item>
          <List.Item>
            <Icon name="right arrow" />
            {nextUrl ? (
              <Link state={{ search: nextUrlPid }} to={nextUrl}>
                Next Page
              </Link>
            ) : (
              'Next Page'
            )}
          </List.Item>
          <List.Item onClick={closeNavigator}>
            <Icon name="window close outline" />
            <span style={linkStyle}>Close</span>
          </List.Item>
        </List>
      </div>
    </Segment>
  );
}
