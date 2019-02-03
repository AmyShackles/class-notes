const config = require('./config/site');

module.exports = {
  siteMetadata: {
    ...config,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts`,
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              quality: 90,
              // linkImagesToOriginal: true,
            },
          },
          'gatsby-remark-prismjs',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-emotion',
      options: {
        autoLabel: process.env.NODE_ENV !== 'production',
        // eslint-disable-next-line
        labelFormat: `[filename]--[local]`,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'config/typography.js',
      },
    },
    'gatsby-plugin-sharp',
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
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {},
        allPageHeaders: [
          'Link: </logo/banner.png>; rel=preload; as=image',
          'Link: </logo/banner2.png>; rel=preload; as=image',
          'Link: </logo/favicon.png>; rel=preload; as=image',
          'Link: </logo/header-logo.png>; rel=preload; as=image',
          'Link: </logo/logo.png>; rel=preload; as=image',
          'Link: </logo/logo2.png>; rel=preload; as=image',
          'Link: </manifest.webmanifest>; rel=preload',
          'Link: </icons/icon-48x48.png; rel=preload; as=image',
          'Link: </icons/icon-72x72.png; rel=preload; as=image',
          'Link: </icons/icon-96x96.png; rel=preload; as=image',
          'Link: </icons/icon-144x144.png; rel=preload; as=image',
          'Link: </icons/icon-192x192.png; rel=preload; as=image',
          'Link: </icons/icon-256x256.png; rel=preload; as=image',
          'Link: </icons/icon-384x384.png; rel=preload; as=image',
          'Link: </icons/icon-512x512.png; rel=preload; as=image',
        ],
        mergeSecurityHeaders: true,
        mergeLinkHeaders: true,
        mergeCachingHeaders: true,
        generateMatchPathRewrites: true,
      },
    },
  ],
};
