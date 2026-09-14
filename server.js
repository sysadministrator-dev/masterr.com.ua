const { createServer } = require("http");
const next = require("next");

// cityhost's Node.js hosting expects the app to listen on a Unix socket path
// (given via process.env.PORT as a string), not a TCP port. Passing the raw
// value straight to .listen() lets Node pick the right bind mode either way.
const listenTarget = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(listenTarget, () => {
    console.log(`Ready, listening on ${listenTarget}`);
  });
});
