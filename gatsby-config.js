const config = require('./config/site');
const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;

module.exports = {
  siteMetadata: {
    pathPrefix: config.pathPrefix,
    siteUrl: config.siteUrl + pathPrefix,
    siteLanguage: config.siteLanguage,
    logo: config.logo,
    banner: config.banner,
    favicon: config.favicon,
    themeColor: config.themeColor,
    backgroundColor: config.backgroundColor,
    twitter: config.twitter,
    title: config.title,
    titleAlt: config.titleAlt,
    author: config.author,
    description: config.description,
    url: config.url,
    shortName: config.shortName,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              quality: 90,
              // linkImagesToOriginal: true,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'config/typography.js',
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.title,
        short_name: config.shortName,
        description: config.description,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: config.favicon,
      },
    },
    'gatsby-plugin-netlify',
    'gatsby-plugin-remove-serviceworker',
  ],
};
