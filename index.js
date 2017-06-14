"use strict";

process.env.DEBUG = "actions-on-google:*";
const App = require("actions-on-google").ApiAiApp;
// const express = require("express");
// const bodyParser = require('body-parser');
//
// var server = express();
// server.use(bodyParser.json());

// server.post("/", function(req, res) {

exports.chromeControl = (req, res) => {
  const app = new App({req, res});
  console.log("res: " + res);
  console.log("Request headers: " + JSON.stringify(req.headers));
  console.log("Request body: " + JSON.stringify(req.body));
  console.log("req.body.result.action: "  + req.body.result.action);
  console.log("req.body.result.action == permsaction ? " + (req.body.result.action == "permsaction"));

  function permsRequest (app) {
    console.log("got in func???");
    app.tell("webhook works!!!");
  }

  let actionMap = new Map();
  actionMap.set("permsaction", permsRequest);
  app.handleRequest(actionMap);
};
// });

// server.listen(process.env.PORT || 8000, function() {
//   console.log("Server listening");
// });
