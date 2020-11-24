import React from 'react';
import { navigate } from 'gatsby';
import { List } from 'semantic-ui-react';

function handleTocClick(e, obj) {
  e.preventDefault();
  e.stopPropagation();

  // don't navigate to current page
  if (!obj.active) {
    navigate(obj.target);
  }
}

function createSubList(contents, bid, pIdx, url) {
  const subList = contents.map((item, index) => (
    <List.Item
      target={item.url}
      key={`${bid}-${pIdx}-${index}`}
      active={url ? item.url === url : false}
      onClick={handleTocClick}
    >
      <span>{item.title}</span>
    </List.Item>
  ));
  return <List.List>{subList}</List.List>;
}

export default function TableOfContents(props) {
  const { bid, toc, unit } = props;
  const contents = toc.map((item, index) => (
    <List.Item
      target={item.url}
      onClick={handleTocClick}
      key={`${bid}-${index}`}
      active={unit ? item.url === unit.url : false}
    >
      <span>{item.title}</span>
      {item.contents
        ? createSubList(item.contents, bid, index, unit ? unit.url : null)
        : undefined}
    </List.Item>
  ));

  return (
    <List style={{ cursor: 'pointer', color: '#668AAA' }} className="tocStyle">
      {contents}
    </List>
  );
}
