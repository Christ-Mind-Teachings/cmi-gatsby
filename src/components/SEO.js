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

  if (type === 'acq') {
    return unit?.title;
  }

  return 'Library of Christ Mind Teachings';
}

function getDescription({ data, type }) {
  const { source, book, unit } = data;
  if (type === 'transcript') {
    return book?.description
      ? book?.description
      : 'A transcript from the Library of Christ Mind Teachings';
  }

  if (type === 'page' && source?.description) {
    return source?.description;
  }

  if (type === 'acq' && unit?.description) {
    return unit.description;
  }

  return 'A page from the Library of Christ Mind Teachings';
}

export default function SEO(props) {
  const { href, origin } = useLocation();

  return (
    <Helmet>
      <meta name="author" content="Rick Mercer" />
      <meta name="description" content={getDescription(props)} />
      <title>{getTitle(props)}</title>
      <meta
        property="og:site_name"
        content="Library of Christ Mind Teachings"
      />
      <meta property="og:title" content={getTitle(props)} />
      <meta property="fb:admins" content="rick.mercer.us" />
      <meta property="fb:app_id" content="448658485318107" />
      <meta property="og:url" content={href} />
      <meta
        property="og:image"
        content={`${origin}/assets/img/cmi/logo310.png`}
      />
      <meta property="og:image:width" content="310" />
      <meta property="og:image:height" content="310" />
    </Helmet>
  );
}
