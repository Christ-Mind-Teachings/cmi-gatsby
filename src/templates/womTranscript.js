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
    $source: String!
  ) {
    unit: womPagesJson(url: { eq: $slug }) {
      audio
      title
      uid
      url
      timing
    }
    book: womContentsJson(bookId: { eq: $book }) {
      title
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
