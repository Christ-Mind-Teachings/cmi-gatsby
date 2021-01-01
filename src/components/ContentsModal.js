/*
    import Img from 'gatsby-image';
    <Img fixed={image.childImageSharp.fixed} alt="Book Cover" />
 */

import React from 'react';
import { Image, Modal } from 'semantic-ui-react';
import TableOfContents from './TableOfContents';

export default function ContentsModal({ book, unit, open, setOpen }) {
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      dimmer="blurring"
    >
      <Modal.Header>
        <em>{book.title}</em>
      </Modal.Header>
      <Modal.Content image>
        <Image size="small" src={`${book.image}`} wrapped />
        <TableOfContents bid={book.bid} toc={book.toc} unit={unit} />
      </Modal.Content>
    </Modal>
  );
}
