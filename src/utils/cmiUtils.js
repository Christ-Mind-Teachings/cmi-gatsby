import { toast } from 'react-toastify';
import { fetchAnnotation } from './cmiApi';

const textPosition = require('dom-anchor-text-position');
const wrapRange = require('wrap-range-text');

/**
 * Highlight selectedText style annotations
 *
 * @param {object} annotation - annotation with selectedText
 * @param {Node} toNode - highlight relative to this node
 */
function highlight(annotation, toNode = document.body) {
  const annoId = annotation.id;

  if (annotation.target.source) {
    const selectors = annotation.target.selector;
    let existingMarks;
    let range;

    for (let i = 0; i < selectors.length; i += 1) {
      const selector = selectors[i];
      const { type } = selector;
      switch (type) {
        case 'TextPositionSelector':
          // skip existing marks
          existingMarks = document.querySelectorAll(
            `[data-annotation-id="${annoId}"]`
          );
          if (existingMarks.length === 0) {
            const mark = document.createElement('mark');
            mark.dataset.annotationId = annoId;

            // the id of the bookmark annotation that contains this annotation
            if (annotation.aid) {
              mark.dataset.aid = annotation.aid;
            }
            mark.classList.add('bookmark-selected-text');

            // this sometimes fails and is fixed by adjusting the selector
            try {
              range = textPosition.toRange(toNode, selector);
              annotation.wrap = wrapRange(mark, range);
            } catch (err) {
              console.log("Couldn't find selected text in paragraph");
              console.error(err);
              toast.error('Failed to text in paragraph');
            }
          }
          break;
        default:
          break;
      }
    }
  }
}

/*
 * Format paraKey so it contains 3 decimal positions
 */
function formatKey(key) {
  let kee = key;
  if (typeof key !== 'string') {
    kee = key.toString(10);
  }

  const decimalPos = key.indexOf('.');

  // invalid key, but return it anyway.
  if (decimalPos === -1) {
    return `${kee}.001`;
  }

  const intPart = key.substr(0, decimalPos);
  const decimalPart = key.substr(decimalPos + 1);
  const padding =
    decimalPart.length === 2 ? '0' : decimalPart.length === 1 ? '00' : '';

  return `${intPart}.${decimalPart}${padding}`;
}

/**
 *  In the Jekyll site transcript paragraph numbers started at 0. All objects created
 *  on the old site need to have the pid values incremented to match the new
 *  site where paragraph numbers start with 1.
 *
 * @param {string} p - this is the id of the paragraph a search hit is found in
 */
export function incrementLocation(p) {
  const pid = parseInt(p.substr(1), 10);
  return `p${pid + 1}`;
}

/**
 * Called to unwrap and remove highlight from text of a shared annotation.
 *
 * @param {object} selectedText - object used to highlight text
 */
function unwrap(selectedText) {
  const wrapper = document.querySelector('.as-highlight.ui.raised.segment');
  const header = wrapper.querySelector('.ui.header');
  const parent = wrapper.parentNode;

  // remove highlighted text if present
  if (selectedText && selectedText.wrap) {
    selectedText.wrap.unwrap();
  }

  // remover wrapper header
  wrapper.removeChild(header);

  // move children out of the wrapper
  while (wrapper.firstChild) {
    parent.insertBefore(wrapper.firstChild, wrapper);
  }

  // remover the enpty wrapper
  parent.removeChild(wrapper);
}

/**
 * The start and end positions of annotations created on the Jekyll site
 * need to be adjusted due to differences on the new site. The old site included
 * pid values in offset calculations which need to be adjusted. The amount of
 * adjustment depends on the paragraph id.
 *
 * @param {object} st - annotation selectedText object
 */
function adjustSelectedText(st) {
  const pidLength = st.pid.length;
  const adjustment = pidLength + 3; // "(p1) " or "(p23) " or "(p103) "

  st.target.selector[0].start -= adjustment;
  st.target.selector[0].end -= adjustment;

  return st;
}

/**
 * Wrap and scroll a shared annotation containing one or more paragraphs
 * in a wrapper with a header. Create a onetime eventlistener to unwrap
 * contents.
 *
 * @param {object} a - annotation object
 */
function wrapAndScrollAnnotation(a) {
  // increment pid (to adjust for zero based paragraph numbering in old version)
  const pid = incrementLocation(a.rangeStart);

  // first paragraph to wrap, there may be others
  let el = document.getElementById(pid);

  // wrapper contains a header which contains a <i> and <header>
  const wrapper = document.createElement('div');
  const header = document.createElement('h4');
  const i = document.createElement('i');
  const headerContent = document.createElement('div');

  header.classList.add('ui', 'header');
  i.classList.add('small', 'window', 'close', 'icon');
  headerContent.classList.add('content');
  headerContent.innerHTML = 'Click to Close Highlight';

  header.appendChild(i);
  header.appendChild(headerContent);

  wrapper.classList.add('as-highlight', 'ui', 'raised', 'segment');
  wrapper.setAttribute('title', 'Click to close');
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(header);
  wrapper.appendChild(el);

  // highlight selectedText if present
  if (a.selectedText) {
    a.selectedText = adjustSelectedText(a.selectedText);
    highlight(a.selectedText, el);
  }

  // add additional paragraphs between rangeStart and rangeEnd
  if (a.rangeStart !== a.rangeEnd) {
    let start = parseInt(a.rangeStart.substring(1), 10);
    const end = parseInt(a.rangeEnd.substring(1), 10);

    // increment start since we've already appended the first paragraph to the wrapper
    start += 1;
    while (start <= end) {
      const nextPid = `p${start + 1}`; // incrementPid
      el = document.getElementById(nextPid);
      wrapper.appendChild(el);
      start += 1;
    }
  }

  // add close event listener
  wrapper.addEventListener(
    'click',
    () => {
      unwrap(a.selectedText);
    },
    { once: true }
  );
  wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Format time in seconds to 0:00:00
 *
 * @param {number} s - time in seconds
 * @returns {string} as '0:00:00'
 */
export function formatTime(s) {
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s - hours * 3600) / 60);
  const seconds = s - hours * 3600 - minutes * 60;

  return `${hours.toString().padStart(1, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * The pid forms the decimal portion of the paragraph key. The pid is assumed to
 * originate from the jekyll version of CMI in which case it needs to be incremented
 * by one because the new version pid's start at 1 and not 0 as it did in the Jekyll
 * version.
 *
 * The pid is divided by 1000 to allow for 3 decimal places and then added to the page
 * key. The result is formatted to 3 decimal places by formatKey().
 *
 * @param {string} pid - paragraph id (eg: p21)
 * @param {string} key - page key (uniquely identifies each transcript page)
 * @returns {string} - paragraph key
 */
export function createParagraphKey(pid, key) {
  const numericPid = (parseInt(pid.substring(1), 10) + 1) / 1000;
  const numericKey = parseInt(key, 10);
  return formatKey(`${numericKey + numericPid}`);
}

/**
 * Display bookmark
 *
 * @param {object} keyInfo
 * @param {string} keyInfo.userId - Id of user who created the annotation
 * @param {string} keyInfo.creationDate - annotation creation date
 * @param {string} keyInfo.pid - Starting paragraph id of the annotation
 * @param {string} keyInfo.key - Key of page containing the annotation
 * #param {function} setLoading - UI loading indicator
 */
export async function displaySharedBookmark(keyInfo, setLoading) {
  try {
    setLoading(true);

    const { userId, creationDate, pid, key } = keyInfo;
    const paraKey = createParagraphKey(pid, key);
    const annotation = await fetchAnnotation({ userId, paraKey, creationDate });

    if (!annotation) {
      // TODO: inform user annotation not found
      console.warn('Annotation not found');
      return;
    }

    wrapAndScrollAnnotation(annotation);
  } catch (error) {
    // TODO: inform user of error
    console.error(error);
  } finally {
    setLoading(false);
  }
}
