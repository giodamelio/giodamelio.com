process.env.NODE_ENV = 'development';

// Load environment variables from .env file. Surpress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({ silent: true });

const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const historyApiFallback = require('connect-history-api-fallback');
const httpProxyMiddleware = require('http-proxy-middleware');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

const config = require('../config/webpack.config.dev');
const paths = require('../config/paths');

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = process.env.PORT || 3000;

function setupCompiler(host, port, protocol) {
  // "Compiler" is a low-level interface to Webpack.
  // It lets us listen to some events and provide our own custom messages.
  const compiler = webpack(config);

  // "invalid" event fires when you have changed a file, and Webpack is
  // recompiling a bundle. WebpackDevServer takes care to pause serving the
  // bundle, so if you refresh, it'll wait instead of serving the old one.
  // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
  compiler.plugin('invalid', () => {
    clearConsole();
    console.log('Compiling...');
  });

  // "done" event fires when Webpack has finished recompiling the bundle.
  // Whether or not you have warnings or errors, you will get this event.
  compiler.plugin('done', stats => {
    clearConsole();

    // We have switched off the default Webpack output in WebpackDevServer
    // options so we are going to "massage" the warnings and errors and present
    // them in a readable focused way.
    const messages = formatWebpackMessages(stats.toJson({}, true));
    if (!messages.errors.length && !messages.warnings.length) {
      console.log(chalk.green('Compiled successfully!'));
      console.log();
      console.log('The app is running at:');
      console.log();
      const SERVER_URL = chalk.cyan(`${protocol}://${host}:${port}/`);
      console.log(`  ${SERVER_URL}`);
      console.log();
      console.log('Note that the development build is not optimized.');
      console.log(`To create a production build, use ${chalk.cyan('npm run build')}.`);
      console.log();
    }

    // If errors exist, only show errors.
    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'));
      console.log();
      messages.errors.forEach(message => {
        console.log(message);
        console.log();
      });
      return;
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'));
      console.log();
      messages.warnings.forEach(message => {
        console.log(message);
        console.log();
      });
    }
  });
  return compiler;
}

// We need to provide a custom onError function for httpProxyMiddleware.
// It allows us to log custom error messages on the console.
function onProxyError(proxy) {
  return function middleware(err, req, res) {
    const host = req.headers && req.headers.host;
    console.log(
      `${chalk.red('Proxy error:')} Could not proxy request ${chalk.cyan(req.url)
      } from ${chalk.cyan(host)} to ${chalk.cyan(proxy)}.`
    );
    console.log(
      `See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (${
      chalk.cyan(err.code)}).`
    );
    console.log();

    // And immediately send the proper error response to the client.
    // Otherwise, the request will eventually timeout with ERR_EMPTY_RESPONSE on the client side.
    if (res.writeHead && !res.headersSent) {
      res.writeHead(500);
    }
    res.end(`Proxy error: Could not proxy request ${req.url} from ${
      host} to ${proxy} (${err.code}).`
           );
  };
}

function addMiddleware(devServer) {
  // `proxy` lets you to specify a fallback server during development.
  // Every unrecognized request will be forwarded to it.
  const proxy = require(paths.appPackageJson).proxy;
  devServer.use(historyApiFallback({
    // Paths with dots should still use the history fallback.
    // See https://github.com/facebookincubator/create-react-app/issues/387.
    disableDotRule: true,
    // For single page apps, we generally want to fallback to /index.html.
    // However we also want to respect `proxy` for API calls.
    // So if `proxy` is specified, we need to decide which fallback to use.
    // We use a heuristic: if request `accept`s text/html, we pick /index.html.
    // Modern browsers include text/html into `accept` header when navigating.
    // However API calls like `fetch()` won’t generally accept text/html.
    // If this heuristic doesn’t work well for you, don’t use `proxy`.
    htmlAcceptHeaders: proxy
      ? ['text/html']
      : ['text/html', '*/*'],
  }));
  if (proxy) {
    if (typeof proxy !== 'string') {
      console.log(chalk.red('When specified, "proxy" in package.json must be a string.'));
      console.log(chalk.red(`Instead, the type of "proxy" was "${typeof proxy}".`));
      // eslint-disable-next-line max-len
      console.log(chalk.red('Either remove "proxy" from package.json, or make it a string.'));
      process.exit(1);
    }

    // Otherwise, if proxy is specified, we will let it handle any request.
    // There are a few exceptions which we won't send to the proxy:
    // - /index.html (served as HTML5 history API fallback)
    // - /*.hot-update.json (WebpackDevServer uses this too for hot reloading)
    // - /sockjs-node/* (WebpackDevServer uses this for hot reloading)
    // Tip: use https://jex.im/regulex/ to visualize the regex
    const mayProxy = /^(?!\/(index\.html$|.*\.hot-update\.json$|sockjs-node\/)).*$/;
    devServer.use(mayProxy,
                  // Pass the scope regex both to Express and to the middleware for proxying
                  // of both HTTP and WebSockets to work without false positives.
                  httpProxyMiddleware(pathname => mayProxy.test(pathname), {
                    target: proxy,
                    logLevel: 'silent',
                    onError: onProxyError(proxy),
                    secure: false,
                    changeOrigin: true,
                  })
                 );
  }
  // Finally, by now we have certainly resolved the URL.
  // It may be /index.html, so let the dev server try serving it again.
  devServer.use(devServer.middleware);
}

function runDevServer(compiler, host, port, protocol) {
  const devServer = new WebpackDevServer(compiler, {
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'none',
    // By default WebpackDevServer serves physical files from current directory
    // in addition to all the virtual build products that it serves from memory.
    // This is confusing because those files won’t automatically be available in
    // production build folder unless we copy them. However, copying the whole
    // project directory is dangerous because we may expose sensitive files.
    // Instead, we establish a convention that only files in `public` directory
    // get served. Our build script will copy `public` into the `build` folder.
    // In `index.html`, you can get URL of `public` folder with %PUBLIC_PATH%:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
    // Note that we only recommend to use `public` folder as an escape hatch
    // for files like `favicon.ico`, `manifest.json`, and libraries that are
    // for some reason broken when imported through Webpack. If you just want to
    // use an image, put it in `src` and `import` it from JavaScript instead.
    contentBase: paths.appPublic,
    // Enable hot reloading server. It will provide /sockjs-node/ endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the Webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,
    // It is important to tell WebpackDevServer to use the same "root" path
    // as we specified in the config. In development, we always serve from /.
    publicPath: config.output.publicPath,
    // WebpackDevServer is noisy by default so we emit custom message instead
    // by listening to the compiler events with `compiler.plugin` calls above.
    quiet: true,
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebookincubator/create-react-app/issues/293
    watchOptions: {
      ignored: /node_modules/,
    },
    // Enable HTTPS if the HTTPS environment variable is set to 'true'
    https: protocol === 'https',
    host,
  });

  // Our custom middleware proxies requests to /index.html or a remote API.
  addMiddleware(devServer);

  // Launch WebpackDevServer.
  devServer.listen(port, err => {
    if (err) {
      return console.log(err);
    }

    clearConsole();
    console.log(chalk.cyan('Starting the development server...'));
    return console.log();
  });
}

function run(port) {
  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  const host = process.env.HOST || 'localhost';
  const compiler = setupCompiler(host, port, protocol);
  runDevServer(compiler, host, port, protocol);
}

run(DEFAULT_PORT);
