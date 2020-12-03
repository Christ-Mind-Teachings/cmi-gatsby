import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { Modal, Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import doubleBubble from '../assets/images/cmi/quotes/double-bubble.png';
import carbonFibre from '../assets/images/cmi/quotes/carbon-fibre.png';
import darkPaths from '../assets/images/cmi/quotes/dark-paths.png';
import embossedDiamond from '../assets/images/cmi/quotes/embossed-diamond.png';
import folkPattern from '../assets/images/cmi/quotes/folk-pattern.png';
import fullBloom from '../assets/images/cmi/quotes/full-bloom.png';
import leavesPattern from '../assets/images/cmi/quotes/leaves-pattern.png';
import lightGreyTerrazzo from '../assets/images/cmi/quotes/light-grey-terrazzo.png';
import powStar from '../assets/images/cmi/quotes/pow-star.png';
import repeatedSquare from '../assets/images/cmi/quotes/repeated-square.png';
import triangleMosaic from '../assets/images/cmi/quotes/triangle-mosaic.png';

const StyledModal = styled(Modal)`
  &.ui.modal {
    font-size: 1.5em;
  }

  .header {
    text-align: center;
  }

  .content > blockquote > footer {
    font-style: italic;
    text-align: right;
  }

  .content > blockquote:before {
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
  }

  .content.center {
    text-align: center;
  }

  .content.silver-diagonal {
    /* Permalink: https://colorzilla.com/gradient-editor/#f5f6f6+0,dbdce2+21,b8bac6+49,dddfe3+80,f5f6f6+100;Grey+Pipe */
    background: linear-gradient(
      135deg,
      rgba(245, 246, 246, 1) 0%,
      rgba(219, 220, 226, 1) 21%,
      rgba(184, 186, 198, 1) 49%,
      rgba(221, 223, 227, 1) 80%,
      rgba(245, 246, 246, 1) 100%
    );
  }

  .content.wax-diagonal {
    /* Permalinkhttps://colorzilla.com/gradient-editor/#fcfff4+0,dfe5d7+40,b3bead+100;Wax+3D+%233 */
    background: linear-gradient(
      135deg,
      rgba(252, 255, 244, 1) 0%,
      rgba(223, 229, 215, 1) 40%,
      rgba(179, 190, 173, 1) 100%
    );
  }

  .content.violet-diagonal {
    /* Permalink: https://colorzilla.com/gradient-editor/#fcf1ff+0,e2d5e3+40,bdabba+100 */
    background: linear-gradient(
      135deg,
      rgba(252, 241, 255, 1) 0%,
      rgba(226, 213, 227, 1) 40%,
      rgba(189, 171, 186, 1) 100%
    );
  }

  .content.double-bubble {
    background: url(${doubleBubble});
  }

  .content.carbon-fibre {
    background: url(${carbonFibre});
    color: #bbbbb9;
  }

  .content.dark-paths {
    background: url(${darkPaths});
    color: #e8e4e4;
  }

  .content.diamond {
    background: url(${embossedDiamond});
  }

  .content.folk-pattern {
    background: url(${folkPattern});
  }

  .content.full-bloom {
    background: url(${fullBloom});
  }

  .content.leaves {
    background: url(${leavesPattern});
  }

  .content.terrazzo {
    background: url(${lightGreyTerrazzo});
  }

  .content.pow-star {
    background: url(${powStar});
  }

  .content.repeated-square {
    background: url(${repeatedSquare});
  }

  .content.triangle-mosaic {
    background: url(${triangleMosaic});
  }
`;

/*
 * Note: Couldn't define quotes in the Modal styled component for some reason,
 *       it just broke everything.
 */
const openQuote = '\\201C';
const closeQuote = '\\201D';

const cssQuotes = {
  quotes: `"${openQuote}" "${closeQuote}"`,
};

const quoteBackgrounds = [
  'silver-diagonal',
  'wax-diagonal',
  'violet-diagonal',
  'double-bubble',
  'carbon-fibre',
  'dark-paths',
  'diamond',
  'folk-pattern',
  'full-bloom',
  'leaves',
  'terrazzo',
  'pow-star',
  'repeated-square',
  'triangle-mosaic',
];

function _getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default function Quotes(props) {
  const { showQuote, setShowQuote, header, sid, userId } = props;
  const [fetchKey, setFetchKey] = useState();
  const [open, setOpen] = useState(false);
  const [background, setBackground] = useState(null);
  const quoteIds = useRef([]);
  const usedIds = useRef([]);
  const quotes = useRef([]);
  const [currentQuote, setCurrentQuote] = useState('');

  // move quoteId to usedIds
  function markAsUsed(idx) {
    usedIds.current.push(quoteIds.current[idx]);
    quoteIds.current.splice(idx, 1);
  }

  function getQuote() {
    if (quoteIds.current.length === 0) {
      if (usedIds.current.length === 0) {
        // we have no quotes
        setCurrentQuote({
          quote: 'There are no quotes to show.',
          citation: 'Library of Christ Mind Teachings',
          url: '#',
        });
        return;
      }
      quoteIds.current = usedIds.current;
    }
    const classIdx = _getRandomInt(quoteBackgrounds.length);
    const idx = _getRandomInt(quoteIds.current.length);
    const key = quoteIds.current[idx];

    if (quotes.current[key]) {
      markAsUsed(idx);
      setCurrentQuote(quotes.current[key]);
    } else {
      setFetchKey(key);
      markAsUsed(idx);
    }

    // set quote background
    setBackground(quoteBackgrounds[classIdx]);
  }

  // show a quote
  useEffect(() => {
    if (!showQuote) return;
    getQuote();
    setOpen(true);
    setShowQuote(false);
  }, [showQuote]);

  // query quoteIds for source
  useEffect(() => {
    const url = `https://kkdlxunoe7.execute-api.us-east-1.amazonaws.com/latest/quoteKeys/${userId}/${sid}`;

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        // console.log('quoteIds: %o', data);
        quoteIds.current = data.keys;
      });
  }, [userId, sid]);

  // fetch a specific quote and display it
  useEffect(() => {
    if (!fetchKey) return;

    const [paraKey, creationDate] = fetchKey.split(':');
    const url = `https://kkdlxunoe7.execute-api.us-east-1.amazonaws.com/latest/quote/${userId}/${paraKey}/${creationDate}`;

    fetch(url)
      .then((resp) => resp.json())
      .then((quote) => {
        // fix url to remove '/t' as used by CMI Jekyll
        quote.quote.url = quote.quote.url.substring(2);
        console.log('quote: %o', quote.quote);
        quotes.current[fetchKey] = quote.quote;
        setCurrentQuote(quote.quote);
      });
  }, [fetchKey]);

  return (
    <StyledModal
      id="quote-modal"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      dimmer="blurring"
      size="small"
    >
      <Modal.Header as="h2" id="quote-modal-header">
        From <em>{header}</em>
      </Modal.Header>
      <Modal.Content id="quote-modal-content" className={background}>
        <blockquote style={cssQuotes}>
          {/* <p>{currentQuote.quote}</p> */}
          <p dangerouslySetInnerHTML={{ __html: currentQuote.quote }} />
          <footer>
            <Link to={currentQuote.url} title="Read quote from the source.">
              ~ {currentQuote.citation}
            </Link>
          </footer>
        </blockquote>
      </Modal.Content>
      <Modal.Actions>
        <Button icon color="green" onClick={() => setShowQuote(true)}>
          <Icon name="quote left" />
        </Button>
        <Button icon color="red" onClick={() => setOpen(false)}>
          <Icon name="window close" />
        </Button>
      </Modal.Actions>
    </StyledModal>
  );
}
