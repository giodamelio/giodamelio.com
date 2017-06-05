const express = require('express');
const Nuxt = require('nuxt');

const nuxtConfig = require('../nuxt.config.js');

const app = express();

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '3141';

async function start() {
  // Setup nuxt
  nuxtConfig.dev = !(process.env.NODE_ENV === 'production');
  const nuxt = await new Nuxt(nuxtConfig);

  // Load our middleware
  app.use(nuxt.render);

  // Build only in dev mode with hot-reloading
  if (nuxtConfig.dev) {
    nuxt.build().catch(error => {
      console.error(error);
      process.exit(1);
    });
  }

  // Start our app
  app.listen(PORT, HOST);

  // eslint-disable-next-line no-console
  console.log(`App listening at http://${HOST}:${PORT}`);
}

start();
