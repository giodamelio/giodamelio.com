// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Gio's site",
  siteUrl: 'https://giodamelio.com',
  port: 3141,
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'StaticPage',
        path: './content/static-page/*.md'
      }
    },
    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        purgeConfig: {
          // Manually list classes that Vue will add dynamically to stop PurgeCSS from removing them
          whitelist: ['hidden']
        }
      }
    },
    {
      use: 'gridsome-plugin-netlify-cms'
    }
  ]
};
