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
  ) {
    unit: rajPagesJson(url: { eq: $slug }) {
      audio
      title
      url
      timing
    }
    book: rajContentsJson(bookId: { eq: $book }) {
      title
      image
      toc {
        title
        url
      }
    }
    source: cmiSourcesJson(sourceId: { eq: $source }) {
      title
      sourceId
    }
    content: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
      html
    }
  }
`;
