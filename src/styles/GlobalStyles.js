import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --tocLink: #668AAA;
    --tocActiveItem: #871212;
    --black: #2e2e2e;
  }

  .gatsby-image-wrapper img[src*=base64\\,] {
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
  }

  .tocStyle .active.item > span {
    cursor: auto;
    background-color: var(--tocActiveItem);
    border-radius: 5px;
    color: white;
    padding: 3px 7px;
  }

  .transcript-content {
    margin-bottom: 17rem;
  }

  .audio-highlight {
    border-radius: 5px;
    border: 1px dashed black;
    padding: 10px;
  }

  i.cmi-hidden.icon,
  .cmi-hidden {
    display: none;
  }

  span.special > i.icon {
    cursor: pointer;
  }

  .ui.segment.search-navigator-visible {
    position: fixed;
    bottom: 3rem;
  }
`;

export default GlobalStyles;
