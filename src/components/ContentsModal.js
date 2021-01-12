/*
    import Img from 'gatsby-image';
    <Img fixed={image.childImageSharp.fixed} alt="Book Cover" />
 */

import React, { useEffect } from 'react';
import { Image, Modal } from 'semantic-ui-react';
import TableOfContents from './TableOfContents';

export default function ContentsModal({ book, unit, open, setOpen }) {
  /*
   * Scroll current transcript item into view, if present.
   *
   * Note: I tried to do with with <Modal onOpen but it wasn't being called,
   *       don't know why!!!
   */
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const el = document.querySelector('.tocStyle .active.item a');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 250);
    }
  }, [open]);

  return (
    <Modal onClose={() => setOpen(false)} open={open} dimmer="blurring">
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
