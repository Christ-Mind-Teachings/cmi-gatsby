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

  .ui.segment.as-highlight {
    font-size: 1.2rem;
    cursor: pointer;
  }

  .tocStyle .active.item > a,
  .tocStyle .active.item > span > a {
    cursor: auto;
    background-color: var(--tocActiveItem);
    border-radius: 5px;
    color: white;
    padding: 3px 7px;
  }

  .transcript-content {
    padding-bottom: 20rem;
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

  /* For WOM transcripts */
  .transcript-content blockquote {
    font-style: italic;
  }

  .transcript-content.tjl .date {
      font-style: bold;
      font-size: 1.1em;
      line-height: 1.5em;
      font-variant: small-caps;
      text-align: right;
  }

  .transcript-content.tjl .small {
    font-size: small;
  }

  .transcript-content.tjl .chHead {
    text-align: center;
    font-style: italic;
  }

  .transcript-content.tjl .capital {
    font-weight: bold;
    font-style: italic;
    font-size: 3.33em;
    line-height: 0.42em;
  }

  .transcript-content.tjl .quote {
    margin-left: 20px;
  }

  .transcript-content.tjl blockquote,
  .transcript-content.tjl p.indent,
  .transcript-content.tjl div.indent p {
    font-style: italic;
    margin-left: 3%;
    margin-bottom: 1.3rem;
  }

  .transcript-content.tjl img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .transcript-content.wos img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .transcript-content.sp .center,
  .transcript-content.wos .center {
    text-align: center;
  }

  .transcript-content.wos p.top {
    padding-top: 4%;
  }

  .transcript-content.wos span.dropcaps {
    font-size: 4em;
    float: left;
    margin-top: -.2em;
    margin-bottom: -0.3254em;
    margin-right: .1em;
    line-height: 1.2em;
  }

  .transcript-content.wos div.indent p, .transcript-content.wos p.indent {
    font-style: italic;
    margin-left: 3%;
    margin-bottom: 1.3rem;
  }

  .transcript-content.wos p {
    line-height: 1.3;
  }

  .transcript-content.wos .iam {
    font-size: 6em;
    text-align: center;
    padding-top: 20%;
  }

  .transcript-content.wos .i1 {
    margin-left: 40%;
    font-size: 1.5em;
  }

  .transcript-content.wos .i2 {
    margin-left: 47%;
    font-size: 1.5em;
  }

  .transcript-content.wos .i3 {
    margin-left: 54%;
    font-size: 1.5em;
  }

  .transcript-content.wos .quote {
    margin-left: 20px;
  }

  .transcript-content.raj blockquote {
    font-style: italic;
  }

  .person2 {
    min-height: 20px;
    padding: 19px;
    margin-bottom: 20px;
    background-color: #f2e6f3;
    border-radius: 8px;
  }

  .book2 {
    min-height: 20px;
    padding: 19px;
    margin-bottom: 20px;
    background-color: #c8e7f1;
    border-radius: 8px;
  }

  .transcript-content.raj .person {
    border-left: 5px solid #ea56f7;
    padding: 10px;
    margin-bottom: 20px;
  }

  .transcript-content.raj .book:not(.icon) {
    border-left: 5px solid #39cdfd;
    padding: 10px;
    margin-bottom: 20px;
  }

  .transcript-content p:before {
    content: "("attr(id)") ";
  }
`;

export default GlobalStyles;
