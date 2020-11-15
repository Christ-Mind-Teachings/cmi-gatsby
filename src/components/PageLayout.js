import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import PageNav from './PageNav';
import { SearchContext } from './SearchContext';

export default function PageLayout(props) {
  const { source, title, children } = props;
  const [contentsOpen, setContentsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Container text>
        <SearchContext.Provider value={{ searchPid: null }}>
          <PageHeader title={title} />
          <PageNav source={source} />
          {children}
        </SearchContext.Provider>
      </Container>
    </>
  );
}
