import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'gatsby';
import {
  Container,
  Input,
  Message,
  Icon,
  Divider,
  Header,
  Image,
  Modal,
  List,
} from 'semantic-ui-react';
import { useLocation } from '@reach/router';
import formatSearchResults from '../utils/search/format';
import useLocalStorage from '../utils/useLocalStorage';
import { SearchContext } from './SearchContext';
import { incrementLocation } from '../utils/cmiUtils';
import { runSearchQuery } from '../utils/cmiApi';

/**
 * Generate list of matches by book
 *
 * @param {object} props
 */
function SearchResults(props) {
  const { setOpen, set, path, results } = props;

  if (!results.matches) {
    return <Container />;
  }

  /*
   * Because <Link> won't link to the current page, we need a way to navigate to search matches
   * on the current page. This is a nasty hack but it does work. We call setOpen(false) to close
   * the Modal and set(pid) to display the search match at paragraph pid.
   */
  function viewSearchMatchOnPage(e) {
    e.preventDefault();
    const pid = e.target.attributes[0].value;

    // close modal window
    setOpen(false);
    set(pid);
  }

  function formatMatches(bookId, url, hits, unitIndex) {
    return hits.map((h, index) => (
      <List.Item key={`${bookId}:unit:${unitIndex}:hit:${index}`}>
        <List.Icon name="search" />
        <List.Content>
          <List.Header>
            {url === path ? (
              <a location={h.location} onClick={viewSearchMatchOnPage}>
                Paragraph {incrementLocation(h.location)}
              </a>
            ) : (
              <Link state={{ search: h.location }} to={url}>
                Paragraph {incrementLocation(h.location)}
              </Link>
            )}
          </List.Header>
          <List.Description dangerouslySetInnerHTML={{ __html: h.context }} />
        </List.Content>
      </List.Item>
    ));
  }

  function formatUnitMatches(bookId, units) {
    return units.map((u, index) => (
      <List.Item key={`${bookId}:unit:${index}:${u.hits.length}`}>
        <List.Icon name="book" />
        <List.Content>
          <List.Header>
            {u.title} ({u.hits.length})
          </List.Header>
          <List.List>{formatMatches(bookId, u.url, u.hits, index)}</List.List>
        </List.Content>
      </List.Item>
    ));
  }

  const matchesByBook = results.matches.map((book) => (
    <div key={book.bookId}>
      <Header as="h3">
        {book.title} ({book.count})
      </Header>
      <List>{formatUnitMatches(book.bookId, book.units)}</List>
    </div>
  ));
  return <Container>{matchesByBook}</Container>;
}

export default function SearchModal({ source, open, setOpen }) {
  const [query, setQuery] = useState('');
  const [searchState, setSearchState] = useState({
    ok: true,
    header: `Search ${source.title}`,
    message: '',
  }); // positive
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [searchResults, setSearchResults] = useLocalStorage(
    {},
    `${source.sourceId}:searchResults`
  );

  const { searchPid, setSearchPid } = useContext(SearchContext);

  function runSearch(e) {
    e.preventDefault();
    const input = document.querySelector('input[name=query]');
    if (!input.value.trim()) {
      return;
    }
    setQuery(input.value);
    input.value = '';
  }

  useEffect(() => {
    if (query === '') return;

    async function runQuery() {
      try {
        setLoading(true);
        const queryResult = await runSearchQuery(query, source.sourceId);
        const results = formatSearchResults(queryResult);

        if (results.count > 0) {
          setSearchState({
            ok: true,
            header: `Success: ${results.count} matches found`,
            message: `Search for "${results.query}" found ${results.count} matches`,
          });
          setSearchResults(results);
        } else {
          setSearchState({
            ok: false,
            header: 'No matches found',
            message: `Search for "${results.query}" found no matches`,
          });
        }
      } catch (error) {
        // TODO: notify user of error
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    runQuery();
  }, [query, source.sourceId]);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      dimmer="blurring"
    >
      <Modal.Header>
        Search <em>{source.title}</em>
        <br />
        <Link to="/">See Search Documentation</Link>
      </Modal.Header>
      <Modal.Content image>
        <Image size="small" src="/assets/img/cmi/search_modal.png" wrapped />
        <Modal.Description>
          <Container>
            <Message
              icon
              positive={searchState.ok}
              negative={!searchState.ok}
              color={loading ? 'purple' : null}
            >
              <Icon
                name={loading ? 'circle notched' : 'search'}
                loading={loading}
              />
              <Message.Content>
                <Message.Header>
                  {loading ? 'Please wait...' : searchState.header}
                </Message.Header>
                {loading ? 'Searching' : searchState.message}
              </Message.Content>
            </Message>
            <form onSubmit={runSearch}>
              <Input
                loading={loading}
                focus
                action={loading ? '' : 'Search'}
                name="query"
                placeholder="Enter search query"
              />
            </form>
            <Divider horizontal>
              <Header as="h4">
                <Icon name="search" />
                {searchResults.query
                  ? `Search for "${searchResults.query}" found ${searchResults.count} matches`
                  : ''}
              </Header>
            </Divider>
            <SearchResults
              set={setSearchPid}
              setOpen={setOpen}
              path={location.pathname}
              results={searchResults}
            />
          </Container>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}
