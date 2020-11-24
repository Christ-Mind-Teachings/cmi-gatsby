import { formatTime, incrementLocation } from './cmiUtils';

let idx = -1; // current index into timing array
let pidx = -1;
let audioRef;
let duration = -1;
let timingData = [];
let audioPlayerOpen = false;

// round audio timing data to two decimal places
function round(time) {
  return Math.round(time * 100) / 100;
}

function audioLog() {
  console.log({
    idx,
    pid: timingData[idx].id,
    seconds: timingData[idx].seconds,
    currentTime: audioRef.current.currentTime,
  });
}

function manageHighlight() {
  // if pidx !== -1 remove previous highlight and show playFromHere icon
  if (pidx !== -1) {
    const el = document.getElementById(timingData[pidx].id);
    el.classList.remove('audio-highlight');

    // do this only when audio player is open
    if (audioPlayerOpen) {
      el.querySelector('.special > i').classList.remove('cmi-hidden');
    }
  }

  // highlight current paragraph and hide playFromHere icon
  if (idx !== -1) {
    audioLog();
    const el = document.getElementById(timingData[idx].id);
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
  const pid = e.target.parentElement.parentElement.id;
  if (!pid) return;

  const index = timingData.findIndex((i) => i.id === pid);
  if (index > -1) {
    audioRef.current.currentTime = timingData[index].seconds;
  }
}

function initializePlayFromHere() {
  // add 'play' icon to all p.cmiTranPara elements
  document
    .querySelectorAll('.cmiTranPara > span.special')
    .forEach(
      (e) => (e.innerHTML = '<i class="cmi-hidden play circle icon"></i>')
    );
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

  ref.current.addEventListener('seeked', (e) => {
    pidx = idx;
    idx = -1;
  });

  ref.current.addEventListener('ended', (e) => {
    pidx = idx;
    manageHighlight();
    idx = -1;
    pidx = -1;
  });

  ref.current.addEventListener('durationchange', (e) => {
    const newDuration = ref.current.duration;
    console.log(
      'duration changed, current: %s/%s',
      duration,
      formatTime(duration)
    );
    console.log(
      'duration changed, new: %s/%s',
      newDuration,
      formatTime(newDuration)
    );
    duration = newDuration;
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
  console.log('duration: %s/%s', s, formatTime(s));
}

export default {
  initialize,
  updatePlaybackTime,
  adjustPlayback,
  teardown,
  playerStateChange,
  setDuration,
};
