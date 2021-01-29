import { graphql } from 'gatsby';
import { GenericTranscriptTemplate } from './GenericTranscriptTemplate';

export default function Template({ location, data }) {
  return GenericTranscriptTemplate({ location, data });
}

export const pageQuery = graphql`
  query WomTranscriptPath(
    $id: String!
    $slug: String!
    $book: String!
    $regex: String!
    $source: String!
    $timingBase: String!
  ) {
    unit: womPagesJson(url: { eq: $slug }) {
      audio
      title
      key
      url
    }
    list: allWomPagesJson(filter: { url: { regex: $regex } }) {
      nodes {
        title
        url
      }
    }
    book: womContentsJson(bookId: { eq: $book }) {
      title
      description
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
    timing: womTimingJson(base: { eq: $timingBase }) {
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
