import { graphql } from 'gatsby';
import { GenericTranscriptTemplate } from './GenericTranscriptTemplate';

export default function Template({ location, data }) {
  return GenericTranscriptTemplate({ location, data });
}

export const pageQuery = graphql`
  query RajTranscriptPath(
    $id: String!
    $slug: String!
    $book: String!
    $source: String!
    $timingBase: String!
  ) {
    unit: rajPagesJson(url: { eq: $slug }) {
      audio
      title
      url
      timing
    }
    book: rajContentsJson(bookId: { eq: $book }) {
      title
      bookId
      image
      toc {
        title
        url
      }
    }
    timing: rajTimingJson(base: { eq: $timingBase }) {
      time {
        id
        seconds
      }
    }
    source: cmiSourcesJson(sourceId: { eq: $source }) {
      title
      sourceId
      url
      audioBaseUrl
      timingBaseUrl
    }
    content: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
      html
    }
  }
`;
