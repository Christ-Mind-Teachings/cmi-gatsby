import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

module.exports = {
  plugins: [
    // 'gatsby-plugin-less',
    'gatsby-plugin-react-helmet',
    // {
    //   resolve: 'gatsby-plugin-create-client-paths',
    //   options: { prefixes: ['/cmi/*', '/pl/cmi/*'] },
    // },
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
        name: 'sources',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
            },
          },
          {
            resolve: 'gatsby-remark-attributes',
            options: {
              mode: 'cmi',
              className: 'omit',
            },
          },
          'gatsby-remark-numbered-footnotes',
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
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        path: `${__dirname}/locales`,
        languages: [`en`, `pl`],
        defaultLanguage: `en`,
        debug: true,
        redirect: true,
        siteUrl: 'https://www.christmind.info',
        pages: [
          {
            matchPath: '/:lang?/pwom/:book?/:unit?',
            getLanguageFromPath: true,
            languages: ['pl'],
          },
          {
            matchPath: '/:lang?/wom/:book?/:unit?',
            getLanguageFromPath: true,
            languages: ['en'],
          },
          {
            matchPath: '/:lang?/raj/:book?/:unit?',
            getLanguageFromPath: true,
            languages: ['en'],
          },
          {
            matchPath: '/cmi/:feature?',
            getLanguageFromPath: false,
            languages: ['en', 'pl'],
          },
          {
            matchPath: '/index',
            getLanguageFromPath: false,
            languages: ['en', 'pl'],
          },
        ],
        // you can pass any i18next options
        // pass following options to allow message content as a key
        i18nextOptions: {
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
          keySeparator: false,
          nsSeparator: false,
        },
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    'gatsby-plugin-catch-links',
  ],
};
