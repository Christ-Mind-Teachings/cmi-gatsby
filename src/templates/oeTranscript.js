import { graphql } from 'gatsby';
import { GenericTranscriptTemplate } from './GenericTranscriptTemplate';

export default function Template({ location, data }) {
  return GenericTranscriptTemplate({ location, data });
}

export const pageQuery = graphql`
  query oeTranscriptPath(
    $id: String!
    $slug: String!
    $book: String!
    $regex: String!
    $source: String!
    $timingBase: String!
  ) {
    unit: oePagesJson(url: { eq: $slug }) {
      audio
      title
      key
      prefix
      url
    }
    list: allOePagesJson(filter: { url: { regex: $regex } }) {
      nodes {
        title
        url
      }
    }
    book: oeContentsJson(bookId: { eq: $book }) {
      title
      bookId
      image
      toc {
        title
        url
        contents {
          title
          url
          contents {
            title
            url
            lesson
          }
        }
      }
    }
    timing: oeTimingJson(base: { eq: $timingBase }) {
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
    }
    content: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
      html
    }
  }
`;
