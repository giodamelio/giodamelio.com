const Koa = require('koa');
const Nuxt = require('nuxt');

const nuxtConfig = require('../nuxt.config.js');

const app = new Koa();

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '3141';

async function start() {
  // Setup nuxt
  nuxtConfig.dev = !(process.env.NODE_ENV === 'production');
  const nuxt = await new Nuxt(nuxtConfig);

  // Build only in dev mode with hot-reloading
  if (nuxtConfig.dev) {
    try {
      await nuxt.build();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      process.exit(1);
    }
  }

  // Nuxt middleware
  app.use(async ctx => {
    ctx.status = 200; // Koa defaults to 404 when no status is set
    await nuxt.render(ctx.req, ctx.res);
  });

  // Start our app
  app.listen(PORT, HOST);

  // eslint-disable-next-line no-console
  console.log(`App listening at http://${HOST}:${PORT}`);
}

start();
