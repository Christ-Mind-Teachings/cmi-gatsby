/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import highlight from '../utils/audioHighlight';
import { formatTime } from '../utils/cmiUtils';

const AudioWrapperStyle = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const AudioPlayerStyle = styled.div`
  font-size: 0.9em;
  background: #4d5061;
  color: white;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  height: 3rem;
  padding: 5px;

  a {
    color: inherit;
  }

  select:focus {
    outline: none;
  }

  select {
    border: 0;
    background: inherit;
    color: inherit;
  }
`;

export default function AudioPlayer({ open, timing, src }) {
  const ref = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaTime, setMediaTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlaying = (e) => {
    e.preventDefault();
    setIsPlaying(!isPlaying);

    const audioPlayer = ref.current;
    isPlaying ? audioPlayer.pause() : audioPlayer.play();
  };

  const onLoadedMetadata = () => {
    const d = Math.round(ref.current.duration);
    setDuration(d);
    highlight.setDuration(d);
  };

  const onTimeUpdate = () => {
    const { currentTime } = ref.current;
    setMediaTime(Math.round(currentTime));
    highlight.updatePlaybackTime(currentTime);
  };

  const onScrubberChange = (event) => {
    const playhead = parseFloat(event.target.value);
    setMediaTime(playhead);
    ref.current.currentTime = playhead;
  };

  const onChangeSpeed = (newSpeed) => {
    ref.current.playbackRate = newSpeed;
  };

  const onRewind = () => {
    const current = ref.current.currentTime;
    const newTime = Math.max(current - 5, 0);
    setMediaTime(newTime);
    ref.current.currentTime = newTime;
  };

  const onFastForward = () => {
    const current = ref.current.currentTime;
    const newTime = Math.min(current + 5, duration);
    setMediaTime(newTime);
    ref.current.currentTime = newTime;
  };

  /**
   * Changes playback to start of previous or start of next paragraph. Uses
   * timing data to find start times.
   *
   * @param {Event} e synthetic event
   * @param {String direction - either 'forward' or 'backward'
   */
  function adjustPosition(e, direction) {
    e.preventDefault();
    highlight.adjustPlayback(direction);
  }

  function setSpeed(e) {
    onChangeSpeed(e.target.value);
  }

  useEffect(() => {
    highlight.initialize(timing, ref);
    return () => {
      highlight.teardown();
    };
  }, []);

  useEffect(() => {
    highlight.playerStateChange(open);
  }, [open]);

  return (
    <AudioWrapperStyle>
      <audio
        ref={ref}
        src={src}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <AudioPlayerStyle
        style={open ? null : { display: 'none' }}
        className="audio-player"
      >
        <div className="first-buffer" />
        <a href="/" onClick={togglePlaying}>
          <Icon name={isPlaying ? 'pause' : 'play'} />
        </a>
        <a href="/" onClick={(e) => adjustPosition(e, 'backward')}>
          <Icon name="backward" />
        </a>
        <div>
          {formatTime(mediaTime)} / {formatTime(duration)}
        </div>
        <a href="/" onClick={(e) => adjustPosition(e, 'forward')}>
          <Icon name="forward" />
        </a>
        <div className="custom-select">
          <select defaultValue="1" onChange={setSpeed}>
            <option value="1">1.00x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.50x</option>
            <option value="2">2.00x</option>
          </select>
        </div>
        <div className="last-buffer" />
      </AudioPlayerStyle>
    </AudioWrapperStyle>
  );
}

/*
      <div>
        <button type="button" onClick={togglePlaying}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <span>elapsed time {mediaTime}</span>
        <span>total duration {duration}</span>

        <label htmlFor="scrubber">scrubber</label>
        <input
          type="range"
          id="scrubber"
          value={mediaTime}
          min={0}
          max={duration}
          onChange={onScrubberChange}
          aria-valuetext={`${mediaTime} seconds`}
        />
        <button type="button" onClick={onRewind}>
          rewind 5 seconds
        </button>
        <button type="button" onClick={onFastForward}>
          fast-forward 5 seconds
        </button>
      </div>
      */
