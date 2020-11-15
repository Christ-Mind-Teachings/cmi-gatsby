/*
    import Img from 'gatsby-image';
    <Img fixed={image.childImageSharp.fixed} alt="Book Cover" />
 */

import React from 'react';
import { navigate } from 'gatsby';
import { List, Image, Modal } from 'semantic-ui-react';

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
      active={item.url === url}
      onClick={handleTocClick}
    >
      <span>{item.title}</span>
    </List.Item>
  ));
  return <List.List>{subList}</List.List>;
}

function TableOfContents(props) {
  const { bid, toc, unit } = props;
  const contents = toc.map((item, index) => (
    <List.Item
      target={item.url}
      onClick={handleTocClick}
      key={`${bid}-${index}`}
      active={item.url === unit.url}
    >
      <span>{item.title}</span>
      {item.contents
        ? createSubList(item.contents, bid, index, unit.url)
        : undefined}
    </List.Item>
  ));

  return <List className="tocStyle">{contents}</List>;
}

export default function ContentsModal({ book, unit, open, setOpen }) {
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      dimmer="blurring"
    >
      <Modal.Header>
        <em>{book.title}</em> Contents
      </Modal.Header>
      <Modal.Content scrolling image>
        <Image size="small" src={`${book.image}`} wrapped />
        <TableOfContents bid={book.bid} toc={book.toc} unit={unit} />
      </Modal.Content>
    </Modal>
  );
}
