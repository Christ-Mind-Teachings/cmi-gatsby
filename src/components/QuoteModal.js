import React, { useContext, useRef, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { Message, Modal, Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { IdentityContext } from './IdentityContextProvider';
import EmailShare from './EmailShare';

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
import { getQuote, getQuoteKeys } from '../utils/cmiApi';

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
  const { source, showQuote, setShowQuote, userId } = props;
  const [fetchKey, setFetchKey] = useState();
  const [open, setOpen] = useState(false);
  const [mailModalOpen, setMailModalOpen] = useState(false);
  const [background, setBackground] = useState(null);
  const [sendMail, setSendMail] = useState(false);
  const { user } = useContext(IdentityContext);
  const { t } = useI18next(['quotes']);

  // set and display message from <EmailShare> component
  const [message, setMessage] = useState({
    msg: 'This is a test',
    hidden: true,
    color: 'red',
  });

  const quoteIds = useRef([]);
  const usedIds = useRef([]);
  const quotes = useRef([]);
  const mailList = useRef();
  const [currentQuote, setCurrentQuote] = useState('');

  // move quoteId to usedIds
  function markAsUsed(idx) {
    usedIds.current.push(quoteIds.current[idx]);
    quoteIds.current.splice(idx, 1);
  }

  /*
   * Set the current quote and background at the same time to prevent
   * a separate render for each.
   */
  function displayQuote(quote) {
    const classIdx = _getRandomInt(quoteBackgrounds.length);
    setCurrentQuote(quote);
    setBackground(quoteBackgrounds[classIdx]);
  }

  function getNextQuote() {
    if (quoteIds.current.length === 0) {
      if (usedIds.current.length === 0) {
        // we have no quotes
        setCurrentQuote({
          quote: t('There are no quotes to show.'),
          citation: t('Library of Christ Mind Teachings'),
          url: '#',
        });
        return;
      }
      quoteIds.current = usedIds.current;
    }
    // const classIdx = _getRandomInt(quoteBackgrounds.length);
    const idx = _getRandomInt(quoteIds.current.length);
    const key = quoteIds.current[idx];

    if (quotes.current[key]) {
      markAsUsed(idx);
      // setCurrentQuote(quotes.current[key]);
      displayQuote(quotes.current[key]);
    } else {
      setFetchKey(key);
      markAsUsed(idx);
    }

    // setBackground(quoteBackgrounds[classIdx]);
  }

  // show a quote
  useEffect(() => {
    if (!showQuote) return;
    getNextQuote();
    setOpen(true);
    setShowQuote(false);
  }, [showQuote]);

  // query quoteIds for source
  useEffect(() => {
    async function getQuoteIdentifiers() {
      try {
        const keys = await getQuoteKeys(source.sid, userId);
        quoteIds.current = keys;
      } catch (error) {
        // TODO: notify user of error
        console.error(error);
      }
    }
    getQuoteIdentifiers();
  }, [userId, source.sid]);

  // fetch a specific quote and display it
  useEffect(() => {
    async function fetchQuote(uid, pk, cd) {
      try {
        const quote = await getQuote(uid, pk, cd);
        displayQuote(quote);
      } catch (error) {
        // TODO: notify user of error
        console.error(error);
      }
    }

    if (!fetchKey) return;

    const [paraKey, creationDate] = fetchKey.split(':');
    fetchQuote(userId, paraKey, creationDate);
  }, [fetchKey]);

  return (
    <StyledModal
      id="quote-modal"
      onOpen={() => setOpen(true)}
      open={open}
      dimmer="blurring"
      size="small"
    >
      <Modal.Header as="h2" id="quote-modal-header">
        <em>{source.title}</em>
        <Message
          onDismiss={() => setMessage({ ...message, hidden: true })}
          hidden={message.hidden}
          size="tiny"
          color={message.color}
        >
          {message.msg}
        </Message>
      </Modal.Header>
      <Modal.Content id="quote-modal-content" className={background}>
        <blockquote style={cssQuotes}>
          <p dangerouslySetInnerHTML={{ __html: currentQuote.quote }} />
          <footer>
            {currentQuote.url && (
              <Link
                to={currentQuote.url}
                title={t('Read quote from the source.')}
              >
                ~ {currentQuote.citation}
              </Link>
            )}
          </footer>
        </blockquote>
      </Modal.Content>
      <Modal.Actions>
        {user && (
          <Button icon color="blue" onClick={() => setMailModalOpen(true)}>
            <Icon name="paper plane" />
          </Button>
        )}
        <Button icon color="green" onClick={() => setShowQuote(true)}>
          <Icon name="quote left" />
        </Button>
        <Button icon color="red" onClick={() => setOpen(false)}>
          <Icon name="window close" />
        </Button>
      </Modal.Actions>
      <Modal
        size="small"
        onClose={() => setMailModalOpen(false)}
        open={mailModalOpen}
        dimmer="blurring"
        centered
      >
        <Modal.Header>{t('Share Quote by Email')}</Modal.Header>
        <Modal.Content>
          <EmailShare
            mailList={mailList}
            send={sendMail}
            setSend={setSendMail}
            quote={currentQuote}
            source={source}
            setOpen={setMailModalOpen}
            message={{ message, setMessage }}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={() => setSendMail(true)}>
            {t('Send Mail')}
          </Button>
          <Button color="red" onClick={() => setMailModalOpen(false)}>
            {t('Cancel')}
          </Button>
        </Modal.Actions>
      </Modal>
    </StyledModal>
  );
}
