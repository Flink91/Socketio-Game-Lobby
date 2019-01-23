const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");

const app = express();

app.use("/", serveStatic(path.join(__dirname, "/dist/")));
// reroute any filesearch to index (for heroku)
app.get(/.*/, function (req, res) {
  res.sendfile(__dirname + "/dist/index.html");
});


const PORT = process.env.PORT || 8080;

app.listen(PORT);

console.log("listening on port: " + PORT);
