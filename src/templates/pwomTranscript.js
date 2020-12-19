import { graphql } from 'gatsby';
import { GenericTranscriptTemplate } from './GenericTranscriptTemplate';
import './pwom.css';

export default function Template({ location, data }) {
  return GenericTranscriptTemplate({ location, data });
}

export const pageQuery = graphql`
  query PwomTranscriptPath(
    $id: String!
    $slug: String!
    $book: String!
    $source: String!
    $timingBase: String!
  ) {
    unit: pwomPagesJson(url: { eq: $slug }) {
      audio
      title
      key
      url
      timing
    }
    book: pwomContentsJson(bookId: { eq: $book }) {
      title
      bookId
      image
      toc {
        title
        url
        contents {
          title
          url
        }
      }
    }
    timing: pwomTimingJson(base: { eq: $timingBase }) {
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
