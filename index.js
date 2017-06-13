"use strict";

process.env.DEBUG = "actions-on-google:*";
const App = require("actions-on-google").ApiAiApp;
const express = require("express");
const bodyParser = require('body-parser');

var server = express();
server.use(bodyParser.json());
// [START YourAction]
server.post("/", function(req, res) {
  const app = new App({req, res});
  console.log("Request headers: " + JSON.stringify(req.headers));
  console.log("Request body: " + JSON.stringify(req.body));
  console.log("req.body.result.action: "  + req.body.result.action);
  console.log("req.body.result.action == permsaction ? " + (req.body.result.action == "permsaction"));
  // Fulfill action business logic
  if(req.body.result.action == "permsaction"){
    permsRequest(app);
  }
  function permsRequest (app) {
    console.log("got in func???");
    app.ask("webhook works!!!");
    // const permission = app.SupportedPermissions.NAME;
    // app.askForPermission("To link your device to your Google Chrome browser", permission);
  }
  //
  // const actionMap = new Map();
  // actionMap.set("permsaction", permsRequest);
  //
  // app.handleRequest(actionMap);
});

// server.get("/auth/google",
//   passport.authenticate("google", { scope:
//   	["https://www.googleapis.com/auth/plus.login",
//   	, "https://www.googleapis.com/auth/plus.profile.emails.read" ] }
// ));
//
// server.get("/auth/google/callback",
//     passport.authenticate( "google", {
//         successRedirect: "/auth/google/success",
//         failureRedirect: "/auth/google/failure"
// }));
//
// server.get("auth/google/success",function(){
//   console.log("login success!!!!");
// });
//
// server.get("auth/google/failure",function(){
//   console.log("login failure!!!!");
// });

server.listen(process.env.PORT || 8000, function() {
  console.log("Server listening");
});
