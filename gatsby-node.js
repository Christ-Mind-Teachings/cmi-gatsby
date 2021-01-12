import path from 'path';

async function createTranscriptPage({ actions, graphql, reporter }) {
  const templates = {
    wom: path.resolve(`src/templates/womTranscript.js`),
    pwom: path.resolve(`src/templates/pwomTranscript.js`),
    raj: path.resolve(`src/templates/rajTranscript.js`),
    oe: path.resolve(`src/templates/oeTranscript.js`),
    sp: path.resolve(`src/templates/spTranscript.js`),
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
    const parts = filePath.substring(1).split('/');

    // normalize parts, filePath will be either
    // /lang/group/source/book/unit or
    // /lang/source/book/unit
    if (parts.length === 4) {
      parts.splice(1, 0, 'group');
    }

    // get source, book, and unit from path
    const [, , source, book, unit] = parts;

    if (templates[source]) {
      createPage({
        path: filePath,
        component: templates[source],
        context: {
          id: node.id,
          slug: filePath,
          source,
          book,
          regex: `/${book}/`,
          timingBase: `/${book}/${unit}/`,
        },
      });
    }
  });
}

export async function createPages(parms) {
  await Promise.all([createTranscriptPage(parms)]);
}

// exports.onCreatePage = ({ page, actions }) => {
//   const { createPage } = actions;
//   // notice the addition of .*
//   if (page.path.match(/^\/.*\/cmi/)) {
//     // notice page.context.language
//     page.matchPath = `/${page.context.language}/cmi/*`;
//     createPage(page);
//   }
// };

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
