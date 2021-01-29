import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { StepDescription } from 'semantic-ui-react';

function getTitle({ data, type }) {
  const { source, book, unit } = data;
  if (type === 'transcript') {
    return `${source.title}:${book.title}:${unit.title}`;
  }

  return 'Library of Christ Mind Teachings';
}

function getDescription({ data, type }) {
  const { source, book, unit } = data;
  if (type === 'transcript') {
    return book.description
      ? book.description
      : 'A transcript from the Library of Christ Mind Teachings';
  }

  return 'A page from the Library of Christ Mind Teachings';
}

export default function CMIHelmet(props) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  console.log(props);

  useEffect(() => {
    setTitle(getTitle(props));
    setDescription(getDescription(props));
  }, []);

  return (
    <Helmet>
      <meta name="author" content="Rick Mercer" />
      <meta name="description" content={description} />
      <title>{title}</title>
    </Helmet>
  );
}
