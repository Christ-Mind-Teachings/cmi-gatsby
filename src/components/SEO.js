import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';

function getTitle({ data, type }) {
  const { source, book, unit } = data;
  if (type === 'transcript') {
    return `${source?.title}:${book?.title}:${unit?.title}`;
  }

  if (type === 'page') {
    return source?.title;
  }

  return 'Library of Christ Mind Teachings';
}

function getDescription({ data, type }) {
  const { source, contents, book, unit } = data;
  if (type === 'transcript') {
    return book?.description
      ? book?.description
      : 'A transcript from the Library of Christ Mind Teachings';
  }

  if (type === 'page' && source?.description) {
    return source?.description;
  }

  return 'A page from the Library of Christ Mind Teachings';
}

export default function SEO(props) {
  const { href } = useLocation();
  // console.log(href);

  return (
    <Helmet>
      <meta name="author" content="Rick Mercer" />
      <meta name="description" content={getDescription(props)} />
      <title>{getTitle(props)}</title>
    </Helmet>
  );
}
