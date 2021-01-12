import { graphql } from 'gatsby';
import { GenericTranscriptTemplate } from './GenericTranscriptTemplate';

export default function Template({ location, data }) {
  return GenericTranscriptTemplate({ location, data });
}

export const pageQuery = graphql`
  query spTranscriptPath(
    $id: String!
    $slug: String!
    $book: String!
    $regex: String!
    $source: String!
  ) {
    unit: spPagesJson(url: { eq: $slug }) {
      title
      key
      prefix
      url
    }
    list: allSpPagesJson(filter: { url: { regex: $regex } }) {
      nodes {
        title
        url
      }
    }
    book: spContentsJson(bookId: { eq: $book }) {
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
    source: cmiSourcesJson(sourceId: { eq: $source }) {
      title
      sourceId
      url
    }
    content: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
      html
    }
  }
`;
