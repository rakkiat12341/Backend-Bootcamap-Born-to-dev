const http = require("http");
const auth = require("basic-auth");

const username = "admin";
const password = "123456";

const server = http.createServer((req, res) => {
  const credentials = auth(req);

  if (
    credentials &&
    credentials.name === username &&
    credentials.pass === password
  ) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("welcome");
  } else {
    res.writeHead(401, {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    });
    res.end("Access denied");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
