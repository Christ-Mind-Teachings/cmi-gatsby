/*
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
 */
import { formatTime, incrementLocation } from './cmiUtils';

let idx = -1; // current index into timing array
let pidx = -1;
let audioRef;
let timingData = [];
let audioPlayerOpen = false;
let seeking = false;

// round audio timing data to two decimal places
function round(time) {
  return Math.round(time * 100) / 100;
}

function removeHighlight(pos) {
  if (pos > -1) {
    const el = document.getElementById(timingData[pos].id);
    if (!el) {
      console.log(
        'removeHighlight: paragraph %s not found',
        timingData[pos].id
      );
      return;
    }
    el.classList.remove('audio-highlight');

    // do this only when audio player is open
    if (audioPlayerOpen) {
      el.querySelector('.special > i').classList.remove('cmi-hidden');
    }
  }
}

function manageHighlight() {
  // remove previous highlight
  removeHighlight(pidx);

  // highlight current paragraph and hide playFromHere icon
  if (idx !== -1) {
    const el = document.getElementById(timingData[idx].id);
    if (!el) {
      console.log(
        'manageHighlight: paragraph %s not found',
        timingData[idx].id
      );
      return;
    }
    el.classList.add('audio-highlight');
    el.querySelector('.special > i').classList.add('cmi-hidden');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/*
 * Find paragraph for current time. Look through timing array for an item with a time
 * greater than 't'. Return the index of the previous item. If not found return 0
 */
function findCurrentPosition(t) {
  const pos = timingData.findIndex((i) => i.seconds > t);
  return pos > 0 ? pos - 1 : 0;
}

/*
 * Called every 250ms during audio playback with the current playback time. This is
 * used to control highlighting paragraphs being spoken.
 */
function updatePlaybackTime(t) {
  if (idx === -1) {
    idx = findCurrentPosition(t);
    manageHighlight();
  } else if (idx < timingData.length - 1) {
    if (timingData[idx + 1].seconds < t) {
      pidx = idx;
      idx += 1;
      manageHighlight();
    }
  }
}

/*
 * Move forward or backward by one paragraph from the current one
 */
function adjustPlayback(direction) {
  if (direction === 'forward') {
    if (idx < timingData.length - 1) {
      audioRef.current.currentTime = timingData[idx + 1].seconds;
    }
  } else if (direction === 'backward') {
    if (idx > 0) {
      audioRef.current.currentTime = timingData[idx - 1].seconds;
    }
  }
}

/*
 * Allow user to play audio from any paragraph in the transcript. When
 * the play icon is clicked, get the start time for that paragraph and
 * set the audio currentTime accordingly.
 */
function playFromHereListener(e) {
  e.stopPropagation();

  const pid = e.target?.parentElement?.parentElement?.id;
  if (!pid) return;

  // without this audio will play when user links to footnote
  if (e.target.className === 'footnote-ref') return;

  const index = timingData.findIndex((i) => i.id === pid);
  if (index > -1) {
    audioRef.current.currentTime = timingData[index].seconds;
    pidx = idx;
    idx = -1;

    if (audioRef.current.paused) {
      audioRef.current.play();
    }
  }
}

function initializePlayFromHere() {
  // add 'play' icon to all p.cmiTranPara elements
  document.querySelectorAll('.cmiTranPara > span.special').forEach((e) => {
    const parent = e.closest('.footnotes');
    // don't add icon to footnotes
    if (!parent) {
      e.innerHTML = '<i class="cmi-hidden play circle icon"></i>';
    }
  });
  // add eventlistener for click on play icon to change playback position
  document
    .querySelector('.transcript-content')
    .addEventListener('click', playFromHereListener);
}

/*
 * Show playFromHere icons on each paragraph when audio player is visible and
 * hide hide them otherwise
 */
function playerStateChange(open) {
  audioPlayerOpen = open;

  if (open) {
    document
      .querySelectorAll('.cmiTranPara > span.special > i')
      .forEach((e) => {
        e.classList.remove('cmi-hidden');
      });

    // hide icon from current paragraph if present
    if (idx > -1) {
      document
        .querySelector(`#${timingData[idx].id} > span.special > i`)
        .classList.add('cmi-hidden');
    }
  } else {
    document
      .querySelectorAll('.cmiTranPara > span.special > i')
      .forEach((e) => {
        e.classList.add('cmi-hidden');
      });
  }
}

/*
 * Round seconds to 2 decimal digits and adjust id by 1 to compensate for
 * pid starting from 1 (not 0 as in earlier version of CMI)
 */
function initialize(timing, ref) {
  audioRef = ref;
  // adjust timing data
  timingData = timing.time.map((t) => {
    t.seconds = round(t.seconds);
    t.id = incrementLocation(t.id);
    return t;
  });

  initializePlayFromHere();

  ref.current.addEventListener('seeking', (e) => {
    seeking = true;
  });

  ref.current.addEventListener('seeked', (e) => {
    seeking = false;
    pidx = idx;
    idx = -1;
  });

  ref.current.addEventListener('ended', (e) => {
    // remove highlight on last paragraph
    removeHighlight(idx);
    idx = -1;
    pidx = -1;
  });
}

function teardown() {
  // remove play from here icons
  document
    .querySelectorAll('.cmiTranPara > span.special')
    .forEach((e) => (e.innerHTML = ''));

  // remove event listener
  document
    .querySelector('.transcript-content')
    .removeEventListener('click', playFromHereListener);
}

function setDuration(s) {
  // console.log('duration: %s/%s', s, formatTime(s));
}

export default {
  initialize,
  updatePlaybackTime,
  adjustPlayback,
  teardown,
  playerStateChange,
  setDuration,
};
