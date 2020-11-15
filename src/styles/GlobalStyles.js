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

  .tocStyle {
    cursor: pointer;
    color: #668AAA;
  }

  .tocStyle .active.item > span {
    cursor: auto;
    background-color: var(--tocActiveItem);
    border-radius: 5px;
    color: white;
  }

  .transcript-content {
    margin-bottom: 17rem;
  }

  .cmi-hidden {
    display: none;
  }

  .ui.segment.search-navigator-visible {
    position: fixed;
    bottom: 3rem;
  }
`;

export default GlobalStyles;
