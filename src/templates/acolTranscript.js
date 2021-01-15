import { graphql } from 'gatsby';
import { GenericTranscriptTemplate } from './GenericTranscriptTemplate';

export default function Template({ location, data }) {
  return GenericTranscriptTemplate({ location, data });
}

export const pageQuery = graphql`
  query acolTranscriptPath(
    $id: String!
    $slug: String!
    $book: String!
    $regex: String!
    $source: String!
    $timingBase: String!
  ) {
    unit: acolPagesJson(url: { eq: $slug }) {
      audio
      title
      key
      prefix
      url
    }
    list: allAcolPagesJson(filter: { url: { regex: $regex } }) {
      nodes {
        title
        url
      }
    }
    book: acolContentsJson(bookId: { eq: $book }) {
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
    timing: acolTimingJson(base: { eq: $timingBase }) {
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