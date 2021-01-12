import React from 'react';
import { Link } from 'gatsby';
// import { Link } from 'gatsby-plugin-react-i18next';
import { List } from 'semantic-ui-react';

function createSubList(contents, bid, pIdx, url) {
  const subList = contents.map((item, index) => (
    <List.Item
      target={item.url}
      key={`${bid}-${pIdx}-${index}`}
      active={url ? item.url === url : false}
    >
      <span>
        {item.url ? (
          <Link to={item.url}>
            {item.lesson ? `${item.lesson}. ${item.title}` : item.title}
          </Link>
        ) : (
          <List.Header>{item.title}</List.Header>
        )}
      </span>
      {item.contents
        ? createSubList(item.contents, `${bid}-ref`, index, url)
        : undefined}
    </List.Item>
  ));
  return <List.List>{subList}</List.List>;
}

export default function TableOfContents(props) {
  const { bid, toc, unit } = props;

  const contents = toc.map((item, index) => (
    <List.Item
      target={item.url}
      key={`${bid}-${index}`}
      active={unit ? item.url === unit.url : false}
    >
      {item.url ? (
        <Link to={item.url}>{item.title}</Link>
      ) : (
        <List.Header>{item.title}</List.Header>
      )}
      {item.contents
        ? createSubList(item.contents, bid, index, unit ? unit.url : null)
        : undefined}
    </List.Item>
  ));

  return <List className="tocStyle">{contents}</List>;
}
