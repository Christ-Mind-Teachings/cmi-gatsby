import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

module.exports = {
  plugins: [
    // 'gatsby-plugin-less',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/cmi/*'] },
    },
    'gatsby-transformer-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
        name: 'data',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/sources`,
        // path: `${__dirname}/src/plugintest`,
        name: 'sources',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-attributes',
            options: {
              mode: 'cmi',
              className: 'omit',
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
};
