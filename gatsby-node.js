import path from 'path';

async function createTranscriptPage({ actions, graphql, reporter }) {
  const templates = {
    wom: path.resolve(`src/templates/womTranscript.js`),
    raj: path.resolve(`src/templates/rajTranscript.js`),
  };
  const { createPage } = actions;

  const { data, errors } = await graphql(`
    query {
      transcripts: allMarkdownRemark {
        nodes {
          fileAbsolutePath
          id
        }
      }
    }
  `);

  if (errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL query when creating Transcript Page.`
    );
    return;
  }

  data.transcripts.nodes.forEach((node) => {
    const SOURCE_ROOT = `${__dirname}/src/sources`;
    const filePath = node.fileAbsolutePath.slice(SOURCE_ROOT.length, -3);
    const [source, book, unit] = filePath.substring(1).split('/');

    if (templates[source]) {
      createPage({
        path: filePath,
        component: templates[source],
        context: {
          id: node.id,
          slug: filePath,
          source,
          book,
          timingBase: `/${book}/${unit}/`,
        },
      });
    }
  });
}

export async function createPages(parms) {
  await Promise.all([createTranscriptPage(parms)]);
}

/*
 * Get out of memory error when building on Netlify when project includes fomantic-ui
export function onCreateWebpackConfig({ actions }) {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '../../theme.config$': path.join(
          __dirname,
          'src/fomantic-less/theme.config'
        ),
      },
    },
  });
}
*/
