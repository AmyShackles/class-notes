module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: 'Note Application', // Navigation and Site Title
  titleAlt: 'Note Application', // Title for JSONLD
  description: 'Note Application',
  url: 'https://infallible-wright-7c467d.netlify.com/', // Domain of your site. No trailing slash!
  siteUrl: 'https://infallible-wright-7c467d.netlify.com/', // url + pathPrefix
  siteLanguage: 'en', // Language Tag on <html> element
  logo: 'static/logo/logo.png', // Used for SEO
  banner: 'static/logo/banner.png',
  // JSONLD / Manifest
  favicon: 'static/logo/favicon.png', // Used for manifest favicon generation
  shortName: 'NoteApp', // shortname for manifest. MUST be shorter than 12 characters
  author: 'Amy Shackles', // Author for schemaORGJSONLD
  themeColor: '#3e7bf2',
  backgroundColor: '#d3e0ff',
  twitter: '@amyshackles', // Twitter Username
};
